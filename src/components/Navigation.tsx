import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from 'next-themes';
import {
  Menu, X, Sun, Moon,
  User, Briefcase, FolderOpen, GraduationCap, Mail,
  BookOpen, Archive, MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ── Portfolio sub-nav items ────────────────────────────────────────────────────
const portfolioItems = [
  { name: 'About Me',   path: '/portfolio/about',      icon: User },
  { name: 'Experience', path: '/portfolio/experience',  icon: Briefcase },
  { name: 'Projects',   path: '/portfolio/projects',    icon: FolderOpen },
  { name: 'Education',  path: '/portfolio/about#education',   icon: GraduationCap },
  { name: 'Contact',    path: '/portfolio/about#contact',     icon: Mail },
];

// ── Blog sub-nav items ─────────────────────────────────────────────────────────
const blogItems = [
  { name: 'Recent Blogs',  path: '/blog',           icon: BookOpen },
  { name: 'Archive',       path: '/blog/archive',   icon: Archive },
  { name: 'Feedback Form', path: '/blog/feedback',  icon: MessageSquare },
];

// ── Shared resume URL ─────────────────────────────────────────────────────────
const RESUME_URL =
  'https://drive.google.com/file/d/1_tN3lFRTE-CPvXKdJnqyi-5P2DcLxo4O/view?usp=sharing';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const path = location.pathname;

  // Determine current mode from URL
  const isPortfolio = path.startsWith('/portfolio') ||
    ['/experience', '/projects', '/skills', '/education', '/contact'].includes(path);
  const isBlog = path.startsWith('/blog');
  const isHome = !isPortfolio && !isBlog;

  const isDark = theme === 'dark';
  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  // Active check helper
  const isActive = (itemPath: string) =>
    path === itemPath || (itemPath !== '/blog' && path.startsWith(itemPath));

  // ── Shared theme toggle button ───────────────────────────────────────────
  const ThemeToggle = () => (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="p-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-card-hover transition-all duration-200"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );

  // ── Nav link shared styles ──────────────────────────────────────────────
  const navLinkClass = (active: boolean) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
      active
        ? 'bg-primary/10 text-primary border border-primary/20'
        : 'text-foreground-muted hover:text-foreground hover:bg-card-hover'
    }`;

  const modeButtonClass = (active: boolean) =>
    `px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
      active
        ? 'bg-gradient-to-r from-purple to-blue text-white shadow-md'
        : 'text-foreground-muted hover:text-foreground hover:bg-card-hover border border-border'
    }`;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="flex items-center h-16 gap-3">

            {/* ── PERMANENT LOGO ── */}
            <Link to="/" className="flex items-center gap-2 mr-auto md:mr-6 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple to-pink overflow-hidden flex-shrink-0">
                <img
                  src="/Linkedin PFP.jpg"
                  alt="Advait Joshi"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-semibold text-base hidden sm:block">Advait Joshi</span>
            </Link>

            {/* ── HOME STATE ─────────────────────────────────────────────── */}
            {isHome && (
              <>
                {/* Desktop: mode buttons + theme */}
                <div className="hidden md:flex items-center gap-2 ml-auto">
                  <Link to="/portfolio/about">
                    <button className={modeButtonClass(false)}>Portfolio</button>
                  </Link>
                  <Link to="/blog">
                    <button className={modeButtonClass(false)}>Blogs</button>
                  </Link>
                  <ThemeToggle />
                </div>

                {/* Mobile hamburger */}
                <Button variant="ghost" size="sm" className="md:hidden ml-auto" onClick={() => setIsOpen(!isOpen)}>
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </>
            )}

            {/* ── PORTFOLIO STATE ────────────────────────────────────────── */}
            {isPortfolio && (
              <>
                {/* Portfolio mode indicator + sub-nav */}
                <div className="hidden md:flex items-center gap-1 mr-auto overflow-x-auto">
                  <Link to="/portfolio/about">
                    <button className={modeButtonClass(true)}>Portfolio</button>
                  </Link>
                  <div className="w-px h-5 bg-border mx-1" />
                  {portfolioItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.path} to={item.path} className={navLinkClass(isActive(item.path))}>
                        <Icon className="w-3.5 h-3.5" />
                        <span className="whitespace-nowrap">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* Right: Blogs switch + theme */}
                <div className="hidden md:flex items-center gap-2 ml-2 flex-shrink-0">
                  <Link to="/blog">
                    <button className={modeButtonClass(false)}>Blogs</button>
                  </Link>
                  <ThemeToggle />
                </div>

                {/* Mobile hamburger */}
                <Button variant="ghost" size="sm" className="md:hidden ml-auto" onClick={() => setIsOpen(!isOpen)}>
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </>
            )}

            {/* ── BLOG STATE ─────────────────────────────────────────────── */}
            {isBlog && (
              <>
                {/* Blog mode indicator + sub-nav */}
                <div className="hidden md:flex items-center gap-1 mr-auto overflow-x-auto">
                  <Link to="/blog">
                    <button className={modeButtonClass(true)}>Blogs</button>
                  </Link>
                  <div className="w-px h-5 bg-border mx-1" />
                  {blogItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.path} to={item.path} className={navLinkClass(isActive(item.path))}>
                        <Icon className="w-3.5 h-3.5" />
                        <span className="whitespace-nowrap">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* Right: Portfolio switch + theme */}
                <div className="hidden md:flex items-center gap-2 ml-2 flex-shrink-0">
                  <Link to="/portfolio/about">
                    <button className={modeButtonClass(false)}>Portfolio</button>
                  </Link>
                  <ThemeToggle />
                </div>

                {/* Mobile hamburger */}
                <Button variant="ghost" size="sm" className="md:hidden ml-auto" onClick={() => setIsOpen(!isOpen)}>
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* ── Mobile Dropdown Menu ──────────────────────────────────────────── */}
        {isOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border">
            <div className="px-4 py-4 space-y-1">
              {/* Mode switcher row */}
              <div className="flex gap-2 pb-3 border-b border-border mb-3">
                <Link to="/portfolio/about" onClick={() => setIsOpen(false)} className="flex-1">
                  <button className={`w-full ${modeButtonClass(isPortfolio)}`}>Portfolio</button>
                </Link>
                <Link to="/blog" onClick={() => setIsOpen(false)} className="flex-1">
                  <button className={`w-full ${modeButtonClass(isBlog)}`}>Blogs</button>
                </Link>
                <button
                  onClick={() => { toggleTheme(); }}
                  className="p-2 rounded-lg border border-border hover:bg-card-hover transition-all"
                  aria-label="Toggle theme"
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>

              {/* Contextual sub-nav items */}
              {isPortfolio && portfolioItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'text-foreground-muted hover:text-foreground hover:bg-card-hover'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {isBlog && blogItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'text-foreground-muted hover:text-foreground hover:bg-card-hover'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {isHome && (
                <div className="text-sm text-foreground-muted text-center pt-2">
                  Choose a mode above to get started
                </div>
              )}

              {/* Resume link in mobile */}
              <div className="pt-3 border-t border-border mt-3">
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-sm text-foreground-muted hover:text-foreground underline-offset-4 hover:underline transition-all py-2"
                >
                  My Resume ↗
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}