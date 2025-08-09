import { useEffect, useState } from "react";
import MovieCards from "../components/MovieCards";
import Footer from "../components/Footer";
import Header from "../components/Header";


function LikedMovies() {
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("likedMovies")) || [];
    setLiked(stored);
  }, []);

  return (
    <>
      <Header />
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "white" }}>❤️ Your Watchlist</h2>
        {liked.length > 0 ? (
          <MovieCards movies={liked} />
        ) : (
          <p style={{ color: "gray" }}>No liked movies yet.</p>
        )}
        <Footer />

      </div>
    </>
  );
}

export default LikedMovies;
