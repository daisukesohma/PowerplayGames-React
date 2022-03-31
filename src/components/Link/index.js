import React from 'react';

import classes from './link.module.scss';

const Link = (props) => {
    const {title = '', onClick = () => {}, styles={}} = props || {};

    return (
        <a onClick={onClick} className={classes.__link} style={styles}>
            {title}
        </a>
    );
};

export default Link;