import React from 'react';
import styles from './styles.module.scss';

const ChooseItem = props => {
    const newProps = { ...props };
    const { title, helperText } = newProps;
    
    delete newProps.title;
    delete newProps.helperText;
    return (
        <label className={styles.root}>
            <span className={styles.title}>{title}</span>
            {helperText && !props.type && <span className={styles.helperText}>{helperText}</span>}
            <input type={props.type || 'radio'} {...newProps} placeholder={helperText} />
            <span className={styles.underLine}></span>
        </label>
    )
}

export default ChooseItem;