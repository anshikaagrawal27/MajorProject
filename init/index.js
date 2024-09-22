const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

main()
.then(()=>{
    console.log("connencted to be db")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
 }

 const initDB=async()=>{
    await Listing.deleteMany({});
   initData.data=initData.data.map((obj)=>({
        ...obj,
        owner:"66d7e32894da7686fad26e15"
    }));
await Listing.insertMany(initData.data);
console.log("dta was initialized")
 };

 initDB();