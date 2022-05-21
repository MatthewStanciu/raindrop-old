import Head from 'next/head'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import SignIn from '../components/SignIn'
import { useEffect, useState } from 'react'
import isInOrg from '../lib/is-in-org'
import NotInOrg from '../components/NotInOrg'

const App = () => {
  const { user, isLoading } = useUser()
  const [inOrg, setInOrg] = useState(false)
  useEffect(() => {
    isInOrg(user?.user_metadata.user_name).then((org) => setInOrg(org))
  })

  return user ? (
    inOrg ? (
      <div className="max-w-3/4 flex min-h-screen flex-col bg-black py-2 text-white">
        {isLoading ? null : (
          <div>
            <Head>
              <title>💧 Raindrop</title>
            </Head>
            <button
              className="max-w-fit rounded-lg border-2 border-white bg-white px-2 text-black"
              onClick={() => supabaseClient.auth.signOut()}
            >
              Sign out
            </button>
            <p>user:</p>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        )}
      </div>
    ) : (
      <NotInOrg />
    )
  ) : (
    <SignIn />
  )
}

export default App
