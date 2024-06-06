import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

function ViewOrder() {
        return (
                <Box>
                        Test page.... still in development<br /><br />

                        <Link to={'/products'}><Button variant="contained">Go back home</Button></Link>
                </Box>
        )
}

export default ViewOrder