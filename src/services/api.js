import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODFiOTNjOWNiNzM1YjQ2YmZjNzYyYTU3YmMzMzg4OCIsInN1YiI6IjY0NzhkYTNlOWI2ZTQ3MDBhODVjOGUxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hNQAuTurNSvl2yPHE81cICxQcxaFUTSxDM-jR61Com4',
    accept: 'application/json',
  },
};

export const fetchTrendingToday = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/trending/movie/day?language=en-US`,
      options
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
