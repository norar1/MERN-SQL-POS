import executeQuery  from "../database/db.js";

const Additemdata = async (req, res) => {
    const {name, price, quantity, image_url} = req.body;

    const query = `INSERT into items (name, price, quantity, image_url)  values (?, ?, ?, ?)`

    try {
        if (!name || !price || !image_url) {

            return res.status(401).json ({message:"Please Provide all fields"})
         } 

        const result = executeQuery(query,[name, price, quantity, image_url])

        res.status(200).json ({message: "Item added successfully",result })

    } catch(e){

        res.status(500).json({message:"Server error"})

    }


}







export default Additemdata;