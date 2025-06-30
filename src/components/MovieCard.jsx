import { Link } from "react-router";

const MovieCard = ({ id, title, poster, year }) => {
  return (
    <div className="w-72 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col overflow-hidden">
      <img
        className="rounded-t-lg w-full h-96 object-cover"
        src={poster}
        alt={title}
      />
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
