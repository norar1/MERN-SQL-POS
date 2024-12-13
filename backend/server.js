import express from "express";
import dotenv from "dotenv";
import AccRoutes from "./routes/accounts.js";
import ItemRoutes from "./routes/store.js";
import AdminRoutes from "./routes/admin-db.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import Authroutes from "./routes/AuthRoutes.js"
import cors from "cors"; 

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors()); 

app.use(express.static('../frontend'));


app.use("/api/accounts", AccRoutes);

app.use("/api/items", ItemRoutes);

app.use("/api/admindb", AdminRoutes);

app.use('/api/payments', paymentRoutes);

app.use('/api/authroutes', Authroutes)





const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
