import { configureStore } from '@reduxjs/toolkit';

import productReducer from "../features/products/productSlics.jsx";
import setFilteredProducts from "../features/products/productSlics.jsx";
import setIsAuthenticated from "../features/logInLogout/authenticationSlice.jsx";
import setUser from "../features/userData/userDataSlice.jsx";
import clearUser from "../features/userData/userDataSlice.jsx"; 
import product from "../features/products/productSlics.jsx"; 
import shop from "../features/shop/shopSlice.jsx"; 
const store=configureStore ({
    reducer:{
        // todoReducer
        Authentication:setIsAuthenticated ,
        products: productReducer,
        setFilteredProducts,
        user:setUser,clearUser,
        product,
        shop,
    }
})
export default store