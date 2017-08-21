import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';

let initialState = {
        items: [],
        isFetching: false,
        types: []
};

const store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,

    document.getElementById('root')
);

registerServiceWorker();
