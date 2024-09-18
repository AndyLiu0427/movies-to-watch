import { useState, useEffect } from 'react'
import { MovieProp } from '@/components/MovieCard'

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<MovieProp[]>([])

  useEffect(() => {
    const storedWatchlist = localStorage.getItem('watchlist')
    if (storedWatchlist) {
      try {
        const parsedWatchlist = JSON.parse(storedWatchlist)
        if (Array.isArray(parsedWatchlist)) {
          setWatchlist(parsedWatchlist.filter((movie): movie is MovieProp => 
            movie !== null && typeof movie === 'object' && 'id' in movie
          ))
        }
      } catch (error) {
        console.error('解析 localStorage 中的 Watchlist 時出錯:', error)
        setWatchlist([])
      }
    }
  }, [])

  const addToWatchlist = (movie: MovieProp) => {
    setWatchlist(prevWatchlist => {
      const updatedWatchlist = [...prevWatchlist, movie]
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist))
      return updatedWatchlist
    })
  }

  const removeFromWatchlist = (movieId: number) => {
    setWatchlist(prevWatchlist => {
      const updatedWatchlist = prevWatchlist.filter(movie => movie.id !== movieId)
      localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist))
      return updatedWatchlist
    })
  }

  const isInWatchlist = (movieId: number) => {
    return watchlist.some(movie => movie && movie.id === movieId)
  }

  return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }
}