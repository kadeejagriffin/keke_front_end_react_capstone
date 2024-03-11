import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
ReactDOM.render(_jsx(React.StrictMode, { children: _jsx(BrowserRouter, { children: _jsx(App, {}) }) }), document.getElementById('root'));
