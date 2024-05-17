import { Router } from "express";
import { createShop,getShopDetails,registerShop} from '../controllers/shopController.js';

const router = Router()
console.log("ko")
router.route("/register").post(registerShop)
router.route("/shopdetail/:id").get(getShopDetails)
export default router