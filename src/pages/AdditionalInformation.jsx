import React, { Suspense, lazy } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

const CastInfo = lazy(() => import('./CastInfo'));
const ReviewFilm = lazy(() => import('./ReviewFilm'));

const AdditionalInformation = () => {
  return (
    <div>
      <h3>Additional information</h3>
      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="review">Review</NavLink>
        </li>
      </ul>
      <Suspense fallback={'loading'}>
        <Routes>
          <Route path="cast" element={<CastInfo />} />
          <Route path="review" element={<ReviewFilm />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default AdditionalInformation;
