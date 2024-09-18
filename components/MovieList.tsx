import { useMemo } from 'react'
import { useInView } from "react-intersection-observer"
import MovieCard, { MovieProp } from "@/components/MovieCard"
import Image from "next/image"

interface MovieListProps {
  movies: MovieProp[]
  sortBy: string
  isAsc: boolean
  loadMore: () => Promise<void>
  hasMore: boolean
}

export default function MovieList({ movies, sortBy, isAsc, loadMore, hasMore }: MovieListProps) {
  const { ref, inView } = useInView()

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

  if (inView && hasMore) {
    loadMore()
  }

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {sortedMovies.map((movie: MovieProp, index: number) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </section>
      <section className="flex justify-center items-center w-full">
        {hasMore ? (
          <div ref={ref}>
            <Image
              src="./spinner.svg"
              alt="spinner"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
        ) : (
          <div>No more movies to load</div>
        )}
      </section>
    </>
  )
}