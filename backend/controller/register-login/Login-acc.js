import executeQuery from "../../database/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const LoginAccount = async (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT id, username, password, verified, role FROM accounts WHERE username = ?`;

    try {
        const result = await executeQuery(query, [username]);
    
        if (result.length === 0) {
            return res.status(401).json({ success: false, message: "Invalid username " });
        }
    
        const user = result[0];
    

        const isPasswordValid = await bcrypt.compare (password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }
    
        if (user.verified !== 1) {
            return res.status(403).json({ success: false, message: "Account is not verified. Please verify your account." });
        }

        const accessToken = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );
    
        const refreshToken = jwt.sign(
            { userId: user.id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        );
    
        return res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            refreshToken,
            userId: user.id,
            role: user.role
        });
    
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
    
};

export default LoginAccount;
