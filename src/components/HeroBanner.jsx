import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/HeroBanner.css";
import { API_KEY } from "../config";

function HeroBanner() {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);


  useEffect(() => {
    // Trending movie fetch
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        const random = data.results[Math.floor(Math.random() * data.results.length)];
        setMovie(random);

        // Agar random movie mil gayi to uska trailer fetch karo
        if (random?.id) {
          fetch(`https://api.themoviedb.org/3/movie/${random.id}/videos?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
              if (data.results && data.results.length > 0) {
                const trailer = data.results.find(
                  (vid) => vid.type === "Trailer" && vid.site === "YouTube"
                );
                if (trailer) setTrailerKey(trailer.key);
              }
            });
        }
      });
  }, []);


  const imageBase = "https://image.tmdb.org/t/p/original";

  if (!movie) return null;

  return (
    <div
      className="hero-banner"
      style={{
        backgroundImage: `url(${imageBase}${movie.backdrop_path})`,
      }}
    >
      <div className="overlay">
        <h1>{movie.title}</h1>
        <p>{movie.overview?.slice(0, 150)}...</p>
        <div className="hero-buttons">
          <Link to={`https://www.youtube.com/embed/${trailerKey}`}
            target="_blank">
            <button>▶ Play</button>
          </Link>
          <Link to={`/movie/${movie.id}`}
            key={movie.id}>
            <button>ℹ More Info</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
