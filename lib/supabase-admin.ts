import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SERVICE_ROLE_KEY

const supabaseAdmin = createClient(`${supabaseUrl}`, `${serviceRoleKey}`)

export default supabaseAdmin
