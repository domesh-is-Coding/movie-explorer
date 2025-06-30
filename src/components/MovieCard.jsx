import { Link } from "react-router";
import { useState, useEffect } from "react";

const MovieCard = ({ id, title, poster, year }) => {
  // check if this movie is favorite
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorite")) || [];
    setIsFavorite(favorites.includes(id));
  }, [id]);

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

  return (
    <div className="w-72 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col overflow-hidden relative">
      <div className="relative">
        {isFavorite && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded shadow z-10 flex items-center gap-1">
            <i className="fa-solid fa-heart text-white"></i> Favorite
          </div>
        )}

        <img
          className="rounded-t-lg w-full h-96 object-cover"
          src={poster}
          alt={title}
        />

        {/* Favorite toggle button */}
        <button
          onClick={handleFavorite}
          className="absolute top-2 right-2 bg-white/80 backdrop-blur text-red-600 p-2 rounded-full shadow hover:scale-110 transition-all z-10"
          title={isFavorite ? "Remove from Favorite" : "Add to Favorite"}
        >
          <i
            className={`fa-${
              isFavorite ? "solid" : "regular"
            } fa-heart text-lg`}
          ></i>
        </button>
      </div>

      <div className="p-5 flex flex-col">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white break-words">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Year: {year}
        </p>
        <Link
          to={`/movie/${id}`}
          className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
        >
          View Details
          <svg className="w-3.5 h-3.5 ms-2" viewBox="0 0 14 10">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
