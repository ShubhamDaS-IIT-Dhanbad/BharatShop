
// store.js
// import { configureStore } from '@reduxjs/toolkit';


// const store = configureStore({
//   reducer: rootReducer,
// });
// export default store;
import { configureStore } from '@reduxjs/toolkit';
import {applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  // newProductReducer,
  // newReviewReducer,
  // productDetailsReducer,
  productReducer,
  // productReviewsReducer,
  // productsReducer,
  // reviewReducer,
} from "../reducers/productReducer.jsx";

// import {
//   allUsersReducer,
//   forgotPasswordReducer,
//   profileReducer,
//   userDetailsReducer,
//   userReducer,
// } from "./reducers/userReducer";

// import { cartReducer } from "./reducers/cartReducer";
// import {
//   allOrdersReducer,
//   myOrdersReducer,
//   newOrderReducer,
//   orderDetailsReducer,
//   orderReducer,
// } from "./reducers/orderReducer";
import rootReducer from './rootReducer.jsx';
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const middleware = [thunk];

// CREATING STORE
const store = configureStore({
  reducer: rootReducer,
  initialState: initialState,
  // enhancers: [composeWithDevTools()],
});
// EXPORTING STORE
export default store;

