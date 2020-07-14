import { routerMiddleware, connectRouter } from 'connected-react-router';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import history from '../routes/history';
import rootSaga from '../sagas';
// Reducers
import general from './general';

const reducers = combineReducers({
  general,
  router: connectRouter(history),
});

const sagaMiddleware = createSagaMiddleware();
const middlewares = [routerMiddleware(history), sagaMiddleware];

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(...middlewares),
    // other store enhancers if any here
  ),
);

sagaMiddleware.run(rootSaga);

export default store;
