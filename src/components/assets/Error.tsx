import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

interface ErrorProps {
        message: string,
        onClose?: () => void
}

function Error(props: ErrorProps) {
        const [open, setOpen] = useState<boolean>(true);

        const handleClose = () => {
                setOpen(false);
                if (props.onClose){
                        props.onClose();
                }
        }

        return (
                <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleClose}
                >
                        <Alert
                                severity="error"
                                variant="filled"
                                sx={{ width: '100%' }}
                        >
                                {props.message}
                        </Alert>
                </Snackbar>
        )
}

export default Error