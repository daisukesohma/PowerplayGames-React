import React from 'react'
import PropTypes from 'prop-types'

import CellHigh from '../../icons/CellHigh'
import CellMedium from '../../icons/CellMedium'
import CellLow from '../../icons/CellLow'
import CellVeryLow from '../../icons/CellVeryLow'
import classes from './index.module.scss'

const Cell = props => {
    const { high = false, medium = false, low = false, veryLow = false, text = '', styles = {}, size = 0} = props || {}
    return (
        <div className={`${classes.cell_container} ${high && classes.cell_high} ${medium && classes.cell_medium} ${low && classes.cell_low} ${veryLow && classes.cell_low}`} style={styles}>
            <span>
                {text}
            </span>
            {
                high &&
                    <CellHigh style={{height: 'auto'}} size={size !== 0 && size} />
            }

            {
                medium &&
                    <CellMedium style={{height: 'auto'}} size={size !== 0 && size} />
            }

            {
                low &&
                    <CellLow style={{height: 'auto'}} size={size !== 0 && size} />
            }

            {
                veryLow &&
                    <CellVeryLow style={{height: 'auto'}} size={size !== 0 && size} />
            }
            
        </div>
    )
}

Cell.propTypes = {
    high: PropTypes.bool,
    medium: PropTypes.bool,
    low: PropTypes.bool,
    veryLow: PropTypes.bool,
    text: PropTypes.string,
    styles: PropTypes.object
}

export default Cell
