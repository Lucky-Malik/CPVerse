import React, { useEffect, useRef } from 'react';

const BackgroundEffect = ({ type, id, className }) => {
    const vantaRef = useRef(null);

    useEffect(() => {
        let vantaEffect = null;
        
        const initVanta = () => {
            if (!window.THREE) return;
            
            if (type === 'dots' && window.VANTA && window.VANTA.DOTS) {
                vantaEffect = window.VANTA.DOTS({
                    el: `#${id}`,
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
                    el: `#${id}`,
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

        const loadScripts = async () => {
            if (!document.getElementById('three-script')) {
                const threeScript = document.createElement('script');
                threeScript.id = 'three-script';
                threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
                document.head.appendChild(threeScript);
                await new Promise(r => threeScript.onload = r);
            }
            
            if (type === 'dots' && !document.getElementById('vanta-dots-script')) {
                const vantaScript = document.createElement('script');
                vantaScript.id = 'vanta-dots-script';
                vantaScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.dots.min.js';
                document.head.appendChild(vantaScript);
                await new Promise(r => vantaScript.onload = r);
            }
            
            if (type === 'net' && !document.getElementById('vanta-net-script')) {
                const vantaScript = document.createElement('script');
                vantaScript.id = 'vanta-net-script';
                vantaScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.net.min.js';
                document.head.appendChild(vantaScript);
                await new Promise(r => vantaScript.onload = r);
            }
            
            initVanta();
        };

        loadScripts();

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [type, id]);

    return <div id={id} ref={vantaRef} className={className}></div>;
};

export default BackgroundEffect;
