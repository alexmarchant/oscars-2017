import './analytics.js';
import './firebase.js';
import './firebaseui.js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

const el = React.createElement(App);
ReactDOM.render(el, document.getElementById('app-root'));
