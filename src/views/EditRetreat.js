import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRetreatById, editRetreatbyId, deleteRetreatbyId } from "../lib/apiWrapper";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { CardBody, ModalBody, ModalFooter } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
export default function EditRetreat({ flashMessage }) {
    const { retreatId } = useParams();
    const navigate = useNavigate();
    const [retreatToEditData, setRetreatToEditData] = useState({ name: '', description: '', date: '', duration: '', cost: '', location: '' });
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    useEffect(() => {
        async function getRetreats() {
            const response = await getRetreatById(retreatId);
            if (response.error) {
                console.log(response.error);
            }
            else if (response.data) {
                const retreatToEdit = response.data;
                setRetreatToEditData({ name: retreatToEdit.name, description: retreatToEdit.description, date: retreatToEdit.date, cost: retreatToEdit.cost, location: retreatToEdit.location, duration: retreatToEdit.duration });
            }
        }
        getRetreats();
    }, [retreatId]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRetreatToEditData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log('buttonClicked');
        const token = localStorage.getItem('token') || '';
        const response = await editRetreatbyId(token, retreatId, retreatToEditData);
        if (response.error) {
            flashMessage(response.error, 'danger');
        }
        else {
            flashMessage(`${response.data?.name} has been updated`, 'success');
            navigate('/');
        }
    };
    const handleDeleteClick = async () => {
        const token = localStorage.getItem('token') || '';
        const response = await deleteRetreatbyId(token, retreatId);
        if (response.error) {
            flashMessage(response.error, 'danger');
        }
        else {
            flashMessage(response.data, 'success');
            navigate('/');
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("h1", { className: "text-center", children: "Edit Retreat" }), _jsx(Card, { children: _jsx(CardBody, { children: _jsxs(Form, { onSubmit: handleFormSubmit, children: [_jsx(Form.Label, { children: "Retreat Name" }), _jsx(Form.Control, { name: "name", value: retreatToEditData.name, onChange: handleChange }), _jsx(Form.Label, { children: "Description" }), _jsx(Form.Control, { name: "description", value: retreatToEditData.description, onChange: handleChange }), _jsx(Form.Label, { children: "Date" }), _jsx(Form.Control, { name: "date", value: retreatToEditData.date, onChange: handleChange }), _jsx(Form.Label, { children: "Cost" }), _jsx(Form.Control, { name: "cost", value: retreatToEditData.cost, onChange: handleChange }), _jsx(Form.Label, { children: "Duration" }), _jsx(Form.Control, { name: "duration", value: retreatToEditData.duration, onChange: handleChange }), _jsx(Form.Label, { children: "Location" }), _jsx(Form.Control, { name: "location", value: retreatToEditData.location, onChange: handleChange }), _jsx(Button, { variant: "primary", className: "mt-3 w-50", type: "submit", children: "Edit Retreat" }), _jsx(Button, { variant: "danger", className: "mt-3 w-50", onClick: openModal, children: "Delete Retreat" })] }) }) }), _jsxs(Modal, { show: showModal, onHide: closeModal, children: [_jsx(Modal.Header, { closeButton: true, children: _jsxs(Modal.Title, { children: ["Delete ", retreatToEditData.name] }) }), _jsxs(ModalBody, { children: ["Are you sure you want to delete ", retreatToEditData.name, "? This action cannot be undone."] }), _jsxs(ModalFooter, { children: [_jsx(Button, { variant: "dark", onClick: closeModal, children: "Close" }), _jsx(Button, { variant: "danger", onClick: handleDeleteClick, children: "Delete Retreat" })] })] })] }));
}
