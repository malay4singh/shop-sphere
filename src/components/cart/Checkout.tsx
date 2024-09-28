import { Box, Stepper, Step, StepLabel } from "@mui/material"
import { useState } from "react"
import Address from "./Address";
import ReviewOrder from "./ReviewOrder";

function Checkout() {

        const [stage, setStage] = useState<number>(0);

        const steps = [
                'Select Address',
                'Payment'
        ]

        const handleStageOne = () => {
                setStage(1);
        }

        return (
                <>
                        <Box p={4}>
                                <Stepper activeStep={stage} alternativeLabel>
                                        {steps.map((label) => (
                                                <Step key={label}>
                                                        <StepLabel>{label}</StepLabel>
                                                </Step>
                                        ))}
                                </Stepper>
                        </Box>

                        {stage == 0 &&
                                <Box height={'73dvh'} overflow={'scroll'}>
                                        <Address onFinish={handleStageOne}  />
                                </Box>
                        }

                        {stage == 1 &&
                                <Box height={'73dvh'}>
                                        <ReviewOrder />
                                </Box>
                        }
                        
                </>
        )
}

export default Checkout