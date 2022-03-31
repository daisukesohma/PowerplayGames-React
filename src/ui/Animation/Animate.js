import React, { useEffect, useMemo, useRef } from 'react';
import './Animate.scss';

const Animate = ({ className, children }) => {
    const elm = useRef();
    const onScroll = () => {
        if(!elm.current) return
        const { offsetTop, offsetHeight, classList } = elm.current;

        const { scrollY, innerHeight } = window;
        if (!classList.contains('active') && scrollY >= offsetTop - innerHeight + 200 && scrollY <= offsetTop + offsetHeight) {
            classList.add('active');
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        onScroll();
    }, [])
    return (
        <div className={`__Animate active`} ref={elm}>
            {useMemo(() => children, [])}
        </div>
    )
}

export default Animate;