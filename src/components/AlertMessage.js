import { jsx as _jsx } from "react/jsx-runtime";
import Alert from 'react-bootstrap/Alert';
export default function AlertMessage({ message, category, flashMessage }) {
    return (_jsx(Alert, { variant: category ?? "warning", dismissible: true, onClose: () => { flashMessage(null, null); }, children: message }));
}
