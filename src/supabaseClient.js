import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gwrkhmrptvbkxaylakou.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3cmtobXJwdHZia3hheWxha291Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMjcyNzUsImV4cCI6MjA2NDgwMzI3NX0.2Ih68scLkmoDRqfn-9ENu5wP5VhBYW_obC9-NX00Uok'

export const supabase = createClient(supabaseUrl, supabaseKey)
