"use server";

import MovieCard, { MovieProp } from "@/components/MovieCard";
import { MovieDetails } from "@/types/movie";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

if (!API_KEY) {
  throw new Error('TMDB API key is not defined');
}

const headers = {
  'accept': 'application/json',
  'Authorization': `Bearer ${API_TOKEN}`,
};

async function fetchTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  if (!API_KEY) {
    throw new Error('TMDB API key is not defined');
  }

  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.append(key, value);
  }

  const response = await fetch(url.toString(), { headers });
  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export async function fetchMovies(page: number): Promise<MovieProp[]> {
  try {
    const data = await fetchTMDB<{ results: MovieProp[] }>('/movie/popular', { page: page.toString() })
    return data.results
  } catch (error) {
    console.error('Error fetching movies:', error)
    throw error
  }
}

export async function searchMovies(query: string, page = 1) {
  try {
    return await fetchTMDB<{ results: MovieProp[] }>('/search/movie', { query, page: page.toString() });
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
}

export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  try {
    return await fetchTMDB<MovieDetails>(`/movie/${movieId}`);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
}