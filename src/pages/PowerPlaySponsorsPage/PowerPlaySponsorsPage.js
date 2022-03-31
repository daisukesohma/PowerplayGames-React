import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './PowerPlaySponsorsPage.scss';

const PowerPlaySponsorsPage = props => (
    <div className='__PowerPlaySponsorsPage __light-bold'>
        <div className='__viewport __ai __viewport-1'>
            <Header btnBorderStyle={true} />
            <div className='__center __mt-a'>
                <div className='__viewport-title __primary __h5-on-mediam'>Power Your Brand</div>
                <div className='__mediam __mt-3 __m-a __viewport-subtitle'>
                    <div className='__mb-1'>Not only do our games defy reality, but they also build powerful customer engagement opportunities for your brand.</div>
                    <div className='__hide-on-mediam'>Whether you are a for-profit business or a not-for-profit charity or foundation, our games will meet your brand or fundraising goals.</div>
                </div>
                <div className='__italic __primary-color __h5 __mt-2 __mb-2 __mediam-on-mediam __are-you-ready'>Are you ready to defy reality?</div>
                <Link to='/power-play-sponsors/sponsor-a-contest' className='__btn __PowerPlaySponsorsPage-btn __h5 __mb-4 __inline-block'>Let's go!</Link>
            </div>
        </div>
        <div className='__background-2 __background __dark-white-color __relative'>
            <div className='__container-2 __mt-4 __relative'>
                <div className='__h3 __primary-color __center __mediam-on-mediam __title'>We offer a no cost, no risk solution <br /> for all our promotional contests. </div>
                <div className='__main __ml-a __mediam __hide-on-small __dark-white-color __default-size-on-mediam'>
                    <div className='__mt-3 __mb-4'>
                        <div>With traditional promotional contests there is risk and uncertainty…</div>
                        <div className='__mt-2'>- Will the contest meet your brands goals?</div>
                        <div>- Will you raise enough funds to cover set-up expenses?</div>
                    </div>
                    <div>
                        <div>Sponsor a contest with us and we will remove the risk and uncertainty.</div>
                        <div className='__mt-2 __mb-2'>You choose the game type, provide prizes, and your contest can be launched in a matter of days.</div>
                        <div>We can also offer insured prizes <span className='__primary-color'>up to $100,000 USD</span> for some contests.</div>
                    </div>
                </div>
                <div className='__main __show-on-small __mb-7'>
                    <ul className='__unordered-list __mt-2 __mb-2 __default-size-on-mediam'>
                        <li>Our games build powerful customer engagement opportunities for your brand.</li>
                        <li>No matter your business, our games will meet your brand or fundraising goals.</li>
                    </ul>
                </div>
                <div className='__h5 __italic __ready-to-play-game __m-a __mt-3 __primary-color __hide-on-mediam'>Are you ready to Power your brand with no-cost, no-risk promotional contest?</div>
                <div className='__center __h5 __mt-2 __mb-3'>
                    <Link to='/power-play-sponsors/sponsor-a-contest' className='__hide-on-mediam __btn __PowerPlaySponsorsPage-btn'>Let's go</Link>
                </div>
            </div>
        </div>
        <div className='__background __background-3 __to-left'>
            <div className='__container-2 __mt-4'>
                <div className="__m-a __center">
                    <div className='__h3 __primary-color __mb-s __h5-on-mediam __uppercase-on-small'>Power-up Your Revenue</div>
                    <div className='__default-size-on-mediam'>Our promotional contests will result in amplified brand awareness, <div className='__hide-on-small'>but in addition we provide revenue generating opportunities:</div> </div>
                </div>
                <div className='__main __custom-bullets-wrapper __mt-1'>
                    <div>
                        <div>
                            <div className='__h4 __primary-color __mt-1 __h6-on-mediam'>Ad revenue</div>
                            <div>Google ads can be <span className='__show-only-on-small'>used</span> <span className='__hide-on-small'>added to your game</span> <br className='__show-on-small' /> to generate revenue.</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className="__h4 __primary-color __mt-1 __h6-on-mediam">Powers revenue</div>
                            <div>Powers <span className='__hide-on-small'>are live-game boosters that</span> can be purchased by players.</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className='__h4 __primary-color __mt-1 __h6-on-mediam'>Subscription sign-ups</div>
                            <div><span className='__hide-on-small'>If you sell a monthly subscription, </span> we can guide players to sign-up <span className='__show-on-small'>a subscription</span> during game play.</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className='__h4 __primary-color __mt-1 __h6-on-mediam'>Pay-to-Play Revenue</div>
                            <div>You can even sponsor one of our pay-to-play games <span className='__hide-on-small'>and the rake revenue is shared with you</span> and <span className='__show-on-small'>split the raka</span>.</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className='__h4 __primary-color __mt-1 __h6-on-mediam'>Donation revenue</div>
                            <div>
                                <span className='__show-on-small'>Donations are captured during the entry process and during live game-play.</span>
                                <span className='__hide-on-small'>For charities, we push people to donate fund during the entry process and during live game-play.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='__center __h5 __italic __mt-2 __primary-color __hide-on-small'>Are you ready to Power Up your brand?</div>
                <div className='__center __h5 __mt-2 __mb-3 ____PowerPlaySponsorsPage-btn-wrapper'>
                    <Link to='/power-play-sponsors/sponsor-a-contest' className='__btn __PowerPlaySponsorsPage-btn'>Let's go</Link>
                </div>
            </div>
        </div>
        <div className='__background __background-4'>
            <div className='__container-2 __mt-4'>
                <div className='__h4 __center __primary-color __uppercase-on-small __h5-on-mediam __h5-on-mediam'>It's easy to sponsor a contest</div>
                <div className='__center-on-small __subtitle __mt-4'>Our goal is to make launching a promotional contest super easy and rewarding for out clients</div>
                <div className='__main __mt-1 __ml-a'>
                    <div className='__custom-bullets-wrapper __mt-1 __mb-4'>
                        <div>
                            <div>
                                <div className='__h4 __primary-color __h6-on-mediam __mt-1'>Start by Reaching Out</div>
                                <div className='__default-size-on-small'>Contact us to discuss your goals <span className='__hide-on-small'>and review potential game types that tie into your brand</span>.</div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className='__h4 __primary-color __mt-1 __h6-on-mediam'>Preliminary Design</div>
                                <div>We will provide you <span className='__hide-on-small'>with a free</span> preliminary <span className='__hide-on-small'>game</span> design for your review and approval.</div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className='__h4 __primary-color __mt-1 __h6-on-mediam'>Launch Marketing</div>
                                <div>Launch the marketing campaign to drive people to your contest.</div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className='__h4 __primary-color __mt-1 __h6-on-mediam'>Contest Go-Live</div>
                                <div>Check results on our analytics page <span className='__hide-on-small'>to see how your game is performing in terms of players, revenue, brand engagement, and much more</span>.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='__h5 __center __primary-color __italic __footer-subtitle __small-on-small'>Are you ready to experience <span className='__hide-on-small'>the power of</span> our <span className='__hide-on-small'>promotional</span> contests?</div>
            </div>
            <div className='__center __h5 __mt-2 __mb-3 ____PowerPlaySponsorsPage-btn-wrapper'>
                <Link to='/power-play-sponsors/sponsor-a-contest' className='__btn __PowerPlaySponsorsPage-btn'>Let's go</Link>
            </div>
        </div>

        <Footer />
    </div>
)

export default PowerPlaySponsorsPage;