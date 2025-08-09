// import MovieTypeRow from '../components/MovieTypeRow'
import HeroBanner from "../components/HeroBanner";
import CategoryRow from "../components/CategoryRow";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { API_KEY } from "../config";

function Home() {
  return (
    <>
      <Header />
      < HeroBanner />
      < CategoryRow
        title="🔥 Popular"
        fetchUrl={`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        }
      />
      < CategoryRow
        title="⭐ Top Rated"
        fetchUrl={`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`}
      />
      < CategoryRow
        title="🎬 Upcoming"
        fetchUrl={`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`}
      />
      < Footer />
    </>
  );
}
export default Home;
