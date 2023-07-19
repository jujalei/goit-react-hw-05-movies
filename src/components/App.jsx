import { NavLink, Route, Routes } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import MoviesPage from 'pages/MoviesPage';
import MoviesDetails from 'pages/MoviesDetails';

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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:filmId/*" element={<MoviesDetails />} />
        </Routes>
      </main>
    </div>
  );
};
