import { useState, useEffect } from 'react'
import { MovieProp } from '@/components/MovieCard'
import { useAuth } from '@/context/AuthContextType'
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from '@/lib/firebase' // Ensure you've exported Firestore instance as 'db'

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<MovieProp[]>([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      const fetchWatchlist = async () => {
        const docRef = doc(db, 'watchlists', user.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setWatchlist(docSnap.data().movies)
        } else {
          setWatchlist([])
          await setDoc(docRef, { movies: [] })
        }
      }

      fetchWatchlist()
    } else {
      setWatchlist([])
    }
  }, [user])

  const addToWatchlist = async (movie: MovieProp) => {
    if (user) {
      try {
        const docRef = doc(db, 'watchlists', user.uid)
        await setDoc(docRef, {
          movies: arrayUnion(movie)
        }, { merge: true })
        setWatchlist(prev => [...prev, movie])
      } catch (error) {
        console.error('Error adding to watchlist:', error)
      }
    }
  }

  const removeFromWatchlist = async (movieId: number) => {
    if (user) {
      const docRef = doc(db, 'watchlists', user.uid)
      const movieToRemove = watchlist.find(m => m.id === movieId)
      if (movieToRemove) {
        await updateDoc(docRef, {
          movies: arrayRemove(movieToRemove)
        })
        setWatchlist(prev => prev.filter(m => m.id !== movieId))
      }
    }
  }

  const isInWatchlist = (movieId: number) => {
    return watchlist.some(movie => movie && movie.id === movieId)
  }

  return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }
}