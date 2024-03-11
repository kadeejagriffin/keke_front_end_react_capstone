import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Card, Button, Form } from "react-bootstrap";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { register } from "../lib/apiWrapper";
export default function SignUp({ flashMessage }) {
    const navigate = useNavigate();
    const [userFormData, setUserFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const handleInputChange = (e) => {
        setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const registerResponse = await register(userFormData);
        console.log(registerResponse);
        if (registerResponse.error) {
            flashMessage(registerResponse.error, 'danger');
            navigate('/login');
        }
        else {
            const newUser = registerResponse.data;
            flashMessage(`Congrats ${newUser?.firstName} ${newUser?.lastName}, you have signed up with the username ${newUser?.username}`, 'success');
            navigate('/login');
        }
    };
    const disableSubmit = userFormData.password.length < 5 || userFormData.password !== userFormData.confirmPassword;
    // console.log(disableSubmit)
    return (_jsx(_Fragment, { children: _jsx(Card, { className: "m-5 p-5", children: _jsxs(Form, { onSubmit: (handleFormSubmit), children: [_jsx("h2", { children: "Join the Yoga Retreat Experience!" }), _jsxs(Form.Group, { children: [_jsx(Form.Label, { children: "First Name" }), _jsx(Form.Control, { name: 'firstName', placeholder: "Enter First Name", value: userFormData.firstName, onChange: handleInputChange })] }), _jsxs(Form.Group, { children: [_jsx(Form.Label, { children: "Last Name" }), _jsx(Form.Control, { name: 'lastName', placeholder: "Enter Last Name", value: userFormData.lastName, onChange: handleInputChange })] }), _jsxs(Form.Group, { children: [_jsx(Form.Label, { children: "Username" }), _jsx(Form.Control, { name: 'username', placeholder: "Enter Username", value: userFormData.username, onChange: handleInputChange })] }), _jsxs(Form.Group, { children: [_jsx(Form.Label, { children: "Email" }), _jsx(Form.Control, { name: 'email', placeholder: "Enter Email Address", value: userFormData.email, onChange: handleInputChange })] }), _jsxs(Form.Group, { children: [_jsx(Form.Label, { children: "Password" }), _jsx(Form.Control, { name: 'password', type: "password", placeholder: "Enter Password", value: userFormData.password, onChange: handleInputChange })] }), _jsxs(Form.Group, { children: [_jsx(Form.Label, { children: "Confirm Password" }), _jsx(Form.Control, { name: 'confirmPassword', type: "password", placeholder: "Re-Enter Password", value: userFormData.confirmPassword, onChange: handleInputChange }), disableSubmit && _jsx(Form.Text, { className: "text-danger", children: "Your password must be at least 6 characters long and matching " })] }), _jsx(Form.Group, { children: _jsx(Form.Check, { type: 'checkbox', label: 'I agree to all Terms of Service' }) }), _jsx(Button, { type: "submit", variant: "dark", className: "w-100 mt-3", disabled: disableSubmit, children: "Start My Yoga Journey!" }), _jsxs("p", { children: ["Already have an account? ", _jsx(Link, { to: "/login", children: "Log In" }), " to continue your YogaJourney"] })] }) }) }));
}
