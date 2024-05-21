import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch shop details by ID
export const fetchShopDetails = createAsyncThunk(
  'shop/fetchShopDetails',
  async (shopId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:12000/api/v1/shop/shopdetail/${shopId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch shop details');
      }
      
      const shopdetails = await response.json();
      return shopdetails.shop;
    } catch (error) {
      return rejectWithValue('Failed to fetch shop details');
    }
  }
);

// Async thunk to fetch shops by pin code and category
export const fetchShop = createAsyncThunk(
  'shop/fetchShop',
  async ({ pinCode, selectedCategories, selectedRatings, priceRange }, { rejectWithValue }) => {
    try {console.log("lp")
      const categories = Array.isArray(selectedCategories) ? selectedCategories : [selectedCategories];
      const url = `http://localhost:12000/api/v1/shop/shops?selectedCategories=${categories.join(',')}&pincode=${pinCode}&selectedRatings=${selectedRatings.join(',')}&minPrice=${priceRange.minPrice}&maxPrice=${priceRange.maxPrice}`;
      
      console.log("Fetching shops with URL:", url); // Debug log

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch shops');
      }
      const shops = await response.json();
      return shops.shops;
    } catch (error) {
      return rejectWithValue('Failed to fetch shops');
    }
  }
);

// Create shop slice
const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    shops: [],
    shopDetails: [],
    allShops: [],
    filteredProducts: [],
    searchedProducts: [],
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
        state.error = action.payload;
      })
      .addCase(fetchShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShop.fulfilled, (state, action) => {
        state.loading = false;
        state.shops = action.payload;
        state.error = null;
      })
      .addCase(fetchShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Extract action creators and reducer
export default shopSlice.reducer;
