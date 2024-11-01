// utils/purchaseWithStoreCredit.js
const purchaseWithStoreCredit = async (itemId, price, quantity, setCart, cart) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('User ID not found.');
        return;
    }
    try {
        const response = await fetch('http://localhost:3000/api/items/PurchaseItems', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, itemId, quantity, paymentMethod: 'store-credit' })
        });

        const data = await response.json();
        alert(data.message);
        if (response.ok) {
            setCart(cart.filter(item => item.id !== itemId));
        }
    } catch (error) {
        console.error('Error purchasing with store credit:', error);
        alert('An error occurred while purchasing.');
    }
};

export default purchaseWithStoreCredit;
