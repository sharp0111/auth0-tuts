import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import reducers from './reducers'
import Provider from './providers';
import Consumer from './consumer';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Creating the store using the reducers info.
// That's because reducers are the building blocks of a Redux Store.
// const store = createStore(reducers)

ReactDOM.render(
    // <Provider store={store}>
    //     <App />
    // </Provider>
    <Provider>
        <Consumer>
            <App />
        </Consumer>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
