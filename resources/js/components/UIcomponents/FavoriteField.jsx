import Hukidashi from "./Tooltip";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import TextUI from "./Typography";
import { useState } from "react";
import axios from 'axios';


const FavoriteField = ({ item, likes, url, data }) => {

    let islike = false;
    const idKey = Object.keys(data).find(key => key.endsWith("_id"));

    //このlikesはログインユーザーが行ったいいねのデータ
    likes && likes.map((like) => {
        if (like[idKey] == item.id) {
            islike = true;
        }
    })

    let users = '';
    {
        item.likes && item.likes.map((like) => {
            users += like.user.name + 'さん、';
        })
    }

    users = users.slice(0, -1)
    users += 'がいいね！しています。'

    const [like_num, setLikeNum] = useState(item.likes_count);
    const [isLiked, setIsLiked] = useState(islike);

    const handleFavorite = async () => {
        setIsLiked(true);
        await axios.post(url + "/store", data)
        setLikeNum(like_num + 1)
    }

    const handleRemoveFavorite = async () => {
        setIsLiked(false);
        await axios.post(url + "/delete", data)
        setLikeNum(like_num - 1)

    }


    return (
        <Hukidashi arrow title={users} placement='bottom'>
            {item.likes.length ? (
                <div>
                    {isLiked ? (
                        <IconButton aria-label="add to favorites" onClick={() => handleRemoveFavorite()}>
                            <FavoriteIcon color="red" />
                        </IconButton>
                    ) : (
                        <IconButton aria-label="add to favorites" onClick={() => handleFavorite()}>
                            <FavoriteBorderIcon />
                        </IconButton>
                    )}
                    <TextUI variant="caption" component="span">
                        {like_num}
                    </TextUI>
                </div>
            ) : (
                <>
                    {isLiked ? (
                        <IconButton aria-label="add to favorites" onClick={() => handleRemoveFavorite()}>
                            <FavoriteIcon color="red" />
                        </IconButton>
                    ) : (
                        <IconButton aria-label="add to favorites" onClick={() => handleFavorite()}>
                            <FavoriteBorderIcon />
                        </IconButton>
                    )}
                    <TextUI variant="caption" component="span">
                        {like_num}
                    </TextUI>

                </>

            )}
        </Hukidashi>
    );
}

export default FavoriteField;