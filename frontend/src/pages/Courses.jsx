import { useEffect, useState } from 'react';
import { Search, Filter, BookMarked, X } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import api from '../context/AuthContext';

const categories = ['All', 'Web Development', 'Frontend', 'Backend', 'Database', 'Programming', 'Tools', 'Computer Science'];

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await api.get('/courses');
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
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || c.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 page-enter relative z-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-semibold mb-3 border border-indigo-100 shadow-sm">
          <BookMarked size={13} />
          {courses.length} Free Courses Available
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Browse <span className="text-gradient">Courses</span></h1>
        <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm">
          Learn programming from scratch. Every course is 100% free, forever. No credit card required.
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search for courses, skills, or keywords..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input pl-11 shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          <Filter size={16} className="text-gray-400 flex-shrink-0 mx-2" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2.5 text-xs font-semibold rounded-xl border whitespace-nowrap transition-all duration-200 ${
                category === cat
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="card overflow-hidden animate-pulse">
              <div className="aspect-video bg-gray-100" />
              <div className="p-5 space-y-3">
                <div className="h-3 bg-gray-200 rounded-full w-1/3" />
                <div className="h-4 bg-gray-200 rounded-full" />
                <div className="h-3 bg-gray-200 rounded-full w-2/3" />
                <div className="h-9 bg-gray-200 rounded-xl mt-4" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card-static text-center py-20 px-4">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookMarked className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">No courses found</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
            We couldn't find any courses matching "{search}" in the {category} category.
          </p>
          <button
            onClick={() => { setSearch(''); setCategory('All'); }}
            className="btn-secondary inline-flex items-center gap-2"
          >
            <X size={14} /> Clear Filters
          </button>
        </div>
      ) : (
        <>
          <p className="text-xs text-gray-400 mb-5 font-medium">
            Showing <span className="font-bold text-gray-600">{filtered.length}</span> course{filtered.length !== 1 ? 's' : ''}
            {category !== 'All' && <> in <span className="text-indigo-600 font-bold">{category}</span></>}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Courses;
