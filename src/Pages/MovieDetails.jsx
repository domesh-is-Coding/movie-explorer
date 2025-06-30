import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch movie details
  useEffect(() => {
    async function fetchMovie() {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_OMDB_URL}?apikey=${
          import.meta.env.VITE_OMDB_KEY
        }&i=${id}`
      );
      setMovie(response.data);
      setIsLoading(false);
    }
    fetchMovie();
    return () => setMovie(null);
  }, [id]);

  // Check if movie is already favorite on load
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorite")) || [];
    setIsFavorite(favorites.includes(id));
  }, [id]);

  // Add/remove favorite movie
  const handleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorite")) || [];

    if (favorites.includes(id)) {
      const updatedFavorites = favorites.filter((m) => m !== id);
      localStorage.setItem("favorite", JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(id);
      localStorage.setItem("favorite", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  if (isLoading) {
    return <p className="text-white text-center mt-10">Loading ...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center px-4 py-10 justify-center sm:flex-row">
      <button
        className={`fixed top-2 center ${
          isFavorite ? "bg-red-600" : "bg-amber-500"
        } text-white px-4 py-2 rounded mb-4`}
        onClick={handleFavorite}
      >
        {isFavorite ? "Remove from Favorite" : "Add to Favorite"}
      </button>

      <img
        src={movie.Poster}
        alt={movie.Title}
        className="rounded-xl max-w-xs md:max-w-sm mb-6"
      />
      <div className="bg-slate-200 p-6 rounded-2xl text-gray-900 max-w-2xl w-full mx-4">
        <h1 className="text-3xl font-extrabold mb-3">{movie?.Title}</h1>
        <h3 className="text-lg font-semibold mb-2">Year: {movie?.Year}</h3>
        <p className="text-md bg-amber-400 p-2 my-2 rounded font-medium">
          <span className="font-bold">Genre:</span> {movie?.Genre}
        </p>
        <p className="mb-2">
          <span className="font-bold">Plot:</span> {movie?.Plot}
        </p>
        <p>
          <span className="font-bold">Actors:</span> {movie?.Actors}
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;
