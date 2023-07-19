import { NavLink, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const HomePage = lazy(() => import('pages/HomePage'));
const MoviesPage = lazy(() => import('pages/MoviesPage'));
const MoviesDetails = lazy(() => import('pages/MoviesDetails'));

export const App = () => {
  return (
    <div>
      <header>
        <nav className="menu">
          <NavLink to="/">Home</NavLink>

          <NavLink to="/movies">Movies</NavLink>
        </nav>
      </header>
      <main>
        <Suspense fallback={'loading'}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:filmId/*" element={<MoviesDetails />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};
