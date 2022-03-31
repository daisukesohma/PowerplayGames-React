import React from 'react'
import PropTypes from 'prop-types'

import classes from "./sidebarButton.module.scss"

function SidebarButton(props) {
    const { icon = '', title = '', toolText = '', success = false, primary = false, onClick = () => {} } = props || {}
    return (
        <button className={classes.__sidebar_btn__container} onClick={onClick}>
            <span className={`${classes.__sidebar_span_toolText} ${success && classes.__sidebar_span_toolText_success} ${primary && classes.__sidebar_span_toolText_primary}`}>{toolText}</span>
            <div className={classes.__sidebar_btn__icon}>
                {icon}
            </div>
            <span className={classes.__sidebar_btn_text}>{ title }</span>
        </button>
    )
}

SidebarButton.propTypes = {
    icon: PropTypes.any,
    title: PropTypes.string,
    toolText: PropTypes.string,
    success: PropTypes.bool,
    primary: PropTypes.bool
}

export default SidebarButton

