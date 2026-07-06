import { useState } from 'react';
import CountryCard from '../components/CountryCard';
import CountryModal from '../components/CountryModal';
import { useSessionStorage } from '../hooks/useSessionStorage';

export default function Favorites({ copy, favorites, onFavoriteToggle }) {
  const [sessionNote, setSessionNote] = useSessionStorage('atlas-notes-session-note', '');
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <main className="section">
      <div className="page-heading">
        <span className="eyebrow">LocalStorage</span>
        <h1>{copy.favoritesTitle}</h1>
        <p>{copy.favoritesText}</p>
      </div>

      {favorites.length === 0 ? (
        <p className="status-message">{copy.noFavorites}</p>
      ) : (
        <div className="country-grid">
          {favorites.map((country) => (
            <CountryCard
              key={country.id}
              country={country}
              copy={copy}
              isFavorite
              onFavoriteToggle={onFavoriteToggle}
              onOpenDetails={setSelectedCountry}
            />
          ))}
        </div>
      )}

      <section className="note-card">
        <div>
          <span className="eyebrow">SessionStorage</span>
          <h2>{copy.sessionTitle}</h2>
          <p>{copy.sessionText}</p>
        </div>
        <textarea
          value={sessionNote}
          placeholder={copy.notePlaceholder}
          onChange={(event) => setSessionNote(event.target.value)}
        />
        <button className="secondary-button" type="button" onClick={() => setSessionNote('')}>
          {copy.clearNote}
        </button>
      </section>

      <CountryModal country={selectedCountry} copy={copy} onClose={() => setSelectedCountry(null)} />
    </main>
  );
}
