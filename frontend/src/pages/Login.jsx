import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, Eye, EyeOff, BookOpen, ArrowRight } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(form.email, form.password);
      if (data.success) {
        navigate(data.user?.role === 'owner' ? '/owner-dashboard' : '/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-horror flex items-center justify-center px-4 py-12 relative overflow-hidden page-enter">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/80 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 justify-center group">
            <div className="w-11 h-11 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/10 shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.8)] transition-all duration-300">
              <BookOpen size={22} className="text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
            </div>
            <span className="text-xl font-bold text-white">Code<span className="text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]">Nest</span></span>
          </Link>
          <h1 className="text-2xl font-extrabold text-white mt-6 drop-shadow-lg">Welcome back!</h1>
          <p className="text-slate-300 text-sm mt-1.5 drop-shadow-md">Sign in to continue your learning journey</p>
        </div>

        <div className="card-static p-8 space-y-6 shadow-xl shadow-gray-900/5 border border-gray-100">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 animate-fadeIn">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handle}
                  required
                  placeholder="you@example.com"
                  className="input pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handle}
                  required
                  placeholder="Enter your password"
                  className="input pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Signing in...</>
              ) : (
                <><LogIn size={16} /> Sign In</>
              )}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-gray-400 font-medium">or</span>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
              Create Free Account <ArrowRight size={12} className="inline" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
