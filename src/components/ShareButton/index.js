import React from 'react';

import classes from './shareButton.module.scss';

function ShareButton(props) {
    const { title = '', icon = '', styles = {}, onClick = () => { } } = props || {}
    return (
        <button onClick={onClick} style={styles} className={classes.__share_button}>
            {   <>
                    {icon}
                    {title}
                </>
            }
        </button>
    );
}

export default ShareButton;

