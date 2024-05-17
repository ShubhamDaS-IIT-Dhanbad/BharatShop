// shopSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch shop details by ID
export const fetchShopDetails = createAsyncThunk(
  'shop/fetchShopDetails',
  async (shopId) => {
    try {
      const response = await fetch(`http://localhost:12000/api/v1/shop/shopdetail/${shopId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch shop details');
      }
      const shopDetails = await response.json();
      return shopDetails.shop;
    } catch (error) {
      throw new Error('Failed to fetch shop details');
    }
  }
);

// Create shop slice
const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    shopDetails: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShopDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.shopDetails = action.payload;
        state.error = null;
      })
      .addCase(fetchShopDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// Extract action creators and reducer
export default shopSlice.reducer;
