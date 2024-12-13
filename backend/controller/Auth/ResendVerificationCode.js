import executeQuery from "../../database/db.js";
import { sendVerificationCode } from "../../utils/mail.js";

const ResendVerificationCode = async (req, res) => {
    const { username } = req.body;

    try {
        const checkQuery = `SELECT * FROM accounts WHERE username = ? AND verified = 0`;
        const user = await executeQuery(checkQuery, [username]);

        if (user.length === 0) {
            return res.status(404).json({ message: "User not found or already verified", success: false });
        }

        const newVerificationCode = Math.floor(100000 + Math.random() * 900000); //6 numbers
        const updateQuery = `UPDATE accounts SET verification_code = ? WHERE username = ?`;
        await executeQuery(updateQuery, [newVerificationCode, username]);

        await sendVerificationCode(username, newVerificationCode);
        return res.status(200).json({ message: "A new verification code has been sent to your email.", success: true });
    } catch (e) {
        console.error("Server Error:", e.message);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export default ResendVerificationCode;