import React, { Fragment } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './SponserAContestPage.scss';
import Phone from '../../icons/Phone'

const SponserAContestPage = props => (
    <Fragment>
        <Header btnBorderStyle={true} />
        <div className='__SponserAContestPage __background __viewport __ai __flex-center'>
            <div className='__h3 __bolder __title __primary __mb-2 __mt-4 __h5-on-mediam'>Power Up My Brand!</div>
            <form className='__SponserAContestPage-form'>
                <div className='__bold __h5 __mr-a __full-width'>Please Fill the Form</div>
                <input type='text' className='__text-field' placeholder='Your name' />
                <input type='text' className='__text-field' placeholder='Your company name' />
                <input type='email' className='__text-field' placeholder='Your e-mail' />
                <input type='number' className='__text-field' placeholder='Your phone number' />
                <textarea className='__text-field __full-width' placeholder='Describe your company' rows='7'></textarea>
                <button className='__btn __full-width __m-a __mt-1 __style-2 __primary-color __h5'>
                    <span className='__hide-on-small'>Submit</span>
                    <span className='__show-on-small'>Power Up</span>
                </button>
            </form>
            <div className='__flex-stretch __mt-3 __mb-4 __flex-center __contact-us'>
                <div className='__h5 __default-size-on-small'>Or Call Us Now!</div>
                
                <div className='__light-dark-text __ml-6 __flex-stretch'>
                    <Phone />
                    <div>
                        <div className='__italic __h5 __ml-s __default-size-on-small'>1-844-268-1573</div>
                        <div className='__right __dark-white-color __shade-2 __mt-s'>toll free</div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </Fragment>
)


export default SponserAContestPage;