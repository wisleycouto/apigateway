import React from 'react';

// COMPONENTES
import ReactDOM from 'react-dom';
//import "react-widgets/styles.css";
//import "@govbr/dsgov/dist/dsgov.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoute from "./services/routes";
import store from "./store";
import {Provider} from "react-redux";
import {CookiesProvider} from "react-cookie";


ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <Provider store={store}>
                    <AppRoute/>
            </Provider>
        </CookiesProvider>
    </React.StrictMode>, 
    document.getElementById('root')
);




