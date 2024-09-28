import { Box, Typography } from "@mui/material"

function EmptyCart() {
        return (
                <Box width={'100%'} height={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                        <img src="empty-cart.png" width={'25%'} />
                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={4}>
                                <Typography variant="h3">Your cart is empty</Typography>
                                <Typography variant="h6" color={'#9CA3AF'}>Looks like you haven't made your choice yet...</Typography>
                        </Box>
                </Box>
        )
}

export default EmptyCart