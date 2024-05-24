import { Box, CircularProgress } from "@mui/material"

function Loading() {
        return (
                <Box
                        height={'100%'}
                        width={'100%'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                >
                        <CircularProgress
                                sx={{color: "#2A5D9C"}}
                        />
                </Box>
        )
}

export default Loading