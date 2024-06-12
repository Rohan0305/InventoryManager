import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUserID } from "../hooks/getUserID";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const EditProduct = () => {
  const userID = useGetUserID();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState({
    name: "",
    price: 0.00,
    imageURL: "",
    owner: userID,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/products/get-product/${productId}`);
        setProduct(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3001/products/update-product/${productId}`, product);
      alert("Product updated");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="imageURL">Image URL</label>
          <input
            type="text"
            id="imageURL"
            name="imageURL"
            value={product.imageURL}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};
