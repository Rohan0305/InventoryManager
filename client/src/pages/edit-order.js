import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

export const EditOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = location.state || ""; 
  const [order, setOrder] = useState({
    vendor_name: "",
    price: 0.00,
    items: 0,
    date: "",
    ppu: 0.00,
    productId: productId || "" 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/orders/get-order/${orderId}`);
        const fetchedOrder = response.data;
        setOrder({
          vendor_name: fetchedOrder.vendor_name || "",
          price: fetchedOrder.price || 0.00,
          items: fetchedOrder.items || 0,
          date: fetchedOrder.date ? fetchedOrder.date.split('T')[0] : "",
          ppu: fetchedOrder.ppu || 0.00,
          productId: fetchedOrder.productId || productId
        });
        console.log(fetchedOrder);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch order data");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, productId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3001/orders/update-order/${orderId}`, order);
      alert("Order updated");
      navigate(`/view-orders/${productId}`); 
    } catch (error) {
      console.error(error);
      setError("Failed to update order");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedOrder = { ...order, [name]: value };

    if (name === "price" || name === "items") {
      const price = name === "price" ? parseFloat(value) : parseFloat(order.price);
      const items = name === "items" ? parseInt(value, 10) : parseInt(order.items, 10);
      updatedOrder.ppu = items > 0 ? (price / items).toFixed(2) : 0.00;
    }

    setOrder(updatedOrder);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Edit Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="vendor_name">Vendor Name</label>
          <input
            type="text"
            id="vendor_name"
            name="vendor_name"
            value={order.vendor_name}
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
            value={order.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="items">Items</label>
          <input
            type="number"
            id="items"
            name="items"
            value={order.items}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={order.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="ppu">Price Per Unit (PPU)</label>
          <input
            type="number"
            id="ppu"
            name="ppu"
            step="0.01"
            value={order.ppu}
            readOnly
          />
        </div>
        <button type="submit">Update Order</button>
      </form>
    </div>
  );
};

