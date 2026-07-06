import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Users, CheckCircle2, Lock, PlayCircle, BookOpen, ChevronLeft, Zap, Layers } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../context/AuthContext';

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [completing, setCompleting] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchCourse = async () => {
    try {
      const { data } = await api.get(`/courses/${id}`);
      if (data.success) setCourse(data.course);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCourse(); }, [id]);

  const handleEnroll = async () => {
    if (!user) return;
    setEnrolling(true);
    try {
      const { data } = await api.post(`/courses/${id}/enroll`);
      setMessage({ type: 'success', text: data.message });
      fetchCourse();
    } catch (e) {
      setMessage({ type: 'error', text: e.response?.data?.message || 'Enrollment failed.' });
    } finally {
      setEnrolling(false);
    }
  };

  const handleComplete = async (moduleId) => {
    if (!user) return;
    setCompleting(moduleId);
    try {
      const { data } = await api.post('/progress/module-complete', { module_id: moduleId });
      if (!data.already_done) {
        setMessage({ type: 'success', text: data.message });
        if (data.course_completed) setMessage({ type: 'success', text: `🎉 Course Completed! +${data.bonus_xp} Bonus XP!` });
      }
      fetchCourse();
    } catch (e) {
      setMessage({ type: 'error', text: e.response?.data?.message || 'Error.' });
    } finally {
      setCompleting(null);
    }
  };

  // Auto-dismiss messages
  useEffect(() => {
    if (message) {
      const t = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(t);
    }
  }, [message]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-400 font-medium">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-32 space-y-4 page-enter">
        <div className="mx-auto w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center">
          <BookOpen className="w-10 h-10 text-gray-300" />
        </div>
        <h2 className="text-xl font-bold text-gray-700">Course not found</h2>
        <p className="text-sm text-gray-400">This course might have been removed or doesn't exist.</p>
        <Link to="/courses" className="btn-primary mt-4 inline-flex items-center gap-2 text-sm">
          <ChevronLeft size={15} /> Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-enter">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-800 text-white py-14 overflow-hidden">
        {/* Texture overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl translate-y-1/2" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/courses" className="inline-flex items-center gap-1 text-indigo-200 hover:text-white text-sm mb-8 transition-colors group">
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Courses
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-white/15 text-white px-3 py-1 rounded-full border border-white/20 uppercase tracking-wider">{course.category}</span>
                <span className="badge-free text-[10px]"><CheckCircle2 size={10} /> FREE</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">{course.title}</h1>
              <p className="text-indigo-100/80 text-base leading-relaxed">{course.description}</p>
              <div className="flex flex-wrap gap-6 text-sm text-indigo-200/80">
                <span className="flex items-center gap-1.5"><Clock size={15} />{course.duration}</span>
                <span className="flex items-center gap-1.5"><Layers size={15} />{course.total_modules} Modules</span>
                <span className="flex items-center gap-1.5"><Users size={15} />By {course.instructor}</span>
              </div>
            </div>

            {/* Enroll Card — glassmorphism */}
            <div className="bg-white/95 backdrop-blur-lg text-gray-900 rounded-2xl p-6 shadow-2xl shadow-black/10 border border-white/50 space-y-4">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full rounded-xl aspect-video object-cover"
                onError={(e) => { e.target.src = `https://placehold.co/400x225/6366f1/white?text=${encodeURIComponent(course.title)}`; }}
              />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-extrabold text-gradient">FREE</span>
                  <span className="text-xs font-bold text-gray-400 line-through">₹4,999</span>
                </div>
                {course.is_enrolled ? (
                  <div className="space-y-2.5">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${course.progress_percent}%` }} />
                    </div>
                    <p className="text-xs font-semibold text-indigo-600 text-center">
                      {course.progress_percent}% Complete — {course.completed_count}/{course.total_modules} modules
                    </p>
                  </div>
                ) : user ? (
                  <button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="btn-primary w-full text-sm py-3 flex items-center justify-center gap-2"
                  >
                    {enrolling ? (
                      <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Enrolling...</>
                    ) : (
                      <><Zap size={15} className="fill-yellow-300 text-yellow-300" /> Enroll for Free</>
                    )}
                  </button>
                ) : (
                  <Link to="/register" className="btn-primary w-full text-sm py-3 flex items-center justify-center gap-2">
                    <Zap size={15} /> Register to Enroll Free
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Toast message */}
        {message && (
          <div className={`mb-8 p-4 rounded-xl text-sm font-medium animate-fadeInUp flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.type === 'success' ? <CheckCircle2 size={16} /> : null}
            {message.text}
          </div>
        )}

        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
          <h2 className="text-xl font-bold text-gray-900">Course Curriculum</h2>
          <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
            {course.total_modules} modules
          </span>
        </div>

        {/* Timeline modules */}
        <div className="space-y-0 relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-4 bottom-4 w-px bg-gray-200" />

          {course.modules.map((mod, idx) => (
            <div
              key={mod.id}
              className={`relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ml-0 mb-2 ${
                mod.is_completed
                  ? 'bg-emerald-50/50 border-emerald-200/60'
                  : 'bg-white border-gray-100 hover:border-indigo-200 hover:shadow-sm'
              }`}
            >
              {/* Number circle */}
              <div className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-300 ${
                mod.is_completed
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-white border-2 border-gray-200 text-gray-500'
              }`}>
                {mod.is_completed ? <CheckCircle2 size={16} /> : idx + 1}
              </div>

              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm ${mod.is_completed ? 'text-emerald-800' : 'text-gray-800'}`}>
                  {mod.title}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">{mod.duration}</p>
              </div>

              {course.is_enrolled && !mod.is_completed && (
                <button
                  onClick={() => handleComplete(mod.id)}
                  disabled={completing === mod.id}
                  className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-lg border border-indigo-200 transition-all duration-200 active:scale-95 hover:shadow-sm"
                >
                  {completing === mod.id ? (
                    <div className="w-3 h-3 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <PlayCircle size={13} />
                  )}
                  Mark Done
                </button>
              )}
              {!course.is_enrolled && (
                <Lock size={14} className="text-gray-300 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
