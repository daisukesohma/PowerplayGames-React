import React from 'react'

import classes from "./sidebarLockItem.module.scss"

function SidebarLockItem(props) {
    const { icon = '', title = '', lockIcon = '' } = props || {}
    return (
        <div className={classes.__sidebar_lock_item_container}>
            <div className={classes.__sidebar_lock_item_icon}>
                {icon}
            </div>
            <span className={classes.__sidebar_lock_item_span_lock_icon}>{lockIcon}</span>
            <span className={classes.__sidebar_lock_item_title}>{ title }</span>
        </div>
    )
}

export default SidebarLockItem

