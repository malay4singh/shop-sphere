import { Box } from "@mui/material"
import React, { memo } from "react"
import Navbar from "./Navbar"
import { Outlet } from "react-router-dom"

interface WrapperProps {
        children?: React.ReactNode
}

function Wrapper({ children }: WrapperProps) {
        return (
                <Box>
                        <Navbar />

                        <Box paddingTop={'9dvh'} height={'91dvh'} width={'100dvw'}>
                                {children}
                                <Outlet />
                        </Box>
                </Box>
        )
}

export default memo(Wrapper)