import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import NavBar from "./components/NavBar";
import LikedMovies from "./pages/LikedMovies";
import MovieDetails from './pages/MovieDetails';
import Contact from './pages/Contact';
import './css/App.css';
function App() {

  return (
    <>

    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/likes" element={<LikedMovies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <NavBar />
      </div>
    </Router>
    </>
  );
}

export default App;
