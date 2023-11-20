import React, { Suspense } from 'react';
import './18n'
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Suspense fallback={<div>Loading...</div>}>
        <App /> 
    </Suspense>
);
