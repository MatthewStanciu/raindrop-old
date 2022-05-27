import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  supabaseClient.auth.api.setAuthCookie(req, res)
}
