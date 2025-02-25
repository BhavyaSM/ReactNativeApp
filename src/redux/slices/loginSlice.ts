import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { LOGIN_URL } from '../../utils/baseUrls';

// Define types for request and response
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

interface LoginUserState {
  login_success: string | null;
  login_rejected: string | null;
  loading: boolean;
}

const initialState: LoginUserState = {
  login_success: null,
  login_rejected: null,
  loading: false,
};

export const loginUser = createAsyncThunk<LoginResponse, LoginRequest, { rejectValue: string }>(
  'login/user',
  async (reqParams, { rejectWithValue }) => {
    try {
      const response = await axios.post<LoginResponse>(LOGIN_URL, reqParams);
      console.log("response==============>",response.data)
      return response.data;
    } catch (err: any) {
      console.error('Login Error:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

//  Redux Slice with Proper Error Handling
export const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.login_rejected = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.loading = false;
        state.login_success = action.payload.access_token;
        state.login_rejected = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.login_rejected = action.payload || 'Login failed';
      });
  },
});

export default userLoginSlice.reducer;
