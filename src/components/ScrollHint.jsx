import React, { useEffect, useState } from 'react';

function ScrollHint() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollClick = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 flex justify-center items-center bg-gray-900 text-white py-2 animate-bounce ${isVisible ? '' : 'hidden'} lg:hidden`} onClick={handleScrollClick}>
      <svg className="animate-pulse w-6 h-6 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
      <span>Scroll Down</span>
    </div>
  );
}

export default ScrollHint;

