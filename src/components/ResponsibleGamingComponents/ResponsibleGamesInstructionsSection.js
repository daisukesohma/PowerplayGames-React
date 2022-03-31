import React from 'react';
import styles from './instructions.module.scss';
import ResponsibleGames from './ResponsibleGames';

const ResponsibleGamesInstructionsSection = props => {
    return (
        <section className={styles.root}>
            <h1 className={styles.title}></h1>
            {ResponsibleGames.map(({title, content}, index) => (
                <section key={index} id={title.toLocaleLowerCase().replaceAll(' ', '-')}>
                    <h2>{title}</h2>
                    {content}
                </section>
            ))}
        </section>
    )
}

export default ResponsibleGamesInstructionsSection;