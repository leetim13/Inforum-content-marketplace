import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { asyncFunctionMiddleware } from './async-middleware';
import rootReducer from '../_reducers';

const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducer,
    applyMiddleware(
        asyncFunctionMiddleware,
        thunkMiddleware,
        loggerMiddleware
    )
);