import executeQuery from "../database/db.js";

const LoginAccount = async (req, res) => {
    const { username, password } = req.body;

    const query = `SELECT id FROM accounts WHERE username = ? AND password = ?`;

    try {
        const result = await executeQuery(query, [username, password]);

        if (result.length > 0) {
            const userId = result[0].id;
            return res.status(200).json({ message: "Log in successfully", success: true, userId: userId });
        } else {
            return res.status(401).json({ success: false, message: "Invalid username or password" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error. Check from API" });
    }
};

export default LoginAccount;
