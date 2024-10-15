import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextUI from './UIcomponents/Typography';

const InputForm = () => {
    const [data, setData] = useState();
    const [file, setFile] = useState();
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
        let filePath = document.forms.input.filePath.value.name;
        let imagePath = document.forms.input.imagePath.value;
        //dataをオブジェクトにしてセット
        setData({
            title: title,
            about: about,
            description: description,
            imagePath: imagePath,
            filePath: filePath,
        });
    }

    const submit = async()=>{
        console.log(data)
        const response = await axios.post('/api/posts',data)
        .then((res) => {
            console.log(res.data.message)
            navigate('/');
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <Box sx={{ padding: '16px' }}>
            <form name="input" onChange={inputData}>
                <h2>ゲームをアップロード</h2>
                <TextField label="ゲーム名" name="title" variant="outlined" fullWidth />
                <TextField label="簡単な説明" name="about" variant="outlined" fullWidth multiline rows={4} sx={{ marginTop: '16px' }}/>
                <TextField label="説明" name="description" variant="outlined" fullWidth multiline rows={4} sx={{ marginTop: '16px' }} />
                <TextUI variant="body2" componend="span">ゲームプログラムをアップロード</TextUI>
                <input
                    name="filePath"
                    type="file"
                    accept=".js" // アップロード可能なファイルの拡張子を指定
                    style={{ marginTop: '16px' }}
                />
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
                <br />
                <Button variant="contained" color="primary" sx={{ marginTop: '16px' }} onClick={submit}>
                    アップロード
                </Button>
            </form>
        </Box>
    );
};

export default InputForm;