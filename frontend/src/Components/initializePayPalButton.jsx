// utils/initializePayPalButton.js
const initializePayPalButton = async (price, quantity, setPayPalVisible, setIsPayPalProcessing) => {
    const totalAmount = (parseFloat(price) * quantity).toFixed(2);
    setPayPalVisible(true);
    
    const paypalScript = document.createElement('script');
    paypalScript.src = `https://www.paypal.com/sdk/js?client-id=AXP1e-qW0-F1sg8_RfHfM2Og_LXZ0cnuzlPB3pi90l-59gLMA5gAb8LLHe6wDs5lmjaXCPFXhrKqm7Ge`;
    paypalScript.async = true;
    
    paypalScript.onload = () => {
        if (window.paypal) {
            window.paypal.Buttons({
                createOrder: async () => {
                    try {
                        const response = await fetch('http://localhost:3000/api/payments/create-payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ amount: totalAmount })
                        });
                        const order = await response.json();
                        if (!response.ok) {
                            throw new Error(order.message || 'Error creating order');
                        }
                        return order.id;
                    } catch (error) {
                        console.error('Error creating order:', error);
                        alert('Could not create order. Please try again.');
                    }
                },
                onApprove: async (data) => {
                    if (isPayPalProcessing) return;
                    setIsPayPalProcessing(true);
                    try {
                        const response = await fetch('http://localhost:3000/api/payments/capture-payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ orderID: data.orderID })
                        });
                        const captureData = await response.json();
                        if (!response.ok) {
                            throw new Error(captureData.message || 'Error capturing payment');
                        }
                        alert(captureData.status);
                    } catch (error) {
                        console.error('Error capturing payment:', error);
                        alert('Could not capture payment. Please try again.');
                    } finally {
                        setIsPayPalProcessing(false);
                        setPayPalVisible(false);
                    }
                },
                onCancel: () => {
                    setPayPalVisible(false);
                    alert('Payment was canceled.');
                }
            }).render('#paypal-button-container');
        } else {
            console.error('PayPal SDK not loaded');
        }
    };
    
    document.body.appendChild(paypalScript);
};

export default initializePayPalButton;
