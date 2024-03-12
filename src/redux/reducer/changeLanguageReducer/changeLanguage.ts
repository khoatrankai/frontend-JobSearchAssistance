import { createSlice } from '@reduxjs/toolkit'

const changeLaguage = createSlice({
    
    name: 'changeLanguage',
  initialState: {
    language: 1, // Giá trị mặc định nên là 1
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload
    },
  },
})

export const { setLanguage } = changeLaguage.actions
export default changeLaguage.reducer
