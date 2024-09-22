"use client";

import Image from 'next/image'
import { MotionDiv } from './MotionDiv/MotionDiv'
import { useWatchlist } from '@/hooks/useWatchlist'
import { Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useId } from 'react'
import { useAuth } from '@/context/AuthContextType'
import { Button } from './ui/button';

export interface MovieProp {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
}

interface Prop {
  movie: MovieProp;
  index: number;
}

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function MovieCard({ movie, index }: Prop) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist()
  const router = useRouter()
  const uniqueId = useId()
  const { user } = useAuth()

  if (!movie || typeof movie !== 'object' || !('id' in movie)) {
    return null
  }

  const handleWatchlistClick = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!user) {
      // Redirect to login or show login modal
      return
    }
    if (isInWatchlist(movie.id)) {
      await removeFromWatchlist(movie.id)
    } else {
      await addToWatchlist(movie)
    }
  }

  const handleCardClick = () => {
    router.push(`/movie/${movie.id}`)
  }

  const isWatchlisted = isInWatchlist(movie.id)

  return (
    <MotionDiv
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * 0.25,
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
      className="max-w-sm rounded relative w-full cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
        <div className="relative aspect-[2/3]">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 font-bold rounded-full px-2 py-1 text-sm">
            {movie.vote_average.toFixed(1)}
          </div>
          <Button
            className="absolute top-2 left-2 p-1 rounded-full bg-gray-800 bg-opacity-50 transition-colors duration-200"
            onClick={handleWatchlistClick}
            id={`watchlist-button-${uniqueId}`}
            aria-label="Like"
          >
            <Star
              size={24}
              className={`${isWatchlisted ? 'text-yellow-400' : 'text-gray-300'} transition-colors duration-200`}
              fill={isWatchlisted ? 'currentColor' : 'none'}
            />
          </Button>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2 truncate">{movie.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{movie.release_date}</p>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-3">{movie.overview}</p>
        </div>
      </div>
    </MotionDiv>
  );
}

export default MovieCard;