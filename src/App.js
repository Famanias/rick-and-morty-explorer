import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ species: '', status: '', gender: '' });

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character', {
          params: {
            species: filters.species,
            status: filters.status,
            gender: filters.gender,
          },
        });
        setCharacters(response.data.results);
      } catch (error) {
        console.error('Error fetching characters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [filters]);

  const updateFilter = (filterKey, value) => {
    setFilters({ ...filters, [filterKey]: value });
  };

  return (
    <div>
      <header>
        <h1>Rick and Morty Explorer</h1>
      </header>
      <main>
        <div>
          <label>
            Species:
            <input
              type="text"
              value={filters.species}
              onChange={(e) => updateFilter('species', e.target.value)}
            />
          </label>
          <label>
            Status:
            <select value={filters.status} onChange={(e) => updateFilter('status', e.target.value)}>
              <option value="">All</option>
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </label>
          <label>
            Gender:
            <select value={filters.gender} onChange={(e) => updateFilter('gender', e.target.value)}>
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </select>
          </label>
        </div>

        {loading ? (
          <p>Loading characters...</p>
        ) : (
          <div>
            {characters.map((character) => (
              <div key={character.id}>
                <h2>{character.name}</h2>
                <img src={character.image} alt={character.name} />
                <p>Species: {character.species}</p>
                <p>Status: {character.status}</p>
                <p>Gender: {character.gender}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;