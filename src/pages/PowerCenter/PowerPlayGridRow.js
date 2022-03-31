import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PowerPlayIcon from '../../assets/powerplay-icon.png';
import Info from '../../icons/Info';
import './PowerPlayGridRow.scss';

const PowerPlayGridRow = props => props.isMobileDevice ? <div className='__power-grid-row-card __relative'><TableRow {...props} /></div> : <TableRow {...props} />


const TableRow = ({ type, Icon, date, time, contest, entries, totalEntries, prize, pointsRequired,link }) => {
    const percentage = `${((entries / totalEntries) * 100).toFixed()}%`;
    const addCommas = entry => entry.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return (
        <Fragment>
            <div className='__support __flex __relative'>
                <span className='__icon __relative'><span></span><Icon className='__relative' /></span>
                <div className='__f1 __main'>
                    <div>
                        <span className='__title __h6'>{contest}</span>
                        <span className='__primary-color __bold __mediam __block __hide-only-on-large'> {type} </span>
                    </div>
                    <div className='__date __ml-a __light-grey __very-small-on-large __block-on-large __flex'>
                        <span> {date} </span>
                        <span className='__hide-on-large __vertical-line'> | </span>
                        <span className='__block-on-large'></span> {time}
                        <Info className='__info-icon __relative __ml-s' />
                    </div>
                </div>
            </div>
            <div className='__flex __h6 __primary-color __bold __hide-on-large __left'> {type} </div>
            <div className='__entries'>
                <div>
                    <span className='__filled-entries __h6 __mediam-on-large'>{addCommas(entries)} </span>
                    <span className='__dark-white-color __very-small-on-large'> of {addCommas(totalEntries)}</span>
                </div>
                <div className='__flex'>
                    <span className='__light-grey __mr-s __very-small-on-large'>{percentage} FULL </span>
                    <span className='__bar'><span className='__block __primary' style={{ width: percentage }}></span></span>
                </div>
            </div>
            <div className='__flex __prize __column __flex-start'>
                <div className='__h6 __mediam-on-large'>{+prize ? `$${prize}` : prize} </div>
                <div className='__very-small-on-large __light-grey'><span className='__hide-only-on-large'>TOTAL</span> PRIZES</div>
            </div>
            <Link to={link} className='__flex  __h5 __small-on-large __pointsRequired'>
                {pointsRequired ? (
                    <div className='__flex'>
                        <span className='__hide-on-large'>$</span>
                        {pointsRequired}
                        <img src={PowerPlayIcon} alt='' className='__ml-s' />
                        <div className='__chevron __-right __hide-only-on-large'></div>
                    </div>
                ) : <div className='__flex __chevron __-right'>Free Entry</div>}
            </Link>
        </Fragment>
    )
}

export default PowerPlayGridRow;