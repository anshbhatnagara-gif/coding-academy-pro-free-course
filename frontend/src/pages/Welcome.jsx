import { Link } from 'react-router-dom';
import { BookOpen, LogIn } from 'lucide-react';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-horror flex items-center justify-center px-4 relative overflow-hidden page-enter">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/80 pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-lg text-center space-y-10">
        {/* Logo */}
        <div className="inline-flex items-center justify-center gap-3 group">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/10 shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)]">
            <BookOpen size={28} className="text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
          </div>
          <span className="text-3xl font-extrabold text-white tracking-tight">
            Code<span className="text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]">Nest</span>
          </span>
        </div>

        {/* Hero Text */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight drop-shadow-2xl">
            Dare to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Code?</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-sm mx-auto leading-relaxed drop-shadow-lg">
            Enter the academy of shadows. Master the dark arts of programming completely free.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/login"
            className="w-full sm:w-auto bg-indigo-600/90 hover:bg-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] hover:shadow-[0_0_40px_0_rgba(99,102,241,0.8)] border border-indigo-400/30"
          >
            <LogIn size={18} />
            Enter Academy
          </Link>
          <Link
            to="/register"
            className="w-full sm:w-auto bg-slate-900/50 hover:bg-slate-800/80 backdrop-blur-md text-slate-200 font-bold px-8 py-3.5 rounded-xl transition-all duration-300 border border-slate-700/50 hover:border-slate-500/50"
          >
            Create Free Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
