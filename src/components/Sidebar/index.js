import React from 'react'

import classes from "./sidebar.module.scss"

function Sidebar(props) {
    return (
        <div className={classes.__sidebar_container} style={props?.styles}>
            <div className={classes.__sidebar_container_2}>
                {
                    props?.children
                }
            </div>
        </div>
    )
}

export default Sidebar
