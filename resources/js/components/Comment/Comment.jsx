import CardUI from '../UIcomponents/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TextUI from '../UIcomponents/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button, CardActions, TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Hukidashi from '../UIcomponents/Tooltip';
import FavoriteField from '../UIcomponents/FavoriteField';



const CommentList = ({ post }) => {

    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const auth_user_name = localStorage.getItem('auth_name');

    const fetchData = async () => {
        const response = await axios.get('/api/comments', { params: { post_id: post.id, auth_user_name: auth_user_name } });
        setComments(response.data.comments);
        setLikes(response.data.likes);
    }

    useEffect(() => {
        fetchData();
    }, [])



    return (
        <>
            {comments && comments.map((comment) => {

                return (
                    <Comment key={comment.id} comment={comment} auth_user_name={auth_user_name} likes={likes} />
                );
            })}

        </>
    );
}

const Comment = ({ comment, auth_user_name, likes }) => {

    const data = {
        comment_id: comment.id,
        auth_user_name: auth_user_name
    }

    const [isEdit, setIsEdit] = useState(false);
    const [inputEditText, setInputEditText] = useState(comment.content);
    const handleEditButton = () => {
        setIsEdit(true);
    };

    const handleCompleteEditButton = async () => {
        await axios.put(`api/comments/${comment.id}`, { content: inputEditText });
        setIsEdit(false);
        location.reload();
    };

    const handleDeleteButton = async () => {
        const deleteConfirm = confirm(`この投稿の内容: ${comment.content}\nこの投稿を削除しますか？`);
        if (deleteConfirm) {
            await axios.delete(`api/comments/${comment.id}`);
            location.reload();
        }
    };
    const canEditOrDelete = localStorage.getItem('auth_name') === comment.user.name;

    return (
        <CardUI className="d-flex justify-content-between">
            <CardContent>
                <TextUI variant="subtitle" component="div">
                    {comment.user.name}
                </TextUI>
                {isEdit ? (
                    <TextField
                        id="standard-multiline-static"
                        label="content"
                        multiline
                        rows={4}
                        value={inputEditText}
                        onChange={(e) => setInputEditText(e.target.value)}
                        variant="standard"
                    />
                ) : (
                    <TextUI variant="body1" component="div">
                        {comment.content}
                    </TextUI>
                )}
                <FavoriteField item={comment} likes={likes} url='api/likes_c' data={data}/>
                
            </CardContent>
            <CardActions>
                {canEditOrDelete && (
                    <>
                        {isEdit ? (
                            <Button variant="outlined" onClick={handleCompleteEditButton}>変更</Button>
                        ) : (
                            <Button variant="outlined" onClick={handleEditButton}>編集</Button>
                        )}
                        <Button variant="text" sx={{ mr: 2 }} onClick={handleDeleteButton}>削除</Button>
                    </>
                )}
            </CardActions>
        </CardUI>
    );
};

export default CommentList;