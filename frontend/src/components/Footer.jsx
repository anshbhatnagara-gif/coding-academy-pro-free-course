import { Link } from 'react-router-dom';
import { BookOpen, Heart } from 'lucide-react';

const Footer = () => (
  <footer className="bg-white border-t border-gray-100 mt-auto relative overflow-hidden">
    {/* Gradient top accent */}
    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Brand */}
        <div className="space-y-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
              <BookOpen size={16} className="text-white" />
            </div>
            <span className="font-bold text-gray-900">Code<span className="text-gradient">Nest</span></span>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            A free coding learning platform built for students who want to learn programming without any financial barriers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Quick Links</h4>
          <div className="space-y-2.5">
            {[
              { to: '/', label: 'Home' },
              { to: '/courses', label: 'All Courses' },
              { to: '/register', label: 'Create Free Account' },
            ].map(link => (
              <Link key={link.to} to={link.to} className="block text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-200">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Legal</h4>
          <div className="space-y-2.5">
            <Link to="/privacy-policy" className="block text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-200">
              Privacy Policy
            </Link>
            <p className="text-sm text-gray-400">All courses are 100% free.</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} CodeNest Free Academy. All rights reserved.
        </p>
        <p className="text-xs text-gray-400 flex items-center gap-1">
          Made with <Heart size={11} className="text-red-400 fill-red-400" /> by CodeNest Team
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
