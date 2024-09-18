'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContextType'
import SearchBar from '../search/SearchBar'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LogOut, User, Menu, Clapperboard } from 'lucide-react'

export const Navbar = () => {
  const { user, signOut, signIn } = useAuth()
  const router = useRouter()
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handleLogout = async () => {
    await signOut()
    router.push('/')
    setIsSheetOpen(false)
  }

  const NavItems = () => (
    <>
      {user ? (
        <>
          {/* <Button onClick={() => router.push('/profile')} variant="ghost">
            <User className="mr-2 h-4 w-4" />
            <span>個人資料</span>
          </Button> */}
          <Button onClick={() => router.push('/watchlist')} variant="ghost">
            <Clapperboard className="mr-2 h-4 w-4" />
            <span>待看清單</span>
          </Button>
          <Button onClick={handleLogout} variant="ghost">
            <LogOut className="mr-2 h-4 w-4" />
            <span>登出</span>
          </Button>
        </>
      ) : (
        <Button onClick={signIn} variant="secondary">
          登入
        </Button>
      )}
    </>
  )

  return (
    <nav className="bg-gray-800 text-white fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-xl text-white font-bold">電影資料庫</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
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
          <div className="ml-4 flex items-center">
            <div className="md:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[250px] sm:w-[400px] p">
                  <nav className="flex flex-col space-y-4">
                    <NavItems />
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
            <div className="hidden md:block">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User avatar"} />
                        <AvatarFallback>{user.displayName?.[0] || "U"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    {/* <DropdownMenuItem onClick={() => router.push('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>個人資料</span>
                    </DropdownMenuItem> */}
                    <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/watchlist')}>
                      <Clapperboard className="mr-2 h-4 w-4" />
                      <span>待看清單</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>登出</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={signIn} variant="secondary">
                  登入
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}