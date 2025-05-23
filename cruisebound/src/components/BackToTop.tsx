'use client';
import { useState, useEffect } from 'react';
import { lenis } from './SmoothScrolling'; //Used to scroll to top using lenis
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            //Show button when scrollY > 300px
            setShow(window.scrollY > 300);
        };

        //Add scroll listener when component mounts
        window.addEventListener('scroll', handleScroll);
        //Clean up on unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        //Used lenis scrollTo function, if not it will use the native one
        if (lenis) {
            lenis.scrollTo(0);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    //If we are 0 - 300px it will not render
    if (!show) return null;

    return (
        <button
          onClick={scrollToTop}
          className="fixed md:block hidden cursor-pointer bottom-6 right-6 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors"
          aria-label="Back to top"
        >
            <ArrowUp className='w-5 h-5'/>
        </button>
    );
};