import React from 'react';
import ProptTypes from 'prop-types';

import classes from './pageHeader.module.scss';
import PageHeaderCard from '../PageHeaderCard';

import {useMediaQuery} from 'react-responsive';

function PageHeader(props) {
    const { title = '', reward = 0, seconds = 12, onThreeDotsClick = () => {} } = props || {};
    const isMobile = useMediaQuery({query: '(max-width: 414px)'});
    const isTablet = useMediaQuery({query: '(max-width: 768px)'});
    const isBigScreenTablet = useMediaQuery({query: '(max-width: 1024px)'});

    return (
        <div className={classes.__page_header}>
            {
                !isMobile && !isTablet && !isBigScreenTablet
                ?
                <div className={classes.__page_header_leftside}>
                    <h1>{title}</h1>
                    <div className={classes.__page_header_leftside_sub}>    
                        <p>
                            Win <span>${reward}</span> <small>CAD</small>
                        </p>
                        {
                            title == "Chase The Ace"
                            ?
                            <button className={classes.__page_header_btn_new}>See Contest Rules</button>
                            :
                            <button className={`__btn ${classes.__page_header_btn}`}>See Contest Rules</button>
                        }
                    </div> 
                </div>
                :
                <div className={classes.__page_header_leftside}>
                    <div className={classes.__page_header_leftside_mobile}>
                        <h1>{title}</h1>
                        <div className={classes.__page_header_leftside_sub}>    
                            <p>
                                Win <span>${reward}</span> <small>CAD</small>
                            </p>
                            {
                                title == "Chase The Ace"
                                ?
                                <button className={classes.__page_header_btn_new}>See Contest Rules</button>
                                :
                                <button className={`__btn ${classes.__page_header_btn}`}>See Contest Rules</button>
                            }
                        </div>
                    </div>
                    <div className={classes.__page_header_three_dots_mobile}>
                        <button className={classes.__page_header_three_dots} onClick={onThreeDotsClick}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            }
            
            <div className={classes.__page_header_rightside}>
                <PageHeaderCard title="Chase The Ace" />
            </div>
        </div>
    )
}

PageHeader.propTypes = {
    title: ProptTypes.string.isRequired,
    reward: ProptTypes.number.isRequired,
    seconds: ProptTypes.number,
}

PageHeader.defaultProps = {
    title: 'Page title',
    reward: 2000
}

export default PageHeader
