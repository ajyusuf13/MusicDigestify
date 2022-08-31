import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';


/**
 * This is the starting point of our application!
 *
 * Here we have our <App> (Think of this as the root of your application)
 *
 * You'll notice its wrapped inside a <BrowserRouter>. This will allow us
 * to navigate around our site by switching which component the user sees
 * depending on the url of the website.
 */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);





