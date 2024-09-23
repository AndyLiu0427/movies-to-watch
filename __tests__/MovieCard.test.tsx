import { render, screen, fireEvent } from '@testing-library/react'
import { useWatchlist } from '@/hooks/useWatchlist'
import { useAuth } from '@/context/AuthContextType'
import { useRouter } from 'next/navigation'
import MovieCard from '@/components/MovieCard'
import '@testing-library/jest-dom'

// Mock the hooks
jest.mock('@/hooks/useWatchlist')
jest.mock('@/context/AuthContextType')
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}))

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/test-poster.jpg',
  vote_average: 8.5,
  release_date: '2023-01-01',
  overview: 'This is a test movie'
}

describe('MovieCard', () => {
  beforeEach(() => {
    (useWatchlist as jest.Mock).mockReturnValue({
      addToWatchlist: jest.fn(),
      removeFromWatchlist: jest.fn(),
      isInWatchlist: jest.fn().mockReturnValue(false)
    })
    ;(useAuth as jest.Mock).mockReturnValue({
      user: { id: 'testuser' }
    })
    ;(useRouter as jest.Mock).mockReturnValue({
      push: jest.fn()
    })
  })

  it('renders movie information correctly', () => {
    render(<MovieCard movie={mockMovie} index={0} />)
    
    expect(screen.getByText('Test Movie')).toBeInTheDocument()
    expect(screen.getByText('2023-01-01')).toBeInTheDocument()
    expect(screen.getByText('8.5')).toBeInTheDocument()
  })

  it('calls addToWatchlist when watchlist button is clicked', () => {
    const mockAddToWatchlist = jest.fn()
    ;(useWatchlist as jest.Mock).mockReturnValue({
      addToWatchlist: mockAddToWatchlist,
      removeFromWatchlist: jest.fn(),
      isInWatchlist: jest.fn().mockReturnValue(false)
    })

    render(<MovieCard movie={mockMovie} index={0} />)
    
    const watchlistButton = screen.getByLabelText('Like')
    fireEvent.click(watchlistButton)

    expect(mockAddToWatchlist).toHaveBeenCalledWith(mockMovie)
  })

  it('navigates to movie details page when card is clicked', () => {
    const mockPush = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush
    })

    render(<MovieCard movie={mockMovie} index={0} />)
    
    const card = screen.getByText('Test Movie').closest('div')
    if (card) {
      fireEvent.click(card)
      expect(mockPush).toHaveBeenCalledWith('/movie/1')
    } else {
      throw new Error('Card element not found')
    }

    expect(mockPush).toHaveBeenCalledWith('/movie/1')
  })
})