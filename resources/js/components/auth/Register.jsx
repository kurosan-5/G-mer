import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        error_list: [],
    });

    const handleChange = (e) => {
        e.persist();
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/register`, data).then(res => {
                if(res.data.status === 200){
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    navigate('/');
                } else {
                    setFormData({...formData, error_list: res.data.validation_errors})
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
                                <label htmlFor="name" className="col-form-label text-md-right font-weight-bold ml-3">Name</label>
                                <div className="form-group row mt-2">
                                    <div className="w-certify-input mx-auto">
                                        <input
                                            id="name"
                                            type="text"
                                            className={`form-control`}
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            autoComplete="name"
                                            autoFocus
                                        />
                                        <span>{formData.error_list.email}</span>
                                    </div>
                                </div>

                                <label htmlFor='email' className="col-form-label text-md-right font-weight-bold ml-3">E-Mail Address</label>
                                <div className="form-group row mt-2">
                                    <div className="w-certify-input mx-auto">
                                        <input
                                            id="email"
                                            type="email"
                                            className={`form-control`}
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            autoComplete="email"
                                        />
                                        <span>{formData.error_list.email}</span>
                                    </div>
                                </div>

                                <label className="col-form-label text-md-right font-weight-bold ml-3">Password</label>
                                <div className="form-group row mt-2">
                                    <div className="w-certify-input mx-auto">
                                        <input
                                            id="password"
                                            type="password"
                                            className={`form-control`}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            autoComplete="new-password"
                                        />
                                        <span>{formData.error_list.email}</span>
                                    </div>
                                </div>

                                <label htmlFor='password-confirm' className="col-form-label text-md-right font-weight-bold ml-3">Confirm Password</label>
                                <div className="form-group row mt-2">
                                    <div className="w-certify-input mx-auto">
                                        <input
                                            id="password-confirm"
                                            type="password"
                                            className="form-control"
                                            name="password_confirmation"
                                            value={formData.password_confirmation}
                                            onChange={handleChange}
                                            required
                                            autoComplete="new-password"
                                        />
                                    </div>
                                </div>

                                <div className="form-group row mb-0">
                                    <div className="w-100 text-center mt-4">
                                        <button type="submit" className="btn light-lara-btn w-certify-input font-weight-bold">
                                            Register
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

export default Register;