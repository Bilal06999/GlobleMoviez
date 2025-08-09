import { useEffect, useState } from "react";
import MovieCards from "./MovieCards";
import '../css/CategoryRow.css';

function CategoryRow({ title, fetchUrl }) {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(fetchUrl) 
      .then(res => res.json())
      .then(data => setMovies(data.results || []));
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2 className="row-title">{title}</h2>
      <div className="row-cards">
        <MovieCards movies={movies} isRow={true}/>
      </div>
    </div>
  );
}

export default CategoryRow;
