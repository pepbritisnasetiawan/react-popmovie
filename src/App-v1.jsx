/* eslint-disable react/prop-types */
import { useState } from 'react';

const tempMovieData = [
  {
    imdbID: 'tt15398776',
    Title: 'Oppenheimer',
    Year: '2013',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt1517268',
    Title: 'Barbie',
    Year: '2023',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt8589698',
    Title: 'Teenage Mutant Ninja Turtles: Mutant Mayhem',
    Year: '2023',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYzE4MTllZTktMTIyZS00Yzg1LTg1YzAtMWQwZTZkNjNkODNjXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg',
  },
];

const tempWatchedData = [
  {
    imdbID: 'tt15398776',
    Title: 'Oppenheimer',
    Year: '2013',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg',
    runtime: 180,
    imdbRating: 8.6,
    userRating: 10,
  },
  {
    imdbID: 'tt1517268',
    Title: 'Barbie',
    Year: '2023',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNjU3N2QxNzYtMjk1NC00MTc4LTk1NTQtMmUxNTljM2I0NDA5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg',
    runtime: 114,
    imdbRating: 7.2,
    userRating: 8,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const Logo = () => {
  return (
    <div className="logo">
      <span role="img">🎫</span>
      <h1>Movie</h1>
    </div>
  );
};

const Search = () => {
  const [query, setQuery] = useState('');
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

const NumResult = ({ movies }) => {
  return (
    <p className="num-results">
      Found <strong>{movies?.length}</strong> results
    </p>
  );
};

const MovieItem = ({ movie }) => {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>📅</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

const MovieList = ({ movies }) => {
  return (
    <ul className="list">
      {movies?.map((movie, index) => (
        <MovieItem key={index} movie={movie} />
      ))}
    </ul>
  );
};

const WatchedItem = ({ movie }) => {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🎬</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
};

const WatchedList = ({ watched }) => {
  return (
    <ul className="list">
      {watched.map((movie, index) => (
        <WatchedItem key={index} movie={movie} />
      ))}
    </ul>
  );
};

const BoxMovies = ({ element }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && element}
    </div>
  );
};

const WatchSummary = ({ watched }) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>🎬</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

const Main = ({ children }) => {
  return <main className="main">{children}</main>;
};

const NavBar = ({ children }) => {
  return <nav className="nav-bar">{children}</nav>;
};

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <BoxMovies element={<MovieList movies={movies} />} />
        <BoxMovies
          element={
            <>
              <WatchSummary watched={watched} />
              <WatchedList watched={watched} />
            </>
          }
        />
      </Main>
    </>
  );
}
