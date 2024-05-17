import { configureStore } from '@reduxjs/toolkit';

import todoReducer from "../features/todoSlice.jsx";
import productReducer from "../features/products/productSlics.jsx";
import setFilteredProducts from "../features/products/productSlics.jsx";
import setIsAuthenticated from "../features/logInLogout/authenticationSlice.jsx";
import setUser from "../features/userData/userDataSlice.jsx";
import clearUser from "../features/userData/userDataSlice.jsx"; 
import productDetailSlice from "../features/products/productDetailSlice.jsx"; 
import shop from "../features/shop/shopSlice.jsx"; 
const store=configureStore ({
    reducer:{
        // todoReducer
        Authentication:setIsAuthenticated ,
        products: productReducer,
        setFilteredProducts,
        user:setUser,clearUser,
        productDetail:productDetailSlice,
        shop,
    }
})
export default store