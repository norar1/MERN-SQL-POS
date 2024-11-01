import executeQuery from "../database/db.js";

const Createitems = async (req, res) => {
    const  {name, price , quantity, image_url} = req.body

    try {
        if(!name || !price || !quantity || !image_url){
          return  res.status(400).json({message:"Please provice all fields"})
        }
        const query = `INSERT into items (name, price, quantity, image_url) VALUES (? ,? ,? , ?) `

        const result = executeQuery(query,[name, price, quantity, image_url])

        if (result){

           return res.status(400).json({message:"Item Created Successfully", success:true})
        } else {

           return res.status(401).json({message:"Error Creating item", success:false})
        }
        
    }
    catch(e){
        console.error("Server error", e.message)
    }
}




export default Createitems;