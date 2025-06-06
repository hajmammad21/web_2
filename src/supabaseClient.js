import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jgolvueofkebbblxrcjk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impnb2x2dWVvZmtlYmJibHhyY2prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMzE3MzksImV4cCI6MjA2NDgwNzczOX0.tHe3QaxXjInJfzf9RKV6KPw60p4yn5UloWIzz6-LdXE'

export const supabase = createClient(supabaseUrl, supabaseKey)
