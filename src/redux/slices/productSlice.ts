import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {PRODUCTS_URL} from '../../utils/baseUrls';

// Define Product Interface
interface Category {
  id: number;
  name: string;
  image: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

interface ProductState {
  success: Product[]; // Array of Product objects
  rejected: string | null;
  loading: boolean;
}

// Initial State
const initialState: ProductState = {
  success: [],
  rejected: null,
  loading: false,
};

// Fix: Rename function to fetchProducts
export const fetchProducts = createAsyncThunk<Product[], void>(
  'products/fetchProducts',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(PRODUCTS_URL);
      return response.data;
    } catch (err: any) {
      console.error('Fetch Error:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data || 'Failed to fetch products');
    }
  },
);

// Redux Slice with Proper Error Handling
export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.rejected = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.success = action.payload;
          state.rejected = null;
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.rejected = action.payload as string;
      });
  },
});

export default productSlice.reducer;
