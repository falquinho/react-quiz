import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from  'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducerEntrypoint } from './redux/Reducers'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css'
import './material-design-icons/material-icons.css'



const store = createStore(
    reducerEntrypoint,
    applyMiddleware(thunk)
);



ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);



registerServiceWorker();
