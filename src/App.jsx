import "./App.css";
import { Routes, Route } from "react-router";
import SearchPage from "./Pages/SearchPage";
import MovieDetails from "./Pages/MovieDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  );
}

export default App;
