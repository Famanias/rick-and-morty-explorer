import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import ReactPaginateLib from './ReactPaginateLib';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ name: '', species: '', status: '', gender: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCharacters = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get('https://rickandmortyapi.com/api/character', {
        params: {
          page,
          name: filters.name,
          species: filters.species,
          status: filters.status,
          gender: filters.gender,
        },
      });
      setCharacters(response.data.results || []);
      setTotalPages(response.data.info.pages);
    } catch (error) {
      console.error('Error fetching characters:', error);
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [fetchCharacters, currentPage]);

  const updateFilter = (filterKey, value) => {
    setFilters({ ...filters, [filterKey]: value });
    setCurrentPage(1); // Reset to the first page on filter change
  };

  const handlePageClick = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <header>
        <h1>Rick and Morty Explorer</h1>
      </header>
      <main>
        <div className="name-filter">
          <label className="search-label">
            <input
              className="input-field"
              type="text"
              value={filters.name}
              onChange={(e) => updateFilter('name', e.target.value)}
            />
            <span className="search-button">Search</span>
          </label>
        </div>

        <div className="filters">
          <label>
            Species:
            <select value={filters.species} onChange={(e) => updateFilter('species', e.target.value)}>
              <option value="">All</option>
              <option value="Human">Human</option>
              <option value="Alien">Alien</option>
              <option value="Humanoid">Humanoid</option>
              <option value="Animal">Animal</option>
              <option value="Poopybutthole">Poopybutthole</option>
              <option value="Mythological Creature">Mythological</option>
              <option value="Unknown">Unknown</option>
              <option value="Disease">Disease</option>
              <option value="Robot">Robot</option>
              <option value="Cronenberg">Cronenberg</option>
              <option value="Parasite">Parasite</option>
            </select>
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
        ) : characters.length > 0 ? (
          <div className="characterCard">
            {characters.map((character) => (
              <div key={character.id} className="characterId">
                <h2>{character.name}</h2>
                <img src={character.image} alt={character.name} className="characterImage" />
                <p>Species: {character.species}</p>
                <p>Status: {character.status}</p>
                <p>Gender: {character.gender}</p>
                <p>
                  Location: {character.location.name}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No characters found. Try adjusting the filters!</p>
        )}

        <ReactPaginateLib
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageClick}
        />
      </main>
    </div>
  );
};

export default App;
