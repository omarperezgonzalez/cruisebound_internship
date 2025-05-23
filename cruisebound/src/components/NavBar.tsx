'use client'

import { Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    }
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [])
  
  return (
    <header 
      className={"w-full text-white z-[999] gap-15 absolute left-0 top-0 p-10 flex flex-row justify-between"}
    >
        <Link
            href="https://www.cruisebound.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 transform-all ease-in duration-300"
        >
          <Image
            src="/img/logo.png"
            alt="Logo Cruisebound"
            width={32}
            height={32}
            className="saturate-0 brightness-200 w-10"
          />
        </Link>

        <Link
            href="https://github.com/omarperezgonzalez/cruisebound_internship"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 transform-all ease-in duration-300"
        >
          <Github className='w-6 h-6 fill-white'/>
        </Link>
    </header>
  )
}