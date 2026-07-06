import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';

export default function Home({ copy }) {
  const features = [
    {
      icon: 'API',
      title: copy.featureApiTitle,
      text: copy.featureApiText,
    },
    {
      icon: 'LS',
      title: copy.featureStorageTitle,
      text: copy.featureStorageText,
    },
    {
      icon: 'UI',
      title: copy.featureResponsiveTitle,
      text: copy.featureResponsiveText,
    },
  ];

  return (
    <main>
      <section className="hero section">
        <div className="hero__content">
          <span className="eyebrow">{copy.heroEyebrow}</span>
          <h1>{copy.heroTitle}</h1>
          <p>{copy.heroText}</p>
          <div className="hero__actions">
            <Link className="primary-button" to="/explore">
              {copy.startExploring}
            </Link>
            <Link className="secondary-button" to="/favorites">
              {copy.viewFavorites}
            </Link>
          </div>
        </div>

        <div className="hero-panel" aria-label="Project highlights">
          <div>
            <strong>4</strong>
            <span>{copy.statsPages}</span>
          </div>
          <div>
            <strong>REST</strong>
            <span>{copy.statsApi}</span>
          </div>
          <div>
            <strong>2x</strong>
            <span>{copy.statsStorage}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <span className="eyebrow">Features</span>
          <h2>{copy.featuredTitle}</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>
    </main>
  );
}
