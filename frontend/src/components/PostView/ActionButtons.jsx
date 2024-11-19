import { useState } from "react"
import { useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import _axios from "../../../axios.config"

const type = "post"

const ActionButtons = ({post, posts, geolocationFilteredPosts, setPosts, setGeolocationFilteredPosts}) => {
    const {user} = useAuth(); 
    const navigate = useNavigate(); 
    const [backgroundColor, setBackgroundColor] = useState('tertiary.light'); 
    const [isLiked, setIsLiked] = useState(false); 
    const [isDisabled, setIsDisabled] = useState(false); 

    useEffect(() => {
        setInitialBackgroundColor()
    }, [post])

    async function setInitialBackgroundColor() {
        const data = await checkIfPostIsLiked()
        const postIsLiked = data === 1
        setIsLiked(postIsLiked)
        setBackgroundColor(postIsLiked ? "tertiary.main" : "tertiary.light")
    }

    async function checkIfPostIsLiked() {
        try {
            const response = await _axios.get('/likes', {
                params: {
                    userId: user.id, 
                    postId: post.id
                }
            })
            return response.data
        }
        catch (err) {
            if(err.response) {
                console.error('Something is wrong with the server: ' + err)
            }
            else if(err.request) {
                console.error('Something is wrong with the client: ' + err)
            }
            else {
                console.error(err)
            }
        }
    }

    async function handleLike() {
        if(post) {
            setIsDisabled(true)
            try {
                const data = {
                    userId: user.id, 
                    postId: post.id, 
                    isLiked: isLiked
                }
                const response = await _axios.post('/likes', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const likes = await response.data[0].likes
                const updatedPost = {
                    ...post, 
                    likes: likes
                }
                const updatedPosts = posts.map(post => post.id === updatedPost.id ? updatedPost : post)
                const updatedGeolocationPosts = geolocationFilteredPosts.map(post => post.id === updatedPost.id ? updatedPost : post)
                setPosts(updatedPosts)
                setGeolocationFilteredPosts(updatedGeolocationPosts)
            }
            catch (err) {
                if(err.response) {
                    console.error('Something is wrong with the server: ' + err)
                }
                else if(err.request) {
                    console.error('Something is wrong with the client: ' + err)
                }
                else {
                    console.error(err)
                }
            } 
            finally {
                setTimeout(() => {
                    setIsDisabled(false)
                }, 1000)
            }
        }
    }

    async function handleComments() {
        const id = post.id; 
        const author = post.username; 
        navigate(`/comments/${type}/${id}/${author}`)
    }

    return (
        <>
            <Box sx={{
                width: "100%", 
                display: "flex", 
                justifyContent: "space-evenly"
            }}>
                <Button 
                    aria-disabled={isDisabled}
                    sx={{
                        display: "flex", 
                        alignItems: "center", 
                        paddingBlock: "9px", 
                        paddingInline: "9%", 
                        backgroundColor: backgroundColor,
                        borderRadius: "50px",
                        cursor: "pointer", 
                        ":hover": {
                            backgroundColor: backgroundColor 
                        },
                        ":disabled": {
                            cursor: "default", 
                            backgroundColor: "tertiary.light"
                        }
                    }} 
                    disabled={isDisabled} 
                    onClick={handleLike}>Like {post.likes}</Button>

                <Button 
                    sx={{
                        display: "flex", 
                        alignItems: "center", 
                        paddingBlock: "9px", 
                        paddingInline: "9%", 
                        backgroundColor: "tertiary.light",
                        borderRadius: "50px",
                        cursor: "pointer", 
                        ":hover": {
                            backgroundColor: "tertiary.light" 
                        }
                    }} 
                    onClick={handleComments}>Chat</Button>
            </Box>
        </>
    )
}

export default ActionButtons