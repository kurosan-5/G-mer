import React, { useState }  from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import Split from 'react-split';
import Home from './components/Home';
import Header from "./components/Header";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ShowPost from "./components/Post/ShowPost";

axios.defaults.baseURL = "http://gamer.test/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});
import InputForm from './components/InputForm';

const App = () => {
    return (
        <>
            <Header />
            <div className='mt-5'>
                <Split
                    sizes={[85, 15]} // 各パネルの初期サイズ（パーセンテージ）
                    minSize={100} // パネルの最小サイズ
                    gutterSize={10} // パネル間のスペース
                    className="d-flex" // Flexboxを使用する
                >
                    <div>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/showPost" element={<ShowPost />} />
                        </Routes>
                    </div>
                    <div>
                        ランキング
                    </div>
                </Split>
            </div>
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
