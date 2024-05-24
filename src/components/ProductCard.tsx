import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"

interface ProductCard {
        id: string,
        title: string,
        price: number,
        img: string
}

function ProductCard(props: ProductCard) {

        const link = `/products/${props.id}`;

        return (
                <Link to={link}>
                        <Box boxShadow={'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'} borderRadius={2} bgcolor={'#FFFFFF'} p={3} height={'50vh'}>
                                
                                <img id="product-image" src={props.img} width={"100%"} height={'50%'} />
                                
                                <Box px={1} py={3.5} display={'flex'} flexDirection={'column'} gap={2}>
                                        <Typography color={'black'} variant="h5">{props.title}</Typography>
                                        <Typography color={'black'} variant="subtitle1">₹ {props.price}</Typography>
                                </Box>
                        </Box>
                </Link>
        )
}

export default ProductCard