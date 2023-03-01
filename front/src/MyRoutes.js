import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import ShopCRUD from "./components/ShopCRUD/ShopCRUD";

function MyRoutes() {
  return (
    <Router>
        <Routes>

          <Route path="/"  element={<ShopCRUD />} />
         
        </Routes>
    </Router>
  );
}

export default MyRoutes;
