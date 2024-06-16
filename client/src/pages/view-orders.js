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

//   const handleEdit = (productId) => {
//     navigate(`/edit-product/${productId}`);
//   };

//   const handleDelete = async (productId) => {
//     try {
//       setProductId(productId);
//       await axios.delete(`http://localhost:3001/products/delete-product/${productId}`);
//       await axios.put(`http://localhost:3001/products/remove-product/${productId}`, { userId });
//       alert("Product deleted");
//       navigate("/");
//     } catch (error) {
//       console.error(error);
//     }
//   };

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <div>
              <h2>{order.vendor_name}</h2>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <h1>Price: ${order.price}</h1>
                    <h1>Items: {order.items} </h1>
                    <h1>Date: {order.date} </h1>
                    <h1>Price Per Unit: {order.ppu}</h1>
                </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};