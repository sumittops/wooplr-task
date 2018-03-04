import React from 'react';
import { connect } from 'react-redux';
import uniq from 'lodash/uniq';
import ProductCard from './ProductCard';
import { loadProductsByPage } from '../store/products';
import { toggleProductDetail  } from '../store/appState';

const ProductGrid = (props) => {
    const { currentPage, productMap, dispatch, isLoading, visibilityFilter, filterValue } = props;
    let productElems = [], src;
    const openProduct = (productId) => dispatch(toggleProductDetail(productId));
    if(visibilityFilter === 'byPage' && !props[visibilityFilter][currentPage]) {
        dispatch(loadProductsByPage(currentPage));
    }
    if (visibilityFilter === 'byPage') {
        src = Object.keys(props[visibilityFilter]).reduce((all, item) => [...all, ...props[visibilityFilter][item]], []);
    } else 
        src = props[visibilityFilter][filterValue];
    const productIds =  uniq(src);
    productElems = productIds.map(productId => (
        <div key={productId} className="col-xs-12 col-sm-6 col-md-4">
            <ProductCard  onClick={() => openProduct(productId)}  product={productMap[productId]} />
        </div>
    ));
    return (
        <div>
            <div className="row">
                {productElems}
            </div>
            { isLoading && <h3 className="text-center">Loading...</h3>}
        </div>
    )
    
}
const mapStateToProps = (state, ownProps) => ({
    byPage: state.products.byPage,
    byColor: state.products.byColor,
    bySize: state.products.bySize,
    productMap: state.products.byId,
    currentPage: state.appState.currentPage,
    visibilityFilter: state.appState.visibilityFilter,
    filterValue: state.appState.filterValue,
    isLoading: state.products.fetching
});
export default connect(mapStateToProps)(ProductGrid);
