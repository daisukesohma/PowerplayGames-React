import React from 'react'
import PropTypes from 'prop-types'

import "./index.module.scss"
import { CONSTANTS } from '../../utility/constants'

function Button(props) {
    const { title = '', icon = '', isRounded = false, styles = {}, iconOnly = false,
            onClick = () => { }, block = false, shadow = false, transparent = false, type = CONSTANTS.BUTTON_TYPE.SUBMIT, bordered = false } = props || {}
    return (
        <button className={`${!iconOnly && '__btn'} ${block && '__large-btn'} ${shadow && '__shadow-2'} ${transparent && '__style-2'} ${isRounded && '__btn __btn__rounded'} ${iconOnly && '__btn__icon_only'} ${bordered && '__btn_borderd_only'} ${props.className}`} onClick={onClick} style={styles} type={type}>
            {
                !iconOnly
                    ?
                    <div className="__btn__">
                        {icon}
                        {title}
                    </div>
                    :
                    {...icon}
            }
        </button>
    )
}

Button.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.any,
    isRounded: PropTypes.bool,
    style: PropTypes.any,
    iconOnly: PropTypes.bool,
    onClick: PropTypes.func,
    block: PropTypes.bool,
    shadow: PropTypes.bool,
    transparent: PropTypes.bool,
    type: PropTypes.string,
    bordered: PropTypes.bool,
}

export default Button

