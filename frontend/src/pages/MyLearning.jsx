import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, CheckCircle2, Clock, BookOpen, Layers } from 'lucide-react';
import api from '../context/AuthContext';

const MyLearning = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get('/progress/my-courses');
        if (data.success) setCourses(data.courses);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filtered = courses.filter(c => {
    if (filter === 'completed') return c.progress_percent === 100;
    if (filter === 'in-progress') return c.progress_percent > 0 && c.progress_percent < 100;
    if (filter === 'not-started') return c.progress_percent === 0;
    return true;
  });

  const difficultyColor = {
    Beginner: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    Intermediate: 'text-blue-600 bg-blue-50 border-blue-200',
    Advanced: 'text-purple-600 bg-purple-50 border-purple-200',
  };

  const filterButtons = [
    { key: 'all', label: 'All', count: courses.length },
    { key: 'in-progress', label: 'In Progress', count: courses.filter(c => c.progress_percent > 0 && c.progress_percent < 100).length },
    { key: 'completed', label: 'Completed', count: courses.filter(c => c.progress_percent === 100).length },
    { key: 'not-started', label: 'Not Started', count: courses.filter(c => c.progress_percent === 0).length },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 page-enter">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-2">
              My Learning
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">Track all your enrolled courses and progress</p>
          </div>
        </div>
        <Link to="/courses" className="btn-primary text-sm flex items-center gap-2 self-start sm:self-auto">
          Find More Courses <ArrowRight size={15} />
        </Link>
      </div>

      {/* Pill Filters with count badges */}
      <div className="flex gap-2 flex-wrap">
        {filterButtons.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all duration-200 flex items-center gap-1.5 ${
              filter === f.key
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-sm'
            }`}
          >
            {f.label}
            <span className={`text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[20px] text-center ${
              filter === f.key ? 'bg-white/20' : 'bg-gray-100'
            }`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="card-static p-6 animate-pulse space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
                <div className="w-20 h-20 bg-gray-200 rounded-xl" />
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full" />
              <div className="h-10 bg-gray-200 rounded-xl" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card-static p-16 text-center space-y-4 animate-fadeIn">
          <div className="mx-auto w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center">
            {courses.length === 0 ? (
              <BookOpen className="w-10 h-10 text-gray-300" />
            ) : (
              <GraduationCap className="w-10 h-10 text-gray-300" />
            )}
          </div>
          {courses.length === 0 ? (
            <>
              <h3 className="text-lg font-bold text-gray-700">No courses enrolled yet</h3>
              <p className="text-sm text-gray-400 max-w-sm mx-auto">Start with a free course and begin your coding journey!</p>
              <Link to="/courses" className="btn-primary inline-flex items-center gap-2 text-sm">
                Browse Free Courses <ArrowRight size={15} />
              </Link>
            </>
          ) : (
            <>
              <h3 className="text-lg font-bold text-gray-700">No courses match this filter</h3>
              <p className="text-sm text-gray-400">Try selecting a different filter above.</p>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map(course => (
            <div key={course.id} className="card p-6 space-y-4 border group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{course.category}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${difficultyColor[course.difficulty] || difficultyColor.Beginner}`}>
                      {course.difficulty}
                    </span>
                    {course.progress_percent === 100 && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 size={9} /> Completed 🎉
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 text-[15px] leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">{course.title}</h3>
                  <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> Enrolled {new Date(course.enrolled_at).toLocaleDateString()}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="flex items-center gap-1">
                      <Layers size={11} /> {course.total_modules} modules
                    </span>
                  </div>
                </div>
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0 border border-gray-100 group-hover:shadow-md transition-shadow duration-200"
                  onError={(e) => { e.target.src = `https://placehold.co/80x80/6366f1/white?text=${encodeURIComponent(course.title.charAt(0))}`; }}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[11px]">
                  <span className="text-gray-500 font-medium">{course.completed_modules}/{course.total_modules} modules completed</span>
                  <span className="font-bold text-indigo-600">{course.progress_percent}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${course.progress_percent}%` }} />
                </div>
              </div>

              <Link
                to={`/courses/${course.id}`}
                className="flex items-center justify-center gap-2 w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold py-2.5 rounded-xl text-sm border border-indigo-100 transition-all duration-200 group-hover:shadow-sm"
              >
                {course.progress_percent === 100 ? '🎉 Review Course' : 'Continue Learning'} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLearning;
