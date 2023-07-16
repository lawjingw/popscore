import { useEffect, useState } from "react";

const OMDB_KEY = import.meta.env.VITE_OMDB_KEY;

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    const fetchMovies = async () => {
      try {
        setError("");
        setIsLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${query}`
        );
        if (!ignore) {
          const movies = await response.json();
          if (movies.Response === "False") throw new Error(movies.Error);
          setMovies(movies.Search);
          setIsLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        setMovies([]);
      }
    };
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    //handleCloseMovie();
    fetchMovies();

    return () => {
      ignore = true;
    };
  }, [query]);

  return { movies, isLoading, error };
}
