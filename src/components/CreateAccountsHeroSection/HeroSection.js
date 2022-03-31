import React from 'react';
import styles from './herosection.styles.module.scss'

const HeroSection = ({title, subTitle, isBlack}) => (
    <section className={`${styles.root} ${isBlack ? styles.differntStyle : ''}`}>
        <div className={styles.heroSectionWrapper}>
            <h1 className={styles.title}>{title}</h1>
            <p className={`${styles.subTitle} text-white`}>{subTitle}</p>
        </div>
        <div className={styles.triangleShape}></div>
    </section>
)

export default HeroSection;