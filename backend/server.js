import express from "express";
import dotenv from "dotenv";
import AccRoutes from "./routes/accounts.js";
import ItemRoutes from "./routes/items.js";
import AdminRoutes from "./routes/admin-db.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import cors from "cors"; 

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors()); // Allow CORS for your frontend

// Serve static files from the frontend's dist directory
app.use(express.static('frontend/dist'));

// API routes
app.use("/api/accounts", AccRoutes);
app.use("/api/items", ItemRoutes);
app.use("/api/admindb", AdminRoutes);
app.use('/api/payments', paymentRoutes);

// Serve the index.html file for any other route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000; // Fallback to 5000 if PORT is not set
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
