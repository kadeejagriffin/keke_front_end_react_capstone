import { Card, Button, Form } from "react-bootstrap";
import { useState } from 'react'
import { UserFormDataType, CategoryType, UserType } from "../types";
import { useNavigate } from "react-router-dom";
import { login, getMe } from "../lib/apiWrapper";

type LoginProps = {
    flashMessage: (newMessage: string, newCategory: CategoryType | null) => void
    logUserIn: (user: UserType) => void
}

export default function Login({ flashMessage, logUserIn }: LoginProps) {
    const navigate = useNavigate();

    const [userFormData, setUserFormData] = useState<Partial<UserFormDataType>>({ username: '', password: '' })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({ ...userFormData, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const loginResponse = await login(userFormData.username!, userFormData.password!);
        if (loginResponse.error) {
            flashMessage(loginResponse.error, 'danger');
            navigate('/');
        } else {
            localStorage.setItem('token', loginResponse.data?.token as string);
            localStorage.setItem('tokenExp', loginResponse.data?.tokenExpiration as string);
            const userResponse = await getMe(loginResponse.data?.token as string);
            logUserIn(userResponse.data!);
            flashMessage("Peace, welcome back!", 'success');
            navigate('/');
        }
    }

    return (
        <>
            <h1 className='text-center'>Welcome Back!</h1>
            <Card className='m-5 p-5'>
                <Card.Body>
                    <Form onSubmit={(handleFormSubmit)}>

                        <Form.Label>Username</Form.Label>
                        <Form.Control name='username' placeholder="Enter Username" value={userFormData.username} onChange={handleInputChange} />

                        <Form.Label>Password</Form.Label>
                        <Form.Control name='password' type="password" placeholder="Enter Password" value={userFormData.password} onChange={handleInputChange} />

                        <Button type="submit" variant="dark" className="w-100 mt-3"> Log In</Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}



