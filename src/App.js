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
import EditProduct from "./pages/product/EditProduct";
import AddParty from "./pages/party/AddParty";
import EditParty from "./pages/party/EditParty";
import Company from "./pages/company/Company";
import AddCompany from "./pages/company/AddCompany";
import EditCompany from "./pages/company/EditCompany";
import Dealer from "./pages/dealer/Dealer";
import AddDealer from "./pages/dealer/AddDealer";
function App() {
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
        <Route path="/service/edit" Component={EditProduct} />
        <Route path="/party" Component={Party} />
        <Route path="/party/add" Component={AddParty} />
        <Route path="/party/edit" Component={EditParty} />
        <Route path="/company" Component={Company} />
        <Route path="/company/add" Component={AddCompany} />
        <Route path="/company/edit" Component={EditCompany} />
        <Route path="/dealer" Component={Dealer} />
        <Route path="/dealer/add" Component={AddDealer} />
      </Routes>
    </Router>
  );
}

export default App;
