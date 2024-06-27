import AuthManager from "./pages/AuthManager";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Logout from "./pages/Logout";
function App() {
  console.log(localStorage.getItem("jwt-token"));
  return (
    <Router>
      <Routes>
        <Route path="/" Component={AuthManager} />
        <Route path="/login" Component={Login} />{" "}
        <Route path="/logout" Component={Logout} />
        <Route path="/dashboard" Component={Dashboard} />
      </Routes>
    </Router>
  );
}

export default App;
