import { useLocation } from "react-router-dom";
import CommentList from "../Comment/Comment";
import TextUI from "../UIcomponents/Typography";
import CardUI from "../UIcomponents/Card";
import CardContent from '@mui/material/CardContent';
import { CardMedia, Paper, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {Button} from "@mui/material";''

const ShowPost = () => {
    const location = useLocation();
    const { post } = location.state;

    return (
        <>
            <DetailPost post={post} />
        </>
    );
};

const DetailPost = ({post}) => {

    return(
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
                <CommentList post={post}/>
        </div>
        </>
    );
}

export default ShowPost;