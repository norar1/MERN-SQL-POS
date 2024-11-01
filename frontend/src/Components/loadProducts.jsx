// utils/loadProducts.js
const loadProducts = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/admindb/Getitems');
        const data = await response.json();
        return data.result && data.result.length > 0 ? data.result : [];
    } catch (error) {
        console.error('Error loading products:', error);
        return [];
    }
};

export default loadProducts;
