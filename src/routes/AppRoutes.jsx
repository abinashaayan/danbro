import { Routes, Route } from "react-router-dom";
import Home from "../layouts/MainLayout";
import { AboutUs } from "../pages/home/AboutUs";
import { Blog } from "../pages/home/Blog";
import { Contact } from "../pages/home/Contact";
import { PressandMedia } from "../pages/home/PressandMedia";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { UserProfile } from "../pages/user/UserProfile";
import { TrackOrder } from "../pages/orders/TrackOrder";
import { ProductList } from "../pages/products/ProductList";
import { ProductDetails } from "../pages/products/ProductDetails";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/press-media" element={<PressandMedia />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
    );
};

export default AppRoutes;
