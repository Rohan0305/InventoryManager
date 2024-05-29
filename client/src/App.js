import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
// import { Navbar } from "./components/navbar";
import { Auth } from "./pages/auth";
// import { CreateProduct } from "./pages/create-product";
import { Home } from "./pages/home";
// import { Orders } from "./pages/orders";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/orders" element={<Orders />} /> */}
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
