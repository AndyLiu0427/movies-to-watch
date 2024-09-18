import { useWatchlist } from '../hooks/useWatchlist'
import { Movie } from '../types/movie'

type WatchlistButtonProps = {
  movie: Movie
}

function WatchlistButton({ movie }: WatchlistButtonProps) {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist()
  const isInWatchlist = watchlist.some((m) => m.id === movie.id)

  const handleClick = () => {
    if (isInWatchlist) {
      removeFromWatchlist(movie.id)
    } else {
      addToWatchlist(movie)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded-full ${
        isInWatchlist ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
      }`}
    >
      {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
    </button>
  )
}

export default WatchlistButton