const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js")
const Listing = require("../models/listing.js");
const { isLoggedin, isOwner, validateListing } = require("../middleware.js")

const listingController = require("../controllers/listings.js")
const multer = require("multer");
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });


router.get('/listings/search', async (req, res) => {
    const { country } = req.query;

    let query = {country};
    console.log(query);
    // If a country is provided, search for hotels in that country
    if (country) {
        query.country = { $regex: country, $options: 'i' };  // Case-insensitive search
    }

    try {
        const allListings = await Listing.find(query);  // Find hotels matching the country
if(allListings && allListings.length>0){
    
    res.render('./listings/list.ejs', { allListings, country });  // Render the hotels page and pass the results
}else{
    req.flash("error","Listing not found");
    // console.log("result not found");
        res.redirect("/listings");
}

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

//index and create rute
router.route("/listings")
    .get(wrapAsync(listingController.index))

    .post(isLoggedin, upload.single('listing[image]'), wrapAsync(listingController.createListing))
// .post((req,res)=>{

//     res.send(req.file);
// }); 


//new route
router.get("/listings/new", isLoggedin, listingController.renderNewForm);

//show,update,delete routes
router.route("/listings/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedin,
        isOwner,
        upload.single("listing[image]"),
        validateListing,

        wrapAsync(listingController.updateListing))



    .delete(isLoggedin,
        isOwner,
        wrapAsync(listingController.deleteListing));



//edit route
router.get("/listings/:id/edit",
    isLoggedin,
    isOwner
    , wrapAsync(listingController.editListing)
);










module.exports = router;