import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import Pagination from './Pagination';

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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <header>
        <h1>Rick and Morty Explorer</h1>
      </header>
      <main>
        <div className="filters">
          <label>
            Search by Name:
            <input
              type="text"
              value={filters.name}
              onChange={(e) => updateFilter('name', e.target.value)}
            />
          </label>
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

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </div>
  );
};

export default App;
