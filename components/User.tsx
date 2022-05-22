import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import isInOrg from '../lib/is-in-org'
import { userIsInDb } from '../lib/manage-user'

const User = () => {
  const { user } = useUser()
  const username = user?.user_metadata.user_name
  const [data, setData] = useState(null)
  const [isInDb, setIsInDb] = useState(false)

  useEffect(() => {
    userIsInDb(username).then((r) => setIsInDb(r))

    const loadData = async () => {
      const { data, error } = await supabaseClient
        .from('users')
        .select('*')
        .single()
      if (error) console.log(error)
      setData(data)
    }
    if (user) {
      loadData()
    }
  }, [user])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black py-2 text-white">
      <Head>
        <title>💧 Raindrop</title>
      </Head>
      <button
        className="max-w-fit rounded-lg border-2 border-white bg-white px-2 text-black"
        onClick={() => supabaseClient.auth.signOut()}
      >
        Sign out
      </button>
      <div className="flex flex-col gap-4 overflow-y-auto sm:flex-row">
        <div className="max-w-xs rounded bg-gray-800 sm:max-w-lg">
          <p>user:</p>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
        <div className="max-w-xs rounded bg-gray-800 sm:max-w-lg">
          <p>data:</p>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default User
