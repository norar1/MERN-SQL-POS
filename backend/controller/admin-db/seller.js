import executeQuery from "../../database/db.js";

import bcrypt from "bcrypt";



 const SellerAcc = async (req, res) => {
    const { username, password } = req.body;


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

        const query = `INSERT INTO accounts (username, password, verified, role) VALUES (?, ?,  1, "seller")
`;
        const result = await executeQuery(query, [username, hashedPassword]);


        if (result) {
            return res.status(200).json({message:"Account Created Successfully"})
        }



    }
    catch(e){
        console.log("Internal Server Error")
        res.status(400).json({message: e.message})

    }
    }

    export default SellerAcc;