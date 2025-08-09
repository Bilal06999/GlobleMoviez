import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_KEY } from "../config";
import '../css/MovieDetails.css';
import Footer from "../components/Footer";
import Header from "../components/Header";

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();
    const [cast, setCast] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [trailerKey, setTrailerKey] = useState(null);
    const [providers, setProviders] = useState(null);


    useEffect(() => {
        // Get Movie Details
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => setMovie(data));

        // Get Cast
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => setCast(data.cast || []));

        // Fetch similar movies
        fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => setSimilar(data.results || []));

        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                const trailer = data.results.find(
                    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
                );
                if (trailer) setTrailerKey(trailer.key);
            });
    }, [id]);


    useEffect(() => {
        async function fetchData() {
            const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
            const movieData = await movieRes.json();
            setMovie(movieData);

            const providersRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${API_KEY}`);
            const providersData = await providersRes.json();
            setProviders(providersData.results?.PK); // 'PK' for Pakistan
        }

        fetchData();
    }, [id]);


    if (!movie) return <p>Loading...</p>;

    const bgUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    const genres = movie.genres || [];

    return (
        <>
            <Header />
            <div className="movie-detail">
                <div
                    className="movie-detail-banner"
                    style={{ backgroundImage: `url(${bgUrl})` }}
                >
                    <div className="movie-detail-overlay"></div>
                    <div className="movie-detail-content">
                        <h1 className="movie-detail-title">{movie.title}</h1>
                        <div className="movie-detail-info">
                            <span>{movie.release_date?.slice(0, 4)}</span>
                            <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                            <span>{movie.runtime} min</span>
                        </div>
                    </div>
                </div>

                <div className="movie-detail-body">
                    <button onClick={() => navigate(-1)} className="back-btn">🔙 Back</button>

                    <h3>Overview</h3>
                    <p className="movie-detail-overview">{movie.overview}</p>

                    <h3>Genres</h3>
                    <div className="movie-detail-genres">
                        {genres.map((genre) => (
                            <span key={genre.id} className="genre-chip">{genre.name}</span>
                        ))}
                    </div>
                </div>

                <h3>Cast</h3>
                <div className="movie-detail-cast">
                    {cast.slice(0, 10).map((member) => (
                        <div key={member.cast_id} className="cast-card">
                            <img
                                src={
                                    member.profile_path
                                        ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                                        : "https://via.placeholder.com/100x150"
                                }
                                alt={member.name}
                            />
                            <div className="cast-name">{member.name}</div>
                            <div className="cast-character">as {member.character}</div>
                        </div>
                    ))}
                </div>
                {providers?.flatrate && (
                    <div className="watch-providers">
                        <h3>Available On:</h3>
                        <div className="provider-logos">
                            {providers.flatrate.map((p) => (
                                <img
                                    key={p.provider_id}
                                    src={`https://image.tmdb.org/t/p/w45${p.logo_path}`}
                                    alt={p.provider_name}
                                    title={p.provider_name}
                                />
                            ))}
                        </div>
                    </div>
                )}


                <h3>Similar Movies</h3>
                <div className="movie-detail-similar">
                    {similar.slice(0, 8).map((m) => (
                        <div key={m.id} className="similar-card" onClick={() => navigate(`/movie/${m.id}`)}>
                            <img
                                src={
                                    m.poster_path
                                        ? `https://image.tmdb.org/t/p/w200${m.poster_path}`
                                        : "https://via.placeholder.com/100x150"
                                }
                                alt={m.title}
                            />
                            <div className="similar-title">{m.title}</div>
                        </div>
                    ))}
                </div>
                {trailerKey && (
                    <>
                        <h3>Trailer</h3>
                        <div className="movie-trailer">
                            <iframe
                                width="100%"
                                height="315"
                                src={`https://www.youtube.com/embed/${trailerKey}`}
                                title="YouTube trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </>
                )}


            </div>
            <Footer />
        </>
    );
}

export default MovieDetails;
