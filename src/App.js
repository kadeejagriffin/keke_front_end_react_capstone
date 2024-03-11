import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navigation from './components/Navigation';
import Home from './views/Home';
import About from './views/About';
import Contact from './views/Contact';
import SignUp from './views/SignUp';
import Login from './views/Login';
import AlertMessage from './components/AlertMessage';
import RetreatsPage from './components/RetreatsPage';
import EditRetreat from './views/EditRetreat';
import { getMe, getRetreats } from './lib/apiWrapper';
export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [retreats, setRetreats] = useState([]);
    const [message, setMessage] = useState(null);
    const [category, setCategory] = useState(null);
    useEffect(() => {
        async function getLoggedInUser() {
            try {
                if (isLoggedIn) {
                    const token = localStorage.getItem('token');
                    const response = await getMe(token);
                    if (response.data) {
                        setLoggedInUser(response.data);
                    }
                    else {
                        throw new Error(response.error || 'Failed to fetch user data');
                    }
                }
            }
            catch (error) {
                console.error('Error fetching logged-in user:', error);
            }
        }
        getLoggedInUser();
    }, [isLoggedIn]);
    useEffect(() => {
        async function fetchRetreats() {
            try {
                const response = await getRetreats();
                if (response.data) {
                    setRetreats(response.data);
                }
                else {
                    throw new Error(response.error || 'Failed to fetch retreats');
                }
            }
            catch (error) {
                console.error('Error fetching retreats:', error);
                flashMessage('Failed to fetch retreats. Please try again later.', 'danger');
            }
        }
        fetchRetreats();
    }, []);
    const logUserIn = (user) => {
        setIsLoggedIn(true);
        setLoggedInUser(user);
    };
    const handleLogout = () => {
        setIsLoggedIn(false);
        setLoggedInUser(null);
        localStorage.removeItem('token');
        flashMessage("Peace, we'll see you next time!", 'success');
    };
    const flashMessage = (newMessage, newCategory) => {
        setMessage(newMessage);
        setCategory(newCategory);
    };
    return (_jsxs("div", { children: [_jsx(Navigation, { isLoggedIn: isLoggedIn, handleLogout: handleLogout, loggedInUser: loggedInUser }), _jsxs(Container, { children: [message && _jsx(AlertMessage, { message: message, category: category, flashMessage: flashMessage }), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, { isLoggedIn: isLoggedIn, retreats: retreats }) }), _jsx(Route, { path: "/about", element: _jsx(About, {}) }), _jsx(Route, { path: "/contact", element: _jsx(Contact, {}) }), _jsx(Route, { path: "/signup", element: _jsx(SignUp, { flashMessage: flashMessage }) }), _jsx(Route, { path: "/login", element: _jsx(Login, { flashMessage: flashMessage, logUserIn: logUserIn }) }), _jsx(Route, { path: "/retreats", element: _jsx(RetreatsPage, { isLoggedIn: isLoggedIn, currentUser: loggedInUser, flashMessage: flashMessage }) }), _jsx(Route, { path: "/edit/:retreatId", element: _jsx(EditRetreat, { flashMessage: flashMessage }) })] })] })] }));
}
