import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import CastInfo from './CastInfo';
import ReviewFilm from './ReviewFilm';

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
      <Routes>
        <Route path="cast" element={<CastInfo />} />
        <Route path="review" element={<ReviewFilm />} />
      </Routes>
    </div>
  );
};

export default AdditionalInformation;
