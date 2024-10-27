import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!localStorage.getItem('token'),
    user: null,
    token: localStorage.getItem('token') || null,
  },
  reducers: {
    signIn: (state, action) => {
      state.isAuthenticated = true;
      state.user = {
        username: action.payload.username,
        email: action.payload.email,
        password: action.payload.password,
        image: action.payload.image,
        token: action.payload.token,
      };
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.clear();
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
