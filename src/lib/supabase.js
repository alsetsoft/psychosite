import { createClient } from '@supabase/supabase-js'
import { defaults } from '../content'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function fetchContent() {
  const { data, error } = await supabase.from('content').select('section, field, value')
  if (error || !data) return { ...defaults }

  // Reshape flat rows into nested object matching defaults structure
  const result = {}
  for (const section of Object.keys(defaults)) {
    result[section] = { ...defaults[section] }
  }
  for (const row of data) {
    if (result[row.section]) {
      result[row.section][row.field] = row.value
    }
  }
  return result
}

export async function saveContentToSupabase(data) {
  const rows = []
  for (const section of Object.keys(data)) {
    for (const field of Object.keys(data[section])) {
      rows.push({
        section,
        field,
        value: data[section][field],
        updated_at: new Date().toISOString(),
      })
    }
  }
  const { error } = await supabase.from('content').upsert(rows, {
    onConflict: 'section,field',
  })
  return { error }
}
