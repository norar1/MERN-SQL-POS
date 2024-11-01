import executeQuery from "../database/db.js";

const AddQuantity = async (req, res) => {
    const {name, quantity} = req.body;

    const query = `UPDATE items SET quantity = quantity + ? WHERE name = ?`;


    try {

        if (!name|| !quantity) {
            return res.status(400).json ({message:"Please provice all fields"})
         }

        const result = await executeQuery(query,[quantity, name ])
        res.status(200).json({message:"Quantity Added Succesfully", data:result})
    

    }catch (e){
        console.error(`Server error ${e.message}`)
        res.status(500).json({message:"Server error"})

    }

}




export default AddQuantity;