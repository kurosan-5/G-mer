import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
            <>
                <li>
                    <Link to="/register">
                        <span>Register</span>
                    </Link>
                </li>
                <li>
                    <Link to="/login">
                        <span>Login</span>
                    </Link>
                </li>
            </>
        );
    } else {
        AuthButtons = (
            <li>
                <div onClick={logoutSubmit}>
                    <span>ログアウト</span>
                </div>
            </li>
        );
    }


    
    return(
        <nav className="p-0 navbar navbar-expand-lg h-color header shadow">
            <div className="container-fluid">
                <Link to="/login_form">
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