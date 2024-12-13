import executeQuery from "../../database/db.js";

const buyItems = async (req, res) => {
    const { userId, items } = req.body;

    try {
        const creditQuery = `SELECT credit FROM accounts WHERE id = ?`;
        const creditResult = await executeQuery(creditQuery, [userId]);

        if (!creditResult || creditResult.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const userCredit = creditResult[0].credit;
        const purchaseDetails = [];

        for (const { itemId, quantity } of items) {
            const itemQuery = `SELECT price, quantity FROM items WHERE id = ?`;
            const itemResult = await executeQuery(itemQuery, [itemId]);

            if (!itemResult || itemResult.length === 0) {
                return res.status(404).json({ message: `Item ${itemId} not found` });
            }

            const { price, quantity: itemStock } = itemResult[0];

            if (itemStock < quantity) {
                return res.status(400).json({ message: `Not enough stock for item ${itemId}` });
            }

            const total = price * quantity;
            purchaseDetails.push({ itemId, quantity, total });
        }

        const totalCost = purchaseDetails.reduce((sum, { total }) => sum + total, 0);

        if (userCredit < totalCost) {
            return res.status(400).json({ message: "Insufficient credit" });
        }

        await Promise.all(items.map(async ({ itemId, quantity }) => {
            const updateStockQuery = `UPDATE items SET quantity = quantity - ? WHERE id = ?`;
            await executeQuery(updateStockQuery, [quantity, itemId]);
        }));

        const updateCreditQuery = `UPDATE accounts SET credit = credit - ? WHERE id = ?`;
        await executeQuery(updateCreditQuery, [totalCost, userId]);

        return res.status(200).json({ success: true, message: "Purchase successful." });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

export default buyItems;
