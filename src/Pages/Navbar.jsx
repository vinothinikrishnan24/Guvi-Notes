import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ onCreateNew }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinkClasses = (path) =>
    `font-nav-button px-3 py-2 sm:px-4 sm:py-2 rounded-lg ${
      location.pathname === path ? 'bg-primary' : 'bg-secondary'
    } hover:bg-primary-hover transition-colors duration-300`;

  return (
    <nav className="bg-dark text-light p-4 shadow-md sticky top-0 z-10 w-full">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/Image/notes app.png"
            alt="Notes Icon"
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
          <span className="font-title">Notes App</span>
        </Link>

        {/* Mobile Toggle */}
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="font-button flex items-center justify-center p-2 rounded-lg bg-secondary hover:bg-secondary-hover transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <img
              src={isMenuOpen ? '/Image/close.png' : '/Image/hamberger.png'}
              alt={isMenuOpen ? 'Close Menu Icon' : 'Menu Icon'}
              className="w-5 h-5"
            />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex flex-wrap gap-2 sm:gap-4">
          <Link to="/" className={navLinkClasses('/')}>Home</Link>
          <Link to="/create" onClick={onCreateNew} className={navLinkClasses('/create')}>
            Create
          </Link>
          <Link to="/archive" className={navLinkClasses('/archive')}>Archive</Link>
          <Link to="/trash" className={navLinkClasses('/trash')}>Trash</Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden mt-4 flex flex-col gap-2 w-full px-2">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className={navLinkClasses('/')}>
            Home
          </Link>
          <Link
            to="/create"
            onClick={() => {
              onCreateNew?.();
              setIsMenuOpen(false);
            }}
            className={navLinkClasses('/create')}
          >
            Create
          </Link>
          <Link
            to="/archive"
            onClick={() => setIsMenuOpen(false)}
            className={navLinkClasses('/archive')}
          >
            Archive
          </Link>
          <Link
            to="/trash"
            onClick={() => setIsMenuOpen(false)}
            className={navLinkClasses('/trash')}
          >
            Trash
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;