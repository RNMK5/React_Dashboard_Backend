import React, { useState, useEffect } from 'react';
import { API_URL } from '../data/ApiPath';

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    const deleteProudctById = async (productId) => {
        try {
            const response = await fetch(`${API_URL}/product/${productId}`,{
                method: 'DELETE',

            });

            if(response.ok){
                setProducts(products.filter(product => product._id !== productId));
                confirm("are you sure want to delete ")
                alert("product deleted successfully")
            }
        } catch (error) {
            console.error("failed to delete product");
            alert('failed to delete the product')
        }
    }

    const productHandler = async () => {
        const firmId = localStorage.getItem('firmId');
        try {
            const response = await fetch(`${API_URL}/product/${firmId}/products`);
            const newProductData = await response.json();
            setProducts(newProductData.products);
        } catch (error) {
            console.log('failed to fetch products');
        }
    };

    useEffect(() => {
        productHandler();
    }, []);

    return (
        <div className="all-products-container">
            {!products ? (
                <p>No products added</p>
            ) : (
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item) => (
                            <tr key={item._id}>
                                <td>{item.productName}</td>
                                <td>{item.price}</td>
                                <td>
                                    {item.image && (
                                        <img
                                            src={`${API_URL}/uploads/${item.image}`}
                                            alt={item.productName}
                                            className="product-image"
                                        />
                                    )}
                                </td>
                                <td>
                                    <button className="delete-button" onClick={() => deleteProudctById(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllProducts;
