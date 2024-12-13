import express from "express"

import Buyitems from "../controller/store/purchase-item.js"


const router = express.Router();



router.post("/PurchaseItems",Buyitems) // http://localhost:3000/api/items/PurchaseItems
 





export default router;