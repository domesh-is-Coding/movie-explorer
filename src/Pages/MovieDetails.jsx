import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <p className="text-white text-center mt-10">Loading ...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center px-4 py-10 justify-center sm:flex-row">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="rounded-xl max-w-xs md:max-w-sm mb-6"
      />
      <div className="bg-slate-200 p-6 rounded-2xl text-gray-900 max-w-2xl  w-full mx-4">
        <h1 className="text-3xl font-extrabold mb-3">{movie?.Title}</h1>
        <h3 className="text-lg font-semibold mb-2">Year: {movie?.Year}</h3>
        <p className="text-md bg-amber-400 p-2 my-2 rounded font-medium">
          <span className="font-bold">Genre:</span> {movie?.Genre}
        </p>
        <p className="mb-2">
          <span className="font-bold">Plot:</span> {movie?.Plot}
        </p>
        <p className="">
          <span className="font-bold">Actors:</span> {movie?.Actors}
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;
