import { useRouter } from 'next/router'
import { Home, LogOut } from 'react-feather'
import { supabase } from '../lib/supabase'

const Nav = () => {
  const router = useRouter()
  return (
    <nav className="w-full bg-gray-800 font-bold">
      <div className="container mx-auto flex items-center px-4 sm:px-14">
        <p>💧 Raindrop</p>
        <div className="grow" />
        <div className="flex flex-row gap-2">
          <a href="https://purduehackers.com">
            <button className="pill-button">
              <Home size={20} />
              <p>Home</p>
            </button>
          </a>
          <button
            className="pill-button"
            onClick={() => {
              supabase.auth.signOut()
              router.replace('/')
            }}
          >
            <LogOut size={20} />
            <p>Sign Out</p>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Nav
