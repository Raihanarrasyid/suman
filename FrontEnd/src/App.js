import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./scenes/home/Home";
import Navbar from "./scenes/global/Navbar";
import Footer from "./scenes/global/Footer";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import LoginPage from "./scenes/auth/LoginPage";
import AuthProvider from "./context/AuthContext";
import SignUpPage from "./scenes/auth/SignUpPage";
import Cart from "./scenes/transaction/Cart.jsx";
import AdminPage from "./scenes/admin/AdminPage";
import AddProduct from "./scenes/admin/AddProduct";
import EditItem from "./scenes/admin/EditItem";
import AddressForm from "./scenes/checkout/AddressForm";
import AddressList from "./scenes/checkout/AddressList";
import Checkout from "./scenes/checkout/Checkout";
import Payment from "./scenes/checkout/Payment";
import Profile from "./scenes/user/Profile";
import ManageOrder from "./scenes/admin/ManageOrder";
import OrderDetail from "./scenes/admin/OrderDetail";
import About from "./scenes/global/About";
import Customize from "./scenes/home/Customize";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="item/:itemId" element={<ItemDetails />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="cart" element={<Cart />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="admin/add-product" element={<AddProduct />} />
            <Route path="admin/edit/:id" element={<EditItem />} />
            <Route path="address" element={<AddressList />} />
            <Route path="address/add" element={<AddressForm />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="payment/:id" element={<Payment />} />
            <Route path="profile" element={<Profile />} />
            <Route path="admin/manage-order" element={<ManageOrder />} />
            <Route path="admin/manage-order/:id" element={<OrderDetail />} />
            <Route path="about" element={<About />} />
            <Route path="customize" element={<Customize />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
      <Analytics />
    </div>
  );
}

export default App;
