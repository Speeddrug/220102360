export function isValidUrl(url) {
  try { new URL(url); return true; } 
  catch { return false; }
}

export function validateShortcode(code) {
  return /^[a-zA-Z0-9]{3,10}$/.test(code);
}

export function generateShortcode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
