import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AllProducts from "./components/AllProducts";
import ShowProduct from "./components/ShowProduct";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Wrapper from "./components/Wrapper";
import Cart from "./components/Cart";
import Home from "./components/Home";

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
                                                <Route path="/cart" element={<Cart />} />
                                        </Route>

                                </Routes>
                        </BrowserRouter>
                </>
        )
}

export default App