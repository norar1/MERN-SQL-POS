import executeQuery from "../../database/db.js";

const Createitems = async (req, res) => {
    const { name, price, quantity, image_link, description } = req.body;

    try {
   
        if (!name || !price || !quantity || !image_link || !description) {
            return res.status(400).json({ message: "Please provide all fields" });
        }


        const query = `INSERT INTO items (name, price, quantity, image_link, description) VALUES (?, ?, ?, ?, ?)`;
        const result = await executeQuery(query, [name, price, quantity, image_link, description]);


        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Item Created Successfully", success: true });
        } else {
            return res.status(500).json({ message: "Error Creating item", success: false });
        }
    } catch (e) {
        console.error("Server error:", e.message);
        return res.status(500).json({ message: "Server error", success: false });
    }
};

export default Createitems;
