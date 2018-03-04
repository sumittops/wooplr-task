import React from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';

const styles = theme => ({
    root: {
        position: 'relative',
        cursor: 'pointer',
        height: 32,
        minWidth: 132,
        background: theme.palette.secondary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 14,
        textTransform: 'uppercase',
        marginRight: 10,
        color: theme.palette.textSecondary,
        fontWeight: 'bold',
        '@media screen and (max-width: 480px)': {
            minWidth: 102
        },
        '&:focus': {
            outline: 'none'
        }
    },
    label: {
        borderRadius: 3,
        padding: '6px 12px',
        color: theme.palette.textSecondary
    },
    list: {
        position: 'absolute',
        zIndex: 12,
        maxHeight: 0,
        overflow: 'hidden',
        backgroundColor: theme.palette.white,
        width: '100%',
        transition: 'all .5s cubic-bezier(.25,.8,.25,1)',
        left: 0,
        top: 34,
        boxShadow: `0 0 2px ${theme.palette.shadowColor}`,
        outline: 'none',
        '@media screen and (max-width: 480px)': {
            width: '120%'
        }
    },
    listItem: {
        display: 'flex',
        padding: '6px 4px',
        color: theme.palette.textColor,
        justifyContent: 'space-between',
        '&:hover': {
            backgroundColor: '#ccc'
        }
    },
    active: {
        maxHeight: 360,
        overflow: 'auto'
    }
});
class Dropdown extends React.Component {
    constructor(){
        super();
        this.state = {
            open: false,
            current: -1
        }
    }
    handleToggle = () => this.setState({ open: !this.state.open });
    close = () => this.setState({ open: false });
    handleItemSelect = (item, i) => {
        const current = i === undefined ? -1 : i;
        this.setState({
            current
        });
        this.props.onItemSelect(item);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.visibilityFilter === 'byPage')
            this.setState({ open: false, current: -1 });
    }   
    render() {
        const { current } = this.state;
        const { classes, data } = this.props;
        var label, listClass ;
        if (!data) 
            return '';
        if (current > -1) {
            label = this.props.data[current].label;
        } else {
            label = this.props.label;
        }
        listClass = this.state.open  ? `${classes.list} ${classes.active}` : classes.list;
        const listItems = [ 
            <div key="all-item" className={classes.listItem} onClick={() => this.handleItemSelect()}>
                { this.props.label } { current === -1 ? <i className="material-icons md-14">done</i> : '' }
            </div>,
            ...data.map(({ label, value}, i) => (
            <div onClick={() => this.handleItemSelect({ label, value}, i)} key={label+'-'+ value} className={classes.listItem}>
                { label }  { current === i ? <i className="material-icons md-14">done</i> : '' }
            </div>
            ))
        ];
        return (
            <div className={classes.root} tabIndex="0" onClick={this.handleToggle} onBlur={this.close} >
                { label }
                <div className={listClass}>
                    { listItems }
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => ({
    visibilityFilter: state.appState.visibilityFilter
})
export default connect(mapStateToProps)(injectSheet(styles)(Dropdown));