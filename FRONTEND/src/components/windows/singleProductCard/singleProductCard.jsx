
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import "./singleProductCardCss.css";

import { useDispatch, useSelector } from 'react-redux';
import Loading from "../../../components/windows/loading/loading.jsx"

import Carousel from 'react-material-ui-carousel';
import Rating from "react-rating-stars-component";
import { MdOutlineAddLocationAlt } from "react-icons/md";

import axios from 'axios';

import { setProductId, fetchProductDetail } from "../../../redux/features/products/productDetailSlice.jsx"
import { fetchShopDetails } from "../../../redux/features/shop/shopSlice.jsx"

const ProductDetails = () => {
    const dispatch = useDispatch();


    const { productId } = useParams();
    const [productDetail, setProductDetail] = useState({});
    const [shopId, setShopId] = useState({});
    const [loading, setLoading] = useState(true);
    const shopDetails = (useSelector((state) => state.shop.shopDetails));

    useEffect(() => {
        dispatch(fetchShopDetails(shopId));
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:12000/api/v1/shop/productsdetail/${productId}`);
                setProductDetail(response.data.product);
                setShopId(response.data.product.shop)
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch product details:', error);
            }
        };
        fetchData();
    }, [productId, shopId]);

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const increaseQuantity = () => {
        if (productDetail.quantityAvailable <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);
    };

    const redirectToMap = () => {
        const shopLat = shopDetails?.location.lat; // Latitude
        const shopLon =shopDetails?.location.lon; // Longitude
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const userLat = position.coords.latitude;
                const userLon = position.coords.longitude;
                const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLon}&destination=${shopLat},${shopLon}&travelmode=driving`;
                window.location.href = googleMapsUrl;
              },
              (error) => {
                console.error("Error getting location", error);
                alert("Unable to retrieve your location. Please ensure location services are enabled.");
              }
            );
          } else {
            alert("Geolocation is not supported by this browser.");
          }
    };
    return (
        <>
            <Fragment>
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        {productDetail && productDetail.title && (
                            <Fragment>
                                <div className="ProductDetails">
                                    <div className="ProductDetails-left">
                                        <div className="Product-details-image-left"></div>
                                        <img className="Product-details-image-right" src={productDetail.images[0]} />

                                    </div>

                                    <div className="ProductDetails-right">
                                        <div className="detailsBlock-1">
                                            <h2>{productDetail.title}</h2>
                                            <p>Product # {productDetail._id}</p>
                                        </div>
                                        <div className="detailsBlock-2">
                                            <span className="detailsBlock-2-span">
                                                <div className="detailsBlock-shopName-container">
                                                    <span className="detailsBlock-shopName-shop">SHOP: </span>
                                                    <span className="detailsBlock-shopName-shop-name">{shopDetails?.shopName?.toUpperCase()}</span>
                                                    <span onClick={redirectToMap}><MdOutlineAddLocationAlt size={20} fontWeight={100} color={"black"} /></span>
                                                </div>
                                                <Rating
                                                    count={5}
                                                    size={15}
                                                    value={productDetail.ratings}
                                                    activeColor="#ffd700"
                                                    emptyColor="black"
                                                    edit={true}
                                                    margin="10px"
                                                    isHalf={true}
                                                    emptyIcon={<i className="far fa-star"></i>}
                                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                    filledIcon={<i className="fas fa-star"></i>}
                                                />
                                                ({productDetail.id} Reviews)
                                            </span>
                                        </div>
                                        <div className="detailsBlock-3">
                                            <h1>{`₹${productDetail.price}`}</h1>
                                            <div className="detailsBlock-3-1">
                                                <div className="detailsBlock-3-1-1" style={{ display: "flex", gap: "1px" }}>
                                                    <button onClick={decreaseQuantity} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>-</button>
                                                    <input type="number" value={quantity} />
                                                    <button onClick={increaseQuantity} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                                                </div>
                                                <button disabled={0 < 1 ? true : false} style={{ width: "70%", height: "40px", fontSize: "14px", fontWeight: "500" }}>
                                                    Add to Cart
                                                </button>
                                            </div>

                                            <p>
                                                Status:
                                                <b className={0 < productDetail.quantityAvailable ? "redColor" : "greenColor"}>
                                                    {productDetail.quantityAvailable}
                                                </b>
                                            </p>
                                        </div>

                                        <div className="detailsBlock-4">
                                            <span>Description : </span>
                                            <p>{productDetail.description}</p>
                                        </div>
                                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                            <button className="submitReview" style={{ width: "70%", height: "40px", fontSize: "14px", fontWeight: "500" }}>
                                                Submit Review
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <h3 className="reviewsHeading">REVIEWS</h3>

                                {/* <Dialog
                            aria-labelledby="simple-dialog-title"
                            open={open}
                            onClose={submitReviewToggle}
                        >
                            <DialogTitle>Submit Review</DialogTitle>
                            <DialogContent className="submitDialog">
                                <Rating
                                    onChange={(e) => setRating(e.target.value)}
                                    value={rating}
                                    size="large"
                                />

                                <textarea
                                    className="submitDialogTextArea"
                                    cols="30"
                                    rows="5"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={submitReviewToggle} color="secondary">
                                    Cancel
                                </Button>
                                <Button onClick={reviewSubmitHandler} color="primary">
                                    Submit
                                </Button>
                            </DialogActions>
                        </Dialog> */}

                                {/* {product.reviews && product.reviews[0] ? (
                            <div className="reviews">
                                {product.reviews &&
                                    product.reviews.map((review) => (
                                        <ReviewCard key={review._id} review={review} />
                                    ))}
                            </div>
                        ) : (
                            <p className="noReviews">No Reviews Yet</p>
                        )} */}
                            </Fragment>)}
                    </>
                )}
            </Fragment>
        </>
    );
};

export default ProductDetails;



