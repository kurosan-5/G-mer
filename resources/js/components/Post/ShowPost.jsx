import { useLocation } from "react-router-dom";
import CommentList from "../Comment/Comment";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardMedia, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {Button} from "@mui/material";''

const ShowPost = () => {
    return (
        <>
            <DetailPost />
            <CommentList />
        </>
    );
};

const DetailPost = () => {
    const location = useLocation();
    const { post } = location.state;

    return(
        <>
            <Card sx={{ maxWidth: '90%' }}>
                <CardContent >
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
                    <Typography variant='body1' component='div'>
                        {post.description}
                    </Typography>
                    <Button variant="contained">Play</Button>
                </CardContent>
            </Card>
        </>
    );
}

export default ShowPost;