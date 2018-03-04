import React from 'react';
import injectSheet from 'react-jss';
import { imageBaseUrl } from '../services/configs';

const styles = theme => ({
    root: {
        minHeight: 200,
        boxSizing: 'border-box',
        boxShadow: `0 1px 3px ${theme.palette.shadowColor}, 0 1px 2px ${theme.palette.shadowColorLight}`,
        display: 'flex',
        margin: '10px 0',
        borderRadius: 3,
        cursor: 'pointer',
        transition: 'all .3s cubic-bezier(.25,.8,.25,1)',
        '&:hover': {
            boxShadow: `0 14px 28px ${theme.palette.shadowColorLight}, 0 10px 10px ${theme.palette.shadowColor}`,
        }
    },
    media: {
        flex: 3,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        boxShadow: `0 1px 1px ${theme.palette.shadowColor}, 0 1px 1px ${theme.palette.shadowColorLight}`,
    },
    content: {
        flex: 7,
        padding: '6px',
        // borderLeft: `solid 1px ${theme.palette.shadowColor}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 16,
        color: theme.palette.textColor
    },
    sizeBadge: {
        display: 'inline-block',
        border: `solid 1px ${theme.palette.shadowColor}`,
        margin: 4,
        fontSize: 11,
        padding: '2px 4px',
        borderRadius: 3,
        textTransform: 'uppercase'
    },
    discountText: {
        textDecoration: 'line-through',
        fontSize: 12
    },
    newPriceText: {
        fontSize: 14,
        marginLeft: 8
    },
    subHeader: {
        fontSize: 12,
        marginTop: 4,
        color: theme.palette.shadowColor
    }
});
const INTERVAL_MILLISECONDS =  1000;
class ProductCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imageIndex: 0
        };
        this.interval = null;
        this.imageLoadedCount = 0;
    }
    loadmageByIndex = (index) => {
        if (!this.props.product) return;
        const newImage = new Image();
        newImage.onload = () => this.imageLoadedCount++;
        newImage.src = `${imageBaseUrl}${this.props.product.image_pid[index]}`
    }
    nextImageIndex = () => (this.state.imageIndex + 1) % this.props.product.image_pid.length;
    scrollImages = () => {
        this.interval = setInterval(() => {
            this.setState({ 
                    imageIndex: this.nextImageIndex()
                },
                () => {
                    if(this.imageLoadedCount <= this.props.product.image_pid.length)
                        this.loadmageByIndex(this.nextImageIndex());
            });
        }, INTERVAL_MILLISECONDS);
    }
    stopScroll = () => {
        clearInterval(this.interval);
        this.interval = null;
        this.setState({
            imageIndex: 0
        });
    }
    componentDidMount() {
        this.imageLoadedCount++;
        this.loadmageByIndex(this.nextImageIndex()); 
    }
    render () {
        var priceElem;
        const { classes, product} = this.props;
        const { imageIndex } = this.state;
        if (product.salesPrice < product.retailPrice ) {
            priceElem = (<span>
                    <span className={classes.discountText}>
                        ₹{product.retailPrice}
                    </span>
                    <span className={classes.newPriceText}>₹{product.salesPrice}</span>
                </span>);
        }  else {
            priceElem = <span >₹{product.retailPrice}</span>
        }
        if (product) {
            const style = {
                backgroundImage: `url(${imageBaseUrl}${product.image_pid[imageIndex]})`
            }
            const sizeBadges =  product.availableSizes.split(',').map(
                size => <div key={size} className={classes.sizeBadge}>{size}</div>
            )
            return (
                <div className={classes.root} 
                    onMouseOut={this.stopScroll} 
                    onMouseOver={this.scrollImages}
                    onClick={this.props.onClick}>
                    <div className={classes.media} style={style}></div>
                    <div className={classes.content}>
                        <div>
                            <div className={classes.title}>{product.name}</div>
                            <div className={classes.subHeader}>By {product.manufacture} </div>
                            { priceElem }
                        </div>
                        <div>
                            <div>
                                <div className={classes.sizeBadge}>{product.gender}</div>
                                <div className={classes.sizeBadge}>{product.category}</div>
                            </div>
                            <div>{ sizeBadges }</div>
                        </div>
                    </div>
                </div>
            )   
        }  else
            return '';
    }
}
export default injectSheet(styles)(ProductCard);
