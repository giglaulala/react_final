import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function CountryModal({ country, copy, onClose }) {
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!country) {
    return null;
  }

  const formattedPopulation = new Intl.NumberFormat().format(country.population);

  return createPortal(
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section
        className="country-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="country-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label={copy.close}>
          x
        </button>
        <img className="country-modal__flag" src={country.flag} alt={country.flagAlt} />
        <h2 id="country-modal-title">{country.name}</h2>
        <p>{country.officialName}</p>

        <div className="modal-grid">
          <span>{copy.capital}</span>
          <strong>{country.capital}</strong>
          <span>{copy.region}</span>
          <strong>{country.subregion ?? country.region}</strong>
          <span>{copy.population}</span>
          <strong>{formattedPopulation}</strong>
        </div>

        {country.languages.length > 0 && <p>{country.languages.join(', ')}</p>}
        <a className="text-link" href={country.mapUrl} target="_blank" rel="noreferrer">
          Google Maps
        </a>
      </section>
    </div>,
    document.body,
  );
}
