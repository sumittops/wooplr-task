import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import productsReducer from './products';
import appStateRedcuer from './appState';

const middleware = applyMiddleware(thunk);

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