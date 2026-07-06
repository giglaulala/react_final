export default function Footer({ copy }) {
  return (
    <footer className="site-footer">
      <p>{copy.footerText}</p>
      <p>React Hooks · React Router · Axios · SCSS · LocalStorage · SessionStorage</p>
    </footer>
  );
}
