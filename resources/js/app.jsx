import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import Split from 'react-split';
import Home from './components/Home';
import Header from "./components/Header";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ShowPost from "./components/Post/ShowPost";
import InputForm from './components/InputForm';
import Game from './components/Game/Game';
import Welcome from './components/Welcome';

axios.defaults.baseURL = "http://gamer.test/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

const App = () => {
    return (
        <>
            <Header />
            {localStorage.getItem('auth_token') ? (
                <div className='mt-6'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/input" element={<InputForm />} />
                        <Route path="/showPost" element={<ShowPost />} />
                        <Route path="/play" element={<Game />} />
                    </Routes>
                </div>
            ) : (

                <Routes>
                    <Route path="/" element={<Welcome />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                </Routes>
            )}
        </>
    );
};

if (document.getElementById('app')) {
    const root = ReactDOM.createRoot(document.getElementById('app'));
    root.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}
