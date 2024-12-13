import executeQuery  from "../../database/db.js";

const itemlogs = async  (req,res) => {
    const query = `SELECT * FROM purchases`

    try {
    const result = await executeQuery(query);
    if (result) {
      return  res.status(200).json({result})
    }

    } catch (e){
        res.status(500).json({message:"Server error"})

    }

}




export default itemlogs;