import { createSlice } from '@reduxjs/toolkit'

const changeLaguage = createSlice({
    
    name: 'changeLanguage',
  initialState: {
    language: 1, // Giá trị mặc định nên là 1
  },
  reducers: {
    setLanguage: (state, action) => {
      const languageId = sessionStorage.getItem('languageId');
      state.language = languageId === '2' ? 2 : 1;
    },
  },
})

export const { setLanguage } = changeLaguage.actions
export default changeLaguage.reducer
