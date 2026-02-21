import { createSlice } from '@reduxjs/toolkit';

// Helper to decode JWT safely
function decodeToken(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error('❌ Failed to decode token:', err);
    return null;
  }
}

const savedAuth = JSON.parse(localStorage.getItem('auth')) || { user: null, token: null };

const authSlice = createSlice({
  name: 'auth',
  initialState: savedAuth,
  reducers: {
    loginSuccess: (state, action) => {
      const token = action.payload.token || action.payload; // supports both {token} or raw token
      const decodedUser = decodeToken(token);
      state.token = token;
      state.user = decodedUser;
      console.log('✅ Decoded user:', decodedUser);
      state.isAuthenticated = true;
      localStorage.setItem('auth', JSON.stringify(state));
      
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('auth');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
