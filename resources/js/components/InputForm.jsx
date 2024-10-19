import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextUI from './UIcomponents/Typography';

const InputForm = () => {
    const [data, setData] = useState();
    const [file, setFile] = useState();
    const [message, setMessage] = useState('');
    const [imagemessage, setImageMessage] = useState('');
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null); // 画像のプレビュー用状態

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile); // ファイルの状態を更新

            // 画像プレビューを表示
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // プレビューを設定
            };
            reader.readAsDataURL(selectedFile); // 画像をデータURLとして読み込む
        }
    };

    const inputData = () => {
        let title = document.forms.input.title.value;
        let about = document.forms.input.about.value;
        let description = document.forms.input.description.value;
        //dataをオブジェクトにしてセット
        setData({
            title: title,
            about: about,
            description: description
        });
    }

    const submit = async () => {
        const auth_user_name = localStorage.getItem('auth_name')
        let fileInput = document.forms.input.filePath.files[0]
        let imageInput = document.forms.input.imagePath.files[0];
        data.auth_user_name = auth_user_name

        if (!fileInput) {
            if (!imageInput) {
                setImageMessage('画像を選択してください');
            }
            setMessage('ファイルを選択してください');
            return;
        }


        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('about', data.about);
        formData.append('description', data.description);
        formData.append('auth_user_name', data.auth_user_name);
        formData.append('fileInput', fileInput);
        formData.append('imageInput', imageInput);

        await axios.post('/api/posts', formData,{
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
            .then((res) => {
                navigate('/');
            }).catch(error => {
                if (error.response) {
                    // サーバー側のレスポンスがあればそれをログに表示
                    console.log('Error response:', error.response.data);
                } else if (error.request) {
                    // リクエストが送信されたが、サーバーからのレスポンスがない場合
                    console.log('Error request:', error.request);
                } else {
                    // リクエスト設定時に問題が発生した場合
                    console.log('Error message:', error.message);
                }
            });
    }

    return (
        <Box sx={{ padding: '16px' }}>
            <form name="input" onChange={inputData}>
                <h2>ゲームをアップロード</h2>
                <TextField label="ゲーム名" name="title" variant="outlined" fullWidth />
                <TextField label="簡単な説明" name="about" variant="outlined" fullWidth multiline rows={4} sx={{ marginTop: '16px' }} />
                <TextField label="説明" name="description" variant="outlined" fullWidth multiline rows={4} sx={{ marginTop: '16px' }} />
                <TextUI variant="body2" componend="span">ゲームプログラムをアップロード</TextUI>
                <TextUI variant="body2" componend="span">＊必ずプロジェクトフォルダ直下にindex.htmlを配置してください</TextUI>
                <input
                    name="filePath"
                    type="file"
                    accept=".zip" // アップロード可能なファイルの拡張子を指定
                    style={{ marginTop: '16px' }}
                />
                {message && <p>{message}</p>}
                <TextUI variant="body2" componend="span">サムネイル画像をアップロード</TextUI>
                <input
                    name="imagePath"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*" // 画像ファイルのみを許可
                    style={{ marginTop: '16px' }}
                    />
                {imagePreview && (
                    <img
                    src={imagePreview}
                        alt="Preview"
                        style={{ width: '200px', height: 'auto', marginTop: '16px' }} // プレビュー画像のスタイル
                    />
                )}
                        {imagemessage && <p>{imagemessage}</p>}
                <br />
                <Button variant="contained" color="primary" sx={{ marginTop: '16px' }} onClick={submit}>
                    アップロード
                </Button>
            </form>
        </Box>
    );
};

export default InputForm;