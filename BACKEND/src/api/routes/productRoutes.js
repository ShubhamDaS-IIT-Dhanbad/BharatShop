import { Router } from "express";
import { createProduct, getAllProducts, getRetailerProducts,getProductDetails } from '../controllers/productController.js';
import { upload } from "../middleware/multerMiddleware.js";
import { retailerVerifyJwt } from "../middleware/retailerAuthMiddleware.js";

const router = Router();

// Secure routes
router.route("/addproduct").post(upload.array('images'), createProduct); // Ensure that 'images' matches the field name in your form
router.route("/products").get(getAllProducts);
router.route("/productsdetail/:id").get(getProductDetails);
router.route("/retailerproducts").get(getRetailerProducts);

export default router;

