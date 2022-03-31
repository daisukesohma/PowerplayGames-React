import React, { useRef } from 'react';

const Scrollbar = ({ className, children }) => {
    let isDown = false;
    let startY;
    let scrollTop;
    const elm = useRef();
    
    const onMouseDown = e => {
        isDown = true;
        const slider = elm.current;
        startY = e.pageY - slider.offsetTop;
        scrollTop = slider.scrollTop;
    }
    const onIsDown = () => isDown = false;
    const onMouseMove = e => {
        if (!isDown) return;
        e.preventDefault();
        const slider = elm.current;
        const y = e.pageY - slider.offsetTop;
        const walk = (y - startY) * 3; //scroll-fast
        slider.scrollTop = scrollTop - walk;
    }
    return (
        <div className={`__scrollbar ${className}`}
            onMouseDown={onMouseDown}
            onMouseLeave={onIsDown}
            onMouseUp={onIsDown}
            ref={elm}
            onMouseMove={onMouseMove}
        >
            {children}
        </div>
    )
}

export default Scrollbar;