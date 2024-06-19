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
              <button onClick={() => handleEditOrder(order._id)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
