// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   token: null,
//   user: null,
//   isAuthenticated: false,
// };

// // For a real app, add asyncThunk for login/register with backend!
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginSuccess: (state, action) => {
//       state.token = action.payload;
//       state.user = action.payload ? JSON.parse(atob(action.payload.split('.')[1])) : null;
//       state.isAuthenticated = true;
//     },
//     logout: (state) => {
//       state.token = null;
//       state.user = null;
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const { loginSuccess, logout } = authSlice.actions;
// export default authSlice.reducer;





// import { createSlice } from '@reduxjs/toolkit';

// const savedAuth = JSON.parse(localStorage.getItem('auth')) || { user: null, token: null };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: savedAuth,
//   reducers: {
//     loginSuccess: (state, action) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       // ✅ Persist to localStorage
//       console.log(JSON.parse(localStorage.getItem('auth')));
//       localStorage.setItem('auth', JSON.stringify(state));

//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       localStorage.removeItem('auth'); // ✅ Clear on logout
//     },
//   },
// });

// export const { loginSuccess, logout } = authSlice.actions;
// export default authSlice.reducer;





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
