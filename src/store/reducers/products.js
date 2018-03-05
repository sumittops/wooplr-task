import uniq from 'lodash/uniq';
import {
    PRODUCT_REQUEST_START,
    PRODUCT_REQUEST_ERROR,
    PRODUCT_REQUEST_FINISHED
} from '../constants';
const initState = {
    byPage: {},
    byId: {},
    byColor: {},
    bySize: {},
    fetching: false,
    fetchFailed: false,
    pageToLoad: 1
}
export default (state = initState, action) => {
    switch(action.type) {
        case PRODUCT_REQUEST_START: 
            return {...state, fetching: true, pageToLoad: action.page};
        case PRODUCT_REQUEST_FINISHED: 
            const { byId, byPage, pageToLoad, byColor, bySize } = state;
            const { data } = action;
            let newById = Object.assign({}, byId);
            let newByColor= Object.assign({}, byColor);
            let newBySize= Object.assign({}, bySize);
            data.forEach(d => {
                if(d.ecommerceProductJAXB) {
                    const { id , color, size } = d.ecommerceProductJAXB;
                    const sizes = size.split(',');
                    if (!newByColor[color]) {
                        newByColor[color] = [];
                    }
                    newByColor = Object.assign({}, newByColor, {
                        [color]: uniq([...newByColor[color], id])
                    });
                    sizes.forEach(size => {
                        if (!newBySize[size]) {
                            newBySize[size] = [];
                        }
                        newBySize = Object.assign({}, newBySize, {
                            [size]: uniq([...newBySize[size], id])
                        })
                    })
                    newById = Object.assign({}, newById, {
                        [id]: d.ecommerceProductJAXB
                    });
                }
            });
            const newByPage = Object.assign({}, byPage, {
                [pageToLoad]: data.map(d => d.id).filter(id => newById.hasOwnProperty(id))
            });
            return {
                ...state, 
                fetching: false, 
                byId: newById, 
                byPage: newByPage, 
                bySize: newBySize,
                byColor: newByColor,
                pageToLoad: pageToLoad + 1 
            };
        case PRODUCT_REQUEST_ERROR: 
            return { ...state, }
        default: 
            return state;
    }
}

