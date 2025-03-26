'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (isOpen) setIsOpen(false);

    if (location.pathname !== '/') {
      navigate('/', {
        state: {
          scrollTo: sectionId,
          preventAutoScroll: false,
        },
      });
      return;
    }

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 80;

        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight - 10;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        setActiveSection(sectionId.toLowerCase());

        // Clear the location state after scrolling.  Crucial!
        navigate('.', { replace: true, state: null }); // Using replace:true prevents adding a new entry in browser history
      }
    }, 50);
  };

  useEffect(() => {
    if (location.pathname === '/' && location.state) {
      const { scrollTo, preventAutoScroll } = location.state;

      if (scrollTo && preventAutoScroll !== true) {
        scrollToSection(scrollTo);
      }
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location, navigate]);

  const isActive = (item: string) => {
    const itemSlug = item.toLowerCase().replace(/\s+/g, '');
    return activeSection === itemSlug;
  };

  const menuItems = [
		'HOME',
		'ABOUT ME',
		'EXPERIENCE',
		'SKILLS',
		'PROJECTS',
		'GET IN TOUCH',
	];


  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className='fixed w-full top-0 z-50 transition-all duration-300'
    >
      <div className='container mx-auto'>
        <div
          className={`px-4 md:px-0 flex justify-between items-center ${
            scrolled
              ? 'bg-black/90 backdrop-blur-sm py-2 shadow-lg'
              : 'bg-black py-3'
          }`}
        >
          <div className='flex items-center'>
            <div className='text-white font-bold text-sm sm:text-base md:hidden'>
              PORTFOLIO
            </div>

            <nav className='hidden md:flex space-x-2 px-2 flex-wrap justify-start'>
              {menuItems.map((item) => (
                <motion.button
                  key={item}
                  onClick={() => {
                    const sectionId = item
                      .toLowerCase()
                      .replace(/\s+/g, '');
                    scrollToSection(sectionId);
                  }}
                  className={`text-xs lg:text-sm px-1 sm:px-2 lg:px-3 py-1 rounded transition-colors ${
                    isActive(item)
                      ? 'bg-white text-black font-medium'
                      : 'text-white hover:text-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.button>
              ))}
            </nav>
          </div>

          <div className='flex items-center space-x-4'>
            {/* Mobile Navigation Button */}
            <motion.button
              className='md:hidden text-white'
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label='Toggle menu'
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 'auto' }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className='absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm md:hidden overflow-hidden shadow-lg'
              >
                <nav className='flex flex-col items-center py-2 px-4'>
                  {menuItems.map((item) => (
                    <motion.button
                      key={item}
                      onClick={() => {
                        const sectionId = item
                          .toLowerCase()
                          .replace(/\s+/g, '');
                        scrollToSection(sectionId);
                      }}
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`py-2 w-full text-center transition-colors px-3 rounded my-1 ${
                        isActive(item)
                          ? 'bg-white text-black font-medium'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      {item}
                    </motion.button>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
