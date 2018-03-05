import React from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { toggleProductDetail  } from '../../store/actions';
import { imageBaseUrl, webLinkBaseUrl } from '../../services/configs';
import styles from './styles';
import Carousel from '../Carousel';

const ProductDetail = ({classes, productId, productMap, dispatch, ...props}) => {
    var priceElem, otherElems, sizeBadges;
    const product = productMap[productId];
    const className = product ? classes.root +  ' ' + classes.active : classes.root;
    const close = () => dispatch(toggleProductDetail());
    const openUrl = (url) => window.open(`${webLinkBaseUrl}${url}`, '_blank');
    const otherData = [{
        name: 'In Stock',
        key: 'stock'
    }, {
        name: 'Color',
        key: 'color'
    }, {
        name: 'Category',
        key: 'category'
    }, {
        name: 'Sub Category',
        key: 'subcategory'
    }];
    const overlayClassName = product ? `${classes.overlay} ${classes.active}`: classes.overlay;
    const carouselData = product ? product.image_pid.map(url => `${imageBaseUrl}${url}`): [];
    if (product && product.salesPrice < product.retailPrice ) {
        priceElem = (<span>
                <span className={classes.discountText}>
                    ₹{product.retailPrice}
                </span>
                <span className={classes.newPriceText}>₹{product.salesPrice}</span>
            </span>);
        otherElems = otherData
            .filter(({key}) => !!product[key])
            .map(({name, key}) => (
                <div key={key} className={classes.dataPoint}>
                    <div className={classes.pointName}>
                        {name}
                    </div>
                    <div className={classes.sizeBadge}>  
                        {product[key]}
                    </div>
                </div>  
            ));
        sizeBadges =  product.availableSizes.split(',').map(
            size => <div key={size} className={classes.sizeBadge}>{size}</div>
        )
    }  else if (product){
        priceElem = <span className={classes.newPriceText}>₹{product.retailPrice}</span>
    }
    return (
        [   <div key="overlay" className={overlayClassName} onClick={close} />,
            <div key="detail-screen" className={className}>
                <div className={classes.header}>
                    <i className="material-icons pointer" onClick={close}>arrow_back</i>
                    { product && <div className={classes.title}>{product.name}</div> }
                </div>
                <div className={classes.fab} onClick={() => openUrl(product.webLink)}>
                    <i className="material-icons">link</i>
                </div>
                { product && <div className={classes.content}>
                        <Carousel data={carouselData}/>
                        <div className={classes.description}>
                            <div>
                                { priceElem }
                            </div>
                            <p>{ product.description}</p>
                            <div>   
                                { otherElems }
                                <div className={classes.dataPoint}>
                                    <div className={classes.pointName}>
                                        Size
                                    </div>
                                    <div>{ sizeBadges }</div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        ]
    );
}
const mapStateToProps = (state, ownProps) => ({
    productMap: state.products.byId,
    productId: state.appState.selectedProduct
})
export default connect(mapStateToProps)(injectSheet(styles)(ProductDetail));
