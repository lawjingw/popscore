import { useEffect, useRef } from "react";

export default function Navbar({ query, onQuery, movies }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        ref={inputRef}
      />
      <p className="num-results">
        <strong>{movies && movies.length !== 0 ? movies.length : 0} </strong>
        results
      </p>
    </nav>
  );
}
