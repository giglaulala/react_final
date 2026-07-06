export default function CountryCard({ country, copy, isFavorite, onFavoriteToggle, onOpenDetails }) {
  const formattedPopulation = new Intl.NumberFormat().format(country.population);

  return (
    <article className="country-card">
      <img className="country-card__flag" src={country.flag} alt={country.flagAlt} />
      <div className="country-card__body">
        <div>
          <h3>{country.name}</h3>
          <p>{country.officialName}</p>
        </div>

        <dl className="country-meta">
          <div>
            <dt>{copy.capital}</dt>
            <dd>{country.capital}</dd>
          </div>
          <div>
            <dt>{copy.population}</dt>
            <dd>{formattedPopulation}</dd>
          </div>
        </dl>

        <div className="card-actions">
          <button className="secondary-button" type="button" onClick={() => onOpenDetails(country)}>
            {copy.details}
          </button>
          <button className="primary-button" type="button" onClick={() => onFavoriteToggle(country)}>
            {isFavorite ? copy.removeFavorite : copy.addFavorite}
          </button>
        </div>
      </div>
    </article>
  );
}
