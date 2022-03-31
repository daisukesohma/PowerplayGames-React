import React from 'react';
import './Header2.scss';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Header2 = props => (
    <header className='__Header2 __mediam'>
        <div className='__container-3 __flex __sb __f1 __bold'>
            <Link to='/' className='__brand-logo'><img src={logo} alt='' /></Link>
            <ul className='__navlinks __flex'>
                <li><NavLink to='/powerplay-live-sports'>Powerplay Live Sports</NavLink></li>
                <li><NavLink to='/powerplya-lotto'>Powerplay Lotto</NavLink></li>
                <li><NavLink to='/about-us'>About Us</NavLink></li>
                <li><NavLink to='/partner-with-us'>Partner With Us</NavLink></li>
                <li><NavLink to='/sign-in' className='__ml-1'>Sign In</NavLink></li>
                <li><NavLink to='/get-started' className='__btn __large-btn __shadow-2 __bold __style-3'>Get Started</NavLink></li>
            </ul>
        </div>
    </header>
)

export default Header2;