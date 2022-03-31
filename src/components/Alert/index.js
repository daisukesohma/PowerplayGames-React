import React from 'react';

import classes from "./alert.module.scss"

function Alert({ success = false, primary = false, danger = false, renderMsg = () => { } }) {
    return (
        <div className={`${classes.__alert_container} ${success && classes.__alert_success}  ${primary && classes.__alert_primary}  ${danger && classes.__alert_danger} my-4`}>
            {
                renderMsg()
            }
        </div>
    )
}

export default Alert
