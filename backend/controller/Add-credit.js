import executeQuery from "../database/db.js";

const AddCredit = async (req, res) => {
    const {username, credit} = req.body

        const query = `UPDATE accounts SET credit = + ? WHERE username = ?`

    try {

        if (!username || !credit) {

            return res.status(500).json ({ message: "Please provice all fields"})
        }
    
        const result = await executeQuery(query,[username, credit])

        res.status(200).json({message:"Credit successfully added", data: result})

    }catch(e){
        res.status(500).json({message:"Server error"})

        console.error (`SERVER ERROR ${e.message}`)

    }

}

export default  AddCredit;