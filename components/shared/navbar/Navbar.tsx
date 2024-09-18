'use client'

import Link from 'next/link'
import SearchBar from '../search/SearchBar'

export const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-xl text-white font-bold">電影資料庫</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/watchlist" className="hover:text-yellow-400 px-3 py-2 rounded-md text-sm text-white font-medium">
                  待看清單
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}