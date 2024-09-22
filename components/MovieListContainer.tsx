'use client';

import { useState, useCallback } from 'react'
import SortControls from './shared/sort/SortControls'
import { MovieProp } from "@/components/MovieCard"
import { fetchMovies } from "@/services/api"
import dynamic from 'next/dynamic';
import { Movie } from '@/types/movie';

interface MovieListContainerProps {
  initialData: Array<Movie>;
  query: string
}

const MovieList = dynamic(() => import('./MovieList'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-900" />
})

export default function MovieListContainer({ initialData, query }: MovieListContainerProps) {
  const [movies, setMovies] = useState<MovieProp[]>(initialData)
  const [sortBy, setSortBy] = useState('')
  const [isAsc, setIsAsc] = useState(true)
  const [page, setPage] = useState(2)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleSortChange = (newSortBy: string, newIsAsc: boolean) => {
    setSortBy(newSortBy)
    setIsAsc(newIsAsc)
  }

  const loadMoreMovies = useCallback(async () => {
    if (isLoading) return
    setIsLoading(true)
    try {
      const newMovies = await fetchMovies(page)
      if (newMovies.length === 0) {
        setHasMore(false)
      } else {
        setMovies(prevMovies => [...prevMovies, ...newMovies])
        setPage(prevPage => prevPage + 1)
      }
    } catch (err) {
      console.error("載入更多電影時出錯:", err)
      setHasMore(false)
    } finally {
      setIsLoading(false)
    }
  }, [page, query, isLoading])

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl text-white font-bold mb-4 sm:mb-0">
            {query ? `搜索結果: "${query}"` : "探索電影"}
          </h2>
          <SortControls
            onSortChange={handleSortChange}
            currentSort={sortBy}
            isAsc={isAsc}
          />
        </div>
        <MovieList
          initialMovies={movies}
          sortBy={sortBy}
          isAsc={isAsc}
          loadMore={loadMoreMovies}
          hasMore={hasMore}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}