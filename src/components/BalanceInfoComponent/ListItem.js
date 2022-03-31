import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

import classes from './index.module.scss'

const ListItem = (props) => {
    const { title = '', claimed: hasClaimed = true } = props || {}
    
    const [claimed, setClaimedState] = useState(hasClaimed)
    useEffect(() => { }, [claimed])

    function onClaim () {
        setClaimedState(true)
    }

    return (
        <div className={classes.list_item}>
            <span>{title}</span>
            <button onClick={() => onClaim()} className={!claimed && classes.claimed}>{claimed ? 'Claimed' : 'Not-Claimed'}</button>
        </div>
    )
}


ListItem.propTypes = {
    title: PropTypes.string,
    claimed: PropTypes.bool
}

export default ListItem

