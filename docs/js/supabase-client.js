// Initializes the Supabase client using the global `supabase` from the CDN.
// TODO: Replace the URL and anon key with your project's values.
export const sb = window.supabase.createClient(
  'https://fpxpilbgmjlpbeipktli.supabase.co', // TODO: replace with your Supabase URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZweHBpbGJnbWpscGJlaXBrdGxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4NTg2ODcsImV4cCI6MjA3MDQzNDY4N30.dQUg_hYCoeUPMhMOOuJG-wUMd6TzQZO_SWhQUDkwOEY' // TODO: replace with your Supabase anon key
);
