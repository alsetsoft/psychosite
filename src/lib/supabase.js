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

export async function uploadImage(key, file) {
  const ext = file.name.split('.').pop()
  const path = `${key}.${ext}`

  // Remove old file with any extension
  const { data: existing } = await supabase.storage.from('images').list('', { search: key })
  if (existing?.length) {
    await supabase.storage.from('images').remove(existing.map(f => f.name))
  }

  const { error } = await supabase.storage.from('images').upload(path, file, {
    upsert: true,
    cacheControl: '0',
  })
  if (error) throw error

  const { data: urlData } = supabase.storage.from('images').getPublicUrl(path)
  return urlData.publicUrl + '?t=' + Date.now()
}

export async function fetchImages() {
  const { data: files, error } = await supabase.storage.from('images').list('', { limit: 100 })
  if (error || !files?.length) return null

  const images = {}
  for (const file of files) {
    const key = file.name.replace(/\.[^.]+$/, '')
    const { data: urlData } = supabase.storage.from('images').getPublicUrl(file.name)
    images[key] = urlData.publicUrl + '?t=' + file.updated_at
  }
  return images
}

export async function fetchSiteProducts() {
  const { data } = await supabase.from('site_products').select('*').order('sort_order')
  return data || []
}

export async function fetchVideos() {
  const { data } = await supabase.from('videos').select('*').order('sort_order')
  return data || []
}

export async function fetchMarathonDays() {
  const { data } = await supabase.from('marathon_days').select('*').order('sort_order')
  return data || []
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
