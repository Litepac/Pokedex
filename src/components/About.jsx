import React from 'react';

export default function About() {
  return (
    <div className="about-card">
      <p>
        Welcome to our Pokédex! This web application was created as part of a React development
        assignment, with the purpose of building a dynamic, interactive, and user-friendly
        Pokédex powered by the PokéAPI.
      </p>
      <p>
        Our goal was to design an app that allows users to explore the vast world of Pokémon — complete
        with a browsable list, detailed stats, and a sleek, responsive interface. The Pokédex features
        pagination for easy navigation through the many Pokémon species and detailed profiles including
        types, abilities, height, weight, and base stats.
      </p>
      <p>
        We built this project using React and Vite, and we implemented React Router to manage multiple
        pages such as the Pokédex and this very About page.
      </p>
      <p className="signature">— Ass Ketchup</p>
    </div>
  );
}
