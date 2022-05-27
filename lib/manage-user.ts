import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import supabaseAdmin from './supabase-admin'

export const userIsInDb = async (username: string): Promise<boolean> => {
  const users = await supabaseClient
    .from('users')
    .select('*')
    .filter('username', 'eq', username)
  if (users) return true
  else return false
}

export const createUser = async (username: string) => {
  supabaseAdmin
    .from('users')
    .insert([
      {
        username
      }
    ])
    .then((r) => console.log(r))
}

export const signIn = async () => {
  await supabaseClient.auth.signIn(
    {
      provider: 'github'
    },
    { redirectTo: window.location.href }
  )
}
