// Sample base URL environment variable: VITE_BACKEND_URL
const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

export async function registerUser(data) {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.message || 'Failed to register');
  }

  const resData = await response.json();
  return resData.token;  // Expect JWT token in response on success
}

export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.message || 'Login failed');
  }

  const resData = await response.json();
  return resData.token;
}

export async function fetchPdf(payload) {
  const response = await fetch(`${API_BASE}/prescription/pdf`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = 'Failed to generate PDF';
    try {
      const errData = await response.json();
      message = errData.message || message;
    } catch (_) {
      // ignore JSON parse errors and keep default message
    }
    throw new Error(message);
  }

  return response;
}
