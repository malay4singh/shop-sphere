import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AllProducts from "./components/AllProducts";
import ShowProduct from "./components/ShowProduct";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Wrapper from "./components/Wrapper";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import ViewOrder from "./components/ViewOrder";
// import PrivateRouter from "./components/PrivateRouter";

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

                                                {/* <Route element={<PrivateRouter roles={[1]} />}> */}
                                                        <Route path="/cart" element={<Cart />} />
                                                        <Route path="/order/:id" element={<ViewOrder />} />
                                                {/* </Route> */}

                                        </Route>

                                </Routes>
                        </BrowserRouter>
                </>
        )
}

export default App