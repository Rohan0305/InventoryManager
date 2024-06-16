import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export const CreateOrder = () => {
  const { productId } = useParams();
  const [order, setOrder] = useState({
    vendor_name: "",
    price: 0.00,
    items: 0,
    date: "",
    ppu: 0.00,
    productId: productId,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    let newOrder = { ...order, [name]: value };
    
    if (name === "price" || name === "items") {
      const price = name === "price" ? parseFloat(value) : parseFloat(order.price);
      const items = name === "items" ? parseInt(value) : parseInt(order.items);
      newOrder.ppu = calculatePPU(price, items);
    }
    
    setOrder(newOrder);
  };

  const calculatePPU = (price, items) => {
    if (items > 0) {
      return (price / items).toFixed(2);
    } else {
      return 0.00;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post("http://localhost:3001/orders/create-order", order);
        alert("Order added");
        const productId = response.data.productId;
        const orderId = response.data._id;

        const user = await axios.put("http://localhost:3001/orders/", {
            productId,
            orderId,
        });
        console.log(user);

        navigate("/");
    } catch (error) {
        console.error(error);
    }
};


  useEffect(() => {
    setOrder((prevOrder) => ({...prevOrder, ppu: calculatePPU(prevOrder.price, prevOrder.items)}));
  }, [order.price, order.items]);

  return (
    <div className="create-order">
      <h2>Create Order</h2>
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
        <button type="submit">Create Order</button>
      </form>
    </div>
  );
};

