import { createLazyComponent } from "../components/comman/LazyRoute";

/**
 * Route Configuration
 * Define all routes with their properties here
 */

// Lazy load all components
const Home = createLazyComponent(() => import("../layouts/MainLayout"));
const BlogDetails = createLazyComponent(() => import("../pages/home/BlogDetails"));
const AboutUs = createLazyComponent(() => import("../pages/home/AboutUs"), "AboutUs");
const Blog = createLazyComponent(() => import("../pages/home/Blog"), "Blog");
const Contact = createLazyComponent(() => import("../pages/home/Contact"), "Contact");
const PressandMedia = createLazyComponent(() => import("../pages/home/PressandMedia"), "PressandMedia");
const Career = createLazyComponent(() => import("../pages/home/Career"), "Career");
const Offers = createLazyComponent(() => import("../pages/home/Offers"), "Offers");
const CateringEvents = createLazyComponent(() => import("../pages/home/CateringEvents"), "CateringEvents");
const Login = createLazyComponent(() => import("../pages/auth/Login"), "Login");
const Register = createLazyComponent(() => import("../pages/auth/Register"), "Register");
const VerifyOtp = createLazyComponent(() => import("../pages/auth/VerifyOtp"), "VerifyOtp");
const UserProfile = createLazyComponent(() => import("../pages/user/UserProfile"), "UserProfile");
const Wishlist = createLazyComponent(() => import("../pages/user/Wishlist"), "Wishlist");
const TrackOrder = createLazyComponent(() => import("../pages/order/TrackOrder"), "TrackOrder");
const ProductList = createLazyComponent(() => import("../pages/products/ProductList"), "ProductList");
const ProductDetails = createLazyComponent(() => import("../pages/products/ProductDetails"), "ProductDetails");
const Store = createLazyComponent(() => import("../pages/home/Store"), "Store");
const NotFound = createLazyComponent(() => import("../pages/NotFound"), "NotFound");
const Cart = createLazyComponent(() => import("../pages/cart/Cart"), "Cart");
const PrivacyPolicy = createLazyComponent(() => import("../pages/home/PrivacyPolicy"), "PrivacyPolicy");
const TermsAndConditions = createLazyComponent(() => import("../pages/home/TermsAndConditions"), "TermsAndConditions");
const RefundReturnsPolicy = createLazyComponent(() => import("../pages/home/RefundReturnsPolicy"), "RefundReturnsPolicy");
const CorporateQueries = createLazyComponent(() => import("../pages/home/CorporateQueries"), "CorporateQueries");
// const paymentSuccess = createLazyComponent(() => import("../pages/home/paymentSuccess"), "paymentSuccess");

/**
 * Public Routes - Accessible without authentication
 */
export const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about-us",
    component: AboutUs,
  },
  {
    path: "/blog",
    component: Blog,
  },
  {
    path: "/blog-details",
    component: BlogDetails,
  },
  {
    path: "/contact",
    component: Contact,
  },
  {
    path: "/media",
    component: PressandMedia,
  },
  {
    path: "/store",
    component: Store,
  },
  {
    path: "/career",
    component: Career,
  },
  {
    path: "/offers",
    component: Offers,
  },
  {
    path: "/events",
    component: CateringEvents,
  },
  {
    path: "/products",
    component: ProductList,
  },
  {
    path: "/products/:id",
    component: ProductDetails,
  },
  {
    path: "/privacy-policy",
    component: PrivacyPolicy,
  },
  {
    path: "/terms-conditions",
    component: TermsAndConditions,
  },
  {
    path: "/refund-returns-policy",
    component: RefundReturnsPolicy,
  },
  {
    path: "/corporate-queries",
    component: CorporateQueries,
  },
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/wishlist",
    component: Wishlist,
  },
  {
    path: "/track-order",
    component: TrackOrder,
  },
];

/**
 * Auth Routes - Login, Register, etc. (Redirect to home if already logged in)
 */
export const authRoutes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/verify-otp",
    component: VerifyOtp,
  },
];

/**
 * Private Routes - Require authentication
 */
export const privateRoutes = [
  {
    path: "/profile",
    component: UserProfile,
  },
];

/**
 * 404 Route
 */
export const notFoundRoute = {
  path: "*",
  component: NotFound,
};

