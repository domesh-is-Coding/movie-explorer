import { useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import axios from "axios";
import MovieCard from "../components/MovieCard.jsx";

const SearchPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    if (!searchInput.trim()) return;
    const response = await axios.get(
      `${import.meta.env.VITE_OMDB_URL}?apikey=${
        import.meta.env.VITE_OMDB_KEY
      }&s=${searchInput}`
    );
    setMovies(response.data.Search || []);
  };

  return (
    <div className="min-h-screen bg-slate-900 overflow-x-hidden">
      <div className="flex flex-col items-center py-8 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-widest text-center">
          🎥 Movie Explorer 🎬
        </h1>
        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          handleSearch={handleSearch}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-6 px-4 py-8 max-w-7xl mx-auto">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            id={movie.imdbID}
            title={movie.Title}
            poster={movie.Poster}
            year={movie.Year}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
