// utils/handleCheckout.js
const handleCheckout = async (cart, setCart) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('User ID not found. Please log in.');
        return;
    }

    let itemsProcessed = 0;

    for (const item of cart) {
        const checkoutItem = {
            userId,
            itemId: item.id,
            quantity: item.quantity
        };

        try {
            const response = await fetch('http://localhost:3000/api/items/PurchaseItems', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(checkoutItem)
            });

            const data = await response.json();
            if (response.ok) {
                alert(`Checkout successful for ${item.name}! ` + data.message);
                setCart(prevCart => prevCart.filter(cartItem => cartItem.id !== item.id));
                itemsProcessed++;
            } else {
                alert(`Checkout failed for ${item.name}: ` + data.message);
            }
        } catch (error) {
            console.error(`Error during checkout for ${item.name}:`, error);
            alert('An error occurred during checkout.');
        }
    }

    if (itemsProcessed === cart.length) {
        alert('All items purchased successfully!');
    } else {
        alert('Some items could not be processed.');
    }
};

export default handleCheckout;
