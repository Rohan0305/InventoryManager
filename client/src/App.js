import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar";
import { Auth } from "./pages/auth";
import { CreateProduct } from "./pages/create-product";
import { Home } from "./pages/home";
import { EditProduct } from "./pages/edit-product";
import { CreateOrder } from "./pages/create-order";
import { ViewOrders } from "./pages/view-orders";
import { EditOrder } from "./pages/edit-order";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/edit-product/:productId" element={<EditProduct />} /> 
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-order/:productId" element={<CreateOrder />} />
          <Route path="/view-orders/:productId" element={<ViewOrders/>} />
          <Route path="/edit-order/:orderId" element={<EditOrder />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
