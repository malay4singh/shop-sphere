import { Box, Typography } from "@mui/material";

interface Address {
        house: string,
        locality: string,
        city: string,
        state: string,
        pincode: number
}

interface AddressCardProps {
        address: Address
}

function AddressCard(props: AddressCardProps) {
        return (
                <Box border={'2px solid #9CA3AF'} sx={{ ":hover" : { border: '2px solid black', cursor: 'pointer' } }} borderRadius={2} p={3}>
                        <Box>
                                <Typography variant="subtitle1">{props.address.house}, {props.address.locality}</Typography>
                                <Typography variant="subtitle1">{props.address.city}</Typography>
                                <Typography variant="subtitle1">{props.address.state} - {props.address.pincode}</Typography>
                        </Box>
                </Box>
        )
}

export default AddressCard