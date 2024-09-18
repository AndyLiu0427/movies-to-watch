import { Suspense } from 'react'
import MovieListContainer from '@/components/MovieListContainer'
import { fetchMovies, searchMovies } from "@/services/api"
import Loading from '@/app/feed/loading'

export default async function Home({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q
  const initialData = query
    ? await searchMovies(query)
    : await fetchMovies(1)

  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <Suspense fallback={<Loading />}>
        <MovieListContainer
          initialData={initialData}
          query={query}
        />
      </Suspense>
    </main>
  )
}