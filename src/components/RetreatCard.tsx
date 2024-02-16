import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { RetreatCardProps } from '../types';



export default function RetreatCard({ retreat, currentUser }: RetreatCardProps) {

    const [showDetails, setShowDetails] = useState(false);

    return (
        <Card className='mb-3'>
            <Card.Body>
                <Card.Title>{retreat.name}</Card.Title>
                <Card.Subtitle>{retreat.location}</Card.Subtitle>
                <Card.Text>{retreat.description}</Card.Text>
                <Button variant='success' onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Hide' : 'Show '} Details</Button> 
                {currentUser?.id === retreat.userId && <Link to={'/edit/' + retreat.id}><Button variant='warning'>Edit Retreat</Button></Link>}
            </Card.Body>
            {showDetails && (
                <ListGroup className='list-group-flush'>
                    <ListGroup.Item>Date: {retreat.date}</ListGroup.Item>
                    <ListGroup.Item>Duration: {retreat.duration}</ListGroup.Item>
                    <ListGroup.Item>Cost: {retreat.cost}</ListGroup.Item>
                </ListGroup>
            )}
        </Card>
    )
}




