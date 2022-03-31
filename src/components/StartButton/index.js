import React from 'react';
import classes from './startButton.module.scss';

const StartButton = (props) => {
    const {onStart = () => {}} = props || {};
    return (
        <>
            <div className={classes.__start_button_outer}>
                <div className={classes.__start_button} onClick={onStart}>
                    <p className={classes.__start_button_text}>Start</p>
                </div>
            </div>
        </>
    );
};

export default StartButton;