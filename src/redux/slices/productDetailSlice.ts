import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {PRODUCT_DETAIL_URL} from '../../utils/baseUrls';

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
  product: Product | null; // Single product for details
  rejected: string | null;
  loading: boolean;
}

// Initial State
const initialState: ProductState = {
  product: null,
  rejected: null,
  loading: false,
};

//  Fetch Single Product Details**
export const fetchProductDetails = createAsyncThunk<Product, number>(
  'products/fetchProductDetails',
  async (productId, {rejectWithValue}) => {
    try {
      const response = await axios.get(`${PRODUCT_DETAIL_URL}/${productId}`);
      return response?.data; // A single product object
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data || 'Failed to fetch product details',
      );
    }
  },
);

// Redux Slice
export const productDetailSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProductDetails.pending, state => {
        state.loading = true;
        state.rejected = null;
      })
      .addCase(
        fetchProductDetails.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.loading = false;
          state.product = action.payload;
          state.rejected = null;
        },
      )
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.rejected = action.payload as string;
      });
  },
});

export default productDetailSlice.reducer;
