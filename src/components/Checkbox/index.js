import React from 'react';
import PropTypes from 'prop-types';

import classes from './index.module.scss';

function Checkbox(props) {
    const { label = '', checked = false, onChange = () => { }, name = '', required = false, styles = {} } = props || {};
    return (
        <label className={classes.checkbox_container}>
            <input name={name} type="checkbox" checked={checked} onChange={onChange} className={classes.checkbox} required={required} />
            <p style={styles} >{label}</p>
        </label>
    )
}

Checkbox.propTypes = {
    label: PropTypes.any,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    name: PropTypes.string,
    required: PropTypes.bool,
    styles: PropTypes.object,
}

export default Checkbox

