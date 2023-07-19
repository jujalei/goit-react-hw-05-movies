import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchTrendingToday } from 'services/api';

const HomePage = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();

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
      <h1>Trending films today</h1>
      {error !== null && (
        <p>Oops, some error occured. Please, try again later. Error: {error}</p>
      )}
      {isLoading && 'Loading'}
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

export default HomePage;
