import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { GetServerSideProps } from 'next'
import supabaseAdmin from '../lib/supabase-admin'

const Dashboard = ({ user, data }: { user: any; data: any }) => {
  return (
    <div>
      <p>Data: {data}</p>
      <p>User: {user}</p>
    </div>
  )
}

const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.req)
  const { user, token } = await supabaseClient.auth.api.getUserByCookie(
    context.req
  )
  if (token) {
    supabaseClient.auth.setAuth(token)
  }

  if (!user) {
    return { props: {}, redirect: { destination: '/', permanent: false } }
  }

  const { data, error } = await supabaseAdmin.from('users').select('*').single()
  if (error) console.log(error)
  console.log(data)

  return {
    props: {
      user,
      data
    }
  }
}

export default Dashboard
