import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReview } from 'services/api';

const ReviewFilm = () => {
  const [reviewDetails, setReviewDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { filmId } = useParams();

  useEffect(() => {
    if (!filmId) return;

    const fetchReviewData = async () => {
      try {
        setIsLoading(true);

        const response = await fetchReview(filmId);
        const review = response.results;

        console.log(review);

        setReviewDetails(review);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviewData();
  }, [filmId]);

  return (
    <div>
      {error !== null && (
        <p className="c-error">
          Oops, some error occured. Please, try again later. Error: {error}
        </p>
      )}
      {isLoading && 'loading'}
      {reviewDetails !== null && reviewDetails.length > 0 ? (
        <ul>
          {reviewDetails.map(review => (
            <li key={review.author}>
              <p>Author: {review.author}</p>
              <p> {review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don`t have any reviews on this film</p>
      )}
    </div>
  );
};

export default ReviewFilm;
