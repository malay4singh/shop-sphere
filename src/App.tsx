import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllProducts from "./components/AllProducts";
import ShowProduct from "./components/ShowProduct";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Wrapper from "./components/Wrapper";
import Cart from "./components/Cart";

function App() {
        return (
                <>
                        <BrowserRouter>
                                <Routes>
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