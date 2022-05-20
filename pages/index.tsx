import Head from 'next/head'
import { Github } from '@icons-pack/react-simple-icons'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'

const App = () => {
  const { user, isLoading } = useUser()

  return user ? (
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
            await supabaseClient.auth.signIn(
              {
                provider: 'github',
              },
              { redirectTo: window.location.href }
            )
          }}
        >
          <Github />
          <p>Sign in with GitHub</p>
        </button>
      </div>
    </div>
  )

  // if (!user) {
  //   return (
  //     <div className="flex min-h-screen flex-col items-center justify-center py-2">
  //       <Head>
  //         <title>Sign In</title>
  //         <link rel="icon" href="/favicon.ico" />
  //       </Head>
  //       <div className="flex flex-col gap-y-4 rounded-lg bg-gray-200 p-4 text-left">
  //         <h1 className="text-xl font-bold">Sign In</h1>
  //         <button
  //           className="flex transform flex-row gap-2 rounded-lg bg-black p-2 text-white transition hover:scale-105"
  //           onClick={async (e) => {
  //             e.preventDefault()
  //             await supabaseClient.auth.signIn(
  //               {
  //                 provider: 'github',
  //               },
  //               { redirectTo: window.location.href }
  //             )
  //           }}
  //         >
  //           <Github />
  //           <p>Sign in with GitHub</p>
  //         </button>
  //       </div>
  //     </div>
  //   )
  // }

  // return (
  //   <div className="max-w-3/4 flex min-h-screen flex-col py-2">
  //     {isLoading ? null : (
  //       <div>
  //         <Head>
  //           <title>💧 Raindrop</title>
  //         </Head>
  //         <button
  //           className="max-w-fit rounded-lg border-2 border-black bg-black px-2 text-white"
  //           onClick={() => supabaseClient.auth.signOut()}
  //         >
  //           Sign out
  //         </button>
  //         <p>user:</p>
  //         <pre>{JSON.stringify(user, null, 2)}</pre>
  //       </div>
  //     )}
  //   </div>
  // )
}

export default App
