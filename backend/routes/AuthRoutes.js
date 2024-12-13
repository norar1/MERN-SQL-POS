import express from "express";
import ResendVerificationCode from "../controller/Auth/ResendVerificationCode.js"
import VerifyAccount from "../controller/Auth/VerifyAccount.js"
import Protected from "../controller/Auth/Protected.js"

const router = express.Router();

router.post('/verify-account', VerifyAccount); // http://localhost:3000/api/authroutes/verify-account

router.post('/resend-verification', ResendVerificationCode); // http://localhost:3000/api/authroutes/resend-verification

router.get ("/protected", Protected) // http://localhost:3000/api/authroutes/protected

export default router;