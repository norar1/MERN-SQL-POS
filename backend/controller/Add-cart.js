import executeQuery from "../database/db.js";

const AddtoCart = async (req, res) => {
    const { userId, itemId, quantity } = req.body; //req body are userId, itemId, quantity


    try {
        
    if (!userId || !itemId || !quantity) { //error when they are not filled
        return res.status(400).json({ message: 'User ID, Item ID, and Quantity are required.' });
    }

        const query = 'INSERT INTO cart (user_id, item_id, quantity) VALUES (?, ?, ?)'; //inserting cart item
        const result = await executeQuery(query, [userId, itemId, quantity]); 
        res.status(201).json({ message: 'Item successfully added to cart.', cartId: result.insertId });
    } catch (err) {
        res.status(500).json({ message: 'Failed to add item to cart.', error: err });
    }
};

export default AddtoCart;
