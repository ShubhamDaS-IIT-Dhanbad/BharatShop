import { Product } from "../../models/productModel.js";
import { Retailer } from '../../models/retailerModel.js';
import { Shop } from '../../models/shopModel.js';

import { ApiError } from '../../utils/apiError.js'
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";


// Create Product -- Retailer
const createProduct = asyncHandler(async (req, res, next) => {
  const images = [];
  for (const file of req.files) {
    const avatarLocalPath = file.path;
    const imageUrl = await uploadOnCloudinary(avatarLocalPath);
    images.push(imageUrl.url);
  }
  req.body.images = images;
  // const retailer = await Retailer.findById(req.cookies.retailer._id)
  // req.body.shop=retailer.shop
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product
  });
});



// Get All Product
const getAllProducts = asyncHandler(async (req, res, next) => {

  const resultPerPage = 16;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .filterByPincode()
    .pagination(resultPerPage)
    .filterByCategory()


  const products = await apiFeature.query;
  const filteredProductsCount = products.length;
  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});


// Get All Product retailer
const getRetailerProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});

// Get Product Details
const getProductDetails = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ApiError("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});



// Update Product retailer
const updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ApiError("Product not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From uploadOnCloudinary
    for (let i = 0; i < product.images.length; i++) {
      await uploadOnCloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await uploadOnCloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});




// Delete Product
const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ApiError("Product not found", 404));
  }



  // Deleting Images From uploadOnCloudinary
  for (let i = 0; i < product.images.length; i++) {
    await uploadOnCloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});



// Create New Review or Update the review
const createProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});



// Get All Reviews of a product
const getProductReviews = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ApiError("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});



// Delete Review
const deleteReview = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ApiError("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});



export {
  createProduct,
  getAllProducts,
  getRetailerProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
}