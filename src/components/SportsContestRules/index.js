import React from 'react';
import PropTypes from 'prop-types';

import classes from './index.module.scss';
import Tick2 from '../../icons/Tick2';
import ContestRulesIcon from '../../icons/ContestRules';
import RightArrow from '../../assets/right-arrow.png';

function SportsContestRules(props) {
    const { basicRules = [], detailRules = [], img = '' } = props || {};
    return (
        <div className={classes.container_footer}>
            <div className={classes.container_footer_header}>
                <ContestRulesIcon />
                <div className={classes.container_footer_title}>
                    <h2>
                    Gameplay Rules
                    </h2>
                    <span className={classes.separator} />
                </div>
            </div>
            <div className={classes.container_footer_1}>
                <div className={classes.container_footer_header_1}>
                    {
                        basicRules?.length && basicRules?.map((rule, ind) =>
                            <p key={ind?.toString()}><Tick2 size={25} /> {rule}</p>
                        )
                    }
                </div>
                <div className={classes.container_footer_body}>
                    {
                        detailRules?.length && detailRules?.map((rule, ind) =>
                            <p key={ind?.toString()}><span /> {rule}</p>
                        )
                    }

                    <button>See Full Rules <img src={RightArrow} /></button>

                    <img src={img} className={classes.container_body_img} />
                </div>
            </div>
        </div>
    )
}

SportsContestRules.propTypes = {
    basicRules: PropTypes.array,
    detailRules: PropTypes.array,
    img: PropTypes.string,
}

export default SportsContestRules

