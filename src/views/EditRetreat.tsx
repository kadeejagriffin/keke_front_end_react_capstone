import { useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { getRetreatById, editRetreatbyId, deleteRetreatbyId } from "../lib/apiWrapper"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { CardBody, ModalBody, ModalFooter } from "react-bootstrap";
import { CategoryType, RetreatFormDataType } from "../types";
import Modal from 'react-bootstrap/Modal'


type EditRetreatProps = {
    flashMessage: (message: string | null, category: CategoryType | null) => void;
};


export default function EditRetreat({flashMessage}: EditRetreatProps) {
    const { retreatId } = useParams();
    const navigate = useNavigate();

    const [retreatToEditData, setRetreatToEditData] = useState<RetreatFormDataType>({name:'', description:'', date:'', duration:'', cost:'', location: ''})
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    useEffect(() => {
        async function getRetreats() {
            const response = await getRetreatById(retreatId!)
            if (response.error) {
                console.log(response.error);
            } else if (response.data) {
                const retreatToEdit = response.data
                setRetreatToEditData({name: retreatToEdit.name, description: retreatToEdit.description, date: retreatToEdit.date, cost: retreatToEdit.cost, location: retreatToEdit.location, duration: retreatToEdit.duration})
            }
        }
        getRetreats()
    }, [retreatId]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRetreatToEditData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('buttonClicked')
        const token = localStorage.getItem('token') || ''
        const response = await editRetreatbyId(token, retreatId!, retreatToEditData);
        if (response.error){
            flashMessage(response.error, 'danger');
        } else {
            flashMessage(`${response.data?.name} has been updated`, 'success');
            navigate('/')
        }
    }

    const handleDeleteClick = async () => {
        const token = localStorage.getItem('token') || ''
        const response = await deleteRetreatbyId(token, retreatId!);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(response.data!, 'success')
            navigate('/')
        }
    }


    return (
        <>
            <h1 className="text-center">Edit Retreat</h1>
            <Card>
                <CardBody>
                    <Form onSubmit={handleFormSubmit}>
                    <Form.Label>Retreat Name</Form.Label>
                    <Form.Control name="name" value={retreatToEditData.name} onChange={handleChange}/>
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" value={retreatToEditData.description} onChange={handleChange}/>
                    <Form.Label>Date</Form.Label>
                    <Form.Control name="date" value={retreatToEditData.date} onChange={handleChange}/>
                    <Form.Label>Cost</Form.Label>
                    <Form.Control name="cost" value={retreatToEditData.cost} onChange={handleChange}/>
                    <Form.Label>Duration</Form.Label>
                    <Form.Control name="duration" value={retreatToEditData.duration} onChange={handleChange}/>
                    <Form.Label>Location</Form.Label>
                    <Form.Control name="location" value={retreatToEditData.location} onChange={handleChange}/>
                    <Button variant="primary" className="mt-3 w-50" type="submit">Edit Retreat</Button>
                    <Button variant="danger" className="mt-3 w-50" onClick={openModal}>Delete Retreat</Button>
                    </Form>
                </CardBody>
            </Card>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton >
                    <Modal.Title>Delete {retreatToEditData.name}</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    Are you sure you want to delete {retreatToEditData.name}? This action cannot be undone.
                </ModalBody>
                <ModalFooter>
                    <Button variant="dark" onClick={closeModal}>Close</Button>
                    <Button variant="danger" onClick={handleDeleteClick}>Delete Retreat</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}