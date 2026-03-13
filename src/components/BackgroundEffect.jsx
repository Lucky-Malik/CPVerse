import React, { useEffect, useRef } from 'react';

const BackgroundEffect = ({ type, id, className }) => {
    const vantaRef = useRef(null);

    useEffect(() => {
        let vantaEffect = null;
        
        const initVanta = () => {
             if (type === 'dots' && window.VANTA && window.VANTA.DOTS) {
                vantaEffect = window.VANTA.DOTS({
                    el: vantaRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 4.00,
                    scaleMobile: 1.00
                });
            } else if (type === 'net' && window.VANTA && window.VANTA.NET) {
                vantaEffect = window.VANTA.NET({
                    el: vantaRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    color: 0x8b5cf6,
                    backgroundColor: 0x0f172a,
                    points: 10.00,
                    maxDistance: 25.00,
                    spacing: 50.00
                });
            }
        };

        // Small delay to ensure scripts are parsed
        const timer = setTimeout(() => {
            initVanta();
        }, 100);

        return () => {
            clearTimeout(timer);
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [type]);

    return <div id={id} ref={vantaRef} className={className}></div>;
};

export default BackgroundEffect;
