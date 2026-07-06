import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, Award, Zap, CheckCircle2, Code2, Sparkles } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import api from '../context/AuthContext';

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get('/courses');
        if (data.success) setFeaturedCourses(data.courses.slice(0, 6));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen page-enter">
      {/* ═══════════════════ HERO SECTION ═══════════════════ */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white overflow-hidden">
        {/* Decorative floating shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-[10%] w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-[10%] w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl" />
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto space-y-7">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-sm font-medium border border-white/20 shadow-lg">
              <Sparkles size={14} className="text-yellow-300" />
              100% Free — No Credit Card Required
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Learn Coding for
              <span className="block mt-2 bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-300 bg-clip-text text-transparent">
                Absolutely Free
              </span>
            </h1>

            <p className="text-lg md:text-xl text-indigo-100/90 max-w-2xl mx-auto leading-relaxed">
              Master programming with structured courses, track your progress, and build real skills. 
              All courses are 100% free forever.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link to="/courses" className="flex items-center gap-2 bg-white text-indigo-700 font-bold px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-white/20 active:scale-[0.97] text-sm group">
                Browse Free Courses
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link to="/register" className="flex items-center gap-2 glass text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/15 transition-all duration-300 text-sm">
                Create Free Account
              </Link>
            </div>

            {/* Hero Stats — glassmorphism cards */}
            <div className="flex flex-wrap justify-center gap-4 pt-8">
              {[
                { value: '10+', label: 'Free Courses', icon: <BookOpen size={16} /> },
                { value: '80+', label: 'Video Modules', icon: <Code2 size={16} /> },
                { value: '100%', label: 'Free Forever', icon: <CheckCircle2 size={16} /> },
                { value: '0₹', label: 'Zero Cost', icon: <Zap size={16} /> },
              ].map((s) => (
                <div key={s.label} className="glass px-5 py-3.5 text-center min-w-[120px] hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-white/60">{s.icon}</span>
                    <p className="text-2xl font-extrabold">{s.value}</p>
                  </div>
                  <p className="text-[11px] text-indigo-200/80 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ WHY CODENEST ═══════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2">Why CodeNest?</p>
            <h2 className="section-heading">Everything You Need to Learn Coding</h2>
            <p className="section-sub mx-auto">Built for beginners who want to learn coding without any financial barrier.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <BookOpen className="w-6 h-6" />, title: 'Structured Learning', desc: 'Courses designed from basics to advanced in the right order.', gradient: 'from-indigo-500 to-blue-500' },
              { icon: <CheckCircle2 className="w-6 h-6" />, title: 'Track Progress', desc: 'Mark modules complete and see your progress grow over time.', gradient: 'from-emerald-500 to-teal-500' },
              { icon: <Zap className="w-6 h-6" />, title: 'Earn XP & Levels', desc: 'Gain experience points and level up as you learn more.', gradient: 'from-amber-500 to-orange-500' },
              { icon: <Award className="w-6 h-6" />, title: 'Completely Free', desc: 'No hidden fees, no subscriptions. 100% free forever.', gradient: 'from-purple-500 to-pink-500' },
            ].map((f) => (
              <div key={f.title} className="card p-6 text-center space-y-4 group">
                <div className={`mx-auto w-14 h-14 bg-gradient-to-br ${f.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-[15px]">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURED COURSES ═══════════════════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2">Start Learning</p>
              <h2 className="section-heading">Free Courses</h2>
              <p className="section-sub">Start learning today — completely free</p>
            </div>
            <Link to="/courses" className="hidden sm:flex items-center gap-1.5 text-indigo-600 font-semibold text-sm hover:text-indigo-700 transition-colors group">
              View All <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="card-static overflow-hidden animate-pulse">
                  <div className="aspect-video bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-2 bg-gray-200 rounded w-1/4" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                    <div className="h-9 bg-gray-200 rounded-xl mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}

          <div className="sm:hidden text-center mt-8">
            <Link to="/courses" className="btn-primary inline-flex items-center gap-2 text-sm">
              View All Courses <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA BANNER ═══════════════════ */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 py-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center px-4 space-y-5">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Ready to Start Learning?</h2>
          <p className="text-indigo-100/90 text-lg">Join thousands of students learning to code for free. No credit card needed.</p>
          <Link to="/register" className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 shadow-lg hover:shadow-xl active:scale-[0.97] transition-all duration-300 text-sm group">
            Start Learning Free <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
