import React from 'react';
import classes from './index.module.scss';

const FilledArrow = (props) => {
    const {up = false, down = false, color = "" } = props || {};
    return <i className={`${up && classes.__filled_up_arrow} ${down && classes.__filled_down_arrow}`} style={{ borderTopColor: down ? color : '#f2f2f2', borderBottomColor: up ? color : '#f2f2f2'}}></i>;
};

export default FilledArrow;