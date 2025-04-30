import React from 'react';

const Footer = () => {
  const smoothScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#08080a] py-10 border-t border-[#1E2A45]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo('home');
              }}
              className="text-[#FFD15C] font-space font-bold text-2xl tracking-wider"
            >
              SHIVAJI<span className="text-[#FF65A3]">.</span>
            </a>
            <div className="flex gap-4 mt-2">
              <a 
                href="https://github.com/Shivaji-137" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FF65A3] transition-colors"
              >
                <i className="ri-github-fill text-xl"></i>
              </a>
              <a 
                href="https://www.linkedin.com/in/shivaji-chaulagain" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#FF65A3] transition-colors"
              >
                <i className="ri-linkedin-fill text-xl"></i>
              </a>
              <a 
                href="mailto:shivajichaulagain@gmail.com"
                className="text-gray-400 hover:text-[#FF65A3] transition-colors"
              >
                <i className="ri-mail-fill text-xl"></i>
              </a>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {['about', 'projects', 'research', 'blog', 'cv', 'contact'].map((section) => (
              <a 
                key={section}
                href={`#${section}`}
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo(section);
                }}
                className="text-gray-300 hover:text-[#FF65A3] transition-colors"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>
        </div>
        
        <div className="border-t border-[#1E2A45] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Shivaji Chaulagain . All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-[#FF65A3] transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-[#FF65A3] transition-colors text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
