import { render, screen, fireEvent, act } from '@testing-library/react'
import { useWatchlist } from '@/hooks/useWatchlist'
import WatchLottery from '@/components/WatchLottery/WatchLottery'
import '@testing-library/jest-dom';

// Mock the hooks
jest.mock('@/hooks/useWatchlist')

const mockWatchlist = [
  { id: 1, title: 'Movie 1', poster_path: '/poster1.jpg', overview: 'Overview 1' },
  { id: 2, title: 'Movie 2', poster_path: '/poster2.jpg', overview: 'Overview 2' },
]

describe('WatchLottery', () => {
  beforeEach(() => {
    (useWatchlist as jest.Mock).mockReturnValue({
      watchlist: mockWatchlist
    })
  })

  it('renders the start button correctly', () => {
    render(<WatchLottery />)
    expect(screen.getByText('Start Watch Lottery')).toBeInTheDocument()
  })

  it('opens the dialog when start button is clicked', () => {
    render(<WatchLottery />)
    fireEvent.click(screen.getByText('Start Watch Lottery'))
    expect(screen.getByText('Watch Lottery')).toBeInTheDocument()
  })

  it('spins the wheel and selects a movie', async () => {
    jest.useFakeTimers()
    render(<WatchLottery />)
    
    fireEvent.click(screen.getByText('Start Watch Lottery'))
    
    await act(async () => {
      jest.advanceTimersByTime(5000)
    })

    expect(screen.getByText('You should watch:')).toBeInTheDocument()
    expect(screen.getByText(/Movie [12]/)).toBeInTheDocument()
    
    jest.useRealTimers()
  })

  it('allows spinning again after a movie is selected', async () => {
    jest.useFakeTimers()
    render(<WatchLottery />)
    
    fireEvent.click(screen.getByText('Start Watch Lottery'))
    
    await act(async () => {
      jest.advanceTimersByTime(5000)
    })

    fireEvent.click(screen.getByText('Spin Again'))
    
    expect(screen.queryByText('You should watch:')).not.toBeInTheDocument()
    
    jest.useRealTimers()
  })
})