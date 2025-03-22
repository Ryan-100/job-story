import { createSlice } from '@reduxjs/toolkit';

const initialState = {data:{}};

const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers:{
    replaceDocument(state,action){
      state.data = action.payload
    }
  }
})

export const authSliceActions = authSlice.actions
export default authSlice;