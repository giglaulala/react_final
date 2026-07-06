import { useEffect, useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { getCopy } from './data/i18n';
import { useCountries } from './hooks/useCountries';
import { useLocalStorage } from './hooks/useLocalStorage';
import About from './pages/About';
import Explore from './pages/Explore';
import Favorites from './pages/Favorites';
import Home from './pages/Home';

export default function App() {
  const [theme, setTheme] = useLocalStorage('atlas-notes-theme', 'light');
  const [language, setLanguage] = useLocalStorage('atlas-notes-language', 'ka');
  const [favoriteIds, setFavoriteIds] = useLocalStorage('atlas-notes-favorites', []);
  const { countries, status } = useCountries();
  const copy = getCopy(language);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = language === 'ka' ? 'ka' : 'en';
  }, [language, theme]);

  const favorites = useMemo(() => {
    return countries.filter((country) => favoriteIds.includes(country.id));
  }, [countries, favoriteIds]);

  function handleFavoriteToggle(country) {
    setFavoriteIds((currentIds) => {
      if (currentIds.includes(country.id)) {
        return currentIds.filter((id) => id !== country.id);
      }

      return [...currentIds, country.id];
    });
  }

  function handleThemeChange() {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  }

  function handleLanguageChange() {
    setLanguage((currentLanguage) => (currentLanguage === 'ka' ? 'en' : 'ka'));
  }

  return (
    <div className="app-shell">
      <Header
        copy={copy}
        language={language}
        onLanguageChange={handleLanguageChange}
        theme={theme}
        onThemeChange={handleThemeChange}
      />

      <Routes>
        <Route path="/" element={<Home copy={copy} />} />
        <Route
          path="/explore"
          element={
            <Explore
              copy={copy}
              countries={countries}
              status={status}
              favoriteIds={favoriteIds}
              onFavoriteToggle={handleFavoriteToggle}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites copy={copy} favorites={favorites} onFavoriteToggle={handleFavoriteToggle} />
          }
        />
        <Route path="/about" element={<About copy={copy} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer copy={copy} />
    </div>
  );
}
