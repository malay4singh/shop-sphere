import { Box, Rating, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

interface ReviewCardProps {
        rating: number,
        comment: string,
        username: string
}

function ReviewCard(props: ReviewCardProps) {
        return (
                <Box display={'flex'} flexDirection={'column'} p={2} borderRadius={'8px'} border={'2px solid #b4b6bb'} bgcolor={'#ffffff'}>
                        <Typography variant="button">{props.username}</Typography>

                        <Rating
                                icon = {<StarIcon style={{width:"30px",height:"30px"}}></StarIcon>}
                                emptyIcon = {<StarOutlineIcon style={{width:"30px",height:"30px"}}></StarOutlineIcon>}
                                value={props.rating}
                                readOnly
                                sx={{ paddingBottom: 2 }}
                        />

                        <Typography variant="subtitle1">{props.comment}</Typography>
                </Box>
        )
}

export default ReviewCard