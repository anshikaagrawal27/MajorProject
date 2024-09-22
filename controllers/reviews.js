const Listing=require("../models/listing.js");
const Review=require("../models/review.js")

module.exports.createReview=(async(req,res)=>{
    // let {id}=req.params;
    console.log(req.params.id);
   let listing= await Listing.findById(req.params.id);
   let newReview= new Review(req.body.review);
   //creating a new review for specific id which is comeing from review object(in show.ejs)
   //review is object in show.ejs,in which comment and ratings store  
newReview.author=req.user._id;
console.log(newReview);
   listing.review.push(newReview);
   await newReview.save();
   await listing.save();
   console.log("new review saved");
   req.flash("success","New Review Added");

   res.redirect(`/listings/${listing._id}`)
});

module.exports.deleteReview=async(req,res)=>{
    let {id,reviewId}=req.params;
await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}})
await Review.findByIdAndDelete(reviewId);
//when findBy Id delete call then before executing it ,a middleware call then (in listing.js)
req.flash("success","Review Deleted");

res.redirect(`/listings/${id}`)
}