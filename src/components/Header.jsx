import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Header({ copy, language, onLanguageChange, theme, onThemeChange }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { path: '/', label: copy.navHome },
    { path: '/explore', label: copy.navExplore },
    { path: '/favorites', label: copy.navFavorites },
    { path: '/about', label: copy.navAbout },
  ];

  return (
    <header className="site-header">
      <NavLink to="/" className="brand" aria-label={copy.appName}>
        <span className="brand__mark" aria-hidden="true">
          <svg className="brand__globe" viewBox="0 0 24 24" role="img">
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18" />
            <path d="M12 3c2.4 2.5 3.6 5.5 3.6 9s-1.2 6.5-3.6 9" />
            <path d="M12 3c-2.4 2.5-3.6 5.5-3.6 9s1.2 6.5 3.6 9" />
          </svg>
        </span>
        <span className="brand__text">
          <span>{copy.appName}</span>
        </span>
      </NavLink>

      <button
        className="menu-toggle"
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
      >
        {isMenuOpen ? (
          <svg className="menu-toggle__icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12" />
            <path d="M18 6L6 18" />
          </svg>
        ) : (
          <svg className="menu-toggle__icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 7h16" />
            <path d="M4 12h16" />
            <path d="M4 17h16" />
          </svg>
        )}
      </button>

      <div className={`mobile-menu ${isMenuOpen ? 'is-open' : ''}`}>
        <nav className="site-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) => (isActive ? 'site-nav__link active' : 'site-nav__link')}
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <button className="pill-button pill-button--theme" type="button" onClick={onThemeChange}>
            {theme === 'dark' ? copy.themeLight : copy.themeDark}
          </button>
          <button className="pill-button pill-button--language" type="button" onClick={onLanguageChange}>
            {copy.languageLabel}: {language === 'ka' ? 'KA' : 'EN'}
          </button>
        </div>
      </div>
    </header>
  );
}
