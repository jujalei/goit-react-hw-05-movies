import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { fetchFilmName } from 'services/api';

export const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('query');
  const location = useLocation();

  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchTerm) return;

    const fetchFilms = async () => {
      try {
        setIsLoading(true);

        const response = await fetchFilmName(searchTerm);
        const film = response.results;

        setFilms(film);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilms();
  }, [searchTerm]);

  const handleSumbit = event => {
    event.preventDefault();
    const searchValue = event.target.children.search.value;

    setSearchParams({
      query: searchValue,
    });
  };

  return (
    <div>
      <form onSubmit={handleSumbit}>
        <input type="text" name="search" required />
        <button type="submit">Search</button>
      </form>

      {error !== null && (
        <p className="c-error">
          Oops, some error occured. Please, try again later. Error: {error}
        </p>
      )}
      {isLoading && 'loading'}

      {films.length > 0 &&
        films.map(film => {
          return (
            <Link
              className="film"
              key={film.id}
              to={`/movies/${film.id}`}
              state={{ from: location }}
            >
              <div>
                {/* <img
                  src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
                  alt={film.title}
                  width={295}
                /> */}
                <h3> {film.title}</h3>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default MoviesPage;
