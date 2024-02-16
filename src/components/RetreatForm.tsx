import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { RetreatFormProps } from '../types';


export default function RetreatForm({ handleChange, newRetreat, handleFormSubmit }: RetreatFormProps) {
    return (
        <Card className='my-3'>
            <Card.Body>
                <h3 className='text-center'>Create New Retreat</h3>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group>
                        <Form.Label>Retreat Name</Form.Label>
                        <Form.Control name='name' value={newRetreat.name} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Location</Form.Label>
                        <Form.Control name='location' value={newRetreat.location} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control name='date' value={newRetreat.date} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control name='description' value={newRetreat.description} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Duration</Form.Label>
                        <Form.Control name='duration' value={newRetreat.duration} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cost</Form.Label>
                        <Form.Control name='cost' value={newRetreat.cost} onChange={handleChange} />
                    </Form.Group>
                    <Button className='mt-3 w-100' variant='danger' type='submit'>Create Retreat</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}






