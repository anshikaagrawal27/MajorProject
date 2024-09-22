const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware.js")

const userController=require("../controllers/users.js")


//signup render form and signup 
router.route("/signup")
.get(userController.renderSingnupForm)
.post(wrapAsync(userController.signUp));


//login render form &login in wabsite
router.route("/login")
.get(userController.renderLoginForm)
.post(
  saveRedirectUrl,
passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
userController.login
);


 



router.get("/logout",userController.logout)



module.exports=router
