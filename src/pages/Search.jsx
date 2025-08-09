import { useState } from "react";
import MovieSearch from "../components/MovieSearch";
import GenreFilter from "../components/GenreFilter";
import MovieCards from "../components/MovieCards";
import Header from "../components/Header";


function Search() {
  const [movies, setMovies] = useState([]);
  const [searched, setSearched] = useState(false);

  return (
    <>
      <Header />
      <GenreFilter setMovies={setMovies} setSearched={setSearched} />
      <MovieSearch setMovies={setMovies} setSearched={setSearched} />

      {searched && <MovieCards movies={movies} />}

    </>
  );
}

export default Search;
