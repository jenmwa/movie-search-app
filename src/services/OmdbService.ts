import axios from "axios"
import type { IMovie } from '../models/IMovie';

const API_URL = 'https://www.omdbapi.com/?';

export const getMovies = async (searchText: string): Promise<IMovie[]> => {
  const response = await axios.get(`${API_URL}s=${searchText}&apikey=5eed9320`);
  return response.data.Search;
}

export const getMoviePlot = async (imdbID: string) => {
  const movieResponse = await axios.get(`${API_URL}i=${imdbID}&apikey=5eed9320`);
  return movieResponse.data.Plot;
}
