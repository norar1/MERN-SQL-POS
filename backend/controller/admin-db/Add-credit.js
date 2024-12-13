import executeQuery from "../../database/db.js";

const AddCredit = async (req, res) => {
    const {username, credit} = req.body

    if (!username || !credit) {

        return res.status(500).json ({ message: "Please provice all fields"})
    }

    const query = `UPDATE accounts SET credit = credit + ? WHERE username = ?`;

    try {

        const result = await executeQuery(query,[credit, username])

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Credits added successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }

    }catch(e){
        res.status(500).json({message:"Server error"})

        console.error (`SERVER ERROR ${e.message}`)

    }

}

export default  AddCredit;