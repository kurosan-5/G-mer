import CardUI from '../UIcomponents/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TextUI from '../UIcomponents/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



const CommentList = ({post}) => {
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState({});

    const getComments = async () => {
        const response = await axios.get('/api/comments',{params: {post_id: post.id, user_id: post.user_id}});
        setComments(response.data.comments);
        setUser(response.data.user);
    }

    useEffect(() => {
        getComments();
    }, []);

    return(
        <>
        {comments && comments.map((comment) => {
            return(
                <Comment key={comment.id} comment={comment} user={user}/>
            );
        })}
            
        </>
    );
}

const Comment = ({comment, user}) => {
    return (
        <CardUI>
            <CardContent>
                <TextUI variant="subtitle" component="div">
                    {user.name}
                </TextUI>
                <TextUI variant="body1" component="div">
                    {comment.content}
                </TextUI>
                <FavoriteBorderIcon />
                <TextUI variant="caption" component="span">
                    {comment.like}
                </TextUI>
            </CardContent>
        </CardUI>
    );
}

export default CommentList;