import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Pokedex from './components/Pokedex';
import PokemonDetail from './components/PokemonDetail';
import About from './components/About';
import logo from './assets/ash-ketchup.jpg';

export default function App() {
  return (
    <div className="container">
      <img src={logo} alt="Ash Ketchup Logo" className="logo-left" />

      <nav>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Pokedex
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          About
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}
