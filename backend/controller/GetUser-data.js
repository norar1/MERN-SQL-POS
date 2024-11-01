import executeQuery from "../database/db.js";

const getUserData = async (req, res) => {
    const {credit, username, id } = req.body
    const query = `SELECT credit, username, id FROM accounts`;

    try{
        const result = await executeQuery(query, [credit, username, id])
        if (result){
           return res.status({message:"Fetch success", success:true})
        } else {
           return res.status(401).json({message:"Failed fetching data", success:false})
        } 
    } catch (e){
        res.status(500).json({message:"Server error please check from API", success:false})
    }


    

}













export default getUserData;