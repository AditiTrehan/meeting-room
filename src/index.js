import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from './store';
import Routes from './routes';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router } from 'react-router';

const history = createBrowserHistory(store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
        <Routes />
    </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
