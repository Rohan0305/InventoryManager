import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/getUserID";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const userId = useGetUserID();
  const [productId, setProductId] = useState("");
  const navigate = useNavigate();
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

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

  const handleDelete = async (productId) => {
    try {
      setProductId(productId);
      await axios.delete(`http://localhost:3001/products/delete-product/${productId}`);
      await axios.put(`http://localhost:3001/products/remove-product/${productId}`, { userId });
      alert("Product deleted");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddOrder = (productId) => {
    navigate(`/create-order/${productId}`);
  };

  const handleViewOrders = (productId) => {
    navigate(`/view-orders/${productId}`);
  };

  const handleStartChange = (event) => {
    setStart(event.target.value);
  };

  const handleEndChange = (event) => {
    setEnd(event.target.value);
  };

  const handleSetPriceRange = async (event) => {
    event.preventDefault(); 
    try {
      const response = await axios.get("http://localhost:3001/products/get-products/price-range", {
        params: { userId, minPrice: start, maxPrice: end },
      });
      setProducts(response.data.products);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
      <h1>Products</h1>
      <ul>
      <form onSubmit={handleSetPriceRange}>
        <div>
          <label htmlFor="Start">Minumum Price: </label>
          <input
            type="number"
            id="Start"
            name="Start"
            value={start}
            onChange={handleStartChange}
          />
        </div>
        <div>
          <label htmlFor="End">Maximim Price: </label>
            <input
              type="number"
              id="End"
              name="End"
              value={end}
              onChange={handleEndChange}
            />
        </div>
        <button type="submit">Set Price Range</button>
      </form>
        {products.map((product) => (
          <li key={product._id}>
            <div>
              <h2>{product.name}</h2>
            </div>
            <img src={product.imageURL} alt={product.name} />
            <p>Price: ${product.price} </p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", marginBottom: "10px" }}>
                <button onClick={() => handleEdit(product._id)}>Edit</button>
                <button onClick={() => handleDelete(product._id)}>Delete</button>
              </div>
              <button onClick={() => handleAddOrder(product._id)}>Add Order</button>
              <button onClick={() => handleViewOrders(product._id)}>View Orders</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

