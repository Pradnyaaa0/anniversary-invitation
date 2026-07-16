import { useEffect } from 'react';

/**
 * CustomCursor
 * Sets the global CSS cursor to a small ❤️ SVG icon using a data-URI.
 * No follower element, no spring animation — just a clean heart pointer
 * that works reliably on all devices.
 */
export default function CustomCursor() {
  useEffect(() => {
    // Heart SVG cursor — 32×32px, pink fill
    const heartSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
        <path fill="%23fb6f92" d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 
          0-3.791 3.068-5.191 5.281-5.191 
          1.312 0 4.151.501 5.719 4.457 
          1.59-3.968 4.464-4.447 5.726-4.447 
          2.54 0 5.274 1.621 5.274 5.181 
          0 4.069-5.136 8.625-11 14.402z"/>
      </svg>
    `.trim().replace(/\s+/g, ' ');

    const cursorURL = `url("data:image/svg+xml,${heartSVG}") 16 16, pointer`;

    // Apply to the root and body
    document.documentElement.style.cursor = cursorURL;
    document.body.style.cursor = cursorURL;

    // Also apply to all interactive elements
    const style = document.createElement('style');
    style.id = 'heart-cursor-style';
    style.textContent = `
      *, *::before, *::after { cursor: ${cursorURL} !important; }
      a, button, [role="button"], input[type="range"], input[type="submit"] {
        cursor: ${cursorURL} !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
      const el = document.getElementById('heart-cursor-style');
      if (el) el.remove();
    };
  }, []);

  // No DOM element rendered — purely CSS-driven
  return null;
}
