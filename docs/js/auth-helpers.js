// Helper functions for Supabase authentication flow.
import { sb } from './supabase-client.js';

// Require a logged-in user; redirect to login if there is no session.
export async function requireAuth() {
  try {
    const { data: { session }, error } = await sb.auth.getSession();
    if (error) throw error;
    if (!session) {
      window.location.href = 'auth/login.html';
      return null;
    }
    return session.user;
  } catch (err) {
    console.error('requireAuth error:', err);
    window.location.href = 'auth/login.html';
    return null;
  }
}

// Redirect to the account page if the user is already signed in.
export async function redirectIfAuthed() {
  try {
    const { data: { session }, error } = await sb.auth.getSession();
    if (error) throw error;
    if (session) {
      window.location.href = '../account.html';
    }
  } catch (err) {
    console.error('redirectIfAuthed error:', err);
  }
}

// Subscribe to auth state changes.
export function onAuthChange(callback) {
  return sb.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });
}

// Convenience helper to display auth state inside an element.
export function showAuthState(el) {
  const element = typeof el === 'string' ? document.querySelector(el) : el;
  if (!element) return;
  onAuthChange((user) => {
    element.textContent = user ? `Signed in as ${user.email}` : 'Not signed in';
  });
}

// Sign out the current user and redirect to the login page.
export async function signOut() {
  await sb.auth.signOut();
  window.location.href = 'auth/login.html';
}