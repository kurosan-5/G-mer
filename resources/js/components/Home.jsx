import React, {useState, useEffect} from 'react';
import axios from 'axios';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const fetchData = async () => {
        const response = await axios.get('api/posts');
        setPosts(response.data.posts);
    };
    useEffect(() => {
        fetchData();
    }, []);
    const row = [];
    return (
        
        <>
            {posts && posts.map((item) => {
                return(
                    <Post key={item.id} content={item.description} />
                );
            })}
        </>
    );
}

const Post = ({content}) => {
    return (
        <>
            {content}
        </>
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