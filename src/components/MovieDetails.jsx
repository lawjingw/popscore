import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import { useKey } from "./useKey";

const OMDB_KEY = import.meta.env.VITE_OMDB_KEY;

export default function MovieDetails({
  selectedId,
  watched,
  onCloseMovie,
  onAddWatched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  useKey("Escape", onCloseMovie);

  useEffect(() => {
    let ignore = false;
    async function getMovieDetails() {
      setIsLoading(true);
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${selectedId}`
      );
      if (!ignore) {
        const movieData = await response.json();
        setIsLoading(false);
        setMovie(movieData);
      }
    }
    const watchedMovie = watched.find((wm) => wm.imdbID === selectedId);
    watchedMovie ? setMovie(watchedMovie) : getMovieDetails();

    return () => {
      ignore = true;
    };
  }, [selectedId, watched]);

  useEffect(() => {
    if (movie.Title) document.title = `Movie | ${movie.Title}`;
    return () => {
      document.title = "usePopcorn";
    };
  }, [movie]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐️</span>
                {movie.imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!movie.userRating ? (
                <StarRating
                  starNum={10}
                  size={24}
                  onSetRating={setUserRating}
                />
              ) : (
                <p>
                  You rated this movie with {movie.userRating} <span>⭐️</span>
                </p>
              )}

              {userRating > 0 && (
                <button
                  className="btn-add"
                  onClick={() =>
                    onAddWatched({ ...movie, userRating: userRating })
                  }
                >
                  + Add to watched list
                </button>
              )}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
