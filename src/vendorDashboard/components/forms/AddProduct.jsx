import React, { useState } from 'react';
import { API_URL } from '../../data/ApiPath';

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [image, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  }

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage);
  }

  const handleBestSeller = (event) => {
    const value = event.target.value === 'true';
    setBestSeller(value);
  }

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('login');
      const firmId = localStorage.getItem('firmId');

      if (!loginToken || !firmId) {
        console.error("User not authenticated");
        return;
      }

      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('image', image);

      category.forEach((value) => {
        formData.append('category', value);
      });

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${loginToken}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        alert("Product added successfully", data);
        setProductName("");
        setCategory([]);
        setFile("");
        setBestSeller(false);
        setDescription("");
        setPrice("");
      } else {
        console.error("Failed to add product", data);
      }
    } catch (error) {
      console.error("Failed to add product", error);
    }
  }

  return (
    <div className="authSection">
      <form className="authForm" onSubmit={handleAddProduct}>
        <h3>Add Product</h3>
        <label>Product Name</label>
        <input
          type="text"
          placeholder="Enter product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <label>Price</label>
        <input
          type="text"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div className="formGroup">
          <label>Category</label>
          <div className="checkInp">
            <div className="checkboxContainer">
              <label>
                <input
                  type="checkbox"
                  value="veg"
                  checked={category.includes('veg')}
                  onChange={handleCategoryChange}
                />
                Veg
              </label>
              <label>
                <input
                  type="checkbox"
                  value="non-veg"
                  checked={category.includes('non-veg')}
                  onChange={handleCategoryChange}
                />
                Non-Veg
              </label>
            </div>
          </div>
        </div>
        <div className="formGroup">
          <label>Best Seller</label>
          <div className="checkInp">
            <div className="checkboxContainer">
              <label>
                <input
                  type="radio"
                  value="true"
                  checked={bestSeller === true}
                  onChange={handleBestSeller}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  value="false"
                  checked={bestSeller === false}
                  onChange={handleBestSeller}
                />
                No
              </label>
            </div>
          </div>
        </div>
        <label>Description</label>
        <input
          type="text"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Product Image</label>
        <input
          type="file"
          onChange={handleImageUpload}
        />
        <div className="btnSubmit">
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
