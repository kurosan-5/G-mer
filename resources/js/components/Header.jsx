import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from "@mui/material";


const Header = () => {

    const navigate = useNavigate();

    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.removeItem('auth_token', res.data.token);
                localStorage.removeItem('auth_name', res.data.username);
                navigate('/');
                location.reload();
            }
        });
    }

    var AuthButtons = "";

    if(!localStorage.getItem('auth_token')){
        AuthButtons = (
            <div className='d-flex gap-3 me-3'>
                    <Link to="/register">

                    <Button variant='outlined' color="success" sx={{width:150}}>
                    新規登録
                    </Button>
                    </Link>
                    <Link to="/login">
                    <Button variant='outlined' color="success" sx={{width:150}}>
                    ログイン
                    </Button>
                    </Link>

            </div>
        );
    } else {
        AuthButtons = (
                <div onClick={logoutSubmit}>
                    <Button variant='outlined' color="error" sx={{width:150}}>
                    ログアウト
                    </Button>
                </div>
        );
    }


    
    return(
        <nav className="p-0 navbar navbar-expand-lg h-color header shadow header-bg">
            <div className="container-fluid mt-2">
                <Link to="/">
                <h2>GAMER</h2>
                </Link>
            </div>
            <div>
                {AuthButtons}
            </div>
        </nav>
    );
}

export default Header;