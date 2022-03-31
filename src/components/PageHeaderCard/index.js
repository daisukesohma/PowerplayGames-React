import React, {useState} from 'react'
import PropTypes from 'prop-types'

import classes from "./pageHeaderCard.module.scss"
import Card from '../Card'
import Time from '../../icons/Time'
import HowDoIWinModal from '../HowDoIWinModal'

function PageHeaderCard(props) {
    const { title = '' } = props || {}
    const [ howDoIWinModal, setHowDoIWinModal ] = useState(false);

    const onOpenModal = () => setHowDoIWinModal(true);
    const onCloseModal = () => setHowDoIWinModal(false);

    const { seconds = 12 } = props || {}
    return (
        <Card>
            <div className={classes.__card_header}>
                <small>Jackpot</small>
            </div>
            <div className={classes.__card_body}>               
                <div className={classes.__card_body_left}>
                    <div className={classes.__card_body_top}>
                        <h1>$2000</h1><span>CAD</span>
                    </div>
                    <p>
                        Odds of winning depend on <br />
                        <strong>Powerplay usage</strong>
                    </p>
                </div>
                <div className={classes.__divider} />
                <div className={classes.__card_body_right}>
                    {
                        title == "Chase The Ace"
                        ?
                        <span className={classes.__span} onClick={onOpenModal}>How do I win?</span>
                        :
                        <span>Live Draw in Progress</span>
                    } 
                    {
                        howDoIWinModal
                        &&
                        <HowDoIWinModal howDoIWinModal={howDoIWinModal} onCloseModal={onCloseModal} />
                    } 
                    <div className={classes.__card_body_right_bottom}>
                        <Time size={25} style={{height: 'auto', marginRight: 10}} />
                        <p>
                        Pay attention, you will have <br />
                        {seconds} seconds to match each card.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

PageHeaderCard.propTypes = {
    seconds: PropTypes.number
}

export default PageHeaderCard
