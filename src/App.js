import AuthManager from "./pages/AuthManager";
import ProductGroup from "./pages/product_group/ProductGroup";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Logout from "./pages/Logout";
import Product from "./pages/product/Product";
import Party from "./pages/party/Party";
import AddProduct from "./pages/product/AddProduct";
import AddProductGroup from "./pages/product_group/AddProductGroup";
import EditProductGroup from "./pages/product_group/EditProductGroup";
function App() {
  console.log(localStorage.getItem("jwt-token"));
  return (
    <Router>
      <Routes>
        <Route path="/" Component={AuthManager} />
        <Route path="/login" Component={Login} />{" "}
        <Route path="/logout" Component={Logout} />
        <Route path="/service-group" Component={ProductGroup} />
        <Route path="/service-group/add" Component={AddProductGroup} />
        <Route path="/service-group/edit" Component={EditProductGroup} />
        <Route path="/service" Component={Product} />
        <Route path="/service/add" Component={AddProduct} />
        <Route path="/party" Component={Party} />
      </Routes>
    </Router>
  );
}

export default App;
