'use client'

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useAuth } from '@/context/AuthContextType'

export default function LoginButton() {
  const { user, loading } = useAuth()

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error('Error signing in with Google', error)
    }
  }

  const handleLogout = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error('Error signing out', error)
    }
  }

  if (loading) {
    return <button className="bg-gray-200 text-gray-400 px-4 py-2 rounded" disabled>Loading...</button>
  }

  if (user) {
    return (
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200">
        登出
      </button>
    )
  }

  return (
    <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-200">
      使用 Google 登入
    </button>
  )
}