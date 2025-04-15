'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import logo from '../../../../../public/client/logo.svg';
import Register from './register';

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const handleSignupClick = () => {
    setIsRegisterOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <div className="box relative z-50 overflow-x-hidden w-full">
      <div className="w-full h-[100px] py-6 inline-flex justify-between items-center mx-auto px-4">
        <Image src={logo} alt="logo" width={182} height={64} className="w-[182px] h-16 cursor-pointer hover:opacity-80 transition-opacity" />
        
        {/* Hamburger Menu Button - Only visible on mobile */}
        <button 
          className="lg:hidden flex flex-col justify-center items-center gap-1.5 z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-[#006198] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-[#006198] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-[#006198] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex justify-start items-center gap-6">
          <div 
            onClick={handleSignupClick}
            className="h-11 px-6 py-2 bg-[#006198] rounded-lg flex justify-center items-center gap-2 cursor-pointer hover:bg-[#004d7a] transition-colors"
          >
            <div className="text-center justify-start text-white text-lg font-medium font-['Inter'] leading-[28.80px]">Register</div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`lg:hidden fixed top-[100px] left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-in-out z-50 ${
            isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
        >
          <div className="flex flex-col p-4 gap-4">
            <div 
              onClick={handleSignupClick}
              className="h-11 bg-[#006198] rounded-lg flex justify-center items-center cursor-pointer hover:bg-[#004d7a] transition-colors"
            >
              <div className="text-center text-white text-lg font-medium font-['Inter'] leading-[28.80px]">Register</div>
            </div>
          </div>
        </div>
      </div>

      {/* Register Modal */}
      <Register 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)} 
      />
    </div>
  )
}
