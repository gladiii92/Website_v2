import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);  // Scrollt sofort nach oben
  }, [pathname]);  // Reagiert auf Routenänderung

  return null;  // Rendert nichts, ist nur funktional
}
