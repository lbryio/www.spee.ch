"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _reactRouterDom = require("react-router-dom");

var _reduxSaga = _interopRequireDefault(require("redux-saga"));

var _reducers = _interopRequireDefault(require("@reducers"));

var _sagas = _interopRequireDefault(require("@sagas"));

var _app = _interopRequireDefault(require("@app"));

var _GAListener = _interopRequireDefault(require("@components/GAListener"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// get the state from a global variable injected into the server-generated HTML
var preloadedState = window.__PRELOADED_STATE__ || null; //
// Allow the passed state to be garbage-collected

delete window.__PRELOADED_STATE__; // create and apply middleware

var sagaMiddleware = (0, _reduxSaga.default)();
var middleware = (0, _redux.applyMiddleware)(sagaMiddleware);
var reduxMiddleware = window.__REDUX_DEVTOOLS_EXTENSION__ ? (0, _redux.compose)(middleware, window.__REDUX_DEVTOOLS_EXTENSION__()) : middleware; // create the store

var store;

if (preloadedState) {
  store = (0, _redux.createStore)(_reducers.default, preloadedState, reduxMiddleware);
} else {
  store = (0, _redux.createStore)(_reducers.default, reduxMiddleware);
}

sagaMiddleware.run(_sagas.default.rootSaga); // render the app

(0, _reactDom.hydrate)(_react.default.createElement(_reactRedux.Provider, {
  store: store
}, _react.default.createElement(_reactRouterDom.BrowserRouter, null, _react.default.createElement(_GAListener.default, null, _react.default.createElement(_app.default, null)))), document.getElementById('react-app'));