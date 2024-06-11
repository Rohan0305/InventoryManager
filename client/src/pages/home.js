import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/getUserID";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const userId = useGetUserID();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products/get-products", {
          params: { userId },
        });
        setProducts(response.data.products);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, [userId]);

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <div>
              <h2>{product.name}</h2>
            </div>
            <img src={product.imageURL} alt={product.name} />
            <p>Price: ${product.price} </p>
            <button onClick={() => handleEdit(product._id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
