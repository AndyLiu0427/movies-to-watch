import useSWR from 'swr'
import { searchMovies, discoverMovies } from '../services/api'

export const useMovies = (query: string, page: number) => {
  const { data, error } = useSWR(
    [`/movies`, query, page],
    () => query ? searchMovies(query, page) : discoverMovies(page),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  return {
    movies: data?.results ?? [],
    totalPages: data?.total_pages ?? 0,
    isLoading: !error && !data,
    isError: error,
  }
}