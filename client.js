import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';
import { Reducers, Sagas, GAListener, App } from 'spee.ch-components';

import { Logo } from './custom/views/components/Logo'

// configure the reducers by passing initial state configs
const siteConfig = require('./config/siteConfig.json');
const customViews = require('./custom/views');
console.log('custom views from client.js', customViews);
const MyReducers = Reducers(siteConfig, customViews);
const MyApp = App(customViews);
const MyGAListener = GAListener(siteConfig);

// get the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__ || null;
//
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// create and apply middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);
const reduxMiddleware = window.__REDUX_DEVTOOLS_EXTENSION__ ? compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__()) : middleware;

// create the store
let store;
if (preloadedState) {
    console.log('preloaded state found:', preloadedState);
    // add custom views to preloaded state
    preloadedState['plugins'] = customViews;
    store = createStore(MyReducers, preloadedState, reduxMiddleware);
} else {
    console.log('no preloaded state found');
    store = createStore(MyReducers, reduxMiddleware);
}

sagaMiddleware.run(Sagas.rootSaga);

// render the app
hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <MyGAListener>
                <MyApp />
            </MyGAListener>
        </BrowserRouter>
    </Provider>,
    document.getElementById('react-app')
);
