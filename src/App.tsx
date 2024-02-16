import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home'; 
import About from './views/About';
import Contact from './views/Contact';
import SignUp from './views/SignUp';
import Login from './views/Login';
import { Container } from 'react-bootstrap';
import AlertMessage from './components/AlertMessage';
import { CategoryType, UserType, RetreatType } from './types';
import { getMe } from './lib/apiWrapper';
import { getRetreats } from './lib/apiWrapper';
import RetreatsPage from './components/RetreatsPage'; 
import EditRetreat from './views/EditRetreat';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);
  const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);
  const [retreats, setRetreats] = useState<RetreatType[]>([]);

  const [message, setMessage] = useState<string | null>(null);
  const [category, setCategory] = useState<CategoryType | null>(null);

  useEffect( () => {
    async function getLoggedInUser(){
        if (isLoggedIn){
            const token = localStorage.getItem('token') as string
            const response = await getMe(token)
            if (response.data){
                setLoggedInUser(response.data)
            } else {
                console.error(response.error)
            }
        }
    }
    getLoggedInUser();
}, [isLoggedIn] )


  useEffect(() => {
    async function fetchRetreats() {
      try {
        const response = await getRetreats();
        if (response.data) {
          setRetreats(response.data);
        } else {
          throw new Error(response.error || 'Failed to fetch retreats');
        }
      } catch (error) {
        console.error('Error fetching retreats:', error);
        flashMessage('Failed to fetch retreats. Please try again later.', 'danger');
      }
    }
    fetchRetreats();
  }, []);


  const logUserIn = (user: UserType) => {
    setIsLoggedIn(true);
    setLoggedInUser(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('token');
    flashMessage("Peace, we'll see you next time!", 'success');
  };

  const flashMessage = (newMessage: string | null, newCategory: CategoryType | null) => {
    setMessage(newMessage);
    setCategory(newCategory);
  };

  return (
    <div>
      <Navigation isLoggedIn={isLoggedIn} handleLogout={handleLogout} loggedInUser={loggedInUser} />
      <Container>
        {message && <AlertMessage message={message} category={category} flashMessage={flashMessage} />}
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} retreats={retreats} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp flashMessage={flashMessage} />} />
          <Route path="/login" element={<Login flashMessage={flashMessage} logUserIn={logUserIn} />} />
          <Route path="/retreats" element={<RetreatsPage isLoggedIn={isLoggedIn} currentUser={loggedInUser} flashMessage={flashMessage} />} />
          <Route path='/edit/:retreatId' element={<EditRetreat flashMessage={flashMessage} />} />
          </Routes>
      </Container>
    </div>
  );
}


