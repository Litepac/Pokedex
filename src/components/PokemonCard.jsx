import React from 'react';
import { Link } from 'react-router-dom';

// Ikoner

const typeIcons = {
  fire:     '🔥',
  water:    '💧',
  grass:    '🍃',
  electric: '⚡',
  ground:   '🛤️',
  rock:     '🪨',
  fairy:    '✨',
  poison:   '☠️',
  bug:      '🐛',
  normal:   '⚪',
  fighting: '🥊',
  psychic:  '🔮',
  ghost:    '👻',
  ice:      '❄️',
  dragon:   '🐉',
  dark:     '🌑',
  steel:    '🔩',
  flying:   '🕊️',
};

export default function PokemonCard({ pokemon }) {
  const primary = pokemon.types[0]?.type.name || 'normal';

  return (
    <Link
      to={`/pokemon/${pokemon.name}`}
      className={`pokemon-card type-${primary}`}
    >
      <div className="pokemon-header">
        <span className="pokemon-id">#{pokemon.id}</span>
        <span className="pokemon-name">{pokemon.name}</span>
      </div>

      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="pokemon-sprite"
      />

      <div className="type-icons">
        {pokemon.types.map(t => (
          <span
            key={t.slot}
            className="type-icon"
            title={t.type.name}
          >
            {typeIcons[t.type.name] || '❔'}
          </span>
        ))}
      </div>
    </Link>
  );
}
