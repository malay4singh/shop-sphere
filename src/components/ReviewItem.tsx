import { Box, Typography } from "@mui/material";

interface ReviewItemProps {
        title: string,
        price: number,
        img: string
}

function ReviewItem(props: ReviewItemProps) {
        return (
                <Box p={3} display={'flex'} alignItems={'center'} justifyContent={'space-around'}>
                        <Box>
                                <img src={props.img} width={'150px'} height={'100px'} />
                        </Box>

                        <Box flexBasis={'60%'} display={'flex'} flexDirection={'column'} gap={2.5}>
                                <Typography variant="h6">{props.title}</Typography>
                                <Typography variant="subtitle2">₹ {props.price}</Typography>
                        </Box>
                </Box>
        )
}

export default ReviewItem