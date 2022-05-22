import Head from 'next/head'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import SignIn from '../components/SignIn'
import { useEffect, useState } from 'react'
import isInOrg from '../lib/is-in-org'
import NotInOrg from '../components/NotInOrg'
import { createUser, userIsInDb } from '../lib/manage-user'
import User from '../components/User'

const App = () => {
  const { user, isLoading } = useUser()
  const username = user?.user_metadata.user_name
  const [inOrg, setInOrg] = useState(false)

  useEffect(() => {
    isInOrg(username).then((org) => setInOrg(org))
  }, [user])

  return user ? inOrg ? isLoading ? null : <User /> : <NotInOrg /> : <SignIn />
}

export default App
