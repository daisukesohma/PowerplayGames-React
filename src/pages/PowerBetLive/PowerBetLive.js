import React, { Fragment } from 'react';
import './PowerBetLive.scss'
import Header from '../../components/Header/Header';
import Document from '../../icons/Document';
import Trophy from '../../icons/Trophy';
import Munch from '../../icons/Munch';
import playerImage from '../../assets/bitmap@2x.png';
import CheckIcon from '../../icons/CheckIcon';
import Scrollbar from '../../utility/Scrollbar';
import LiveGame from '../../components/LiveGame/LiveGame';
import ContestRules from '../../components/ContestRules/ContestRules';
import Trash from '../../icons/Trash';
import Footer from '../../components/Footer/Footer';

const PowerBetLive = props => {
    return (
        <Fragment>
            <Header />
            <div className='__PowerBetLive __flex-stretch'>
                <div className='__left __f1 __container-3'>
                    <div className='__center __introduction __column __ai'>
                        <div className=' __mb-2'>
                            <div className='__h2 __bolder __mt-3'>2020 NFL <span className='__primary-color'>PowerBet Contest</span></div>
                            <div className='__flex __m-a __intoduction-btns __mt-1 __mb-4'>
                                <button className='__btn __mediam __style-2 __f1 __white-color'><Document className='__mr-s' />Contest Rules</button>
                                <button className='__btn __style-2 __mediam __f1 __white-color'><Trophy className='__mr-s' />Prize Grid</button>
                                <button className='__btn __style-2 __mediam __f1 __white-color'><Munch className='__mr-s' />Prize Grid</button>
                            </div>
                        </div>
                        <img src={playerImage} alt='' className='__ml-a __mr-2 __mt-a __relative __player-image' />
                    </div>
                    <div className='__main'>
                        <div className='__flex __sb'>
                            <div className='__title __primary-color __light-bold'>Live Game</div>
                            <div className='__Winning-Bets'>
                                <div className='__h5'>Winning Bets</div>
                                <div className='__flex __mt-1'>
                                    <span className='__bold __mr-1'>
                                        <span className='__h5 __primary-color'>3</span>
                                        <span className='__mediam'>/8</span>
                                    </span>
                                    <CheckIcon />
                                    <CheckIcon />
                                    <CheckIcon />
                                    <div className='__circle'></div>
                                    <div className='__circle'></div>
                                    <div className='__circle'></div>
                                    <div className='__circle'></div>
                                    <div className='__circle'></div>
                                    <div className='__circle'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Scrollbar className='__players-wrapper __relative'>
                        <LiveGame
                            player1={{
                                name: 'Denver Broncos',
                                moneyLine: '+360',
                                wagar: '$25,000',
                                return: '$76,000',
                                points: '14'
                            }}
                            player2={{
                                name: 'Buffalo Bills',
                                moneyLine: '+360',
                                wagar: '$0',
                                return: '$0',
                                points: '12'
                            }}
                            score={{
                                under: '44.5',
                                wagar: '$10,000',
                                return: '$20,0000',
                            }}
                        />
                        <LiveGame
                            player1={{
                                name: 'Denver Broncos',
                                moneyLine: '+360',
                                wagar: '$25,000',
                                return: '$76,000',
                                points: '14'
                            }}
                            player2={{
                                name: 'Buffalo Bills',
                                moneyLine: '+360',
                                wagar: '$0',
                                return: '$0',
                                points: '12'
                            }}
                            score={{
                                under: '44.5',
                                wagar: '$10,000',
                                return: '$20,0000',
                            }}
                        />
                        <LiveGame
                            player1={{
                                name: 'Denver Broncos',
                                moneyLine: '+360',
                                wagar: '$25,000',
                                return: '$76,000',
                                points: '14'
                            }}
                            player2={{
                                name: 'Buffalo Bills',
                                moneyLine: '+360',
                                wagar: '$0',
                                return: '$0',
                                points: '12'
                            }}
                            score={{
                                under: '44.5',
                                wagar: '$10,000',
                                return: '$20,0000',
                            }}
                        />
                        <LiveGame
                            player1={{
                                name: 'Denver Broncos',
                                moneyLine: '+360',
                                wagar: '$25,000',
                                return: '$76,000',
                                points: '14'
                            }}
                            player2={{
                                name: 'Buffalo Bills',
                                moneyLine: '+360',
                                wagar: '$0',
                                return: '$0',
                                points: '12'
                            }}
                            score={{
                                under: '44.5',
                                wagar: '$10,000',
                                return: '$20,0000',
                            }}
                        />
                        <LiveGame
                            player1={{
                                name: 'Denver Broncos',
                                moneyLine: '+360',
                                wagar: '$25,000',
                                return: '$76,000',
                                points: '14'
                            }}
                            player2={{
                                name: 'Buffalo Bills',
                                moneyLine: '+360',
                                wagar: '$0',
                                return: '$0',
                                points: '12'
                            }}
                            score={{
                                under: '44.5',
                                wagar: '$10,000',
                                return: '$20,0000',
                            }}
                        />
                    </Scrollbar>
                    <ContestRules />
                </div>
                <div className='__powerbet-live-right'>
                    <div className='__main __center __relative'>
                        <div className='__live-rank __flex __absolute'>
                            Live Rank
                            <span className='__h5 __bolder __ml-a'>23rd</span>
                        </div>
                        <div className='__main-title-wrapper __p-1'>
                            <div className='__h5 __mt-1'>Winning</div>
                            <div className='__h2 __bolder __primary-color'>$245,000</div>
                        </div>
                        <div className='__right-border __small __ml-a __mr-a __mt-3 __mb-1'></div>
                        <div className='__h5 __defaul-font-weight __mediam-line-height'>Total Wagered</div>
                        <div className='__h3s __light-bold'>$2,000</div>
                        <div className='__left __mt-3'>
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer isBlack={true} />
        </Fragment>
    )
}

export default PowerBetLive;