import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ pinCode, category }) => {
    const categories = Array.isArray(category) ? category : [category];
    const categoriesString = categories.join(',');
    const response = await fetch(`http://localhost:12000/api/v1/product/products?pincode=${pinCode}&categories=${categoriesString}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const products = await response.json();
    return products.products;
  }
);

export const fetchProductDetails = createAsyncThunk(
  'product/fetchProductDetails',
  async (productId) => {
    const response = await fetch(`http://localhost:12000/api/v1/product/productsdetail/${productId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product details');
    }
    const productDetail = await response.json();
    return productDetail.product;
  }
);

export const searchedProducts = createAsyncThunk(
  'products/searchedProducts',
  async (keywords) => {
    console.log("Keywords:", keywords);
    const response = await fetch(`http://localhost:12000/api/v1/product/products?keyword=${keywords}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const products = await response.json();
    return products.products;
  }
);

// Initial state
export const initialState = {
  products: [],
  filteredProducts: [],
  searchedProducts: [],
  productDetail: [],
  loading: false,
  error: null,
};

// Create product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetail = action.payload;
        state.error = null;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchedProducts = action.payload;
        state.error = null;
      })
      .addCase(searchedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Extract action creators and reducer
export const { setFilteredProducts } = productSlice.actions;
export default productSlice.reducer;
