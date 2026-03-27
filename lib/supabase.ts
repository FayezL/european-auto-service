import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Booking = {
  id: string
  name: string
  phone: string
  car_model: string
  service: string
  notes: string | null
  status: 'pending' | 'accepted' | 'rejected'
  created_at: string
}

export type Settings = {
  id: number
  is_open: boolean
}
