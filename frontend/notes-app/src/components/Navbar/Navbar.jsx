import React, { useCallback, useEffect, useState } from 'react'
import ProfileInfo from '../cards/ProfileInfo'
import { useNavigate, useLocation } from "react-router-dom"
import SearchBar from '../SearchBar/SearchBar'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi'

const Navbar = ({ userInfo, onSearchNote, handleClearSearch, isSearching = false }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu on route change for smoother UX
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Subtle shadow when scrolling
  useEffect(() => {
    const onScroll = () => {
      setHasScrolled(window.scrollY > 4);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onLogout = useCallback(() => {
    localStorage.clear();
    navigate("/login");
  }, [navigate]);

  const handleSearch = useCallback(() => {
    if (isSearching) return;
    if (searchQuery.trim()) {
      onSearchNote(searchQuery.trim());
      setIsMobileMenuOpen(false);
    }
  }, [onSearchNote, searchQuery, isSearching]);

  const onClearSearch = useCallback(() => {
    setSearchQuery("");
    handleClearSearch();
  }, [handleClearSearch]);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <nav
      className={`sticky top-0 z-[1000] backdrop-blur-xl transition-all duration-300 animate-slideDown ${
        hasScrolled
          ? 'bg-gradient-to-b from-white/95 via-white/95 to-white/90 dark:from-slate-950/95 dark:via-slate-950/95 dark:to-slate-950/90 shadow-[0_10px_30px_rgba(15,23,42,0.14)]'
          : 'bg-gradient-to-b from-white/98 via-white/95 to-white/92 dark:from-slate-950/90 dark:via-slate-950/88 dark:to-slate-950/86 shadow-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div
          className={`relative flex items-center justify-between gap-3 sm:gap-4 lg:gap-6 rounded-2xl border px-3 sm:px-4 lg:px-5 h-14 sm:h-16 bg-white dark:bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,0.10)] dark:shadow-[0_18px_40px_rgba(15,23,42,0.75)] ${
            hasScrolled
              ? 'border-slate-200 dark:border-slate-800'
              : 'border-slate-100 dark:border-slate-800/80'
          }`}
        >
          {/* Logo / Brand */}
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-xl px-1 -mx-1 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-gradient-to-br from-primary via-blue-500 to-sky-400 flex items-center justify-center text-white font-semibold text-sm shadow-[0_0_0_1px_rgba(59,130,246,0.55)] group-hover:shadow-[0_0_22px_rgba(37,99,235,0.85)] group-active:scale-95 transition-all">
              N
            </div>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[13px] sm:text-sm font-semibold text-gray-900 dark:text-white tracking-tight">
                NotesApp
              </span>
              <span className="text-[11px] text-gray-500 dark:text-gray-400 hidden sm:inline">
                Calm workspace for everything you need to remember.
              </span>
            </div>
          </button>

          {/* Desktop / tablet search + actions */}
          {!isAuthPage && (
            <div className="flex-1 flex items-center justify-end md:justify-between gap-4 lg:gap-6 min-w-0">
              {/* Search (tablet and up) */}
              <div className="hidden md:flex md:flex-1 md:min-w-[260px] lg:min-w-[320px] max-w-2xl md:mx-4 lg:mx-8 transition-[margin,width] duration-200 ease-out">
                <SearchBar
                  value={searchQuery}
                  onChange={({ target }) => setSearchQuery(target.value)}
                  handleSearch={handleSearch}
                  onClearSearch={onClearSearch}
                  isSearching={isSearching}
                />
              </div>

              {/* Desktop actions */}
              <div className="hidden md:flex items-center gap-3 flex-shrink-0">
                <ThemeToggle />
                <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
              </div>
            </div>
          )}

          {/* Right side: always-visible theme toggle + mobile menu */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            {/* Auth pages: compact shell with theme toggle only */}
            {isAuthPage && (
              <div className="flex items-center">
                <ThemeToggle />
              </div>
            )}

            {/* Main app: show a standalone theme toggle on mobile-only, desktop gets the one near profile */}
            {!isAuthPage && (
              <div className="flex md:hidden items-center">
                <ThemeToggle />
              </div>
            )}

            {/* Mobile menu toggle (only when not on auth pages) */}
            {!isAuthPage && (
              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="md:hidden p-2 rounded-xl bg-transparent hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                aria-label="Toggle navigation menu"
              >
                <span className="sr-only">Toggle navigation</span>
                {isMobileMenuOpen ? (
                  <FiX className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <FiMenu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Mobile / small-screen menu */}
        {!isAuthPage && (
          <div
            className={`md:hidden w-full origin-top transition-[opacity,transform,max-height] duration-200 ease-out overflow-hidden ${
              isMobileMenuOpen
                ? 'opacity-100 scale-y-100 max-h-[420px]'
                : 'opacity-0 scale-y-95 max-h-0 pointer-events-none'
            }`}
          >
            <div className="mt-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-900/95 shadow-[0_12px_32px_rgba(15,23,42,0.12)] dark:shadow-[0_20px_48px_rgba(15,23,42,0.85)] py-4 px-3 sm:px-4 space-y-4">
              {/* Mobile Search */}
              <div className="pt-1">
                <SearchBar
                  value={searchQuery}
                  onChange={({ target }) => setSearchQuery(target.value)}
                  handleSearch={handleSearch}
                  onClearSearch={onClearSearch}
                  isSearching={isSearching}
                />
              </div>

              {/* Mobile Actions */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
                  <ThemeToggle />
                </div>

                <button
                  type="button"
                  onClick={onLogout}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium h-11 px-4 shadow-sm hover:bg-red-100 dark:hover:bg-red-900/30 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-red-500/60"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default React.memo(Navbar)
