import React, { useState }  from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Split from 'react-split';
import Home from './components/Home';
import Header from "./components/Header";

const App = () => {
    return (
        <>
            <Header />
            <div>
                <Split
                    sizes={[85, 15]} // 各パネルの初期サイズ（パーセンテージ）
                    minSize={100} // パネルの最小サイズ
                    gutterSize={10} // パネル間のスペース
                    style={{ display: 'flex' }} // Flexboxを使用する
                >
                    <div>
                        <Routes>
                            <Route path="/home" element={<Home />} />
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
