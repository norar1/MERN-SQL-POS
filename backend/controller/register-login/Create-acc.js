import executeQuery from "../../database/db.js";
import { sendVerificationCode } from "../../utils/mail.js";
import bcrypt from "bcrypt";

const CreateAccount = async (req, res) => {
    const { username, password } = req.body;
    const verification_code = Math.floor(100000 + Math.random() * 900000); // 6 numbers

    try {
        if (!username || !password) {
            return res.status(400).json({ success: false, message: "Please provide all fields" });
        }

        const checkQuery = `SELECT * FROM accounts WHERE username = ?`;
        const existingUser = await executeQuery(checkQuery, [username]);

        if (existingUser.length > 0) {
            return res.status(409).json({ message: "Username already exists", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `INSERT INTO accounts (username, password, verification_code, verified, role) VALUES (?, ?, ?, 0, "user")`;
        const result = await executeQuery(query, [username, hashedPassword, verification_code]);

        if (result) {
            await sendVerificationCode(username, verification_code);
            return res.status(200).json({ message: "Account created successfully. Please check your email for the verification code.", success: true });
        } else {
            return res.status(401).json({ message: "Failed creating account", success: false });
        }
    } catch (e) {
        console.error("Server Error:", e.message);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export default CreateAccount;
