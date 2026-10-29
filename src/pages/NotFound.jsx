import { Link } from 'react-router-dom';
import PageHead from '../components/PageHead.jsx';
import { usePageMeta } from '../lib/usePageMeta.js';

export default function NotFound() {
  usePageMeta({ title: 'Page not found | Loop St.', description: 'This page is not at Loop St.' });
  return (
    <PageHead title="Wrong door" sentence="That page is not here. The steps up to number 37 are, though." photo="the-steps">
      <Link to="/" className="button">
        Back to Loop St.
      </Link>
    </PageHead>
  );
}
