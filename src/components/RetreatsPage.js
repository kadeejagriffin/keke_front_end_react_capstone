import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { createRetreat, getRetreats } from '../lib/apiWrapper';
import RetreatForm from './RetreatForm';
import { Button } from 'react-bootstrap';
import RetreatCard from './RetreatCard';
export default function RetreatsPage({ isLoggedIn, currentUser, flashMessage }) {
    const [retreats, setRetreats] = useState([]);
    const [newRetreat, setNewRetreat] = useState({ name: '', location: '', duration: '', date: '', cost: '', description: '' });
    const [formSubmit, setFormSubmit] = useState(false);
    const [displayForm, setDisplayForm] = useState(false);
    useEffect(() => {
        const fetchRetreats = async () => {
            try {
                const response = await getRetreats();
                if (response.error) {
                    console.error('Something went wrong:', response.error);
                }
                else {
                    const retrievedRetreats = response.data || [];
                    const sortedRetreats = [...retrievedRetreats].sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
                    setRetreats(sortedRetreats);
                }
            }
            catch (error) {
                console.error('Something went wrong:', error);
            }
        };
        fetchRetreats();
    }, [formSubmit]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewRetreat(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || '';
        const response = await createRetreat(token, newRetreat);
        if (response.error) {
            flashMessage(response.error, 'danger');
        }
        else {
            flashMessage(`${response.data?.name} has been created`, 'success');
            setFormSubmit(!formSubmit);
            setNewRetreat({ name: '', location: '', duration: '', date: '', cost: '', description: '' });
            setDisplayForm(false);
        }
    };
    return (_jsxs("div", { children: [_jsx("h1", { className: 'text-center', children: isLoggedIn && currentUser?.username ? `Peace and Blessings ${currentUser.username}` : 'Where Will You Stretch Next?' }), isLoggedIn && (_jsx(Button, { variant: 'dark', onClick: () => setDisplayForm(!displayForm), children: displayForm ? 'Hide Form' : '+ Add Retreat' })), isLoggedIn && displayForm && (_jsx(RetreatForm, { handleChange: handleChange, handleFormSubmit: handleFormSubmit, newRetreat: newRetreat })), _jsx("p", { className: 'text-center', children: "Check out Yoga Voyage Retreats from all over the world below!" }), _jsx("ul", { children: retreats.map(retreat => (_jsx("li", { children: _jsx(RetreatCard, { retreat: retreat, currentUser: currentUser }) }, retreat.id))) })] }));
}
