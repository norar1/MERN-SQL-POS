import express from "express";
import dotenv from "dotenv"
import AccRoutes from "./routes/accounts.js"
import ItemRoutes from "./routes/items.js"
import AdminRoutes from "./routes/admin-db.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import cors from "cors"; 

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors()); // to make my frontend accesibles

app.use(express.static('frontend'));

app.use("/api/accounts", AccRoutes);
app.use("/api/items", ItemRoutes)
app.use("/api/admindb",AdminRoutes)
app.use('/api/payments', paymentRoutes);



app.listen(process.env.PORT,()=> {

    console.log (`Server listening on port http//:localhost:${process.env.PORT}`)
}) 


 