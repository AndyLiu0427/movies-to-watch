"use client";

import { useWatchlist } from '@/hooks/useWatchlist';
import MovieCard from '@/components/MovieCard';
import WatchLottery from '@/components/WatchLottery/WatchLottery';

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">My Watchlist</h1>
        {watchlist.length > 0 && <WatchLottery />}
      </div>
      {watchlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} index={0} />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-white">Your watchlist is empty. Add some movies to use the Watch Lottery!</p>
      )}
    </div>
  );
}