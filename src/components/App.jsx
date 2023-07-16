import { useState } from "react";
import Navbar from "./Navbar";
import Main from "./Main";
import MovieBox from "./MovieBox";
import MovieList from "./MovieList";
import Summary from "./Summary";
import WatchedMovieList from "./WatchedMovieList";
import Loader from "./Loader";
import ErrorMsg from "./ErrorMsg";
import MovieDetails from "./MovieDetails";
import { useLocalStorage } from "./useLocalStorage";
import { useMovies } from "./useMovies";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorage("watched");
  const { movies, isLoading, error } = useMovies(query);

  function handleSelectedMovie(id) {
    selectedId !== id ? setSelectedId(id) : setSelectedId(null);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched([...watched, movie]);
    setSelectedId(null);
  }

  function handleDeleteWatched(id) {
    setWatched(watched.filter((movie) => movie.imdbID !== id));
  }

  function handleQuery(text) {
    setQuery(text);
    setSelectedId(null);
  }

  function showMovies() {
    if (error) return <ErrorMsg msg={error} />;

    if (isLoading) {
      return <Loader />;
    } else {
      return (
        <MovieList movies={movies} onSelectedMovie={handleSelectedMovie} />
      );
    }
  }

  return (
    <>
      <Navbar movies={movies} query={query} onQuery={handleQuery} />
      <Main>
        <MovieBox>{showMovies()}</MovieBox>
        <MovieBox>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              watched={watched}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeletedWatched={handleDeleteWatched}
              />
            </>
          )}
        </MovieBox>
      </Main>
    </>
  );
}
