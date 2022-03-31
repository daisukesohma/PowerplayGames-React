import React from 'react';
import PropTypes from 'prop-types';

import classes from './index.module.scss';

/**
 * 
 * @param {data, value, onChange, lable} props,
 *  data: [{name, value}]
 */
function Select(props) {
    const { label = '', data = [], onChange = () => { }, value = '', name = '', white = false, required = false } = props || {};
    return (
        <div className={classes.select_container}>
            <label>{label}</label>
            <select value={value} name={name} onChange={onChange} className={`${white ? classes.white : ''}`} required={required}>
                {
                    data.map((item) => <option key={item.value} value={item?.value}>{ item?.name }</option>)
                }
            </select>
        </div>
    )
}

Select.propTypes = {
    label: PropTypes.any,
    data: PropTypes.array,
    onChange: PropTypes.func,
    value: PropTypes.any,
    name: PropTypes.string,
    white: PropTypes.bool,
    required: PropTypes.bool,
}

export default Select

