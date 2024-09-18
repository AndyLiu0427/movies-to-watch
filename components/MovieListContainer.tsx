'use client'

import { useState, useCallback } from 'react'
import SortControls from './shared/sort/SortControls'
import MovieList from './MovieList'
import { MovieProp } from "@/components/MovieCard"
import { fetchMovies } from "@/services/api"

interface MovieListContainerProps {
  initialData: any
  query: string
}

export default function MovieListContainer({ initialData, query }: MovieListContainerProps) {
  const [movies, setMovies] = useState<MovieProp[]>(initialData.results || initialData)
  const [sortBy, setSortBy] = useState('')
  const [isAsc, setIsAsc] = useState(true)
  const [page, setPage] = useState(2)
  const [hasMore, setHasMore] = useState(true)

  const handleSortChange = (newSortBy: string, newIsAsc: boolean) => {
    setSortBy(newSortBy)
    setIsAsc(newIsAsc)
  }

  const loadMoreMovies = useCallback(async () => {
    try {
      const newMovies = await fetchMovies(page)
      if (newMovies.length === 0) {
        setHasMore(false)
      } else {
        setMovies(prevMovies => [...prevMovies, ...newMovies])
        setPage(prevPage => prevPage + 1)
      }
    } catch (err) {
      console.error("Error loading more movies:", err)
      setHasMore(false)
    }
  }, [page])

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl text-white font-bold">
          {query ? `搜索結果: "${query}"` : "探索電影"}
        </h2>
        <SortControls
          onSortChange={handleSortChange}
          currentSort={sortBy}
          isAsc={isAsc}
        />
      </div>
      <MovieList
        movies={movies}
        sortBy={sortBy}
        isAsc={isAsc}
        loadMore={loadMoreMovies}
        hasMore={hasMore}
      />
    </>
  )
}