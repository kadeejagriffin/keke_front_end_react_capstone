import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Card, Button, Form } from "react-bootstrap";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { login, getMe } from "../lib/apiWrapper";
export default function Login({ flashMessage, logUserIn }) {
    const navigate = useNavigate();
    const [userFormData, setUserFormData] = useState({ username: '', password: '' });
    const handleInputChange = (e) => {
        setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const loginResponse = await login(userFormData.username, userFormData.password);
        if (loginResponse.error) {
            flashMessage(loginResponse.error, 'danger');
            navigate('/');
        }
        else {
            localStorage.setItem('token', loginResponse.data?.token);
            localStorage.setItem('tokenExp', loginResponse.data?.tokenExpiration);
            const userResponse = await getMe(loginResponse.data?.token);
            logUserIn(userResponse.data);
            flashMessage("Peace, welcome back!", 'success');
            navigate('/');
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("h1", { className: 'text-center', children: "Welcome Back!" }), _jsx(Card, { className: 'm-5 p-5', children: _jsx(Card.Body, { children: _jsxs(Form, { onSubmit: (handleFormSubmit), children: [_jsx(Form.Label, { children: "Username" }), _jsx(Form.Control, { name: 'username', placeholder: "Enter Username", value: userFormData.username, onChange: handleInputChange }), _jsx(Form.Label, { children: "Password" }), _jsx(Form.Control, { name: 'password', type: "password", placeholder: "Enter Password", value: userFormData.password, onChange: handleInputChange }), _jsx(Button, { type: "submit", variant: "dark", className: "w-100 mt-3", children: " Log In" })] }) }) })] }));
}
