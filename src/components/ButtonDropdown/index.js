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
        <div className={`${classes.select_container_1} ${isActive && classes.selected}`} style={styles}>
            <div className={classes.select_header}>
                <button onClick={toggleList}>
                    <span>NCCA</span> <br /> {_selected?.title}
                </button>
            </div>

        {
            isVisible &&
                <div className={classes.select_body}>
                    {
                        elements.length && elements.map((itm, index) => <button
                            key={itm.title + index.toString()}
                            className={`${index !== elements.length - 1 && classes.divider} ${index === 0 && classes.borderRadiusTop} 
                            ${index === elements.length - 1 && classes.borderRadiusBottom}`} onClick={() => {
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

