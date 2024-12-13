import express from "express";
import CreateAccount from "../controller/register-login/Create-acc.js"
import LoginAccount from "../controller/register-login/Login-acc.js"


const router = express.Router();

router.post ("/CreateAccount",CreateAccount) //http://localhost:3000/api/accounts/CreateAccount

router.post ("/login",LoginAccount ) //http://localhost:3000/api/accounts/login




export default router;