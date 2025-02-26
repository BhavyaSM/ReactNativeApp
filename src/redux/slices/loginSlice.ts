import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {LOGIN_URL} from '../../utils/baseUrls';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  token: string | null;
  login_success: string | null;
  login_rejected: string | null;
  loading: boolean;
}

const initialState: LoginUserState = {
  token: null,
  login_success: null,
  login_rejected: null,
  loading: false,
};

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  {rejectValue: string}
>('login/user', async (reqParams, {rejectWithValue}) => {
  try {
    const response = await axios.post<LoginResponse>(LOGIN_URL, reqParams);
    const token = response?.data?.access_token;
    
    // 🔹 Save Token in AsyncStorage
    await AsyncStorage.setItem('access_token', token);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

//  Redux Slice with Proper Error Handling
export const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    logout: state => {
      state.token = null;
      AsyncStorage.removeItem('access_token'); // 🔹 Remove Token on Logout
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.login_rejected = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.login_success = action.payload.access_token;
          state.login_rejected = null;
        },
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.login_rejected = action.payload || 'Login failed';
      });
  },
});

export default userLoginSlice.reducer;
