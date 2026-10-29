import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'lenis/dist/lenis.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/site.css';
import App from './App.jsx';

// No StrictMode: its dev-only double-mount of effects tears down and rebuilds the WebGL
// renderer @react-three/fiber attaches to the arch canvas, which can leave it blank.
// basename matches Vite's own `base` (set in vite.config.js), so routing still works once the
// whole site is served from a sub-path, as it is on GitHub Pages.
createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <App />
  </BrowserRouter>
);
