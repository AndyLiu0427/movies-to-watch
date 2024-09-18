'use client'

import { useEffect } from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import { getMovieDetails } from '@/services/api'
import { useWatchlist } from '@/hooks/useWatchlist'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Loading from '@/app/feed/loading'

interface MovieDetailsProps {
  id: string
}

export default function MovieDetails({ id }: MovieDetailsProps) {
  const { data: movie, error } = useSWR(`/movie/${id}`, () => getMovieDetails(id))
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()

  useEffect(() => {
    if (error) console.error('Error fetching movie details:', error)
  }, [error])

  if (error) return <div>Failed to load movie details</div>
  if (!movie) return <Loading />

  const isWatchlisted = isInWatchlist(parseInt(id))

  const handleWatchlistClick = () => {
    if (isWatchlisted) {
      removeFromWatchlist(parseInt(id))
    } else {
      addToWatchlist(movie)
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/3 relative">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={500}
          height={750}
          layout="responsive"
          className="rounded-lg shadow-lg"
        />
        <Button
          onClick={handleWatchlistClick}
          className="absolute top-4 left-4 bg-gray-800 bg-opacity-70 hover:bg-opacity-100"
          variant="link" size="icon"
        >
          <Star
            size={20}
            className={`${isWatchlisted ? 'text-yellow-400' : 'text-gray-300'} transition-colors duration-200`}
            fill={isWatchlisted ? 'currentColor' : 'none'}
          />
        </Button>
      </div>
      <div className="md:w-2/3">
        <h1 className="text-3xl text-white font-bold mb-4">{movie.title}</h1>
        <p className="text-gray-300 mb-4">{movie.overview}</p>
        <div className="mb-4 text-white">
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
          <p><strong>Rating:</strong> {movie.vote_average.toFixed(1)}/10</p>
          <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
        </div>
      </div>
    </div>
  )
}