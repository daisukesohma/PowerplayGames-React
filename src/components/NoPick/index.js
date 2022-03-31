import React from 'react'
import PropTypes from 'prop-types'

import classes from './index.module.scss'

function NoPick(props) {
    const { styles = {}, icon = {} } = props || {}
    return (
        <div className={classes.no_pick} style={styles}>
            {
                icon &&
                {...icon}
            }
            <span>
                NO PICK
            </span>
        </div>
    )
}

NoPick.propTypes = {
    styles: PropTypes.object,
    icon: PropTypes.any
}

export default NoPick

