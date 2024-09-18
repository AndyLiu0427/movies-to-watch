import { Suspense } from 'react'
import MovieDetailsWrapper from '@/components/MovieDetails/MovieDetailsWrapper'
import Loading from '@/app/feed/loading'

export default function MoviePage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<Loading />}>
        <MovieDetailsWrapper id={params.id} />
      </Suspense>
    </div>
  )
}