import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import classes from './index.module.scss'

function ButtonDropdown(props) {
    const [isVisible, setVisibleState] = useState(false)
    const [_selected, setSelected] = useState({})
    const { elements = [], selected = {}, onChange = () => { }, isActive = false, styles = {} } = props || {}

    useEffect(() => {
        if(!selected && elements.length)
            onSelectListItem(elements[0])
        else 
            onSelectListItem(selected)
    }, [selected])

    const toggleList = () => {
        setVisibleState(!isVisible)
    }

    const onSelectListItem = (item) => {
        setSelected(item)
        setVisibleState(false)
    }


    return (
        <div className={classes.wrapper} style={styles}>
            <div>
                <button onClick={toggleList} className={classes.active}>
                    {_selected?.title}
                </button>
                <i className={`${classes.arrow} ${classes.down}`}></i>
            </div>

        {
            isVisible &&
                <div className={classes.select_body}>
                    {
                        elements.length && elements.map((itm, index) => <button
                            key={itm.title + index.toString()}
                            onClick={() => {
                                onSelectListItem(itm)
                                onChange(itm)
                            }}>
                            {itm.title}</button>)
                    }
                </div>

        }
        </div>
    )
}

ButtonDropdown.propTypes = {
    elements: PropTypes.array,
    selected: PropTypes.object,
    isActive: PropTypes.bool,
    onChange: PropTypes.func,
    styles: PropTypes.object
}

export default ButtonDropdown

