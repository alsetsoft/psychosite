import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ecpljaastxknyrgsfwyb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjcGxqYWFzdHhrbnlyZ3Nmd3liIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NzU3MjIsImV4cCI6MjA5MDQ1MTcyMn0.EOftI7mDQA0DWEmTKDydxKPPwGxSwjBQWXm_rk6czDQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
