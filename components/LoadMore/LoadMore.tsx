"use client";

import { fetchMovies } from "@/services/api";
import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import MovieCard, { MovieProp } from "@/components/MovieCard";

function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<MovieProp[]>([]);
  const [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);

  const loadMoreMovies = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const newMovies = await fetchMovies(page);
      if (newMovies.length === 0) {
        setHasMore(false);
      } else {
        setData(prevData => [...prevData, ...newMovies]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (err) {
      setError("Failed to load more movies. Please try again.");
      console.error("Error loading more movies:", err);
    } finally {
      setIsLoading(false);
      loadingRef.current = false;
    }
  }, [page, hasMore]);

  useEffect(() => {
    if (inView && !isLoading && hasMore) {
      loadMoreMovies();
    }
  }, [inView, isLoading, hasMore, loadMoreMovies]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} />
        ))}
      </section>
      <section className="flex justify-center items-center w-full">
        {isLoading ? (
          <div>
            <Image
              src="./spinner.svg"
              alt="spinner"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : hasMore ? (
          <div ref={ref}></div>
        ) : (
          <div>No more movies to load</div>
        )}
      </section>
    </>
  );
}

export default LoadMore;