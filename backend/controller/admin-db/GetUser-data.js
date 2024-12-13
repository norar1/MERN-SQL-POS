import executeQuery from "../../database/db.js";

const getUserData = async (req, res) => {
    const query = 'SELECT username, credit, id FROM accounts';

    try {
        const result = await executeQuery(query);
        
        if (result && result.length > 0) {
            return res.status(200).json({ message: "Fetch success", success: true, data: result });
        } else {
            return res.status(404).json({ message: "No data found", success: false });
        }
    } catch (e) {
        console.error(e); 
        return res.status(500).json({ message: "Server error, please check the API", success: false });
    }
}

export default getUserData;
