import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import MessageIcon from '@mui/icons-material/MessageOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TextUI from './UIcomponents/Typography';
import CardUI from './UIcomponents/Card';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const fetchData = async () => {
        const response = await axios.get('api/posts')
        setPosts(response.data.posts);
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <div className="d-flex">
                {posts && posts.map((item) => {
                    return(
                        <Post key={item.id} post={item} />
                    );
                })}
            </div>
        </>
    );
}

const Post = ({post}) => {
    return (
        <Link to="/showPost" state={{post : post}}>
            <CardUI sx={{ maxWidth: 345 }}>
                
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
                    <MessageIcon />
                    {post.comments_count}
                    <FavoriteBorderIcon />
                    {post.like}
                </CardContent>
            </CardUI>
        </Link>
    );
}

const Home = () => {
    return(
        <div>
            <PostList />
        </div>
    );
}

export default Home;