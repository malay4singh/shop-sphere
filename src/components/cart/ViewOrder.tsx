import { Box, Button } from "@mui/material";
// import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "../api/axios";

// interface Order {
//         _id: string,
//         products: [],
//         payment_status: boolean,
// }

function ViewOrder() {

        // const navigate = useNavigate();

        // const { id } = useParams();

        // const [order, setOrder] = useState<Order>();

        // useEffect( () => {
        //         const fetchOrder = async () => {
        //                 try {
        //                         const response = await axios.get(`/order/${id}`, {
        //                                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        //                         })

        //                         setOrder(response.data.order);        
        //                 } catch (err) {
        //                         localStorage.clear();
        //                         navigate('/login');
        //                 }
        //         }
                
        //         fetchOrder();
        // }, [])

        return (
                <Box>
                        Test page.... still in development<br /><br />

                        <Link to={'/products'}><Button variant="contained">Go back home</Button></Link>
                </Box>
        )
}

export default ViewOrder