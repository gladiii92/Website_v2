// src/pages/NotFound.jsx
import React from "react";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-2xl text-gray-300">Seite nicht gefunden</p>
      <a href="/" className="text-blue-400 underline">Zurück zur Startseite</a>
    </div>
  );
}