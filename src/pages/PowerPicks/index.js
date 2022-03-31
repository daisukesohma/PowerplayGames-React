import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import Headers from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer/Footer'
import PowerPickCard from '../../components/PowerpickCard'
import ButtonDropdown from '../../components/ButtonDropdown'
import classes from './index.module.scss'
import PowerPickInfoCard from '../../components/PowerPickInfoCard'
import PlayerImage from '../../assets/player.png'
import Button from '../../components/Button'
import AngleIcon from '../../icons/AngleIcon'
import Cell from '../../components/Cell'

const listItems = [
    { title: 'Football', value: 'football' },
    { title: 'Basketball', value: 'basketball' }
]

function PowerPicksPage() {
    const [selected, setSelected] = useState('')
    const isTableOrMobile = useMediaQuery({query: '(max-width: 1224px)'})
    return (
        <>
            <Headers />
            <div className={classes.wrapper}>
                <div className={classes.page_left}>
                    <div className={classes.header}>
                        <div className={classes.header_top}>
                            <h1><span className={classes.h1_orange}>Power</span><span>Picks</span></h1>
                            <p>Power up your sports bets with our proven winning system!</p>
                        </div>

                        <div className={classes.header_bottom}>
                            {
                                !isTableOrMobile ?
                                    <>
                                        <PowerPickCard shadow>
                                            <p>Spread</p>
                                            <span>54%</span>
                                        </PowerPickCard>

                                        <PowerPickCard shadow>
                                            <p>Winner</p>
                                            <span>54%</span>
                                        </PowerPickCard>

                                        <PowerPickCard shadow>
                                            <p>Over/Under</p>
                                            <span>54%</span>
                                        </PowerPickCard>
                                    </>
                                    :
                                    <div className={classes.header_bottom_mobile}>
                                    <PowerPickCard shadow styles={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', fontSize: '16px'}}>
                                        <div>
                                            <p>Spread</p>
                                            <span>54%</span>
                                        </div>

                                        <div>
                                            <p>Winner</p>
                                            <span>54%</span>
                                        </div>

                                        <div>
                                            <p>Over/Under</p>
                                            <span>54%</span>
                                        </div>
                                        </PowerPickCard>
                                    </div>    
                            }
                        </div>
                    </div>

                    <div className={classes.content_left}>
                        <div className={classes.content_header}>
                            <div className={classes.content_header_left}>
                                <p>Show Decimal Odds</p>
                                {
                                    isTableOrMobile &&
                                        <p>Confidence Levels</p>
                                }
                            </div>

                            <div className={classes.content_header_right}>
                                <ButtonDropdown elements={listItems} selected={listItems[0]} onChange={(e) => {
                                    setSelected(e?.target?.value)
                                    }} isActive styles={{margin: '0 5px'}} />
                                
                                <Button title="NHL" styles={{
                                    width: isTableOrMobile ? '98%' : '90px',
                                    backgroundColor: '#303133',
                                    border: '1px solid #fff',
                                    borderRadius: '12px', margin: '0 4px',
                                    margin: '0 3px'
                                }} />

                                <Button title="NBA" styles={{
                                    width: isTableOrMobile ? '98%' : '90px',
                                    backgroundColor: '#303133',
                                    border: '1px solid #fff',
                                    borderRadius: '12px', margin: '0 4px',
                                    margin: '0 3px'
                                }} />

                                <Button title="NFL" styles={{
                                    width: isTableOrMobile ? '98%' : '90px',
                                    backgroundColor: '#303133',
                                    border: '1px solid #fff',
                                    borderRadius: '12px', margin: '0 4px',
                                    margin: '0 3px'
                                }} />

                                <Button title="MLB" styles={{
                                    width: isTableOrMobile ? '98%' : '90px',
                                    backgroundColor: '#303133',
                                    border: '1px solid #fff',
                                    borderRadius: '12px', margin: '0 4px',
                                    margin: '0 3px'
                                }} />
                            </div>
                        </div>
                    
                        <div className={classes.content_body}>
                            {
                                !isTableOrMobile ?
                                    <PowerPickCard styles={{width: '100%'}}>
                                        <PowerPickInfoCard
                                            showHeader
                                            game1={{
                                                isCell: true,
                                                cellTitle: "Bengals +3.5",
                                                highCell: true,
                                             }}
                                            game2={{
                                                isCell: true,
                                                cellTitle: "Saints to Win",
                                                mediumCell: true,
                                            }}
                                            game3={{
                                                isCell: true,
                                                cellTitle: "U 45.5",
                                                veryLowCell: true,
                                            }}
                                        />
                                        <PowerPickInfoCard
                                            game1={{
                                                isPowerUp: true,
                                             }}
                                             game2={{
                                                isPowerUp: true,
                                             }}
                                             game3={{
                                                isPowerUp: true,
                                             }}
                                        />
                                        <PowerPickInfoCard
                                            game1={{
                                                isPowerUp: true,
                                             }}
                                             game2={{
                                                isPowerUp: true,
                                             }}
                                             game3={{
                                                isPowerUp: true,
                                             }}
                                        />
                                    </PowerPickCard>
                                    :
                                    <>
                                        <PowerPickInfoCard
                                            game1={{
                                                isCell: true,
                                                cellTitle: "Bengals +3.5",
                                                highCell: true,
                                            }}
                                            game2={{
                                                isCell: true,
                                                cellTitle: "Saints to Win",
                                                mediumCell: true,
                                            }}
                                            game3={{
                                                isCell: true,
                                                cellTitle: "U 45.5",
                                                veryLowCell: true,
                                            }}
                                        />
                                        <PowerPickInfoCard
                                            game1={{
                                                isPowerUp: true,
                                             }}
                                             game2={{
                                                isPowerUp: true,
                                             }}
                                             game3={{
                                                isPowerUp: true,
                                             }}
                                        />
                                        <PowerPickInfoCard
                                            game1={{
                                                isPowerUp: true,
                                             }}
                                             game2={{
                                                isPowerUp: true,
                                             }}
                                             game3={{
                                                isPowerUp: true,
                                             }}
                                        />
                                    </>
                            }
                        </div>
                        <div className={classes.content_body_footer}>
                            <strong>Log in to reveal <span>More Picks!</span> </strong>
                            <Button title="Log in" icon={null} block style={{width: isTableOrMobile ? '80%' : '30%', height: '52px'}} />

                            {
                                !isTableOrMobile &&
                                <div className={classes.content_body_footer_bottom}>
                                    <AngleIcon style={{height: 'auto', position: 'absolute', bottom: '10px', left: '20px', zIndex: '-1'}} />
                                    <img src={PlayerImage} width={316} height={330} />
                                </div>
                            }
                        </div>
                    </div>
                </div>

                {
                    !isTableOrMobile &&
                        <div className={classes.page_sidebar}>
                        <Sidebar styles={{width: '18%'}}>
                            <div className={classes.sidebar}>
                                <h2>Confidence Level</h2>
                                <Cell high text="HIGH" styles={{ display: 'flex', justifyContent: 'center', padding: 0, margin: 0 }} />
                                <Cell medium text="MEDIUM" styles={{ display: 'flex', justifyContent: 'center', padding: 0, margin: 0 }} />
                                <Cell low text="LOW" styles={{ display: 'flex', justifyContent: 'center', padding: 0, margin: 0 }} />
                                <Cell veryLow text="VERY LOW" styles={{ display: 'flex', justifyContent: 'center', padding: 0, margin: 0 }} />
                            </div>
                        </Sidebar>
                        </div>
                }
            </div>
            <Footer isBlack />
        </>
    )
}

export default PowerPicksPage
