import express from "express";
import CreateAccount from "../controller/Create-acc.js"
import LoginAccount from "../controller/Login-acc.js"

const router = express.Router();

router.post ("/CreateAccount",CreateAccount)

router.post ("/login",LoginAccount )


export default router;