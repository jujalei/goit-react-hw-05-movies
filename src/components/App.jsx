import { NavLink, Route, Routes } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import MoviesPage from 'pages/MoviesPage';
import MoviesDetails from 'pages/MoviesDetails';

export const App = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/movies">Movies</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:moviesId/*" element={<MoviesDetails />} />
        </Routes>
      </main>
    </div>
  );
};
