import './tailwind-output.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async'; // Neu: Importiere den Provider
import App from './App';
import './index.css';  // Oder den Pfad zu deiner Haupt-CSS-Datei

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);