import React from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';

import Dropdown from '../components/Dropdown';
import { setVisibilityFilter } from '../store/appState';
const style = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        boxShadow: `0 1px 3px ${theme.palette.shadowColor}, 0 1px 2px ${theme.palette.shadowColorLight}`,
        padding: 12,
        position: 'fixed',
        right: 0,
        left: 0,
        zIndex: 10,
        backgroundColor: theme.palette.primaryLight,
    },
    flex: {
        flex: 1
    },
    title: {
        fontSize: 24,
        color: theme.palette.white,
        fontWeight: 800
    },
    actions: {
        minWidth: 100,
        display: 'flex',
        backgroundColor: theme.palette.secondaryColor,
    },
    button: {
        background: theme.palette.secondary,
        color: theme.palette.textSecondary,
        minWidth: 132,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        marginRight: 10,
        outline: 'none',
        textTransform: 'uppercase',
        cursor: 'pointer',
        border: 'none',
        '&:focus': {
            outline: 'none',
        },
        '@media screen and (max-width: 480px)': {
            minWidth: 102
        },
    }
});

const Header = ({ classes, colors, sizes, visibilityFilter, dispatch, ...props}) => {
    colors = colors || {};
    sizes = sizes || {};
    const byPage = 'byPage', bySize = 'bySize', byColor = 'byColor'
    const colorData = Object.keys(colors).map(color => ({
        label: `${color}(${colors[color].length})`,
        value: color
    }))
    const sizeData = Object.keys(sizes).map(size => ({
        label: `${size}(${sizes[size].length})`,
        value: size
    }))
    const handleColorSelect = (item) => {
        dispatch(setVisibilityFilter(byPage)) 
        if (item && item.value) {
            dispatch(setVisibilityFilter(byColor, item.value))
        }
    };
    const handleSizeSelect = (item) => {
        dispatch(setVisibilityFilter(byPage));
        if (item && item.value) {
            dispatch(setVisibilityFilter(bySize, item.value))
        }   
    };
    return (
        <div className={classes.root}>
            <div className={classes.title}>Wooplr</div>
            <div className={classes.flex}></div>
            <div className={classes.actions}>
                { visibilityFilter !== byPage && <button onClick={(event) => {
                        event.stopPropagation();
                        dispatch(setVisibilityFilter(byPage));
                    }} className={classes.button}>Show All</button>}
                { visibilityFilter !== bySize && <Dropdown data={colorData} ref={node => this.colorFilter = node } label="All Colors" 
                    onItemSelect={handleColorSelect} /> }
                { visibilityFilter !== byColor && <Dropdown ref={node => this.sizeFilter = node }  data={sizeData} label="All Sizes" 
                    onItemSelect={handleSizeSelect} /> }
            </div>
        </div>
    );
}
const mapStateToProps = (state, ownProps) => ({
    colors: state.products.byColor,
    sizes: state.products.bySize,
    visibilityFilter: state.appState.visibilityFilter
});
export default connect(mapStateToProps)(injectSheet(style)(Header));