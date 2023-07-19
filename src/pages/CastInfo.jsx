import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCast } from 'services/api';

const CastInfo = () => {
  const [castDetails, setCastDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { filmId } = useParams();

  const defaultImg =
    'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

  useEffect(() => {
    if (!filmId) return;

    const fetchCastData = async () => {
      try {
        setIsLoading(true);

        const response = await fetchCast(filmId);
        const cast = response.cast;

        setCastDetails(cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCastData();
  }, [filmId]);

  return (
    <div>
      {error !== null && (
        <p className="c-error">
          Oops, some error occured. Please, try again later. Error: {error}
        </p>
      )}
      {isLoading && 'loading'}
      {castDetails !== null && (
        <ul>
          {castDetails.map(actor => (
            <li key={actor.id}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
                    : defaultImg
                }
                width={250}
                alt={`${actor.name} poster`}
              />
              <p>{actor.name}</p>
              <p>Character {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CastInfo;
