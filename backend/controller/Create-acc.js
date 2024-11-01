import executeQuery from "../database/db.js"

const CreateAccount = async (req, res) => {
    const {username, password} = req.body
    try
         {
            if(!username || !password) {
                return res.status(400).json({success:false, message:"Please Provide all fields"})
            }
        const checkQuery = `SELECT * FROM accounts WHERE username = ?`;
        const existingUser = await executeQuery(checkQuery, [username]);

        if (existingUser.length > 0) {
            return res.status(409).json({ message: "Username already exists", success: false });
        }

        const query = `INSERT INTO accounts (username, password) VALUES (?, ?)`

       const result = await executeQuery(query, [username, password])
   if (result){

     return res.status(200).json ({message:"Account created Successfully", success:true})

   } else {

    return res.status(401).json({message:"Failed creating Account", success:false})
 
   }
  } catch (e){
        console.log ("Server Error", e.message)
        return false;
    }

}




export default CreateAccount;