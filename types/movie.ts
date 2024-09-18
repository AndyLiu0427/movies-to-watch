export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  release_date: string
  vote_average: number
}

export interface MovieDetails extends Movie {
  runtime: number
  genres: { id: number; name: string }[]
  credits: {
    cast: {
      id: number
      name: string
      character: string
      profile_path: string | null
    }[]
  }
  reviews: {
    results: {
      id: string
      author: string
      content: string
      created_at: string
    }[]
  }
}