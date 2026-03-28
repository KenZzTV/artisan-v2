import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import List from './pages/List';
import Details from './pages/Details';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="App">
      {/* On passe la fonction de recherche au Header */}
      <Header onSearch={setSearchTerm} />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* On passe le mot-clé à la page Liste */}
          <Route path="/liste-artisans" element={<List searchTerm={searchTerm} />} />
          <Route path="/artisan/:id" element={<Details />} />
          <Route path="/mentions-legales" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;