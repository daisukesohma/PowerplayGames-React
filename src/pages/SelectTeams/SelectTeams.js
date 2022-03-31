import React from 'react';
import Header from '../../components/Header/Header';
import './SelectTeams.scss';
import Document from '../../icons/Document';
import Trophy from '../../icons/Trophy';
import PowerplayIcon from '../../assets/powerplay-icon.png'
import Search from '../../icons/Search';
import Contest from '../../components/Contest/Contest';
import Scrollbar from '../../utility/Scrollbar';
import ContestRules from '../../components/ContestRules/ContestRules';
import Trash from '../../icons/Trash';
import Footer from '../../components/Footer/Footer';

const PowerBetContest = props => (
    <div className='__SelectTeams'>
        <Header />
        <div className='__intoduction __background __center'>
            <div className='__mt-6 __mb-6'>
                <div className='__viewport-title __bolder'>2020 NFL <span className='__primary-color'>PowerBet Contest</span></div>
                <div className='__h5 __light'>Pick 8 Teams & use <span className='__primary-color'>Powerplays</span> to boost your scores!</div>
                <div className='__flex __m-a __flex-btns __mt-2 __mb-4'>
                    <button className='__btn __mediam __style-2 __f1 __white-color'><Document className='__mr-s' />Contest Rules</button>
                    <button className='__btn __style-2 __mediam __f1 __white-color'><Trophy className='__mr-s' />Prize Grid</button>
                </div>
                <div className='__winner-prize __mb-1'>Turn $2,000 into $10,000 and win<span className='__badge __light-bold __ml-s'>$1000 cash</span></div>
                <div className='__h5 __small-line-height'>
                    Start with <span className='__primary-color'>$1,000 Powerplay money</span>, whoever turns
                    <div className='__mt-s'>the highest return, <span className='__primary-color'>will win $2,000 Real Money!</span></div>
                </div>
            </div>
        </div>
        <div className='__main __flex-stretch'>
            <div className='__container-3 __mt-7 __mb-7 __f1'>
                <div className='__flex __flex-start __sb'>
                    <div>
                        <div className='__h3'>Select your teams</div>
                        <div className='__h6 __flex __mb-2'>
                            <div>Select between 5 and 10 teams</div>
                            <div className='__small-border __ml-s'></div>
                        </div>
                    </div>
                    <div className='__h5 __flex'>Your <img className='__mr-s __ml-s __small' src={PowerplayIcon} alt='' /> Balance: $800</div>
                </div>
                <div className='__h5'>Search & Filter for your teams</div>
                <div className='__flex __mt-1'>
                    <label className='__f1 __relative __search-container'>
                        <Search />
                        <input type='text' placeholder='Search...' className='__input-field' />
                    </label>
                    <div className='__flex __outline-badges-wrapper __h6 __ml-1'>
                        <div className='__outline-badge __active'>AFC East</div>
                        <div className='__outline-badge'>AFC West</div>
                        <div className='__outline-badge'>NFC East</div>
                        <div className='__outline-badge'>NFC West</div>
                    </div>
                </div>
                <Scrollbar className='__players-wrapper __mt-2'>

                    <Contest
                        player1={{
                            name: 'Denver Broncos',
                            pointerSpeed: "+11/-108",
                            moneyLine: '+360',
                            wagar: '$200',
                            return: '$999,999'
                        }}
                        player2={{
                            name: 'Buffalo Bills',
                            pointerSpeed: "+11/-108",
                            moneyLine: '+360',
                            wagar: '$0',
                            return: '$0'
                        }}
                        score={{
                            over1: '44.5',
                            over2: '1.90',
                            under1: '44.5',
                            under2: '1.90',
                            wagar: '$0',
                            return: '$0',
                        }}
                    />
                    <Contest
                        player1={{
                            name: 'Washinghton Redskins',
                            pointerSpeed: "+11/-108",
                            moneyLine: '+360',
                            wagar: '$200',
                            return: '$999,999'
                        }}
                        player2={{
                            name: 'Arizona Cardinals',
                            pointerSpeed: "+11/-108",
                            moneyLine: '+360',
                            wagar: '$0',
                            return: '$0'
                        }}
                        score={{
                            over1: '44.5',
                            over2: '1.90',
                            under1: '4.50',
                            under2: '1.90',
                            wagar: '$0',
                            return: '$0',
                        }}
                    />
                    <Contest
                        player1={{
                            name: 'Denver Broncos',
                            pointerSpeed: "+11/-108",
                            moneyLine: '+360',
                            wagar: '$200',
                            return: '$999,999'
                        }}
                        player2={{
                            name: 'Buffalo Bills',
                            pointerSpeed: "+11/-108",
                            moneyLine: '+360',
                            wagar: '$0',
                            return: '$0'
                        }}
                        score={{
                            over1: '44.5',
                            over2: '1.90',
                            under1: '4.50',
                            under2: '1.90',
                            wagar: '$0',
                            return: '$0',
                        }}
                    />
                    <Contest
                        player1={{
                            name: 'Washinghton Redskins',
                            pointerSpeed: "+11/-108",
                            moneyLine: '+360',
                            wagar: '$200',
                            return: '$999,999'
                        }}
                        player2={{
                            name: 'Arizona Cardinals',
                            pointerSpeed: "+11/-108",
                            moneyLine: '+360',
                            wagar: '$0',
                            return: '$0'
                        }}
                        score={{
                            over1: '44.5',
                            over2: '1.90',
                            under1: '44.5',
                            under2: '1.90',
                            wagar: '$0',
                            return: '$0',
                        }}
                    />
                </Scrollbar>
                <ContestRules />
            </div>
            <div className='__right-panel'>
                <div className='__center __main __mt-7'>
                    <div className='__inline-block'>
                        <div className='__h5 __defaul-font-weight __mb-s'>Potential Return</div>
                        <div className='__badge __h3s __small-line-height __right-panel-badge'>$999,999</div>
                        <div className='__right-border __small __ml-a __mr-a __mt-2 __mb-1'></div>
                        <div className='__h5 __defaul-font-weight __mediam-line-height'>Total Wagered</div>
                        <div className='__h3s __light-bold'>$2,000</div>
                    </div>
                    <div className='__left __mt-5'>
                        <div className='__light-black __mediam __mb-s'>2/8 Teams Selected</div>
                        <Scrollbar className='__card'>
                            <div>
                                <div>
                                    <div className='__mediam'>HOU Texans</div>
                                    <div className='__light-black'>U  44.5  1.90</div>
                                </div>
                                <div className='__light-black __m-a __mt-0'> vs </div>
                                <div>
                                    <div className='__mediam'>NY Jets</div>
                                    <div className='__primary-color __center __mediam'>$999,999</div>
                                </div>
                                <div className='__trash __pointer __ml-1 __mt-a __mb-a __flex'>
                                    <Trash className='__m-a' />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div className='__mediam'>MIA Dolphins</div>
                                    <div className='__light-black'>To win  -110</div>
                                </div>
                                <div className='__ml-a'>
                                    <div className='__light-black'>Money Line</div>
                                    <div className='__primary-color __center __mediam'>$999,999</div>
                                </div>
                                <div className='__trash __pointer __ml-1 __mt-a __mb-a __flex'>
                                    <Trash className='__m-a' />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div className='__mediam'>IND Colts</div>
                                    <div className='__light-black'>-2.5  1.86</div>
                                </div>
                                <div className='__ml-a'>
                                    <div className='__light-black'>Point Spread</div>
                                    <div className='__primary-color __center __mediam'>$999,999</div>
                                </div>
                                <div className='__trash __pointer __ml-1 __mt-a __mb-a __flex'>
                                    <Trash className='__m-a' />
                                </div>
                            </div>
                            <div>
                                <div className='__mediam __light-black __mt-a __mb-a'>Not Selected</div>
                            </div>
                            <div>
                                <div className='__mediam __light-black __mt-a __mb-a'>Not Selected</div>
                            </div>
                            <div>
                                <div className='__mediam __light-black __mt-a __mb-a'>Not Selected</div>
                            </div>
                            <div>
                                <div className='__mediam __light-black __mt-a __mb-a'>Not Selected</div>
                            </div>
                            <div>
                                <div className='__mediam __light-black __mt-a __mb-a'>Not Selected</div>
                            </div>
                        </Scrollbar>
                        <form className='__mt-1 __right-form'>
                            <div className='__flex __flex-center'>
                                <label className='__flex __mr-4'>
                                    <input type='checkbox' className='__checkbox' defaultChecked={true} />
                                    <span className='__ml-s'>Bets</span>
                                </label>
                                <label className='__flex'>
                                    <input type='checkbox' className='__checkbox' />
                                    <span className='__ml-s'>Return</span>
                                </label>
                            </div>
                            <button className='__btn __mt-2 __mediam __shadow __default-font-weight __style-3'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <Footer isBlack={true} />
    </div>
)

export default PowerBetContest;