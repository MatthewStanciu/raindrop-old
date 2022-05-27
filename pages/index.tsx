import { useUser } from '@supabase/ui/dist/cjs/components/Auth/UserContext'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'
import SignIn from '../components/sign-in'
import { supabase } from '../lib/supabase'

const fetcher = (url: string, token: string) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin'
  }).then((res) => res.json())

const Index = () => {
  const { user, session } = useUser()
  const { data, error } = useSWR(
    session ? ['/api/getUser', session.access_token] : null,
    fetcher
  )
  const router = useRouter()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        fetch('/api/auth', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ event, session })
        }).then((res) => res.json())
      }
    )
    return () => {
      authListener?.unsubscribe()
    }
  })

  if (user && data) {
    router.replace('/dashboard')
  }

  return (
    <div>
      {!user ? <SignIn /> : <div>{!data && !error && <p>Loading...</p>}</div>}
    </div>
  )
}

export default Index
