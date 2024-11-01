// utils/addToCart.js
const addToCart = (itemId, itemName, itemPrice, quantity, setCart) => {
    setCart(prevCart => [...prevCart, { id: itemId, name: itemName, price: itemPrice, quantity }]);
};

export default addToCart;
