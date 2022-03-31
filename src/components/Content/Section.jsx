import React, { useState } from 'react';
import styles from "./section.module.scss";

const Section = ({ title, content, pageTitle }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <section id={title.toLowerCase().replaceAll(' ', '-')} className={`${styles.root} ${isOpen ? styles.active : ''}`}>
            <button className={styles.titleButton} onClick={() => setIsOpen(oldState => !oldState)}>{title}</button>
            <div className={styles.main}>
                <h1 className={styles.pageTitle}>{pageTitle}</h1>
                <h2 id={title}>{title}</h2>
                {content}
            </div>
        </section>
    )
}

export default Section;