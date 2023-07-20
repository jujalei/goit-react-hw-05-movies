import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { fetchFilmDetails } from 'services/api';
import AdditionalInformation from './AdditionalInformation';

const MoviesDetails = () => {
  const [filmDetails, setFilmDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { filmId } = useParams();

  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? '/');

  const defaultImg =
    'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

  useEffect(() => {
    if (!filmId) return;

    const fetchFilmData = async () => {
      try {
        setIsLoading(true);

        const filmData = await fetchFilmDetails(filmId);

        setFilmDetails(filmData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilmData();
  }, [filmId]);

  return (
    <div>
      <Link to={backLinkHref.current} className="back-button">
        Go back
      </Link>{' '}
      {error !== null && (
        <p className="c-error">
          Oops, some error occurred. Please, try again later. Error: {error}
        </p>
      )}
      {isLoading && 'loading'}
      {filmDetails !== null && (
        <div>
          <h2>{filmDetails.title}</h2>
          <div className="film-details">
            <img
              src={
                filmDetails.poster_path
                  ? `https://image.tmdb.org/t/p/original${filmDetails.poster_path}`
                  : defaultImg
              }
              width={250}
              alt={`${filmDetails.title} poster`}
            />
            <div>
              <p>
                <strong>User score:</strong> {filmDetails.vote_average}
              </p>

              <p>
                <strong>Overview:</strong> {filmDetails.overview}
              </p>
              <p>
                <strong>Genres:</strong>{' '}
                {filmDetails.genres.map(genre => genre.name).join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}
      <AdditionalInformation />
    </div>
  );
};

export default MoviesDetails;
