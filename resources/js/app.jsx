import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

if (document.getElementById('app')) {

    const Index = ReactDOM.createRoot(document.getElementById("app"));

    Index.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    )
}