import { Link } from 'react-router-dom';
import { Clock, Users, ArrowRight, CheckCircle2, Star, Layers } from 'lucide-react';

const difficultyColor = {
  Beginner: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Intermediate: 'bg-blue-50 text-blue-700 border-blue-200',
  Advanced: 'bg-purple-50 text-purple-700 border-purple-200',
};

const CourseCard = ({ course }) => {
  const progress = course.progress_percent || 0;
  const isEnrolled = course.is_enrolled;

  return (
    <Link
      to={`/courses/${course.id}`}
      className="card flex flex-col overflow-hidden group cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            e.target.src = `https://placehold.co/600x340/6366f1/white?text=${encodeURIComponent(course.title)}`;
          }}
        />
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 left-3">
          <span className="badge-free">
            <CheckCircle2 size={10} />
            FREE
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-sm ${difficultyColor[course.difficulty] || difficultyColor.Beginner}`}>
            {course.difficulty}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{course.category}</span>

        <h3 className="text-[15px] font-bold text-gray-900 mt-1.5 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200 leading-snug">
          {course.title}
        </h3>

        <p className="text-[13px] text-gray-500 line-clamp-2 flex-1 mb-4 leading-relaxed">
          {course.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-4">
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {course.duration}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="flex items-center gap-1">
            <Layers size={11} />
            {course.total_modules || 0} modules
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="flex items-center gap-1">
            <Users size={11} />
            {course.total_enrolled || 0}
          </span>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0">
            {course.instructor?.charAt(0)}
          </div>
          <span className="font-medium text-gray-600">{course.instructor}</span>
        </div>

        {/* Progress (if enrolled) */}
        {isEnrolled && (
          <div className="mb-4">
            <div className="flex justify-between text-[11px] mb-1.5">
              <span className="text-gray-500">Progress</span>
              <span className="font-bold text-indigo-600">{progress}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* Button */}
        <div
          className="flex items-center justify-center gap-2 w-full btn-primary text-sm py-2.5 mt-auto"
        >
          {isEnrolled ? (progress === 100 ? '🎉 Completed' : 'Continue Learning') : 'Start Learning'}
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
