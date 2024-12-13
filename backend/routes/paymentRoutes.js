import express from 'express';
import { client } from '../controller/Paypal-payment/paypalConfig.js'
import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

const router = express.Router();

router.post('/create-payment', async (req, res) => {
    const { amount } = req.body;

    const request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'USD',
                    value: amount
                }
            }
        ]
    });

    try {
        const order = await client().execute(request);
        res.json({ id: order.result.id });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/capture-payment', async (req, res) => {
    const { orderID } = req.body;

    const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    try {
        const capture = await client().execute(request);
        res.json({ status: 'Payment captured successfully', capture });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default router;
