import { Github } from '@icons-pack/react-simple-icons'
import { supabase } from '../lib/supabase'
import Head from 'next/head'

const SignIn = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-black py-2 text-white">
    <Head>
      <title>Sign In</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="flex flex-col gap-y-4 rounded-lg bg-gray-700 p-4 text-left">
      <h1 className="text-xl font-bold">Sign In</h1>
      <button
        className="flex transform flex-row gap-2 rounded-lg bg-black p-2 text-white transition hover:scale-105"
        onClick={async (e) => {
          e.preventDefault()
          await supabase.auth.signIn(
            {
              provider: 'github'
            },
            { redirectTo: window.location.href + '/dashboard' }
          )
        }}
      >
        <Github />
        <p>Sign in with GitHub</p>
      </button>
    </div>
  </div>
)

export default SignIn
