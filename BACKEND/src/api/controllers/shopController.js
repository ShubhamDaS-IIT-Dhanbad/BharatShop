import asyncHandler from "express-async-handler";
import { ApiError } from '../../utils/apiError.js'
import { ApiResponse } from '../../utils/apiResponse.js'
import { Shop } from "../../models/shopModel.js";
import { Retailer } from "../../models/retailerModel.js";

import mongoose from 'mongoose';

//add shop
const createShop = asyncHandler(async (req, res) => {
    const createdShop = await Shop.create(req.body)
    let retailer
    let shop
    try {
        retailer = await Retailer.findById(req.cookies.retailer._id)
        shop = await Shop.findById(createdShop._id)
    } catch (error) {
        Shop.findByIdAndDelete(createdShop._id)
        return res
        .status(201)
        .json(new ApiResponse(200, "retailer not found"))
    }

    retailer.shop = createdShop
    retailer.save()

    req.body.owner = retailer
    shop.save()
    return res
        .status(201)
        .json(new ApiResponse(200, "shop registered Successfully"))
})

const getShopDetails = asyncHandler(async (req, res, next) => {
    const shop = await Shop.findById(req.params.id);
    console.log("ko")
    if (!shop) {
      return next(new ApiError("Shop not found", 404));
    }
  
    res.status(200).json({
      success: true,
      shop,
    });
  });

//registerShop
const registerShop = async (req, res) => {
  const { phoneNumber, email, shopName, pinCodes, location, openingHours, closeDays, owner } = req.body;
  if (!phoneNumber || !shopName || !location?.lat || !location?.lon || !closeDays || closeDays.length === 0) {
      return res.status(400).json({ message: 'Required fields are missing' });
  }
  if (pinCodes && new Set(pinCodes).size > 5) {
      return res.status(400).json({ message: 'A shop can have up to 5 unique pin codes' });
  }

  // Create a new Shop instance
  const newShop = new Shop({
      phoneNumber,
      email,
      shopName,
      pinCodes,
      location,
      openingHours,
      closeDays,
      owner
  });

  try {
      // Validate owner ID
      if (owner && !mongoose.Types.ObjectId.isValid(owner)) {
          return res.status(400).json({ message: 'Invalid owner ID' });
      }

      // Check if the owner exists
      if (owner) {
          const existingOwner = await Retailer.findById(owner);
          if (!existingOwner) {
              return res.status(400).json({ message: 'Owner not found' });
          }
      }

      // Save the shop to the database
      const savedShop = await newShop.save();
      res.status(201).json(savedShop);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error });
  }
};


export {
  createShop,
  getShopDetails,
  registerShop
}
