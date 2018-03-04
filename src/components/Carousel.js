import React from 'react';
import injectSheet from 'react-jss';

const styles = theme => ({
    root: {
        height: 360,
        position: 'relative'
    },
    arrow: {
        position: 'absolute',
        top: 0, bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all .3s cubic-bezier(.25,.8,.25,1)',
        padding: 6,
        '&:hover': {
            background: 'rgba(0, 0, 0, 0.25)'
        }
    },
    left: {
        left: 0
    },
    right: {
        right: 0
    },
    media: {
        height: 360,
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        borderBottom: `solid 1px ${theme.palette.shadowColor}`,
        marginBottom: 10
    },
});
class Carousel extends React.Component {
    constructor(){
        super();
        this.state = {
            current: 0,
            next: 1,
            prev: null
        };
    }
    next = () => this.setState({
        current: this.state.next,
        next: (this.state.next + 1) % this.props.data.length
    });
    prev = () => this.setState({
        current: this.state.prev,
        prev: this.state.prev > 0 ? this.state.prev - 1: (this.props.data.length - 1)
    });
    updateStateOnProps = (nextProps = this.props) => this.setState({
        next: (this.state.current + 1) % nextProps.data.length,
        prev: this.state.current > 0 ? this.state.current - 1: (nextProps.data.length - 1)
    });
    componentWillReceiveProps(nextProps) {
        this.updateStateOnProps(nextProps);
    }
    componentDidMount(){
        this.updateStateOnProps();
    }
    render() {
        const classes = this.props.classes;
        const url = this.props.data[this.state.current];
        const mediaStyle = {
            backgroundImage: `url(${url})`
        };
        return (
            <div className={classes.root}>
                <div className={classes.media} style={mediaStyle}></div>
                <div className={classes.arrow + ' ' + classes.left} onClick={this.prev}>
                    <i className="material-icons">arrow_back</i>
                </div>
                <div className={classes.arrow + ' ' + classes.right} onClick={this.next}>
                    <i className="material-icons">arrow_forward</i>
                </div>
            </div>
        )
    }
}
export default injectSheet(styles)(Carousel);