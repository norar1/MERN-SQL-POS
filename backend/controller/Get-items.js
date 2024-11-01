import executeQuery  from "../database/db.js";

const Showproducts = async (req, res) => {
    const query = `SELECT * FROM items`
    try {
        const result = await executeQuery(query);
    if (result){
       return res.status(200).json({message:"Fetch Item successfully",result})
    } else {
      
       return res.status(400).json({message:"Failed to fetch item"})
    }
} catch(e){
    return res.status(500).json({message:"Server error please check from API"})
}
}




export default Showproducts;