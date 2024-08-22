import { useEffect } from "react"
import Box from "@mui/material/Box"
import PostTemplate from "../components/CreatePost/PostTemplate"

const CreatePost = () => {
    useEffect(() => {
        return () => {
            sessionStorage.clear()
        }
    }, [])

    return (
        <Box sx={{
            width: "100%", 
            height: "100vh", 
            backgroundColor: "secondary.main", 
            paddingInline: "10px", 
            paddingTop: "50px"
        }}>
            <PostTemplate />
        </Box>
    )
}

export default CreatePost