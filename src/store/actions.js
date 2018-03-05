import { getProducts } from '../services/Utils';
import {
    NEXT_PAGE,
    TOGGLE_GRID_SIZE,
    TOGGLE_PRODUCT_DETAIL,
    SET_VISIBILITY_FILTER,
    PRODUCT_REQUEST_START,
    PRODUCT_REQUEST_ERROR,
    PRODUCT_REQUEST_FINISHED
} from './constants';
export const loadNextPage = () => ({
    type: NEXT_PAGE
})
export const toggleProductDetail = (product) => ({
    type: TOGGLE_PRODUCT_DETAIL,
    product
});
export const toggleGridSize = () => ({
    type: TOGGLE_GRID_SIZE
});
export const setVisibilityFilter = (filter, value) => ({
    type: SET_VISIBILITY_FILTER,
    filter, 
    value
});

export const loadProductsByPage = (page) => dispatch => {
    dispatch({
        type: PRODUCT_REQUEST_START,
        page
    });
    getProducts(page)
        .then(data => {
            dispatch({
                type: PRODUCT_REQUEST_FINISHED,
                data 
            });

        }).catch(err => {
            dispatch({
                type: PRODUCT_REQUEST_ERROR,
                page
            });
        })
};