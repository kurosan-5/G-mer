import React, { useState }  from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Split from 'react-split';
import Home from './components/Home';
import Header from "./components/Header";
import LoginForm from './components/auth/Login';
import RegisterForm from './components/auth/Register';

const App = () => {
    return (
        <>
            <Header />
            <div>
                <Split
                    sizes={[85, 15]} // 各パネルの初期サイズ（パーセンテージ）
                    minSize={100} // パネルの最小サイズ
                    gutterSize={10} // パネル間のスペース
                    className="d-flex" // Flexboxを使用する
                >
                    <div>
                        <Routes>
                            <Route path="/home" element={<Home />} />
                            {/* <Route path="/login" element={<LoginForm />} />
                            <Route path="/register" element={<RegisterForm />} /> */}
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
