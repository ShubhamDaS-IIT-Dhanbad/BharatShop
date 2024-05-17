import { Router } from "express";
import { createShop } from '../controllers/shopController.js';

import { registerRetailer,logInRetailer,logOutRetailer} from '../controllers/retailerController.js';
// import { upload } from "../middleware/multerMiddleware.js"

import { retailerVerifyJwt } from "../middleware/retailerAuthMiddleware.js";


const router = Router()

router.route("/register").post(registerRetailer)
router.route("/login").post(logInRetailer)

//secure routes
router.route("/add").post(createShop)
router.route("/logout").post( retailerVerifyJwt,logOutRetailer)

export default router