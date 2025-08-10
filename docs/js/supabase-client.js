// Initializes the Supabase client using the global `supabase` from the CDN.
// TODO: Replace the URL and anon key with your project's values.
export const sb = window.supabase.createClient(
  'https://YOUR-PROJECT-URL.supabase.co', // TODO: replace with your Supabase URL
  'YOUR-ANON-KEY' // TODO: replace with your Supabase anon key
);