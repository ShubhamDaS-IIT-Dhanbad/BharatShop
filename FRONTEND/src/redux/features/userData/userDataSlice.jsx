// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: [],
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const data =localStorage.getItem('userData');
      if(data){
        state.userData=data;
        state.isAuthenticated = true;
      }else{
        state.isAuthenticated = false;
      }
      
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
