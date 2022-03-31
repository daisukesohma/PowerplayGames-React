import React from 'react';
import styles from './sidebar.module.scss';

const SideBar = ({contents}) => {
    return (
        <ul className={styles.root}>
            {contents.map(({title, index}) => (
                <li>
                    <a onClick={() => document.getElementById(title.toLocaleLowerCase().replaceAll(' ', '-')).scrollIntoView()} key={index}>{title}</a>
                </li>
            ))}
        </ul>
    )
}

export default SideBar;