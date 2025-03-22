import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    userDetails: null,
    userApplication_data:null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setUserDetails:(state,action)=>{
      state.userDetails = action.payload;
    },
    setUserApplicationData:(state,action)=>{
      state.userApplication_data = action.payload;
    }
  },
});

export const { setCurrentUser,setUserDetails,setUserApplicationData } = userSlice.actions;
export default userSlice.reducer;
