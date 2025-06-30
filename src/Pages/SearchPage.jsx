import { useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import axios from "axios";
import MovieCard from "../components/MovieCard.jsx";

const SearchPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const handleSearch = async (page = 1) => {
    if (!searchInput.trim()) return;
    const response = await axios.get(
      `${import.meta.env.VITE_OMDB_URL}?apikey=${
        import.meta.env.VITE_OMDB_KEY
      }&s=${searchInput}&page=${page}`
    );

    if (response.data.Response === "True") {
      setMovies(response.data.Search || []);
      setTotalResults(parseInt(response.data.totalResults));
      setCurrentPage(page);
    } else {
      setMovies([]);
      setTotalResults(0);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(totalResults / 10);
    if (currentPage < totalPages) {
      handleSearch(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handleSearch(currentPage - 1);
    }
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
          handleSearch={() => handleSearch(1)}
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

      {/* Pagination */}
      {totalResults > 0 && (
        <div className="flex justify-center items-center gap-4 py-8">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-blue-700 text-white disabled:bg-gray-500"
          >
            Previous
          </button>
          <span className="text-white">
            Page {currentPage} of {Math.ceil(totalResults / 10)}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(totalResults / 10)}
            className="px-4 py-2 rounded bg-blue-700 text-white disabled:bg-gray-500"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
