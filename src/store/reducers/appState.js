import {
    NEXT_PAGE,
    TOGGLE_PRODUCT_DETAIL,
    SET_VISIBILITY_FILTER,
    TOGGLE_GRID_SIZE
} from '../constants';

const initState = {
    currentPage: 1,
    selectedProduct: null,
    visibilityFilter: 'byPage',
    filterValue: null,
    gridCompact: true
}
export default  (state = initState, action)  => {
    switch(action.type) {
        case NEXT_PAGE: 
            return { ...state, currentPage: state.currentPage + 1};
        case TOGGLE_PRODUCT_DETAIL:
            return { ...state, selectedProduct: action.product || null };
        case SET_VISIBILITY_FILTER: 
            return { ...state, visibilityFilter: action.filter, filterValue: action.value || null };
        case TOGGLE_GRID_SIZE: 
            return { ...state, gridCompact: !state.gridCompact}
        default: 
            return state;
    }
}