import { Routes, Route } from "react-router-dom";
import Home from "../layouts/MainLayout";
import { AboutUs } from "../pages/home/AboutUs";
import { Blog } from "../pages/home/Blog";
import { Contact } from "../pages/home/Contact";
import { PressandMedia } from "../pages/home/PressandMedia";
import { Career } from "../pages/home/Career";
import { Offers } from "../pages/home/Offers";
import { CateringEvents } from "../pages/home/CateringEvents";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { UserProfile } from "../pages/user/UserProfile";
import { TrackOrder } from "../pages/orders/TrackOrder";
import { ProductList } from "../pages/products/ProductList";
import { ProductDetails } from "../pages/products/ProductDetails";
import BlogDetails from "../pages/home/BlogDetails";
import { Store } from "../pages/home/Store";
import { NotFound } from "../pages/NotFound";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog-details" element={<BlogDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/press-media" element={<PressandMedia />} />
            <Route path="/store" element={<Store />} />
            <Route path="/career" element={<Career />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/events" element={<CateringEvents />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
