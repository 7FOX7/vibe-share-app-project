import { useScreenSize } from "../../contexts/ScreenSizeContext";
import PostWrapper from "./PostWrapper";
import Box from "@mui/material/Box"; 

const Layer = () => {
    const {isSmallScreen} = useScreenSize(); 
    return (
        <Box sx={{
            backgroundColor: "secondary.main", 
            display: "flex", 
            justifyContent: "center", 
            width: "100%", 
            height: "100vh", 
            paddingInline: `${isSmallScreen ? "50px" : "80px"}`, 
            paddingTop: "50px", 
            overflow: "hidden"
        }}>
            <PostWrapper />
        </Box>
    )
}

export default Layer; 