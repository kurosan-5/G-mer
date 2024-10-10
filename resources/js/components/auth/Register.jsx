import React, { useState } from 'react';
import axios from 'axios';
import AuthService from './AuthService';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Reset errors

        try {
            await AuthService.register(formData.name, formData.email, formData.password, formData.password_confirmation);
            navigate('/home');
            alert('User registered successfully');


        } catch (error) {
            // Handle error, e.g., set validation errors
            console.log(error);
            setErrors(error || {});
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5 shadow">
                        <div className="card-body">
                            <label htmlFor="name" className="col-form-label text-md-right font-weight-bold ml-3">Name</label>
                            <div className="form-group row mt-2">
                                <div className="w-certify-input mx-auto">
                                    <input
                                        id="name"
                                        type="text"
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        autoComplete="name"
                                        autoFocus
                                    />
                                    {errors.name && (
                                        <span className="invalid-feedback" role="alert">
                                            <strong>{errors.name[0]}</strong>
                                        </span>
                                    )}
                                </div>
                            </div>

                            <label htmlFor="email" className="col-form-label text-md-right font-weight-bold ml-3">E-Mail Address</label>
                            <div className="form-group row mt-2">
                                <div className="w-certify-input mx-auto">
                                    <input
                                        id="email"
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        autoComplete="email"
                                    />
                                    {errors.email && (
                                        <span className="invalid-feedback" role="alert">
                                            <strong>{errors.email[0]}</strong>
                                        </span>
                                    )}
                                </div>
                            </div>

                            <label htmlFor="password" className="col-form-label text-md-right font-weight-bold ml-3">Password</label>
                            <div className="form-group row mt-2">
                                <div className="w-certify-input mx-auto">
                                    <input
                                        id="password"
                                        type="password"
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        autoComplete="new-password"
                                    />
                                    {errors.password && (
                                        <span className="invalid-feedback" role="alert">
                                            <strong>{errors.password[0]}</strong>
                                        </span>
                                    )}
                                </div>
                            </div>

                            <label htmlFor="password-confirm" className="col-form-label text-md-right font-weight-bold ml-3">Confirm Password</label>
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
                                    <button type="submit" className="btn light-lara-btn w-certify-input font-weight-bold" onClick={handleSubmit}>
                                        Register
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
