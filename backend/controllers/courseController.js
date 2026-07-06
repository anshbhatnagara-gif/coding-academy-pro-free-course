import pool from '../config/db.js';

// GET /api/courses
export const getCourses = async (req, res) => {
  try {
    const userId = req.user?.id || null;

    const query = `
      SELECT 
        c.*,
        (SELECT COUNT(*) FROM modules m WHERE m.course_id = c.id) AS total_modules,
        (SELECT COUNT(*) FROM enrollments e WHERE e.course_id = c.id) AS total_enrolled
        ${userId ? `, (SELECT COUNT(*) FROM enrollments e WHERE e.course_id = c.id AND e.user_id = ?) AS is_enrolled` : ', 0 AS is_enrolled'}
      FROM courses c
      ORDER BY c.id ASC
    `;

    const params = userId ? [userId] : [];
    const [courses] = await pool.execute(query, params);

    res.json({ success: true, courses });
  } catch (error) {
    console.error('Get Courses Error:', error.message);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// GET /api/courses/:id
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || null;

    const [courses] = await pool.execute('SELECT * FROM courses WHERE id = ?', [id]);
    if (courses.length === 0) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }
    const course = courses[0];

    // Get modules
    const [modules] = await pool.execute(
      'SELECT * FROM modules WHERE course_id = ? ORDER BY order_index ASC',
      [id]
    );

    // Get user progress if logged in
    let completedModules = [];
    let isEnrolled = false;

    if (userId) {
      const [enrollment] = await pool.execute(
        'SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?',
        [userId, id]
      );
      isEnrolled = enrollment.length > 0;

      if (isEnrolled) {
        const [prog] = await pool.execute(
          'SELECT module_id FROM progress WHERE user_id = ?',
          [userId]
        );
        completedModules = prog.map(p => p.module_id);
      }
    }

    const progressPercent = modules.length > 0
      ? Math.round((completedModules.length / modules.length) * 100)
      : 0;

    res.json({
      success: true,
      course: {
        ...course,
        modules: modules.map(m => ({
          ...m,
          is_completed: completedModules.includes(m.id)
        })),
        is_enrolled: isEnrolled,
        progress_percent: progressPercent,
        completed_count: completedModules.length,
        total_modules: modules.length
      }
    });
  } catch (error) {
    console.error('Get Course Detail Error:', error.message);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// POST /api/courses/:id/enroll
export const enrollCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const [course] = await pool.execute('SELECT id, title FROM courses WHERE id = ?', [id]);
    if (course.length === 0) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }

    // Check already enrolled
    const [existing] = await pool.execute(
      'SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?',
      [userId, id]
    );
    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: 'Already enrolled in this course.' });
    }

    await pool.execute(
      'INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)',
      [userId, id]
    );

    await pool.execute(
      'INSERT INTO activity_logs (user_id, action) VALUES (?, ?)',
      [userId, `Enrolled in: ${course[0].title}`]
    );

    res.status(201).json({
      success: true,
      message: `Successfully enrolled in ${course[0].title}!`
    });
  } catch (error) {
    console.error('Enroll Error:', error.message);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
