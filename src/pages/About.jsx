export default function About({ copy }) {
  const tools = [
    'React functional components',
    'React Hooks',
    'React Router',
    'Axios',
    'LocalStorage and SessionStorage',
    'SCSS',
    'Responsive CSS',
    'Modal and CSS animations',
    'Light and dark theme',
    'Georgian and English language modes',
  ];

  return (
    <main className="section">
      <div className="about-layout">
        <section className="about-card">
          <span className="eyebrow">Final project</span>
          <h1>{copy.aboutTitle}</h1>
          <p>{copy.aboutText}</p>
        </section>

        <section className="about-card">
          <span className="eyebrow">Stack</span>
          <h2>{copy.toolsTitle}</h2>
          <ul className="tool-list">
            {tools.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
