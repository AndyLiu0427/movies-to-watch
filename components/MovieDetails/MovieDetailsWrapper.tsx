'use client'

import { useParams } from 'next/navigation'
import MovieDetails from './MovieDetails'

interface MovieDetailsWrapperProps {
  id?: string
}

export default function MovieDetailsWrapper({ id: propId }: MovieDetailsWrapperProps) {
  const params = useParams()
  const id = propId || params.id as string

  return <MovieDetails id={id} />
}