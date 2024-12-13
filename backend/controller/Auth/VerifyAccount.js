import executeQuery from "../../database/db.js";

const VerifyAccount = async (req, res) => {
    const { username, verification_code } = req.body;

    try {
      
        const query = `SELECT * FROM accounts WHERE username = ? AND verification_code = ? AND verified = 0`;
        const user = await executeQuery(query, [username, verification_code]);

        if (user.length === 0) {
            return res.status(400).json({ message: "Invalid code or account already verified.", success: false });
        }

   
        const updateQuery = `UPDATE accounts SET verified = 1 WHERE username = ?`;
        await executeQuery(updateQuery, [username]);

        return res.status(200).json({ message: "Account verified successfully.", success: true });
    } catch (e) {
        console.error("Server Error:", e.message);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export default VerifyAccount;
