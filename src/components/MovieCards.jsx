import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import "../css/MovieCards.css"; 

function MovieCards({ movies, isRow = false }) {
  const imageBase = "https://image.tmdb.org/t/p/w500";
  const [likedMovies, setLikedMovies] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("likedMovies")) || [];
    setLikedMovies(stored);
  }, []);

  const toggleLike = (e, movie) => {
    e.preventDefault(); // 👈 prevent link navigation
    let updated;
    const exists = likedMovies.find((m) => m.id === movie.id);
    if (exists) {
      updated = likedMovies.filter((m) => m.id !== movie.id);
    } else {
      updated = [...likedMovies, movie];
    }
    setLikedMovies(updated);
    localStorage.setItem("likedMovies", JSON.stringify(updated));
  };

  const isLiked = (id) => likedMovies.some((m) => m.id === id);

  return (
    <div className={`movieCards ${isRow ? "row-layout" : "grid-layout"}`}>
      {movies?.length > 0 ? (
        movies.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="movieCard"
          >
            <img
              className="card-img"
              src={
                movie.poster_path
                  ? imageBase + movie.poster_path
                  : "https://via.placeholder.com/200x300"
              }
              alt={movie.title}
            />

            <div className="glass-overlay" />
            <div className="glass-text">
              <h3>{movie.title}</h3>
              <div className="card-details">
                <p>{movie.release_date?.slice(0, 4)}</p>
                <div>
                  ⭐ <span>{movie.vote_average?.toFixed(1)}</span>
                </div>
              </div>
            </div>

            {/* ❤️ Like Icon */}
            <div
              className="like-icon"
              onClick={(e) => toggleLike(e, movie)}
            >
              <FaHeart color={isLiked(movie.id) ? "red" : "grey"} />
            </div>
          </Link>
        ))
      ) : (
        <p>No results</p>
      )}
    </div>
  );
}

export default MovieCards;
