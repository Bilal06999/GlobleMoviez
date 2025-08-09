import { useState } from "react";
import { API_KEY } from "../config";
import "../css/MovieSearch.css";

function MovieSearch({ setMovies, setSearched }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
        setSearched(true);
      });
  };
 
  return (
    <form className="search-glass-form" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search for a movie or series..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        />
      <button type="submit">🔍</button>
    </form>
  );
}


export default MovieSearch;
