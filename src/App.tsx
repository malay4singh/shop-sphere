import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AllProducts from "./components/products/AllProducts";
import ShowProduct from "./components/products/ShowProduct";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Wrapper from "./components/Wrapper";
import Cart from "./components/cart/Cart";
import Home from "./components/Home";
import Checkout from "./components/cart/Checkout";
import ViewOrder from "./components/cart/ViewOrder";
import PrivateRouter from "./components/PrivateRouter";
import AddProduct from "./components/admin/AddProduct";
import EditProduct from "./components/admin/EditProduct";

function App() {
        return (
                <>
                        <BrowserRouter>
                                <Routes>
                                        <Route path="/" element={<Navigate to='/home' replace />} />
                                        <Route path="/home" element={<Home />} />

                                        <Route path="/login" element={<Login />} />
                                        <Route path="/sign-up" element={<SignUp />} />
                                        
                                        <Route path="/" element={<Wrapper />}>
                                                <Route path="/products" element={<AllProducts />} />
                                                <Route path="/products/:id" element={<ShowProduct />} />
                                                <Route path="/checkout" element={<Checkout />} />

                                                <Route element={<PrivateRouter roles={[1]} />}>
                                                        <Route path="/cart" element={<Cart />} />
                                                        <Route path="/order/:id" element={<ViewOrder />} />
                                                </Route>

                                                <Route element={<PrivateRouter roles={[2]} />}>
                                                        <Route path="/products/new" element={<AddProduct />} />
                                                        <Route path="/products/:id/edit" element={<EditProduct />} />
                                                </Route>

                                        </Route>

                                </Routes>
                        </BrowserRouter>
                </>
        )
}

export default App