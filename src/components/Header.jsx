import { NavLink } from 'react-router-dom';

export default function Header({ copy, language, onLanguageChange, theme, onThemeChange }) {
  const navItems = [
    { path: '/', label: copy.navHome },
    { path: '/explore', label: copy.navExplore },
    { path: '/favorites', label: copy.navFavorites },
    { path: '/about', label: copy.navAbout },
  ];

  return (
    <header className="site-header">
      <NavLink to="/" className="brand" aria-label={copy.appName}>
        <span className="brand__mark">A</span>
        <span>{copy.appName}</span>
      </NavLink>

      <nav className="site-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            className={({ isActive }) => (isActive ? 'site-nav__link active' : 'site-nav__link')}
            key={item.path}
            to={item.path}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="header-actions">
        <button className="pill-button" type="button" onClick={onThemeChange}>
          {theme === 'dark' ? copy.themeLight : copy.themeDark}
        </button>
        <button className="pill-button" type="button" onClick={onLanguageChange}>
          {copy.languageLabel}: {language === 'ka' ? 'KA' : 'EN'}
        </button>
      </div>
    </header>
  );
}
