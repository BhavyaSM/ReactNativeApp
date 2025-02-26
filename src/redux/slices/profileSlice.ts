import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PROFILE_URL} from '../../utils/baseUrls';

// Define user profile type
interface UserProfile {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar: string;
}

// Define Redux state type
interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

// 🔹 Fetch Profile with Token
export const fetchProfile = createAsyncThunk<
  UserProfile,
  void,
  {rejectValue: string}
>('user/fetchProfile', async (_, {rejectWithValue}) => {
  try {
    const token = await AsyncStorage.getItem('access_token'); // 🔹 Get Token from Storage
    if (!token) {
      return rejectWithValue('No token found');
    }

    const response = await axios.get<UserProfile>(PROFILE_URL, {
      headers: {Authorization: `Bearer ${token}`}, // 🔹 Pass Token in Header
    });

    return response.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || 'Failed to fetch profile',
    );
  }
});

// 🔹 Profile Slice
const profileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    profile: null,
    loading: false,
    error: null,
  } as UserState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });
  },
});

export default profileSlice.reducer;
