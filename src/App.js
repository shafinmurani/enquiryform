import AuthManager from "./pages/AuthManager";
import ProductGroup from "./pages/product_group/ProductGroup";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Logout from "./pages/Logout";
import Product from "./pages/product/Product";
import Party from "./pages/party/Party";
import AddProductGroup from "./pages/product_group/AddProductGroup";
function App() {
  console.log(localStorage.getItem("jwt-token"));
  return (
    <Router>
      <Routes>
        <Route path="/" Component={AuthManager} />
        <Route path="/login" Component={Login} />{" "}
        <Route path="/logout" Component={Logout} />
        <Route path="/product-group" Component={ProductGroup} />
        <Route path="/product-group/add" Component={AddProductGroup} />
        <Route path="/product" Component={Product} />
        <Route path="/party" Component={Party} />
      </Routes>
    </Router>
  );
}

export default App;
