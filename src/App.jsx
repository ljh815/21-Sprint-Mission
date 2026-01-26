import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage"
import PandarMarket from "./pages/PandarMarketPage/Pandar"
import AddItemsPage from "./pages/AddItems/AddItemsPage";
import CommunityPage from "./pages/CommunityPage/CommunityPage"
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <div className="Header">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />}  />
          <Route path="items" element={<PandarMarket />} />
          <Route path="additem" element={<AddItemsPage />} />
          <Route path="community" element={<CommunityPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
