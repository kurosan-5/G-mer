import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();

    const [loginInput, setLogin] = useState({
        name: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setLogin({...loginInput, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: loginInput.name,
            password: loginInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data).then(res => {
                if(res.data.status === 200){
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    navigate('/');
                    location.reload();
                } else if (res.data.status === 401){
                    
                } else {
                    setLogin({...loginInput, error_list: res.data.validation_errors});
                }
            });
        });
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5 shadow">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <label htmlFor='name' className="col-form-label font-weight-bold">Name</label>
                                <div className="form-group row mt-2">
                                    <div className="w-certify-input mx-auto">
                                        <input
                                            id="name"
                                            type="text"
                                            className={`form-control`}
                                            name="name"
                                            value={loginInput.name}
                                            onChange={handleInput}
                                            required
                                            autoComplete="name"
                                            autoFocus
                                        />
                                        <span>{loginInput.error_list.email}</span>
                                    </div>
                                </div>

                                <label htmlFor='password' className="col-md-4 col-form-label font-weight-bold">Password</label>
                                <div className="form-group row mt-2">
                                    <div className="w-certify-input mx-auto">
                                        <input
                                            id="password"
                                            type="password"
                                            className={`form-control`}
                                            name="password"
                                            value={loginInput.password}
                                            onChange={handleInput}
                                            required
                                            autoComplete="current-password"
                                        />
                                        <span>{loginInput.error_list.password}</span>
                                    </div>
                                </div>

                                <div className="form-group row mb-0">
                                    <div className="w-100 text-center">
                                        <button type="submit" className="btn light-lara-btn w-certify-input font-weight-bold">
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;