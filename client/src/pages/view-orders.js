import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/orders/get-orders/${productId}`);
        setOrders(response.data.orders);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrders();
  }, [productId]);

  const handleEditOrder = (orderId) => {
    navigate(`/edit-order/${orderId}`, { state: { productId } });
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:3001/orders/delete-order/${orderId}`);
      await axios.put(`http://localhost:3001/orders/remove-order/${orderId}`, { productId });
      alert("Order Deleted");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <div>
              <h1>Vendor Name: {order.vendor_name}</h1>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h2>Price: ${order.price}</h2>
                <h2>Items: {order.items} </h2>
                <h2>Date: {order.date} </h2>
                <h2>Price Per Unit: ${order.ppu}</h2>
              </div>
              <div style={{ display: "flex", marginBottom: "10px" }}>
                <button onClick={() => handleEditOrder(order._id)}>Edit</button>
                <button onClick={() => handleDeleteOrder(order._id)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
