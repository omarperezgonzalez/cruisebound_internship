'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

//Declared here to being used by other components
let lenis : Lenis;

export default function SmoothScrolling() {
  useEffect(() => {
    //Lenis smootch scroll initialization
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    //Animation frame loop to update lenis
    function raf(time : number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    //Clean up on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  //No render here, just lenis instance created
  return null;
};

// Export lenis instance for use in other components
export { lenis };