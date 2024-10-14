import { useLocation } from "react-router-dom";
import CommentList from "../Comment/Comment";
import TextUI from "../UIcomponents/Typography";
import CardContent from '@mui/material/CardContent';
import { CardMedia, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
import FavoriteField from "../UIcomponents/FavoriteField";

const ShowPost = () => {

    return (
        <>
            <DetailPost />
        </>
    );
};

const DetailPost = () => {

    const post_location = useLocation();
    const { post, likes } = post_location.state;
    const auth_user_name = localStorage.getItem('auth_name');

    const [post_user, setPostUser] = useState({});
    const [login_user_id, setLoginUserId] = useState(0);
    const [open, setOpen] = useState(false);
    const [inputComment, setInputComment] = useState('');

    const data = {
        post_id: post.id,
        auth_user_name: auth_user_name
    }

    const getDatas = async () => {
        const login_user_name = localStorage.getItem('auth_name')
        const response_user = await axios.get('/api/posts/get_user', { params: { post_user_id: post.user_id, login_user_name: login_user_name } });
        setPostUser(response_user.data.post_user);
        setLoginUserId(response_user.data.login_user_id.id);
    }

    const handleCreateCommentButton = () => {
        setOpen(true);
    }

    const handleCommentPost = async (content) => {
        const commentData = {
            params: {
                content: content,
                user_id: login_user_id,
                post_id: post.id,
            }
        }
        await axios.get('/api/comments/create', commentData);
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
                    <div className="w-25">
                        <FavoriteField item={post} likes={likes} url='api/likes_p' data={data} />
                    </div>
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
                <CommentList post={post} />

                <ShowModal open={open} handleClose={(e) => setOpen(false)} input={inputComment} set={setInputComment} handleCommentPost={handleCommentPost} />
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
                <div className="d-flex justify-content-center align-items-center mt-5 flex-column">
                    <TextField
                        className="bg-white w-25"
                        multiline rows={4} id="outlined-basic"
                        label="コメントを書いてみよう"
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