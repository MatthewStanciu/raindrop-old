import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserContextProvider } from '@supabase/ui/dist/cjs/components/Auth/UserContext'
import { supabase } from '../lib/supabase'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider supabaseClient={supabase}>
      <Component {...pageProps} />
    </UserContextProvider>
  )
}

export default MyApp
