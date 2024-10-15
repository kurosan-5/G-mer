import React, { useState, useEffect } from 'react';

import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import PostList from './Post/Post';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/input'); // 入力画面に遷移
    };
    return (
        <div>
            <Box sx={{ position: 'relative', height: '100vh' }}>
                <PostList />
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={handleClick}
                    sx={{
                        position: 'fixed',
                        bottom: 32,
                        right: 32,
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