import jwt from "jsonwebtoken";

const Protected = (req, res) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }

 
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Invalid or expired token" });
        }

    
        res.status(200).json({
            success: true,
            message: "You have access to this route",
            userId: decoded.userId
        });
    });
};

export default Protected;
