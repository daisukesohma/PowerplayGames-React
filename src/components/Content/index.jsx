import React from 'react';
import SideBar from './SideBar';
import Content from './Content';
import styles from './index.module.scss';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

const ContentWrapper = ({ contents, children, title }) => {
    return (
        <>
            <Header isStick={true} />
            <div className={styles.root}>
                <SideBar contents={contents} />
                <Content children={children} title={title} contents={contents} />
            </div>
            <Footer />
        </>
    )
}

export default ContentWrapper;