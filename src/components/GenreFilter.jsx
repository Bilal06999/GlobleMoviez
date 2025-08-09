import { useState, useEffect } from "react";
import MovieCards from "./MovieCards";
import { API_KEY } from "../config";
import '../css/GenreFilter.css';

const genres = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 878, name: "Sci-Fi" },
  { id: 10749, name: "Romance" },
];

function GenreFilter({ setMovies, setSearched }) {
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    if (!selectedGenre) return;

    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results || []);
        setSearched(true);
      });
  }, [selectedGenre]);

  return (
    <div className="genre-buttons">
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={`genre-btn ${selectedGenre === genre.id ? "active" : ""}`}
          onClick={() => setSelectedGenre(genre.id)}
        >
          {genre.name}
        </button>
      ))}
      <button className="genre-btn clear" onClick={() => {
        setSelectedGenre(null);
        setMovies([]);
        setSearched(false);
      }}>
        Clear Filter
      </button>
    </div>
  );
}


export default GenreFilter;
