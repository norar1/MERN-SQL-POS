import express from "express";
import getUserData from "../controller/admin-db/GetUser-data.js"
import Additemdata from "../controller/admin-db/Add-item.js"
import AddCredit from "../controller/admin-db/Add-credit.js"
import AddQuantity from "../controller/admin-db/Add-quantity.js"
import Showproducts from "../controller/admin-db/Get-items.js"
import itemlogs from "../controller/admin-db/Item-log.js"
import Createitems from "../controller/admin-db/Create-items.js"
import Seller from "../controller/admin-db/seller.js"



const router = express.Router();

router.get ('/getuserdata',getUserData); // http://localhost:3000/api/admindb/getuserdata

router.post ("/additemdata",Additemdata) // http://localhost:3000/api/admindb/additemdata

router.post ("/addcredit",AddCredit)// http://localhost:3000/api/admindb/addcredit

router.post ("/addquantity",AddQuantity) //http://localhost:3000/api/admindb/addquantity

router.get ("/Getitems",Showproducts) //http://localhost:3000/api/admindb/Getitems

router.get ("/Purchaselogs",itemlogs) // http://localhost:3000/api/admindb/Purchaselogs

router.post ("/CreateItems",Createitems) // http://localhost:3000/api/admindb/Createitems

router.post("/CreateSeller", Seller) //http://localhost:3000/api/admindb/CreateSeller









export default router;
