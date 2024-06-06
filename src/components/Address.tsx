import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import Loading from "./Loading";
import AddAddress from "./AddAddress";
import AddressCard from "./AddressCard";

interface Address {
        house: string,
        locality: string,
        city: string,
        state: string,
        pincode: number
}

interface AddressProps {
        onFinish: () => void
}

function Address(props: AddressProps) {

        const [address, setAddress] = useState<Address[]>([]);
        const [isLoaded, setIsLoaded] = useState<boolean>(false);
        const [refresh, setRefresh] = useState<boolean>(true);

        useEffect( () => {
                const getAddress = async () => {
                        try {
                                const response = await axios.get('/get-address', {
                                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                                })

                                setAddress(response.data.address);
                        } catch (err) {
                                console.log(err);
                        } finally {
                                setIsLoaded(true);
                        }
                }

                if (refresh) {
                        getAddress();
                        setRefresh(false);
                }
                
        }, [refresh])

        const handleAddAddress = () => {
                setRefresh(true);
        }

        const handleAddressSelect = () => {
                props.onFinish();
        }

        return (
                <>
                        {!isLoaded &&
                                <Loading />
                        }

                        {isLoaded &&
                                <Box height={'100%'} display={'flex'}>
                                        {address.length !=0 &&
                                                <Box mx={4} maxHeight={'85%'} height={'fit-content'} flexBasis={'55%'} bgcolor={'#ffffff'} boxShadow={'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'} p={3} display={'flex'} flexDirection={'column'} gap={3}>
                                                        <Box>
                                                                <Typography variant="h5">Select an Address</Typography>
                                                        </Box>

                                                        <Box>
                                                                <Grid container spacing={2}>
                                                                        {address.map( (address, index) => (
                                                                                <Grid item xs={6} key={index}>
                                                                                        <div onClick={handleAddressSelect}>
                                                                                                <AddressCard address={address} />
                                                                                        </div>
                                                                                </Grid>
                                                                        ))}       
                                                                </Grid>
                                                        </Box>
                                                </Box>
                                        }

                                        {address.length ==0 &&
                                                <Box height={'95%'} mx={4} flexBasis={'55%'} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} bgcolor={'#ffffff'} boxShadow={'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}>
                                                        <img src="no-address.jpg" width={'300px'} />
                                                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                                                                <Typography variant="h4">You don't have any saved addresses</Typography>
                                                                <Typography variant="h6" color={'#9CA3AF'}>Guess it's time to pick your shipping adventure!</Typography>
                                                        </Box>
                                                </Box>
                                        }

                                        <Box bgcolor={'#ffffff'} boxShadow={'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'} height={'75%'} mx={4} flexBasis={'35%'} display={'flex'} flexDirection={'column'} p={3} gap={3} position={'relative'}>
                                                <AddAddress onFinish={handleAddAddress} />
                                        </Box>

                                </Box>
                        }
                        
                </>
        )
}

export default Address