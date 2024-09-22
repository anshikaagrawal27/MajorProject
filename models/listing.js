const mongoose=require("mongoose");
const Review = require("./review");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
    //     type:String,
    //     default:"https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?auto=compress&cs=tinysrgb&w=400",
    
    //     set:(v)=>v===""?"https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?auto=compress&cs=tinysrgb&w=400":v,
     
         url:String,
         filename:String
},
    price:Number,
    location:String,
    country:String,
    review:[{
 type:Schema.Types.ObjectId,
       ref:"Review"
    }, 
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing.review.length){
        await Review.deleteMany({_id:{$in: listing.review}})
    }
})

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;