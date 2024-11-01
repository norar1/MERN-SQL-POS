import executeQuery from "../database/db.js";

const buyItems = async (req, res) => {
    const { userId, itemId, quantity } = req.body;

    try {
       
        const itemQuery = `SELECT price, quantity FROM items WHERE id = ?`;
        const itemResult = await executeQuery(itemQuery, [itemId]);

        if (itemResult.length === 0) {
            return res.status(404).json({ message: "Item not found" });
        }

        const { price, quantity: itemStock } = itemResult[0];
        const totalPrice = price * quantity;

   
        const creditQuery = `SELECT credit FROM accounts WHERE id = ?`;
        const creditResult = await executeQuery(creditQuery, [userId]);

        if (creditResult.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const userCredit = creditResult[0].credit;

        if (userCredit < totalPrice) {
            return res.status(400).json({ message: "Insufficient credit" });
        }

  
        if (itemStock < quantity) {
            return res.status(400).json({ message: "Not enough stock available" });
        }

        await executeQuery(`UPDATE items SET quantity = quantity - ? WHERE id = ?`, [quantity, itemId]);
        await executeQuery(`UPDATE accounts SET credit = credit - ? WHERE id = ?`, [totalPrice, userId]);
        await executeQuery(`INSERT INTO purchases (user_id, item_id, quantity, total_price) VALUES (?, ?, ?, ?)`, [userId, itemId, quantity, totalPrice]);

        return res.status(200).json({ success: true, message: 'Purchase successful.' });

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

export default buyItems;
