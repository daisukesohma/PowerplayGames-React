import React from 'react';
import './Sidebar.scss';
import Terms from './Terms';

const SideBar = () => {
    return (
        <ul className='terms-sidebar-section'>
            {Terms.map(({title, index}) => (
                <li>
                    <a onClick={() => document.getElementById(title.toLocaleLowerCase().replaceAll(' ', '-')).scrollIntoView()} key={index}>{title}</a>
                </li>
            ))}
        </ul>
    )
}

export default SideBar;