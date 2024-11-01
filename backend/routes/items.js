import express from "express"
import Createitems from "../controller/Create-items.js"
import Buyitems from "../controller/purchase-item.js"
    



const router = express.Router();

router.post ("/CreateItems",Createitems)

router.post("/PurchaseItems",Buyitems)



export default router;