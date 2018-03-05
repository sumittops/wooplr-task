import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import productsReducer from './reducers/products';
import appStateRedcuer from './reducers/appState';

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