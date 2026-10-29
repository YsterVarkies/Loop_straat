import { Link } from 'react-router-dom';
import { nav, site } from '../data/site.js';
import { asset } from '../lib/asset.js';
import './footer.css';

// A single quiet line: what this is, the pages, the year.
export default function Footer() {
  return (
    <footer className="footer wrap">
      <div className="footer__line">
        <Link to="/" className="footer__name">
          <img src={asset('media/logo/loop-logo-160.webp')} width="40" height="40" alt="" />
          <span>{site.longName}, Potchefstroom</span>
        </Link>
        <nav aria-label="Footer">
          <ul className="footer__links">
            {nav.map(item => (
              <li key={item.to}>
                <Link to={item.to} className="link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="footer__small">
          © {new Date().getFullYear()} Loop St. · No under 21s · Drink responsibly
        </p>
      </div>
    </footer>
  );
}
