import React from 'react';
import './SelectTeamsPage.scss';
import Header2 from '../../components/Header2/Header2';

const SelectTeamsPage = props => (
    <div className='__SelectTeamsPage'>
        <Header2></Header2>
        <div className='__intoduction __background __center'>
            <div className='__mt-7 __mb-6'>
                <div className='__viewport-title __bolder'>2020 NFL <span className='__primary-color'>21's</span></div>
                <div className='__h5 __light'>Pick 8 Teams & use Powerplays to win!</div>
                <div className='__flex __m-a __flex-btns __mt-2 __mb-2'>
                    <button className='__btn __mediam __style-2 __f1 __white-color'>Gameplay Rules</button>
                    <button className='__btn __style-2 __mediam __f1 __white-color'>Prize Grid</button>
                </div>
                <div className='__h4'>
                    Can you pick and manage 8 <br />
                    teams to a final score of 21 ? <br />
                    <div className='__mt-s'>We'll give you <span className='__badge __inline-block'>$1000 cash</span> if you can!</div>
                </div>
            </div>
        </div>
        <div className='__main __flex-stretch'>
            <div className='__container-3 __mt-7 __mb-7 __f1'>
                <div className='__h3'>Select your teams</div>
                <div className='__h6 __flex __mb-2'>
                    <div>Select <b>8</b> teams</div>
                    <div className='__small-border __ml-s'></div>
                </div>
                <div className='__h5'>Search & Filter for your teams</div>
                <div className='__flex __mt-1'>
                    <input type='text' placeholder='Search...' className='__input-field __f1' />
                    <div className='__flex __outline-badges-wrapper __h6 __ml-1'>
                        <div className='__outline-badge __active'>AFC East</div>
                        <div className='__outline-badge'>AFC West</div>
                        <div className='__outline-badge'>NFC East</div>
                        <div className='__outline-badge'>NFC West</div>
                    </div>
                </div>
                <div className='__players-wrapper __p-1 __mt-2'>

                </div>
            </div>
            <div className='__right-panel'>

            </div>
        </div>
    </div>
)

export default SelectTeamsPage;