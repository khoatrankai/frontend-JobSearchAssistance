import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import profileAPi from '@/api/profiles/profileApiRecruiter';
import { getCookie } from '@/cookies';

interface IProfile {
  status: number;
  data: any;
}


export const fetchProfileRecruiter = createAsyncThunk(
  'profile/fetchProfileRecruiter',
  async (lang: string) => {
    const languageId = getCookie('languageId')
    
    const response = (await profileAPi.getProfileRecruiterV3(
      languageId === '1' ? 'vi' : 'en',
    )) as unknown as IProfile;
    console.log(response)
    return response.data;
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: {} as any,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchProfileRecruiter.pending as any]: (state, action) => {
      state.loading = true;
    },
    [fetchProfileRecruiter.fulfilled as any]: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    [fetchProfileRecruiter.rejected as any]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export default profileSlice.reducer;
