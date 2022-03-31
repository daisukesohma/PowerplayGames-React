import React from 'react'
import PropTypes from 'prop-types'
import { useMediaQuery } from 'react-responsive'
import { useHistory } from 'react-router-dom'

import NoPick from '../NoPick'
import Cell from '../Cell'
import Button from '../Button'
import NoPickIcon from '../../icons/NoPick'
import { redirectTo } from '../../utility/shared'
import { Redirect } from 'react-router-dom'

function Games(props) {
    const {
        isNoPick = false,
        cellTitle = '',
        isPowerUp = false,
        isCell = false,
        mediumCell = false,
        highCell = false,
        lowCell = false,
        veryLowCell = false,
        onPowerUp = () => { }
    } = props || {}
    const isTableOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const history = useHistory()
    return (
        <>
            {
                isNoPick &&
                    <NoPick icon={<NoPickIcon style={{height: 'auto'}} size={isTableOrMobile && 33} />} />
            }
            
            {
                isCell &&
                    <Cell high={highCell} medium={mediumCell} low={lowCell} veryLow={veryLowCell} text={cellTitle} size={isTableOrMobile && 33} />
            }

            {
                isPowerUp &&
                <Button title="POWER UP!" onClick={() => {
                    onPowerUp()
                    history.push("/power-up")
                }} styles={{ width: '100px', fontSize: '13px' }} />
            }
        </>
    )
}

Games.propTypes = {
    isNoPick: PropTypes.bool,
    isCell: PropTypes.bool,
    isPowerUp: PropTypes.bool,
    cellTitle: PropTypes.string,
    mediumCell: PropTypes.bool,
    highCell: PropTypes.bool,
    lowCell: PropTypes.bool,
    veryLowCell: PropTypes.bool,
    onPowerUp: PropTypes.func
}

export default Games