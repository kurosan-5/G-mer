import CardUI from '../UIcomponents/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TextUI from '../UIcomponents/Typography';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



const CommentList = ({comments}) => {

    return(
        <>
        {comments && comments.map((comment) => {
            return(
                <Comment key={comment.id} comment={comment}/>
            );
        })}
            
        </>
    );
}

const Comment = ({comment}) => {

    return (
        <CardUI>
            <CardContent>
                <TextUI variant="subtitle" component="div">
                    {comment.user.name}
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