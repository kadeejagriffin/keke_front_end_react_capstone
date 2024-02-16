import { Card, Button, Form } from "react-bootstrap";
import { useState } from 'react'
import { CategoryType, UserFormDataType } from "../types";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import { register } from "../lib/apiWrapper";


type signUpProps = {
    flashMessage: (newMessage:string|null, newCategory:CategoryType|null) => void
};

export default function SignUp({flashMessage}: signUpProps){

    const navigate = useNavigate();

    const [userFormData, setUserFormData] = useState<UserFormDataType>(
        {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        }
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({...userFormData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const registerResponse = await register(userFormData);
        console.log(registerResponse);
        if (registerResponse.error) {
            flashMessage(registerResponse.error, 'danger');
            navigate('/login');
        } else {
            const newUser = registerResponse.data;
            flashMessage(`Congrats ${newUser?.firstName} ${newUser?.lastName}, you have signed up with the username ${newUser?.username}`, 'success');
            navigate('/login');
        }
    }

    const disableSubmit = userFormData.password.length < 5 || userFormData.password !== userFormData.confirmPassword
    // console.log(disableSubmit)
    
    return (
        <>
            <Card className="m-5 p-5">
                <Form onSubmit={(handleFormSubmit)}>
                    <h2>Join the Yoga Retreat Experience!</h2>
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control name='firstName' placeholder="Enter First Name" value={userFormData.firstName} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control name='lastName' placeholder="Enter Last Name" value={userFormData.lastName} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control name='username' placeholder="Enter Username" value={userFormData.username} onChange={handleInputChange}  />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control name='email' placeholder="Enter Email Address" value={userFormData.email} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control name='password' type="password"  placeholder="Enter Password" value={userFormData.password} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control name='confirmPassword' type="password" placeholder="Re-Enter Password" value={userFormData.confirmPassword} onChange={handleInputChange}  />
                        {disableSubmit && <Form.Text className="text-danger">Your password must be at least 6 characters long and matching </Form.Text>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Check type='checkbox' label='I agree to all Terms of Service' />
                    </Form.Group>
                    <Button type="submit" variant="dark" className="w-100 mt-3" disabled={disableSubmit}>Start My Yoga Journey!</Button>
                    <p>Already have an account? <Link to="/login">Log In</Link> to continue your YogaJourney</p>
                </Form>
            </Card>
        </>
    )
}

