import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import CategorieCRUD from "./scenes/CategorieCRUD/CategorieCRUD";
import ProduitCRUD from "./scenes/ProduitCRUD/ProduitCRUD";
import ShopByIDCRUD from "./scenes/ShopByIDCRUD/ShopByIDCRUD";
import ShopCRUD from "./scenes/ShopCRUD/ShopCRUD";

function MyRoutes() {
  return (
    <Router>
        <Routes>
          <Route path="/shops"  element={<ShopCRUD />} />
          <Route path="/shop/:id_shop"  element={<ShopByIDCRUD />} />
          <Route path="/categories"  element={<CategorieCRUD />} />

          <Route path="*"  element={<ShopCRUD />} />
        </Routes>
    </Router>
  );
}

export default MyRoutes;
