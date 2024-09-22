const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js")
const {reviewSchema}=require("../Schema.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {validateReviews, isLoggedin, isReviewAuthor}=require("../middleware.js")

const reviewController=require("../controllers/reviews.js")

router.post("/",
    isLoggedin,
    validateReviews,
    wrapAsync(reviewController.createReview));

//Delete review route
router.delete("/:reviewId",
    isLoggedin,
    isReviewAuthor,
    wrapAsync(reviewController.deleteReview));

module.exports=router;