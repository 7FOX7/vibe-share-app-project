import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "../theme/theme";

const CustomModal = ({open, handleClose, message}) => {
    const smallScreen = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "space-between", 
                alignItems: "center", 
                width: `${smallScreen ? "350px" : "400px"}`,
                backgroundColor: 'contrastColors.white.main',
                border: '1px solid',
                boxShadow: 24,
                padding: "20px 32px",
            }}>
                <Box sx={{width: "fit-content"}}>
                    <Typography>{message}</Typography>
                </Box>
                <Box sx={{width: "fit-content"}}>
                    <Button onClick={handleClose}>OK</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default CustomModal