import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
export default function RetreatCard({ retreat, currentUser }) {
    const [showDetails, setShowDetails] = useState(false);
    return (_jsxs(Card, { className: 'mb-3', children: [_jsxs(Card.Body, { children: [_jsx(Card.Title, { children: retreat.name }), _jsx(Card.Subtitle, { children: retreat.location }), _jsx(Card.Text, { children: retreat.description }), _jsxs(Button, { variant: 'success', onClick: () => setShowDetails(!showDetails), children: [showDetails ? 'Hide' : 'Show ', " Details"] }), currentUser?.id === retreat.userId && _jsx(Link, { to: '/edit/' + retreat.id, children: _jsx(Button, { variant: 'warning', children: "Edit Retreat" }) })] }), showDetails && (_jsxs(ListGroup, { className: 'list-group-flush', children: [_jsxs(ListGroup.Item, { children: ["Date: ", retreat.date] }), _jsxs(ListGroup.Item, { children: ["Duration: ", retreat.duration] }), _jsxs(ListGroup.Item, { children: ["Cost: ", retreat.cost] })] }))] }));
}
