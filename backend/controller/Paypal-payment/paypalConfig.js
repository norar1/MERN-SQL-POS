
import PayPal from '@paypal/checkout-server-sdk';
import dotenv from 'dotenv';


dotenv.config();

const clientId = process.env.PAYPAL_CLIENT_ID; 
const clientSecret = process.env.PAYPAL_CLIENT_SECRET; 

function environment() {
    return new PayPal.core.SandboxEnvironment(clientId, clientSecret);
}

function client() {
    return new PayPal.core.PayPalHttpClient(environment());
}

export { client };
