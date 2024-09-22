import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="sm:px-16 py-4 px-8 flex justify-between items-center gap-2 flex-wrap bg-[#161921]">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-white text-xl font-bold mb-2">Movie Database</h3>
            <p className="text-gray-400">Your ultimate source for movie information.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-white text-lg font-semibold mb-2">Quick Links</h4>
            <ul>
              <li className="mb-2">
                <Link href="/" className="text-gray-400 hover:text-white transition duration-200">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/watchlist" className="text-gray-400 hover:text-white transition duration-200">
                  Watchlist
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-6">
            <Image
              src="./tiktok.svg"
              alt="logo"
              width={24}
              height={24}
              className="object-contain"
            />
            <Image
              src="./instagram.svg"
              alt="logo"
              width={24}
              height={24}
              className="object-contain"
            />
            <Image
              src="./twitter.svg"
              alt="logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Movie Database. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}