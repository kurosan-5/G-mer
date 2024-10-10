// AuthService.ts (認証用サービス)
import axios from 'axios';


const register = (name, email, password, password_confirmation) => {
    return axios.post(`api/register`, {
        name,
        email,
        password,
        password_confirmation
    });
};

const login = (email, password) => {
    return axios.post(`api/login`, { email, password });
};

const logout = () => {
    return axios.post(`api/logout`);
};

const AuthService = {
    register,
    login,
    logout,
};

export default AuthService;
