import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/search.css';
import { FaSearch } from "react-icons/fa";


const Search = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery !== '') {
      navigate(`/search/${trimmedQuery}`);
      setQuery('');
    }
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit"><FaSearch />
      </button>
    </form>
  );
};

export default Search;
