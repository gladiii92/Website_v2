import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

export default function App() {
  return (
    <Router>
      <ScrollToTop />  {/* Hier hinzugefügt: Scrollt bei jedem Routenwechsel nach oben */}
      <Layout>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Collection" element={<Collection />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Stone" element={<Stone />} />
          <Route path="/Impressum" element={<Impressum />} />
          <Route path="/Datenschutz" element={<Datenschutz />} />
          <Route path="/AGB" element={<AGB />} />
        </Routes>
      </Layout>
    </Router>
  );
}
