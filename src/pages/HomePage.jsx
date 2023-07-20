import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchTrendingToday } from 'services/api';

import { Loader } from 'components/Loader/Loader';

const HomePage = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();

  const defaultImg =
    'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

  useEffect(() => {
    const fetchFilmsData = async () => {
      try {
        setIsLoading(true);

        const response = await fetchTrendingToday();
        const films = response.results;

        setFilms(films);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilmsData();
  }, []);

  return (
    <div>
      <h1 className="title">Trending today</h1>
      {error !== null && (
        <p>
          Oops, some error occurred. Please, try again later. Error: {error}
        </p>
      )}
      {isLoading && <Loader />}
      <ul className="filmList">
        {films.length > 0 &&
          films.map(film => {
            return (
              <li key={film.id} className="filmItem">
                <Link to={`/movies/${film.id}`} state={{ from: location }}>
                  <img
                    src={
                      film.poster_path
                        ? `https://image.tmdb.org/t/p/original${film.poster_path}`
                        : defaultImg
                    }
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

export default HomePage;
