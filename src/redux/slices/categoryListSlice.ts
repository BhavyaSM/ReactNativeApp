import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CATEGORIES_LIST_URL } from '../../utils/baseUrls';

// Define Product Type
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}

// Define Redux state type
interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

// 🔹 Fetch products by category ID
export const fetchProductsByCategory = createAsyncThunk<
  Product[],
  number,
  { rejectValue: string }
>('products/fetchByCategory', async (categoryId, { rejectWithValue }) => {
  try {
    const response = await axios.get<Product[]>(`${CATEGORIES_LIST_URL}/${categoryId}/products`);
    return response?.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch products');
  }
});

// 🔹 Create product slice
const categoryListSlice = createSlice({
  name: 'categoryList',
  initialState: {
    products: [],
    loading: false,
    error: null,
  } as ProductState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
      });
  },
});

export default categoryListSlice.reducer;
