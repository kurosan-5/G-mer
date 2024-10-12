import { useLocation } from "react-router-dom";
import CommentList from "../Comment/Comment";
import TextUI from "../UIcomponents/Typography";
import CardUI from "../UIcomponents/Card";
import CardContent from '@mui/material/CardContent';
import { CardMedia, Paper, TextField, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button } from "@mui/material"; ''
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';

const ShowPost = () => {
    const location = useLocation();
    const { post } = location.state;

    return (
        <>
            <DetailPost post={post} />
        </>
    );
};

const DetailPost = ({ post }) => {

    const [comments, setComments] = useState([]);
    const [post_user, setPostUser] = useState({});
    const [login_user_id, setLoginUserId] = useState(0);
    const [open, setOpen] = useState(false);
    const [inputComment, setInputComment] = useState('');

    const getDatas = async () => {
        const login_user_name = localStorage.getItem('auth_name')
        const response = await axios.get('/api/comments', { params: { post_id: post.id, post_user_id: post.user_id, login_user_name: login_user_name } });
        setComments(response.data.comments);
        setPostUser(response.data.post_user);
        setLoginUserId(response.data.login_user_id.id);
    }

    const handleCreateCommentButton = () => {
        setOpen(true);
    }

    const handleCommentPost = async (content) => {
        const commentData = {
            params : {
                content: content,
                user_id: login_user_id,
                post_id: post.id,
            }
        }

        const response = await axios.get('/api/comments/create', commentData);
        location.reload();


    }

    useEffect(() => {
        getDatas();
    }, [])

    return (
        <>
            <div className="shadow p-5 m-5">
                <CardContent>
                    {/* <CardMedia
                        sx={{ height: 140 }}
                        image={post.image_path}
                        title="game1"
                        /> */}
                    <Typography variant='h5' component='h5'>
                        {post.title}
                    </Typography>

                    <Typography variant='body2' component='div'>
                        <FavoriteBorderIcon />
                        {post.like}
                    </Typography>
                    <TextUI variant='body1' component='div'>
                        {post.description}
                    </TextUI>
                    <Button variant="contained">Play</Button>
                </CardContent>
                <Fab
                    variant="extended"
                    color="secondary"
                    aria-label="add"
                    onClick={handleCreateCommentButton}
                    style={{
                        position: 'fixed',
                        bottom: 32,
                        right: 32,
                    }}
                >
                    <AddIcon sx={{ mr: 1 }} />
                    Comment
                </Fab>
                <CommentList comments={comments} />

                <ShowModal open={open} handleClose={(e) => setOpen(false)} input={inputComment} set={setInputComment} handleCommentPost={handleCommentPost}/>
            </div>
        </>
    );
}

const ShowModal = ({ open, handleClose, input, set, handleCommentPost }) => {

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="d-flex justify-content-center align-items-center mt-5">
                    <TextField
                        className="bg-secondary w-25"
                        multiline rows={4} id="outlined-basic"
                        label="conetnt"
                        value={input}
                        onChange={(e) => set(e.target.value)}
                        variant="outlined" />
                    <Button variant="contained" onClick={() => handleCommentPost(input)}>Comment</Button>
                </div>

            </Modal>
        </>
    );
}

export default ShowPost;