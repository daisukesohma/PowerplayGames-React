import React from 'react';
import styles from './index.module.scss';
import SideBar from './SideBar';
import TermsSection from './TermsSection.jsx';

const TermsAndConditions = () => {
    return(
        <div className={`${styles.root} Terms-and-Conditions-Page`}>
            <SideBar />
            <TermsSection />
        </div>
    )
}

export default TermsAndConditions;