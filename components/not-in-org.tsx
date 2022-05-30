import { supabase } from '../lib/supabase'
import Head from 'next/head'
import { useRouter } from 'next/router'

const NotInOrg = () => {
  const router = useRouter()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black py-2 text-white">
      <Head>
        <title>💧 Raindrop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex max-w-xs flex-col gap-y-4 rounded-lg bg-gray-700 p-4 text-left sm:max-w-lg">
        <h1 className="text-2xl font-bold">
          You have to be in the GitHub org!
        </h1>
        <p>
          Raindrop is restricted to Purdue Hackers members. You need to be a
          member of our GitHub organization in order to use it. If you're a
          member of Purdue Hackers and want access, DM{' '}
          <code>hewillyeah#5663</code> on Discord.
        </p>
        <p>
          If you're seeing this message and you know you're in the GitHub org,
          sign out & sign back in. If you've done that and you're still seeing
          this, DM Matthew.
        </p>
        <button
          className="mx-auto flex transform flex-row gap-2 rounded-lg bg-amber-500 p-2 font-bold text-black transition hover:scale-105"
          onClick={(e) => {
            e.preventDefault()
            supabase.auth.signOut()
            router.replace('/')
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default NotInOrg
