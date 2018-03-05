import React from 'react';
import injectSheet from 'react-jss';

const styles = theme => ({
    root: {
        height: 360,
        position: 'relative',
        maxWidth: 1000,
        margin:'auto'
    },
    arrowContainer: {
        position: 'absolute',
        top: 0, bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    left: {
        left: 4
    },
    right: {
        right: 4
    },
    arrow: {
        borderRadius: '50%',
        backgroundColor: theme.palette.white,
        boxShadow: `0 0 3px ${theme.palette.shadowColor}`,
        cursor: 'pointer',
        padding: 8,
        boxSizing: 'border-box',
        fontSize: 16,
        transition: 'all .3s cubic-bezier(.25,.8,.25,1)',
        '&:hover': {
            boxShadow: `0 0 12px ${theme.palette.shadowColor}`,
        }
    },
    media: {
        height: 360,
        width: '100%',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        borderBottom: `solid 1px ${theme.palette.shadowColor}`,
        marginBottom: 10,
        display: 'none',
        animationName: 'slideLeft',
        animationDuration: `1s`
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
        if (!this.props.data) return <div className={classes.root}></div>
        const slides = this.props.data.map(( url, index) => {
            let style = { backgroundImage: `url(${url})`};
            if (this.state.current === index) 
                style = Object.assign({}, style, { display: 'block' });
            return (
                <div key={`slideshow-${index}`} className={classes.media} style={style} />
            );
        });
        const leftArrowContainer = `${classes.arrowContainer} ${classes.left}`;
        const rightArrowContainer = `${classes.arrowContainer} ${classes.right}`;
        return (
            <div className={classes.root}>
                <div className={leftArrowContainer}>
                    <div className={ classes.arrow} onClick={this.prev}>
                        <i className="material-icons">arrow_back</i>
                    </div>
                </div>
                {slides}
                <div className={rightArrowContainer}>  
                    <div className={ classes.arrow}  onClick={this.next}>
                        <i className="material-icons">arrow_forward</i>
                    </div>
                </div>
            </div>
        )
    }
}
export default injectSheet(styles)(Carousel);