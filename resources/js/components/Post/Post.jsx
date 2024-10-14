import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid2';
import MessageIcon from '@mui/icons-material/MessageOutlined';

import TextUI from '../UIcomponents/Typography';
import CardUI from '../UIcomponents/Card';
import FavoriteField from '../UIcomponents/FavoriteField';


const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [likes, setLikes] = useState({})
    const auth_user_name = localStorage.getItem('auth_name');

    const fetchData = async () => {
        const response = await axios.get('api/posts', { params: { auth_user_name: auth_user_name } })
        setPosts(response.data.posts);
        setLikes(response.data.likes);
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Grid container spacing={2}>
            {posts && posts.map((item, index) => (
                <Grid item="true" xs={12} sm={6} md={4} key={index}>
                    <Post post={item} likes={likes} auth_user_name={auth_user_name} />
                </Grid>
            ))}
        </Grid>
    );
}


const Post = ({ post, likes, auth_user_name }) => {

    const data = {
        post_id: post.id,
        auth_user_name: auth_user_name
    }
    
    return (
        <CardUI sx={{ maxWidth: 345 }}>
            <Link to="/showPost" state={{ post: post, likes: likes }}>

                {/* <CardMedia
                    sx={{ height: 140 }}
                    image={post.image_path}
                    title="game1"
                /> */}
                <CardContent>
                    <TextUI gutterBottom variant="h5" component="div">
                        {post.title}
                    </TextUI>
                    <TextUI variant="body2" sx={{ color: 'text.secondary' }}>
                        {post.about}
                    </TextUI>
                </CardContent>
            </Link>
            <CardActions>
                    <MessageIcon />
                    {post.comments_count}
                    <FavoriteField item={post} likes={likes} url="api/likes_p" data={data}/>
            </CardActions>
        </CardUI>
    );
}

export default PostList;