import axios from "axios";
import { useEffect,useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@mui/material";


const Game = () => {

    const post_location = useLocation();
    const { post } = post_location.state;

    const [likes, setLikes] = useState({})
    const auth_user_name = localStorage.getItem('auth_name');


    const fetchData = async () => {
        const response = await axios.get('api/posts', { params: { auth_user_name: auth_user_name } })
        setLikes(response.data.likes);
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="text-center">
            <iframe src={`${post.htmlUrl}/âeâgâèâX/home.html`} width='1000' height='800' scrolling="no"></iframe>
            <Link to="/showPost" state={{ post: post, likes: likes }}>
            <Button variant="contained" className='ms-5'>戻る</Button>
            </Link>
        </div>
    );
}

export default Game;