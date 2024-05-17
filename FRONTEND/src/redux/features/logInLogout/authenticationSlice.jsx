// loginSlice.js
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isAuthenticated:true
};
export const authenticationSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      const userData=localStorage.getItem('userData')
      if(userData){
        state.isAuthenticated=true;
      }else{
    state.isAuthenticated=false;}
    },
    
  },
});
export const {setIsAuthenticated} = authenticationSlice.actions;
export default authenticationSlice.reducer;
