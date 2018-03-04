import React from 'react';
import injectSheet from 'react-jss';
import ProductGrid from '../components/ProductGrid';

const styles = theme => ({
    root: {
        padding: '64px 24px'
    }
});

const Main = ({ classes, ...props}) => (
    <div className={classes.root}>
        <ProductGrid />
    </div>
)

export default injectSheet(styles)(Main);