import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const CommentList = () => {
    return(
        <Comment />
    );
}

const Comment = () => {
    return (
        <Card sx={{ maxWidth : '90%' }}>
            <CardContent>
                This game is very good
            </CardContent>
        </Card>
    );
}

export default CommentList;