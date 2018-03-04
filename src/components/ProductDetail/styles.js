const styles = theme => ({
    overlay: {
        position: 'fixed',
        right: 0,
        top: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 14,
        transition: 'all .5s cubic-bezier(.25,.8,.25,1)',
        display: 'none'
    },
    root: {
        position: 'fixed',
        width: 480,
        zIndex: 15,
        boxShadow: `0 1px 3px ${theme.palette.shadowColor}, 0 1px 2px ${theme.palette.shadowColorLight}`,
        transition: 'all .5s cubic-bezier(.25,.8,.25,1)',
        right: 0,
        top: 0,
        bottom: 0,
        transform: 'translateX(480px)',
        backgroundColor: theme.palette.white,
        '@media screen and (max-width: 479px)': {
            width: '100%',
            transform: 'translateX(100%)',
        }
    },
    active: {
        transform: 'translateX(0px)',
        display: 'initial'
    },
    header: {
        backgroundColor:  theme.palette.primaryLight,
        display: 'flex',
        padding: 12,
        alignItems: 'center',
        color: theme.palette.white
    },
    title: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        fontSize: 22,
        marginLeft: 6
    },
    fab: {
        position: 'absolute',
        top: 410,
        transform: `translate(0, -50%)`,
        right: 25,
        padding: 10,
        fontSize: 36,
        zIndex: 12,
        borderRadius: '50%',
        backgroundColor: theme.palette.secondary,
        height: 40,
        width: 40,
        color: theme.palette.textSecondary,
        boxShadow: '0 0 3px #555',
        textAlign: 'center',
        cursor: 'pointer'
    },
    content: {
        fontSize: 14,
        overflowY: 'auto',
        height: '100%',
        paddingBottom: 52,
        boxSizing: 'border-box'
    },
    description: {
        padding: 12,
    },
    discountText: {
        textDecoration: 'line-through',
        fontSize: 18
    },
    newPriceText: {
        fontSize: 22,
        marginLeft: 8
    },
    pointName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4
    },
    dataPoint: {
        margin: 6
    },
    sizeBadge: {
        display: 'inline-block',
        border: `solid 1px ${theme.palette.shadowColor}`,
        marginRight: 4,
        fontSize: 13,
        padding: '2px 4px',
        borderRadius: 3
    },
});
export default styles;