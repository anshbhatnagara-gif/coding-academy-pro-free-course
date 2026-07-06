import React from 'react';
import { ShieldCheck, Lock, Database, Cookie, Eye } from 'lucide-react';

const sections = [
  {
    icon: <Eye size={20} />,
    title: 'Information We Collect',
    content: 'At CodeNest Free Academy, we collect standard user information required for account registration and course progress tracking:',
    items: [
      { bold: 'Personal Information:', text: 'Name, email address, phone number (optional), and encrypted password credentials.' },
      { bold: 'Academic & Progress Logs:', text: 'Enrolled courses, completed modules, total XP points earned, and levels.' },
      { bold: 'Usage Logs:', text: 'Login and activity timestamps to determine active or regularity statuses.' },
    ],
  },
  {
    icon: <Database size={20} />,
    title: 'How We Use Your Information',
    content: 'We use your collected information strictly for academic and operational tracking, including:',
    items: [
      { text: 'Providing progress tracking metrics on your Student Dashboard.' },
      { text: 'Tracking regular or inactive learning status for educational administration.' },
      { text: 'Generating system logs for profile status updates.' },
    ],
  },
  {
    icon: <Lock size={20} />,
    title: 'Data Security & Storage',
    content: 'Your passwords are secure with industry-standard bcrypt hashing, and your API access is protected using JWT authentication. We do not sell or share user data with third parties.',
    items: [],
  },
  {
    icon: <Cookie size={20} />,
    title: 'Cookies & Local Storage',
    content: 'We use browser Local Storage to securely persist authorization tokens so that you do not have to log in repeatedly. No third-party tracking cookies are used.',
    items: [],
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen page-enter">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center border border-white/20 shadow-lg">
            <ShieldCheck size={32} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
          <p className="text-indigo-200/80">Your privacy is important to us. Here's how we handle your data.</p>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-1.5 rounded-full text-xs font-medium border border-white/20">
            📅 Last updated: July 6, 2026
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-4xl mx-auto px-4 py-14 space-y-6">
        {sections.map((section, idx) => (
          <div key={idx} className="card-static p-6 md:p-8 space-y-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-sm flex-shrink-0">
                {section.icon}
              </div>
              <h2 className="text-lg font-bold text-gray-900">{idx + 1}. {section.title}</h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed pl-[52px]">{section.content}</p>
            {section.items.length > 0 && (
              <ul className="space-y-2.5 pl-[52px]">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                    <span>
                      {item.bold && <strong className="text-gray-800">{item.bold} </strong>}
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Contact Info */}
        <div className="card-static p-6 md:p-8 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-sm flex-shrink-0">
              <ShieldCheck size={20} />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Contact Us</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed pl-[52px]">
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:anshbhatnagara@gmail.com" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
              anshbhatnagara@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
