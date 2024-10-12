import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import MessageIcon from '@mui/icons-material/MessageOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const fetchData = async () => {
        const response = await axios.get('api/posts');
        setPosts(response.data.posts);
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Grid container spacing={2}>
            {posts && posts.map((item, index) => (
                <Grid item size={{xs:12, sm:6, md:4}} key={index}>
                    <Post key={item.id} post={item} />
                </Grid>
            ))}
        </Grid>
    );
}

const Post = ({post}) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={post.image_path}
                title="game1"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {post.about}
                </Typography>
                <MessageIcon />
                {post.comments_count}
                <FavoriteBorderIcon />
                {post.like}
            </CardContent>
        </Card>
    );
}

const Home = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/input'); // 入力画面に遷移
    };
    return(
        <div>
            <Box sx={{ position: 'relative', height: '100vh' }}>
                <PostList />
                <Fab 
                    color="primary" 
                    aria-label="add"
                    onClick={handleClick} 
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 16,
                        padding: '8px',
                        width: '200px', // 幅を設定
                        height: '50px', // 高さを設定
                        borderRadius: '8px', // 角を丸める                
                }}
                >
                    ゲームをアップロード
                </Fab>
            </Box>
        </div>
    );
}

export default Home;