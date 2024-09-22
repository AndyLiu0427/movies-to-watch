"use client";

import { useMemo, useEffect, useState } from 'react'
import { useInView } from "react-intersection-observer"
import MovieCard, { MovieProp } from "@/components/MovieCard"
import Image from "next/image"

interface MovieListProps {
  initialMovies: MovieProp[]
  sortBy: string
  isAsc: boolean
  loadMore: () => Promise<void>
  hasMore: boolean
  isLoading: boolean
}

export default function MovieList({ initialMovies, sortBy, isAsc, loadMore, hasMore, isLoading }: MovieListProps) {
  const [movies, setMovies] = useState<MovieProp[]>([]);
  const { ref, inView } = useInView()

  useEffect(() => {
    setMovies(initialMovies);
  }, [initialMovies]);

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMore()
    }
  }, [inView, hasMore, isLoading, loadMore])

  const sortedMovies = useMemo(() => {
    if (!sortBy) return movies

    return [...movies].sort((a: MovieProp, b: MovieProp) => {
      if (sortBy === 'vote_average') {
        return isAsc ? a.vote_average - b.vote_average : b.vote_average - a.vote_average
      } else if (sortBy === 'release_date') {
        return isAsc
          ? new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
          : new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      }
      return 0
    })
  }, [movies, sortBy, isAsc])

  const placeholderCards = useMemo(() => {
    return Array(8).fill(0).map((_, index) => (
      <div key={`placeholder-${index}`} className="rounded-lg overflow-hidden aspect-[2/3] animate-pulse" />
    ))
  }, [])

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {sortedMovies.map((movie: MovieProp, index: number) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
        {isLoading && placeholderCards}
      </section>
      <section className="flex justify-center items-center w-full h-20 mt-8">
        {hasMore ? (
          <div ref={ref}>
            <Image
              src="/spinner.svg"
              alt="載入中"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
        ) : (
          <div className="text-white">沒有更多電影了</div>
        )}
      </section>
    </>
  )
}