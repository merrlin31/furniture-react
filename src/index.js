import React, { Suspense } from 'react';
import './18n'
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './reducers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Suspense fallback={<div>Loading...</div>}>
        <Provider store={store}>
            <App /> 
        </Provider>
    </Suspense>
);
