import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import ReservationModal from '../reservation/ReservationModal';
import styles from './Navbar.module.scss';
import clsx from 'clsx';

const NAV_LINKS = [
  { label: 'HOME', path: '/' },
  { label: 'OUR STORY', path: '/our-story' },
  { label: 'MENU', path: '/menu' },
  { label: 'EXPERIENCE', path: '/experience' },
  { label: 'EVENTS', path: '/events' },
  { label: 'GALLERY', path: '/gallery' },
  { label: 'CONTACT', path: '/contact' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className={clsx(styles.navbar, isScrolled && styles.scrolled)}>
        <div className={clsx('container', styles.navContainer)}>
          <Link to="/" className={styles.logo}>
            EMBER & IVORY
          </Link>
          
          <nav className={styles.desktopNav}>
            {NAV_LINKS.map(link => (
              <Link 
                key={link.path} 
                to={link.path}
                className={clsx(styles.navLink, location.pathname === link.path && styles.active)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className={styles.actions}>
            <Button onClick={() => setIsReservationOpen(true)} className={styles.bookBtn}>
              BOOK A TABLE
            </Button>
            <button 
              className={styles.mobileMenuBtn}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
          >
            <button 
              className={styles.closeBtn}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <div className={styles.mobileNavLinks}>
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Link 
                    to={link.path}
                    className={clsx(styles.mobileNavLink, location.pathname === link.path && styles.active)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * NAV_LINKS.length }}
                className={styles.mobileBookBtnContainer}
              >
                <Button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsReservationOpen(true);
                  }} 
                  variant="primary"
                >
                  BOOK A TABLE
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ReservationModal 
        isOpen={isReservationOpen} 
        onClose={() => setIsReservationOpen(false)} 
      />
    </>
  );
}