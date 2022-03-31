import React, { useState, useEffect, Fragment } from 'react';
import { Line } from 'rc-progress';

import classes from './MyGameCenter.module.scss';
import Billards from '../../icons/Billards';
import CasinoChips from '../../icons/CasinoChips';
import Stadium from '../../icons/Stadium';
import PowerPlayIcon from '../../assets/powerplay-icon.png';
import './table.scss';
import { Link } from 'react-router-dom';
import Info from '../../icons/Info';
import SuperBall from '../../icons/SuperBall';
import SuperBall2 from '../../icons/SuperBall2';
import Ball from '../../icons/Ball';
import ButtonDropdown from '../../components/ButtonDropdown2'
import MyGameCenterTableRow from './MyGameCenterTableRow';
import { useMediaQuery } from 'react-responsive';

const listItems = [
    { title: 'In Progress', value: 'in_progress' },
    { title: 'Up Coming', value: 'upcoming' },
    { title: 'Completed Game', value: 'com_game' }
]
const MyGameCenterTable = props => {
    // const [isMobileDevice, setMobileDevice] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(listItems[0].value)
    // const responsiveHandler = maxWidth => setMobileDevice(maxWidth.matches);
    const isMobileDevice = useMediaQuery({ query: '(max-width: 1024px)' })
    useEffect(() => {

        // const maxWidth = window.matchMedia("(max-width: 1200px)");
        // responsiveHandler(maxWidth);
        // maxWidth.addEventListener('change', responsiveHandler);
        // return () => maxWidth.removeEventListener('change', responsiveHandler);
    }, [])
    return (
        <div className='__table-wrapper __mb-6'>
            <div className='__flex'>
                <div className='__badges-wrapper __live-power-play-badges-wrapper __ml-a __text-in-one-line __mediam'>
                    <Link to='/' className='__outline-badge __active __f1'><Stadium />Live sports</Link>
                    <Link to='/' className='__outline-badge __f1'><Billards />Power Match</Link>
                    <Link to='/' className='__outline-badge __f1'><CasinoChips />Parlay Games</Link>
                    <Link to='/' className='__outline-badge __f1'>Show All</Link>
                </div>
            </div>

            <div className={`__h6 __mt-2 __mb-1 ${classes.__header}`}>
                My Entries
                 {
                    !isMobileDevice
                        ?
                        <div className={classes.__header_r}>
                            <Link>
                                In Progress
                            </Link>

                            <Link className={classes.active}>
                                Upcoming
                            </Link>

                            <Link>
                                Completed Games
                            </Link>
                        </div>
                        :
                        <ButtonDropdown elements={listItems} selected={listItems[0]} onChange={(e) => {
                            setSelectedMenu(e?.target?.value)
                        }} isActive styles={{ margin: '0 5px', border: 'none' }} />
                }
            </div>

            <div className={classes.table}>
                <div className={classes.table_main}>
                    <div className={classes.table_header}>
                        <div>Type</div>
                        <div>Contest</div>
                        <div>Entries (min)</div>
                        <div>Total Prizes</div>
                        <div className={classes.row_small}>Free Paid</div>
                        <div className={classes.row_small}>Status</div>
                        <div className={classes.row_small}>Action</div>
                    </div>
                    <div className={classes.table_body}>
                        <MyGameCenterTableRow
                            type={{ typeTitle: 'MLB Chase The Ace', typeDateTime: 'Oct 24, 2020 | 8:00PM ET', Icon: isMobileDevice ? <SuperBall2 /> : <Ball /> }}
                            contest='CTA $15k WTA '
                            entries={{ entriesTitle: <p>58,589 <span>of 200,000</span></p>, entiresValue: 40 }}
                            totalPrizes={{ totalPrize: 800, firstPlacePrize: 500 }}
                            freePaid={1000}
                            status={{ statusTitle: 'Starts in:', statusTime: '3:00:04' }}
                            isMobile={isMobileDevice}
                        />

                        <MyGameCenterTableRow
                            type={{ typeTitle: 'MLB Chase The Ace', typeDateTime: 'Oct 24, 2020 | 8:00PM ET', Icon: isMobileDevice ? <SuperBall2 /> : <Ball /> }}
                            contest='CTA $15k WTA '
                            entries={{ entriesTitle: <p>58,589 <span>of 200,000</span></p>, entiresValue: 40 }}
                            totalPrizes={{ totalPrize: 800, firstPlacePrize: 500 }}
                            freePaid={1000}
                            status={{ statusTitle: 'Starts in:', statusTime: '3:00:04' }}
                            isMobile={isMobileDevice}
                        />

                        <MyGameCenterTableRow
                            type={{ typeTitle: 'MLB Chase The Ace', typeDateTime: 'Oct 24, 2020 | 8:00PM ET', Icon: isMobileDevice ? <SuperBall2 /> : <Ball /> }}
                            contest='CTA $15k WTA '
                            entries={{ entriesTitle: <p>58,589 <span>of 200,000</span></p>, entiresValue: 40 }}
                            totalPrizes={{ totalPrize: 800, firstPlacePrize: 500 }}
                            freePaid={1000}
                            status={{ statusTitle: 'Starts in:', statusTime: '3:00:04' }}
                            isMobile={isMobileDevice}
                        />

                        <MyGameCenterTableRow
                            type={{ typeTitle: 'MLB Chase The Ace', typeDateTime: 'Oct 24, 2020 | 8:00PM ET', Icon: isMobileDevice ? <SuperBall2 /> : <Ball /> }}
                            contest='CTA $15k WTA '
                            entries={{ entriesTitle: <p>58,589 <span>of 200,000</span></p>, entiresValue: 40 }}
                            totalPrizes={{ totalPrize: 800, firstPlacePrize: 500 }}
                            freePaid={1000}
                            status={{ statusTitle: 'Starts in:', statusTime: '3:00:04' }}
                            isMobile={isMobileDevice}
                        />

                        <MyGameCenterTableRow
                            type={{ typeTitle: 'MLB Chase The Ace', typeDateTime: 'Oct 24, 2020 | 8:00PM ET', Icon: isMobileDevice ? <SuperBall2 /> : <Ball /> }}
                            contest='CTA $15k WTA '
                            entries={{ entriesTitle: <p>58,589 <span>of 200,000</span></p>, entiresValue: 40 }}
                            totalPrizes={{ totalPrize: 800, firstPlacePrize: 500 }}
                            freePaid={1000}
                            status={{ statusTitle: 'Starts in:', statusTime: '3:00:04' }}
                            isMobile={isMobileDevice}
                        />

                        <MyGameCenterTableRow
                            type={{ typeTitle: 'MLB Chase The Ace', typeDateTime: 'Oct 24, 2020 | 8:00PM ET', Icon: isMobileDevice ? <SuperBall2 /> : <Ball /> }}
                            contest='CTA $15k WTA '
                            entries={{ entriesTitle: <p>58,589 <span>of 200,000</span></p>, entiresValue: 40 }}
                            totalPrizes={{ totalPrize: 800, firstPlacePrize: 500 }}
                            freePaid={1000}
                            status={{ statusTitle: 'Starts in:', statusTime: '3:00:04' }}
                            isMobile={isMobileDevice}
                        />

                        <MyGameCenterTableRow
                            type={{ typeTitle: 'MLB Chase The Ace', typeDateTime: 'Oct 24, 2020 | 8:00PM ET', Icon: isMobileDevice ? <SuperBall2 /> : <Ball /> }}
                            contest='CTA $15k WTA '
                            entries={{ entriesTitle: <p>58,589 <span>of 200,000</span></p>, entiresValue: 40 }}
                            totalPrizes={{ totalPrize: 800, firstPlacePrize: 500 }}
                            freePaid={1000}
                            status={{ statusTitle: 'Starts in:', statusTime: '3:00:04' }}
                            isMobile={isMobileDevice}
                        />

                        <MyGameCenterTableRow
                            type={{ typeTitle: 'MLB Chase The Ace', typeDateTime: 'Oct 24, 2020 | 8:00PM ET', Icon: isMobileDevice ? <SuperBall2 /> : <Ball /> }}
                            contest='CTA $15k WTA '
                            entries={{ entriesTitle: <p>58,589 <span>of 200,000</span></p>, entiresValue: 40 }}
                            totalPrizes={{ totalPrize: 800, firstPlacePrize: 500 }}
                            freePaid={1000}
                            status={{ statusTitle: 'Starts in:', statusTime: '3:00:04' }}
                            isMobile={isMobileDevice}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MyGameCenterTable;