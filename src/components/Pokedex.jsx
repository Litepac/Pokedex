import React, { useState, useEffect, useRef } from 'react';
import PokemonCard from './PokemonCard';

const LIMIT = 12;
const allTypes = [
  'fire','water','grass','electric','ground','rock','fairy','poison',
  'bug','normal','fighting','psychic','ghost','ice','dragon','dark',
  'steel','flying'
];

// Navne, urls og detaljer her
export default function Pokedex() {
  const [allList,     setAllList]     = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [offset,      setOffset]      = useState(0);
  const [count,       setCount]       = useState(0);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState(null);

  const [searchTerm,  setSearchTerm]  = useState('');
  const [filterType,  setFilterType]  = useState('all');
  const cacheRef = useRef({});

  // Henter alle navne en gang
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
      .then(r => r.json())
      .then(data => setAllList(data.results))
      .catch(() => {});
  }, []);

  // Søge funktion
  const mode = searchTerm
    ? 'search'
    : filterType !== 'all'
    ? 'filter'
    : 'page';

 
  useEffect(() => {
    let toFetch = [];
    let total   = 0;

    // Søgefunktion - et forsøg jeg forsøger
    if (searchTerm.trim()) {
      const matches = allList.filter(p =>
        p.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      toFetch = matches.slice(0, LIMIT);
      total   = matches.length;

    // Filter til søgefuntion
    } else if (filterType !== 'all') {
      setLoading(true); setError(null);
      fetch(`https://pokeapi.co/api/v2/type/${filterType}`)
        .then(r => r.json())
        .then(async data => {
          const pokes = data.pokemon.map(p => p.pokemon);
          total = pokes.length;
          const slice = pokes.slice(offset, offset + LIMIT);
          const details = await Promise.all(slice.map(async p => {
            if (cacheRef.current[p.url]) return cacheRef.current[p.url];
            const d = await fetch(p.url).then(r2 => r2.json());
            cacheRef.current[p.url] = d;
            return d;
          }));
          setDisplayList(details);
          setCount(total);
        })
        .catch(() => setError('Fejl ved filter'))
        .finally(() => setLoading(false));
      return;

    } else {
      const sliceNames = allList.slice(offset, offset + LIMIT);
      toFetch = sliceNames;
      total   = allList.length;
    }

    // Henter detaljer - alt nedenstående er første forsøg på søgefelt, fejlsøgning, error handling osv.
    setLoading(true); setError(null);
    Promise.all(toFetch.map(async p => {
      if (cacheRef.current[p.url]) return cacheRef.current[p.url];
      const d = await fetch(p.url).then(r => r.json());
      cacheRef.current[p.url] = d;
      return d;
    }))
      .then(details => {
        setDisplayList(details);
        setCount(total);
      })
      .catch(() => setError('Fejl ved hentning'))
      .finally(() => setLoading(false));
  }, [allList, searchTerm, filterType, offset]);

  return (
    <>
      <div className="controls center">
        <input
          type="text"
          placeholder="Søg (starter med)…"
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            setOffset(0);
          }}
        />
        <select
          value={filterType}
          onChange={e => {
            setFilterType(e.target.value);
            setOffset(0);
          }}
        >
          <option value="all">Alle typer</option>
          {allTypes.map(t => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>


      {loading && <div className="center">Loading…</div>}
      {!loading && error && mode === 'search' && (
        <div className="center error">{error}</div>
      )}

      <div className="pokemon-grid">
        {displayList.map(p => (
          <PokemonCard key={p.name} pokemon={p} />
        ))}
      </div>

      {mode !== 'search' && (
        <div className="center">
          <button
            className="button"
            disabled={offset === 0}
            onClick={() => setOffset(o => Math.max(0, o - LIMIT))}
          >
            Previous
          </button>
          <button
            className="button"
            disabled={offset + LIMIT >= count}
            onClick={() => setOffset(o => o + LIMIT)}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
