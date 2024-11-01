import express from "express";
import getUserData from "../controller/GetUser-data.js"
import Additemdata from "../controller/Add-item.js"
import AddCredit from "../controller/Add-credit.js"
import AddQuantity from "../controller/Add-quantity.js"
import Showproducts from "../controller/Get-items.js"
import itemlogs from "../controller/Item-log.js"
import AddtoCart from "../controller/Add-cart.js"

const router = express.Router();

router.get ('/getuserdata',getUserData);

router.post ("/additemdata",Additemdata)

router.post ("/addcredit",AddCredit)

router.post ("/addquantity",AddQuantity)

router.get ("/Getitems",Showproducts)

router.get ("/Purchaselogs",itemlogs)

router.post("/addtocart",AddtoCart)



export default router;
