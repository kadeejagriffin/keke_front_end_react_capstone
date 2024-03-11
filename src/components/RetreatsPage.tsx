import { useState, useEffect } from 'react';
import { RetreatType, UserType, CategoryType } from '../types';
import { createRetreat, getRetreats } from '../lib/apiWrapper';
import RetreatForm from './RetreatForm';
import { Button } from 'react-bootstrap';
import RetreatCard from './RetreatCard';

export default function RetreatsPage({ isLoggedIn, currentUser, flashMessage }: { isLoggedIn: boolean; currentUser: UserType | null; flashMessage: (message: string, category: CategoryType) => void }) {

    const [retreats, setRetreats] = useState<RetreatType[]>([]);
    const [newRetreat, setNewRetreat] = useState<RetreatType>({ name: '', location: '', duration: '', date: '', cost: '', description: '' });
    const [formSubmit, setFormSubmit] = useState(false);
    const [displayForm, setDisplayForm] = useState(false);

    useEffect(() => {
        const fetchRetreats = async () => {
            try {
                const response = await getRetreats();
                if (response.error) {
                    console.error('Something went wrong:', response.error);
                } else {
                    const retrievedRetreats = response.data || [];
                    const sortedRetreats = [...retrievedRetreats].sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
                    setRetreats(sortedRetreats);
                }
            } catch (error) {
                console.error('Something went wrong:', error);
            }
        };
        fetchRetreats();
    }, [formSubmit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewRetreat(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || '';
        const response = await createRetreat(token, newRetreat); 
        if (response.error) {
            flashMessage(response.error, 'danger');
        } else {
            flashMessage(`${response.data?.name} has been created`, 'success');
            setFormSubmit(!formSubmit);
            setNewRetreat({ name: '', location: '', duration: '', date: '', cost: '', description: '' }); 
            setDisplayForm(false);
        }
    };

    return (
        <div>
            <h1 className='text-center'>{isLoggedIn && currentUser?.username ? `Peace and Blessings ${currentUser.username}` : 'Where Will You Stretch Next?'}</h1>
            {isLoggedIn && (
                <Button variant='dark' onClick={() => setDisplayForm(!displayForm)}>
                    {displayForm ? 'Hide Form' : '+ Add Retreat'}
                </Button>
            )}
            {isLoggedIn && displayForm && (
                <RetreatForm handleChange={handleChange} handleFormSubmit={handleFormSubmit} newRetreat={newRetreat} />
            )}
            <p className='text-center'>Check out Yoga Voyage Retreats from all over the world below!</p>
            <ul>
                {retreats.map(retreat => (
                    <li key={retreat.id}>
                        <RetreatCard retreat={retreat} currentUser={currentUser} />
                    </li>
                ))}
            </ul>
        </div>
    );
}




