const NEXT_PAGE = 'NEXT_PAGE';
const TOGGLE_PRODUCT_DETAIL = 'TOGGLE_PRODUCT_DETAIL';
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export const loadNextPage = () => ({
    type: NEXT_PAGE
})
export const toggleProductDetail = (product) => ({
    type: TOGGLE_PRODUCT_DETAIL,
    product
});
export const setVisibilityFilter = (filter, value) => ({
    type: SET_VISIBILITY_FILTER,
    filter, 
    value
});
const initState = {
    currentPage: 1,
    selectedProduct: null,
    visibilityFilter: 'byPage',
    filterValue: null
}
export default  (state = initState, action)  => {
    switch(action.type) {
        case NEXT_PAGE: 
            return { ...state, currentPage: state.currentPage + 1};
        case TOGGLE_PRODUCT_DETAIL:
            return { ...state, selectedProduct: action.product || null };
        case SET_VISIBILITY_FILTER: 
            return { ...state, visibilityFilter: action.filter, filterValue: action.value || null };
        default: 
            return state;
    }
}