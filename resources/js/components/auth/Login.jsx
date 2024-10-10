import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Reset errors

        try {
            const response = await axios.post('/login', {
                name,
                password,
                remember,
            });
        } catch (error) {
            // Handle error, e.g., set validation errors
            setErrors(error.response.data.errors || {});
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5 shadow">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="name" className="col-form-label font-weight-bold">Name</label>
                                <div className="form-group row mt-2">
                                    <div className="w-certify-input mx-auto">
                                        <input
                                            id="name"
                                            type="text"
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
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

                                <label htmlFor="password" className="col-md-4 col-form-label font-weight-bold">Password</label>
                                <div className="form-group row mt-2">
                                    <div className="w-certify-input mx-auto">
                                        <input
                                            id="password"
                                            type="password"
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            autoComplete="current-password"
                                        />
                                        {errors.password && (
                                            <span className="invalid-feedback" role="alert">
                                                <strong>{errors.password[0]}</strong>
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group row d-flex justify-content-end">
                                    <div className="mr-4">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                name="remember"
                                                id="remember"
                                                checked={remember}
                                                onChange={() => setRemember(!remember)}
                                            />
                                            <label className="form-check-label" htmlFor="remember">
                                                Remember Me
                                            </label>
                                        </div>
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

export default LoginForm;
