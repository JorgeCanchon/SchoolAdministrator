import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import esES from 'antd/es/locale/es_ES';
import { createHashHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import * as serviceWorker from './serviceWorker';
import reducers from './redux';
import Router from './Router';
import 'antd/dist/antd.css';

const history = createHashHistory();
const routeMiddleware = routerMiddleware(history);
const middlewares = [thunk, routeMiddleware];

const store = createStore(reducers(history), applyMiddleware(...middlewares));

const RootApp = () => (
    <Provider store={store}>
      <ConfigProvider locale={esES}>
        <Router history={history} />
      </ConfigProvider>
    </Provider>
);

ReactDOM.render(<RootApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
export { store, history }
