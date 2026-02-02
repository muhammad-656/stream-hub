import React, { useState } from 'react';

const PremiumNavbar = ({ currentPage, setCurrentPage, myListCount, isDarkMode, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', id: 'home', icon: '🏠' },
    { name: 'Trending', id: 'trending', icon: '🔥' },
    { name: 'Categories', id: 'categories', icon: '🎬' },
    { name: 'My List', id: 'mylist', badge: myListCount, icon: '❤️' },
    { name: 'Watch History', id: 'watchHistory', icon: '📺' },
    { name: 'Contact', id: 'contact', icon: '📧' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-800/50 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-600 blur-xl opacity-50"></div>
              <h1 className="relative text-3xl font-black text-white tracking-tight">
                Stream<span className="text-primary-500">Hub</span>
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  currentPage === item.id
                    ? 'text-white bg-primary-600/20 border border-primary-500/30'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.name}</span>
                </span>
                
                {/* Badge for My List */}
                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-neutral-950">
                    {item.badge}
                  </span>
                )}

                {/* Hover underline */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 transform transition-transform duration-300 ${
                  currentPage === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></div>
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="group p-3 rounded-xl bg-neutral-800/50 hover:bg-neutral-700/50 transition-all duration-300 border border-neutral-700/30 hover:border-neutral-600/50"
              title="Toggle theme"
            >
              <div className="relative w-5 h-5">
                {isDarkMode ? (
                  <svg className="absolute inset-0 w-5 h-5 text-yellow-400 transition-transform duration-300 group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="absolute inset-0 w-5 h-5 text-neutral-300 transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </div>
            </button>

            {/* User Profile */}
            <div className="relative group">
              <button className="flex items-center space-x-3 p-2 pr-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary-500/25">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">U</span>
                </div>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-xl bg-neutral-800/50 hover:bg-neutral-700/50 transition-all duration-300 border border-neutral-700/30"
            >
              <div className="w-6 h-5 relative flex flex-col justify-center">
                <span className={`absolute h-0.5 w-6 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                }`}></span>
                <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`absolute h-0.5 w-6 bg-white transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                }`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden transition-all duration-300 ${
        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="bg-neutral-950/95 backdrop-blur-xl border-t border-neutral-800/50">
          <div className="px-6 py-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-4 rounded-xl font-medium transition-all duration-300 ${
                  currentPage === item.id
                    ? 'text-white bg-primary-600/20 border border-primary-500/30'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
                }`}
              >
                <span className="flex items-center space-x-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-base font-medium">{item.name}</span>
                </span>
                
                {item.badge > 0 && (
                  <span className="bg-primary-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PremiumNavbar;
