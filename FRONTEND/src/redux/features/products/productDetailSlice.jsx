// productDetailSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch product details by ID
export const fetchProductDetail = createAsyncThunk(
  'productDetail/fetchProductDetail',
  async (id) => {
    const response = await fetch(`http://localhost:12000/api/v1/shop/productsdetail/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product details');
    }
    const productDetail = await response.json();
    return productDetail;
  }
);

// Initial state
export const initialState = {
  productDetail: null,
  loading: false,
  error: null
};

// Create product detail slice
const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    // Action to set the product ID
    setProductId: (state, action) => {
      state.productId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetail = action.payload;
        state.error = null;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// Extract action creators and reducer
export const { setProductId } = productDetailSlice.actions;
export default productDetailSlice.reducer;
