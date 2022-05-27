import Head from 'next/head'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import SignIn from '../components/sign-in'
import { useEffect, useState } from 'react'
import isInOrg from '../lib/is-in-org'
import NotInOrg from '../components/not-in-org'
import { createUser, userIsInDb } from '../lib/manage-user'
import User from '../components/user'

const App = () => {
  const { user, isLoading } = useUser()
  const username = user?.user_metadata.user_name
  const [inOrg, setInOrg] = useState(false)

  useEffect(() => {
    isInOrg(username).then((org) => setInOrg(org))
    const { data } = supabaseClient.auth.onAuthStateChange((event, session) => {
      fetch('/api/auth', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ event, session })
      }).then((res) => res.json())
    })
  }, [user])

  return user ? inOrg ? isLoading ? null : <User /> : <NotInOrg /> : <SignIn />
}

export default App
