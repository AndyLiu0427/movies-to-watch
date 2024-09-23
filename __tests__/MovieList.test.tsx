import MovieList from '@/components/MovieList'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { useInView } from 'react-intersection-observer'
import '@testing-library/jest-dom';
import { MovieProp } from '@/components/MovieCard';

// Mock the hooks and components
jest.mock('react-intersection-observer')
jest.mock('./MovieCard', () => {
  return function MockMovieCard({ movie }: { movie: MovieProp }) {
    return <div data-testid={`movie-card-${movie.id}`}>{movie.title}</div>
  }
})

const mockMovies = [
  { id: 1, title: 'Movie 1', vote_average: 8, release_date: '2023-01-01' },
  { id: 2, title: 'Movie 2', vote_average: 7, release_date: '2023-02-01' },
]

describe('MovieList', () => {
  beforeEach(() => {
    (useInView as jest.Mock).mockReturnValue({ ref: jest.fn(), inView: false })
  })

  it('renders initial movies correctly', () => {
    render(
      <MovieList
        initialMovies={mockMovies}
        sortBy=""
        isAsc={true}
        loadMore={jest.fn()}
        hasMore={true}
        isLoading={false}
      />
    )
    
    expect(screen.getByTestId('movie-card-1')).toBeInTheDocument()
    expect(screen.getByTestId('movie-card-2')).toBeInTheDocument()
  })

  it('sorts movies by vote average when sortBy is set', () => {
    render(
      <MovieList
        initialMovies={mockMovies}
        sortBy="vote_average"
        isAsc={false}
        loadMore={jest.fn()}
        hasMore={true}
        isLoading={false}
      />
    )
    
    const movieCards = screen.getAllByTestId(/movie-card-/)
    expect(movieCards[0]).toHaveTextContent('Movie 1')
    expect(movieCards[1]).toHaveTextContent('Movie 2')
  })

  it('calls loadMore when in view and has more movies', async () => {
    const mockLoadMore = jest.fn()
    ;(useInView as jest.Mock).mockReturnValue({ ref: jest.fn(), inView: true })

    render(
      <MovieList
        initialMovies={mockMovies}
        sortBy=""
        isAsc={true}
        loadMore={mockLoadMore}
        hasMore={true}
        isLoading={false}
      />
    )

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(mockLoadMore).toHaveBeenCalled()
  })
})