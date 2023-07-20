import React, { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { fetchFilmName } from 'services/api';
import { Loader } from 'components/Loader/Loader';

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
      <form onSubmit={handleSumbit} className="form">
        <input
          className="searchForm-input"
          type="text"
          name="search"
          required
        />
        <button type="submit" className="searchForm-button">
          Search
        </button>
      </form>

      {error !== null && (
        <p>Oops, some error occured. Please, try again later. Error: {error}</p>
      )}
      {isLoading && <Loader />}

      <ul className="filmList">
        {films.length > 0 &&
          films.map(film => {
            return (
              <li key={film.id} className="filmItem">
                <Link to={`/movies/${film.id}`} state={{ from: location }}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
                    alt={film.title}
                    width={200}
                  />
                  <h3> {film.title}</h3>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default MoviesPage;
