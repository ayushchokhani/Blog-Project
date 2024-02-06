import { createSlice } from "@reduxjs/toolkit";

// just checking if user is authenticated or not
const initialState = {
    status: false,
    userData: null // at present we have no user data
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true
      state.userData = action.payload.userData
    },
    logout: (state) => {
      state.status = false
      state.userData = null
    },
  },
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer