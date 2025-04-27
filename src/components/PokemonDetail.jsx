import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

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

export default function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(r => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(data => setPokemon(data))
      .catch(() => setError('Kunne ikke hente data'))
      .finally(() => setLoading(false));
  }, [name]);

  if (loading) return <div className="center">Loading…</div>;
  if (error)   return <div className="center error">{error}</div>;

  const primary = pokemon.types[0].type.name;

  return (
    <div className={`detail-card type-${primary}`}>
      <header className="detail-header">
        <h1>
          #{pokemon.id}{' '}
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h1>
        <img
          src={
            pokemon.sprites.other['official-artwork'].front_default ||
            pokemon.sprites.front_default
          }
          alt={pokemon.name}
          className="detail-sprite"
        />
      </header>

      <section className="detail-info">
        <div>
          <strong>Height:</strong> {pokemon.height}
        </div>
        <div>
          <strong>Weight:</strong> {pokemon.weight}
        </div>
        <div className="detail-types">
          <strong>Types:</strong>{' '}
          {pokemon.types.map(({ type }) => (
            <span key={type.name} className="type-badge">
              <span className="type-icon" title={type.name}>
                {typeIcons[type.name] || '❔'}
              </span>{' '}
              {type.name}
            </span>
          ))}
        </div>
      </section>

      // Detaljer her nede

      <section className="detail-stats">
        <h2>Base Stats</h2>
        {pokemon.stats.map(s => (
          <div key={s.stat.name}>
            <strong>{s.stat.name.toUpperCase()}:</strong> {s.base_stat}
          </div>
        ))}
      </section>

      <section className="detail-abilities">
        <h2>Abilities</h2>
        <ul>
          {pokemon.abilities.map(a => (
            <li key={a.ability.name}>
              {a.ability.name}
              {a.is_hidden && ' (Hidden Ability)'}
            </li>
          ))}
        </ul>
      </section>

      <Link to="/" className="button back-button">
        ← Back to List
      </Link>
    </div>
  );
}
