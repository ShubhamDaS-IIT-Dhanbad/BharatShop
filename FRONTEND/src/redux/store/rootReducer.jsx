import { combineReducers} from "redux";
// import {
//   allUsersReducer,
//   forgotPasswordReducer,
//   profileReducer,
//   userDetailsReducer,
//   userReducer,
// } from "../reducers/userReducer.jsx";
// const rootReducer = combineReducers({
//   user: userReducer,
//   profile: profileReducer,
//   allUsers: allUsersReducer,
//   userDetails: userDetailsReducer,
//   forgotPassword: forgotPasswordReducer,
// });
import {
  productReducer
} from "../reducers/productReducer.jsx";
const rootReducer = combineReducers({
  products:productReducer,
  // user: userReducer,
  // profile: profileReducer,
  // allUsers: allUsersReducer,
  // userDetails: userDetailsReducer,
  // forgotPassword: forgotPasswordReducer,
});
export default rootReducer;