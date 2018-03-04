import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import productsReducer from './products';
import appStateRedcuer from './appState';

const middleware = applyMiddleware(thunk, logger);

const rootReducer = combineReducers({
    appState: appStateRedcuer,
    products: productsReducer
});

export const configureStore = (preloadedState) => {
    return createStore(
        rootReducer,
        preloadedState,
        middleware
    );    
}