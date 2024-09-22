import { Suspense } from 'react'
import MovieListContainer from '@/components/MovieListContainer'
import { fetchMovies, searchMovies } from "@/services/api"
import Loading from '@/app/feed/loading'
import { MovieProp } from '@/components/MovieCard'

export default async function Home({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q
  const initialData = query
    ? await searchMovies(query)
    : await fetchMovies(1)
  
  // 确保 initialData 是 MovieProp 数组
  const movies: MovieProp[] = Array.isArray(initialData)
    ? initialData // 如果是数组，直接使用
    : initialData.results; // 如果是对象，使用 results 属性

    return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <Suspense fallback={<Loading />}>
        <MovieListContainer
          initialData={movies}
          query={query}
        />
      </Suspense>
    </main>
  )
}