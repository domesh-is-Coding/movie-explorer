const SearchBar = ({ searchInput, setSearchInput, handleSearch }) => {
  return (
    <div className="flex flex-wrap gap-3 w-full justify-center">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search movies by title..."
        className="text-white px-4 py-2 rounded-md border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 w-72"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2 rounded-md focus:ring-4 focus:ring-blue-300 cursor-pointer"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
