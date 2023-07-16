import WatchedMovie from "./WatchedMovie";

export default function WatchedMovieList({ watched, onDeletedWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeletedWatched={onDeletedWatched}
        />
      ))}
    </ul>
  );
}
