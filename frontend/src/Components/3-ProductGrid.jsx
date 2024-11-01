import React, { useEffect, useState } from 'react';
import './3-product_grid.css';
import loadProducts from './loadProducts';
import addToCart from './addToCart';
import initializePayPalButton from './initializePayPalButton';
import purchaseWithStoreCredit from './purchaseWithStoreCredit';
import handleCheckout from './handleCheckout';

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [isPayPalProcessing, setIsPayPalProcessing] = useState(false);
    const [paypalVisible, setPayPalVisible] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await loadProducts();
            setProducts(products);
        };
        fetchProducts();
    }, []);

    const displayCart = () => {
        return cart.map(item => (
            <li key={item.id}>
                {item.name}: Quantity: {item.quantity}, Total Price: ${(item.price * item.quantity).toFixed(2)}
            </li>
        ));
    };

    const handlePayment = (itemId, itemPrice, itemName, quantity, paymentMethod) => {
        if (paymentMethod === 'add-to-cart') {
            addToCart(itemId, itemName, itemPrice, quantity, setCart);
        } else if (paymentMethod === 'store-credit') {
            purchaseWithStoreCredit(itemId, itemPrice, quantity, setCart, cart);
        } else if (paymentMethod === 'paypal') {
            initializePayPalButton(itemPrice, quantity, setPayPalVisible, setIsPayPalProcessing);
        }
    };

    return (
        <div>
            <header><h1>Product Grid</h1></header>
            <main className="product-grid">
                {products.length > 0 ? products.map(product => (
                    <div key={product.id} className="product-card">
                        <img src={product.image_url} alt={product.name} className="product-image" />
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price}</p>
                        <div className="product-actions">
                            <select
                                onChange={e => {
                                    const quantity = parseInt(prompt('Enter quantity:'));
                                    if (!quantity || isNaN(quantity) || quantity <= 0) return alert('Please enter a valid quantity.');
                                    handlePayment(product.id, product.price, product.name, quantity, e.target.value);
                                    e.target.value = ''; // Reset selected option
                                }}
                            >
                                <option value="">Select Payment Method</option>
                                <option value="store-credit">Buy Now (Store Credit)</option>
                                <option value="paypal">Buy with PayPal</option>
                                <option value="add-to-cart">Add to Cart</option>
                            </select>
                        </div>
                    </div>
                )) : (
                    <p>No products available.</p>
                )}
            </main>
            <div id="cart-container">
                <h2>Your Cart</h2>
                <ul id="cart-items">
                    {displayCart()}
                </ul>
                <button id="buy-all" style={{ display: cart.length > 0 ? 'block' : 'none' }} onClick={() => handleCheckout(cart, setCart)}>
                    Check Out
                </button>
                {paypalVisible && <div id="paypal-button-container" style={{ display: 'block' }}></div>}
            </div>
        </div>
    );
};

export default ProductGrid;
