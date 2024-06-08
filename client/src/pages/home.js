import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/getUserID";
import axios from "axios";

export const Home = () => {
  const [products, setProducts] = useState([]);

  const userId = useGetUserID();

  useEffect(() => {
    console.log(userId);
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
          </li>
        ))}
      </ul>
    </div>
  );
};