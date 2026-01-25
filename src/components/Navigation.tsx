'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isPastHeroLogo, setIsPastHeroLogo] = useState(false);
  const [clickedLink, setClickedLink] = useState<string | null>(null);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Track if user has scrolled at all (for yellow bar opacity)
      if (scrollY > 0) {
        setHasScrolled(true);
      }
      // Consider scrolled after a small amount of scrolling to prevent overlap
      setIsScrolled(scrollY > 50);
      
      // On home page, check if we've scrolled past the hero logo
      // Hero logo is at ~557px from top, logo is ~207px tall, so roughly at ~764px total
      // We'll show nav logo when scrolled past ~800px to be safe
      if (isHomePage) {
        setIsPastHeroLogo(scrollY > 800);
      } else {
        // On other pages, always show the logo
        setIsPastHeroLogo(true);
      }
    };

    // Check initial scroll position on mount (for page refresh scenarios)
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = (href: string) => {
    setClickedLink(href);
  };

  // On home page with yellow bg: use black text; elsewhere or when scrolled: use cream
  // On home page, when not scrolled, always use black text (page has yellow background)
  const textColorClass = (isHomePage && !isScrolled)
    ? 'text-black/80 hover:!text-black'
    : 'text-cream/80 hover:text-yellow';
  
  const hamburgerColorClass = isHomePage && !isScrolled && !isOpen
    ? 'bg-black'
    : 'bg-cream';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-ink/95 backdrop-blur-md shadow-lg' 
        : isHomePage 
        ? hasScrolled
          ? 'bg-[#FFE100]/80 backdrop-blur-sm' 
          : 'bg-[#FFE100] md:bg-[#FFE100]/0 backdrop-blur-sm'
        : 'bg-ink/90 backdrop-blur-sm'
    }`}>
      <nav className="container-main py-3 md:py-6 flex items-center">
        {/* Logo - TZ mark */}
        {/* Hide on home page initially, show when past hero logo. Always visible on other pages */}
        <AnimatePresence>
          {(isPastHeroLogo || !isHomePage) && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="/" className="relative z-50">
                <motion.svg
                  viewBox="0 0 400 400"
                  className="w-12 h-12"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    d="M200,3.66C91.56,3.66,3.66,91.56,3.66,200s87.9,196.34,196.34,196.34,196.34-87.9,196.34-196.34S308.44,3.66,200,3.66ZM336.99,312.85h-186.2c-37.57,0-59.29-25.05-59.29-64.71V62.34h36.74v50.1h168.66c25.05,0,38.41,10.44,38.41,26.72,0,8.77-1.67,16.29-6.26,21.71l-95.61,116.9h103.54v35.07Z"
                    fill={isHomePage && !isScrolled && hasScrolled ? 'black' : '#6a6d75'}
                    className="transition-colors duration-300"
                  />
                  <path
                    d="M200.06,147.51h-71.81v105.21c0,18.79,8.77,25.05,27.56,25.05h37.94c2.51-9.1,8.96-17.64,18.83-30.06l81.83-100.2h-94.35Z"
                    fill={isHomePage && !isScrolled && hasScrolled ? 'black' : '#6a6d75'}
                    className="transition-colors duration-300"
                  />
                </motion.svg>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 ml-auto">
          {navLinks.map((link) => {
            const isClicked = clickedLink === link.href;
            // On home page with yellow bg, clicked links should be black, not yellow
            const clickedClass = isClicked 
              ? (isHomePage && !isScrolled ? 'is-clicked-home' : 'is-clicked')
              : '';
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 link-underline ${textColorClass} ${clickedClass}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 ml-auto"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className={`w-6 h-0.5 block transition-colors ${isOpen ? 'bg-cream' : hamburgerColorClass}`}
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className={`w-6 h-0.5 block transition-colors ${isOpen ? 'bg-cream' : hamburgerColorClass}`}
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className={`w-6 h-0.5 block transition-colors ${isOpen ? 'bg-cream' : hamburgerColorClass}`}
          />
        </button>

        {/* Mobile Menu Overlay - portaled to body so it covers full viewport (header backdrop-blur creates containing block that clips fixed overlay) */}
        {typeof document !== 'undefined' &&
          createPortal(
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 top-0 left-0 right-0 bottom-0 w-full min-h-screen z-40 md:hidden flex flex-col"
                  style={{ isolation: 'isolate' }}
                  aria-hidden={!isOpen}
                >
                  {/* Yellow Header Bar */}
                  <motion.div
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    exit={{ y: -100 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="bg-yellow w-full flex items-center justify-between px-6 py-5"
                  >
                    <div className="w-10" /> {/* Spacer for centering */}
                    <button
                      onClick={toggleMenu}
                      className="absolute right-6 w-10 h-10 flex items-center justify-center group"
                      aria-label="Close menu"
                    >
                      <motion.svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-ink"
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.path
                          d="M18 6L6 18M6 6L18 18"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        />
                      </motion.svg>
                    </button>
                  </motion.div>

                  {/* Black Content Area */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex-1 bg-ink flex items-center justify-center"
                  >
                    <motion.ul
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={{ delay: 0.2, staggerChildren: 0.08 }}
                      className="flex flex-col items-start w-full max-w-sm px-8 space-y-1"
                    >
                      {navLinks.map((link, index) => {
                        const isActive = pathname === link.href;
                        return (
                          <motion.li
                            key={link.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.08, duration: 0.4 }}
                            className="w-full"
                          >
                            <Link
                              href={link.href}
                              onClick={() => {
                                handleLinkClick(link.href);
                                setIsOpen(false);
                              }}
                              className={`group relative block w-full py-4 link-underline-mobile ${isActive ? 'is-active' : ''} ${clickedLink === link.href ? 'is-clicked' : ''}`}
                            >
                              <motion.div
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.15, ease: 'easeOut' }}
                                className="relative"
                              >
                                <span
                                  className={`text-3xl sm:text-4xl font-medium tracking-wide uppercase transition-all duration-300 ${
                                    isActive
                                      ? 'text-yellow'
                                      : 'text-cream group-hover:text-yellow'
                                  }`}
                                >
                                  {link.label}
                                </span>
                              </motion.div>
                            </Link>
                          </motion.li>
                        );
                      })}
                    </motion.ul>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )}
      </nav>
    </header>
  );
}
