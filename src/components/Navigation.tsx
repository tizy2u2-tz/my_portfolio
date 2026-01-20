'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/playground', label: 'Playground' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // Consider scrolled after passing the hero section
      setIsScrolled(window.scrollY > window.innerHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  // On home page with yellow bg: use black text; elsewhere or when scrolled: use cream
  const textColorClass = isHomePage && !isScrolled
    ? 'text-black/80 hover:text-black'
    : 'text-cream/80 hover:text-magenta';
  
  const hamburgerColorClass = isHomePage && !isScrolled && !isOpen
    ? 'bg-black'
    : 'bg-cream';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-ink/90 backdrop-blur-sm' : ''}`}>
      <nav className="container-main py-6 flex items-center justify-between">
        {/* Logo - TZ mark */}
        <Link href="/" className="relative z-50">
          <motion.svg
            viewBox="0 0 400 400"
            className="w-12 h-12"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <path
              d="M200,3.66C91.56,3.66,3.66,91.56,3.66,200s87.9,196.34,196.34,196.34,196.34-87.9,196.34-196.34S308.44,3.66,200,3.66ZM336.99,312.85h-186.2c-37.57,0-59.29-25.05-59.29-64.71V62.34h36.74v50.1h168.66c25.05,0,38.41,10.44,38.41,26.72,0,8.77-1.67,16.29-6.26,21.71l-95.61,116.9h103.54v35.07Z"
              fill={isHomePage && !isScrolled ? 'black' : '#6a6d75'}
              className="transition-colors duration-300"
            />
            <path
              d="M200.06,147.51h-71.81v105.21c0,18.79,8.77,25.05,27.56,25.05h37.94c2.51-9.1,8.96-17.64,18.83-30.06l81.83-100.2h-94.35Z"
              fill={isHomePage && !isScrolled ? 'black' : '#6a6d75'}
              className="transition-colors duration-300"
            />
          </motion.svg>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 link-underline ${textColorClass}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
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

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-ink z-40 md:hidden"
            >
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1, staggerChildren: 0.1 }}
                className="flex flex-col items-center justify-center h-full gap-8"
              >
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-4xl font-display font-bold text-cream hover:text-magenta transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
