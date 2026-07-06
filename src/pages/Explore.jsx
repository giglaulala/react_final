import { useMemo, useState } from 'react';
import CountryCard from '../components/CountryCard';
import CountryModal from '../components/CountryModal';

export default function Explore({
  copy,
  countries,
  status,
  favoriteIds,
  onFavoriteToggle,
}) {
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const filteredCountries = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return countries;
    }

    return countries.filter((country) => {
      return [country.name, country.capital, country.region, country.subregion]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedSearch));
    });
  }, [countries, search]);

  return (
    <main className="section">
      <div className="page-heading">
        <span className="eyebrow">REST Countries API</span>
        <h1>{copy.exploreTitle}</h1>
        <p>{copy.exploreText}</p>
      </div>

      <label className="search-box">
        <span className="sr-only">{copy.searchPlaceholder}</span>
        <input
          type="search"
          value={search}
          placeholder={copy.searchPlaceholder}
          onChange={(event) => setSearch(event.target.value)}
        />
      </label>

      {status === 'loading' && <p className="status-message">{copy.loading}</p>}
      {status === 'error' && <p className="status-message status-message--error">{copy.error}</p>}

      {status === 'success' && filteredCountries.length === 0 && (
        <p className="status-message">{copy.emptyResults}</p>
      )}

      <div className="country-grid">
        {filteredCountries.map((country) => (
          <CountryCard
            key={country.id}
            country={country}
            copy={copy}
            isFavorite={favoriteIds.includes(country.id)}
            onFavoriteToggle={onFavoriteToggle}
            onOpenDetails={setSelectedCountry}
          />
        ))}
      </div>

      <CountryModal country={selectedCountry} copy={copy} onClose={() => setSelectedCountry(null)} />
    </main>
  );
}
