import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/getUserID";
import { useNavigate } from "react-router-dom";

export const CreateProduct = () => {
  const userID = useGetUserID();
  const [product, setProduct] = useState({
    name: "",
    price: 0.00,
    imageURL: "",
    owner: userID,
    order: [],
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });

    console.log(product);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        console.log(product);
        const response = await axios.post("http://localhost:3001/products/create-product", product);
        alert("Recipe Created");
        const { owner: userId, _id: productId } = response.data;

        const user = await axios.put("http://localhost:3001/products/", {
            userId,
            productId
        });
        console.log(user);

        navigate("/");
    } catch (error) {
        console.error(error);
    }
};


  return (
    <div className="create-product">
      <h2>Create Product</h2>
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
          step="0.01"
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
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};