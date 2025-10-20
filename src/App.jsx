import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Collection from "./pages/Collections";
import Contact from "./pages/Contact";
import Stone from "./pages/Stone";
import ScrollToTop from './components/ScrollToTop';
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import AGB from "./pages/AGB";
import { gemstones } from "./data/Gemstones";


export default function App() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const path = url.searchParams.get('path'); // z.B. "/contact"

    if (path && window.location.pathname !== path) {
      window.history.replaceState(null, '', path + window.location.hash);
    }
  }, []);

  return (
    <>
      <ScrollToTop />
      <Layout>
        <Helmet>
          <title>NobleCutGems - Premium Edelsteine</title>
          <meta name="description" content="Premium Edelsteine von außergewöhnlicher Qualität." />
        </Helmet>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Navigate to="/" replace />} />
          <Route path="/Collection" element={<Collection />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Stone/:slug" element={<Stone />} />
          <Route path="/Stone" element={<Navigate to="/Collection" replace />} />
          <Route path="/Impressum" element={<Impressum />} />
          <Route path="/Datenschutz" element={<Datenschutz />} />
          <Route path="/AGB" element={<AGB />} />
          <Route path="*" element={<div>404 - Seite nicht gefunden</div>} />
        </Routes>
      </Layout>
    </>
  );
}
