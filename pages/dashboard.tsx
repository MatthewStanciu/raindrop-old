import { User } from '@supabase/supabase-js'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { supabase } from '../lib/supabase'
import isInOrg from '../lib/is-in-org'
import NotInOrg from '../components/not-in-org'
import Nav from '../components/nav'

const Dashboard = ({ user, inOrg }: { user: User; inOrg: boolean }) => {
  const router = useRouter()

  if (!inOrg) {
    return <NotInOrg />
  }

  return (
    <div className="flex min-h-screen flex-col gap-2 bg-black text-white">
      <Head>
        <title>💧 Raindrop</title>
      </Head>
      <Nav />
      <div className="flex flex-col items-center">
        <h1 className="mb-6 text-center text-4xl font-bold">
          User Data (Placeholder)
        </h1>
        <div className="flex h-96 flex-col gap-4 overflow-y-auto sm:flex-row">
          <div className="max-w-xs rounded bg-gray-800 before:bg-gray-800 sm:max-w-lg">
            <p>user: {user.email}</p>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  if (!user) {
    return { props: {}, redirect: { destination: '/', permanent: false } }
  }

  const inOrg = await isInOrg(user.user_metadata.user_name)

  return { props: { user, inOrg } }
}

export default Dashboard
