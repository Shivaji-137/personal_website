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
    <footer className="bg-[#08080a] z-50 py-10 border-t border-[#1E2A45]">
      <div className="container mx-auto px-1">
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
              {[
                { href: "https://github.com/Shivaji-137", icon: "ri-github-fill" },
                { href: "https://www.linkedin.com/in/shivaji-chaulagain", icon: "ri-linkedin-fill" },
                { href: "mailto:shivajichaulagain@gmail.com", icon: "ri-mail-fill" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#FF65A3] transition-colors text-3xl"
                >
                  <i className={item.icon}></i>
                </a>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {['about', 'projects', 'research', 'blog', 'cv', 'contact'].map((section, index) => (
              <a 
                key={section}
                href={`#${section}`}
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo(section);
                }}
                className="text-gray-300 hover:text-[#FF65A3] transition-all text-lg md:text-xl font-semibold hover:scale-105"
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