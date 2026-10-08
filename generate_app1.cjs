const fs = require('fs');
const path = require('path');

const rootDir = 'd:/ANSH/Restaurant Website/ember-and-ivory';

const files = {
  'src/index.css': `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');

:root {
  --color-bg: #0a0a0a;
  --color-surface: #121212;
  --color-surface-hover: #1a1a1a;
  --color-text: #f5f5f0; /* Warm ivory */
  --color-text-muted: #a3a39e;
  --color-accent: #c67c4e; /* Copper / burnt orange */
  --color-accent-hover: #e08d5c;
  --color-border: rgba(245, 245, 240, 0.1);
  --color-gold: #d4af37;
  
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 500;
  line-height: 1.2;
}

a {
  color: inherit;
  text-decoration: none;
}

button {
  cursor: pointer;
  font-family: var(--font-body);
  border: none;
  background: none;
  color: inherit;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: var(--color-bg);
}
::-webkit-scrollbar-thumb {
  background: var(--color-surface-hover);
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-accent);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 5%;
}

.section {
  padding: 100px 0;
}

.heading-large {
  font-size: clamp(3rem, 8vw, 6rem);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.heading-medium {
  font-size: clamp(2rem, 4vw, 3.5rem);
}

.heading-small {
  font-size: 1.5rem;
}
`,
  'src/main.tsx': `
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
`,
  'src/App.tsx': `
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Experience from './pages/Experience';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Gallery from './pages/Gallery';
import Story from './pages/Story';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import ScrollToTop from './components/utils/ScrollToTop';

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      {location.pathname !== '/admin' && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/our-story" element={<Story />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </AnimatePresence>
      {location.pathname !== '/admin' && <Footer />}
    </>
  );
}

export default App;
`,
  'src/components/utils/ScrollToTop.tsx': `
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
`,
  'src/components/ui/Button.tsx': `
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
import clsx from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({ children, to, onClick, variant = 'primary', className, type = 'button', disabled }: ButtonProps) {
  const btnClass = clsx(styles.button, styles[\`variant-\${variant}\`], className);

  if (to) {
    return (
      <Link to={to} className={btnClass}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={btnClass} disabled={disabled}>
      {children}
    </button>
  );
}
`,
  'src/components/ui/Button.module.scss': `
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 28px;
  font-size: 0.875rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  position: relative;
  overflow: hidden;
  
  &.variant-primary {
    background-color: var(--color-accent);
    color: var(--color-text);
    
    &:hover {
      background-color: var(--color-accent-hover);
      transform: translateY(-2px);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  }
  
  &.variant-secondary {
    background-color: var(--color-text);
    color: var(--color-bg);
    
    &:hover {
      background-color: #fff;
      transform: translateY(-2px);
    }
  }
  
  &.variant-outline {
    border: 1px solid var(--color-border);
    color: var(--color-text);
    
    &:hover {
      border-color: var(--color-accent);
      color: var(--color-accent);
    }
  }
  
  &.variant-text {
    padding: 0;
    border-bottom: 1px solid var(--color-accent);
    padding-bottom: 4px;
    
    &:hover {
      color: var(--color-accent);
    }
  }
}
`,
  'src/components/layout/Navbar.tsx': `
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
`,
  'src/components/layout/Navbar.module.scss': `
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  padding: 20px 0;
  transition: all 0.4s ease;
  background: transparent;
  
  &.scrolled {
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(10px);
    padding: 15px 0;
    border-bottom: 1px solid var(--color-border);
  }
}

.navContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 2px;
  color: var(--color-text);
  z-index: 101;
}

.desktopNav {
  display: none;
  @media (min-width: 992px) {
    display: flex;
    gap: 30px;
  }
}

.navLink {
  font-size: 0.8rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--color-text-muted);
  position: relative;
  transition: color 0.3s;
  
  &:hover, &.active {
    color: var(--color-text);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 1px;
    background: var(--color-accent);
    transition: width 0.3s ease;
  }
  
  &:hover::after, &.active::after {
    width: 100%;
  }
}

.actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.bookBtn {
  display: none;
  @media (min-width: 768px) {
    display: inline-flex;
  }
}

.mobileMenuBtn {
  display: block;
  color: var(--color-text);
  @media (min-width: 992px) {
    display: none;
  }
}

.mobileMenu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--color-bg);
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.closeBtn {
  position: absolute;
  top: 25px;
  right: 5%;
  color: var(--color-text);
}

.mobileNavLinks {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.mobileNavLink {
  font-family: var(--font-heading);
  font-size: 2rem;
  color: var(--color-text-muted);
  
  &.active {
    color: var(--color-accent);
  }
}

.mobileBookBtnContainer {
  margin-top: 20px;
}
`,
  'src/components/layout/Footer.tsx': `
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import Button from '../ui/Button';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <h2 className={styles.logo}>EMBER & IVORY</h2>
            <p className={styles.tagline}>Good Food. Great Company.<br/>Unforgettable Nights.</p>
          </div>
          
          <div className={styles.links}>
            <h3>Navigation</h3>
            <Link to="/our-story">Our Story</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/experience">Experience</Link>
            <Link to="/events">Events</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/contact">Contact</Link>
          </div>
          
          <div className={styles.contact}>
            <h3>Visit Us</h3>
            <p>123 Culinary Ave, Bandra West<br/>Mumbai, 400050</p>
            <p className={styles.phone}>+91 98765 43210</p>
            <p>Mon-Sun: 12:00 PM - 1:30 AM</p>
            <div className={styles.social}>
              <a href="#"><Instagram size={20} /></a>
              <a href="#"><Facebook size={20} /></a>
              <a href="#"><Youtube size={20} /></a>
            </div>
          </div>
          
          <div className={styles.newsletter}>
            <h3>Join the table</h3>
            <p>Subscribe for exclusive event invites and seasonal menu updates.</p>
            <form onSubmit={handleSubscribe} className={styles.form}>
              <input 
                type="email" 
                placeholder="Email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" variant="primary">Subscribe</Button>
            </form>
            {subscribed && <p className={styles.success}>Welcome to the table.</p>}
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; 2026 Ember & Ivory. All rights reserved.</p>
          <div className={styles.legal}>
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms & Conditions</Link>
            <Link to="/admin" className={styles.adminLink}>Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
`,
  'src/components/layout/Footer.module.scss': `
.footer {
  background-color: var(--color-surface);
  padding: 100px 0 30px;
  border-top: 1px solid var(--color-border);
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
  margin-bottom: 80px;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr 1.5fr 1.5fr;
  }
}

.logo {
  font-size: 2rem;
  margin-bottom: 20px;
  color: var(--color-text);
}

.tagline {
  color: var(--color-text-muted);
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-style: italic;
}

h3 {
  font-family: var(--font-body);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--color-text);
  margin-bottom: 25px;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  a {
    color: var(--color-text-muted);
    transition: color 0.3s;
    
    &:hover {
      color: var(--color-accent);
    }
  }
}

.contact {
  color: var(--color-text-muted);
  
  p {
    margin-bottom: 15px;
  }
  
  .phone {
    color: var(--color-text);
    font-size: 1.1rem;
  }
}

.social {
  display: flex;
  gap: 15px;
  margin-top: 20px;
  
  a {
    color: var(--color-text);
    transition: color 0.3s;
    
    &:hover {
      color: var(--color-accent);
    }
  }
}

.newsletter {
  p {
    color: var(--color-text-muted);
    margin-bottom: 20px;
    font-size: 0.9rem;
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  input {
    background: transparent;
    border: 1px solid var(--color-border);
    padding: 12px 15px;
    color: var(--color-text);
    font-family: var(--font-body);
    outline: none;
    
    &:focus {
      border-color: var(--color-accent);
    }
  }
}

.success {
  color: var(--color-accent) !important;
  margin-top: 10px;
}

.bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  border-top: 1px solid var(--color-border);
  padding-top: 30px;
  color: var(--color-text-muted);
  font-size: 0.8rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
}

.legal {
  display: flex;
  gap: 20px;
  
  a {
    transition: color 0.3s;
    &:hover {
      color: var(--color-text);
    }
  }
  
  .adminLink {
    opacity: 0.3;
    &:hover {
      opacity: 1;
    }
  }
}
`,
  'src/pages/Home.tsx': `
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import styles from './Home.module.scss';
import clsx from 'clsx';
import { menuItems } from '../data/menu';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2574&auto=format&fit=crop" alt="Restaurant Interior" />
          <div className={styles.heroOverlay}></div>
        </div>
        
        <div className={clsx('container', styles.heroContent)}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className={styles.heroTitle}>EMBER & IVORY</h1>
            <p className={styles.heroSubtitle}>Where flavour meets atmosphere.</p>
            <div className={styles.heroActions}>
              <Button to="/contact" variant="primary">Book a Table</Button>
              <Button to="/menu" variant="outline">Explore Menu</Button>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className={styles.scrollText}>SCROLL TO DISCOVER</span>
          <div className={styles.scrollLine}></div>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className={clsx('section', styles.story)}>
        <div className={clsx('container', styles.storyGrid)}>
          <motion.div 
            className={styles.storyImageWrapper}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <img src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2670&auto=format&fit=crop" alt="Chef plating" className={styles.storyImage} />
          </motion.div>
          <motion.div 
            className={styles.storyContent}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.sectionLabel}>OUR STORY</span>
            <h2 className="heading-medium">MORE THAN A MEAL</h2>
            <p>Ember & Ivory is a celebration of food, people and the moments that happen when they come together. We blend modern global techniques with bold, familiar flavours to create an experience that is both refined and comfortably social.</p>
            <div className={styles.storySecondaryImg}>
               <img src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2669&auto=format&fit=crop" alt="Cocktail" />
            </div>
            <Button to="/our-story" variant="text">Discover Our Story <ArrowRight size={16}/></Button>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className={clsx('section', styles.experience)}>
        <div className="container">
          <div className={styles.experienceHeader}>
            <span className={styles.sectionLabel}>THE SPACES</span>
            <h2 className="heading-medium">THE EXPERIENCE</h2>
          </div>
          
          <div className={styles.experienceGrid}>
            {[
              { title: 'THE DINING ROOM', desc: 'Elegant interiors, intimate lighting and thoughtful design.', img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2670&auto=format&fit=crop' },
              { title: 'THE KITCHEN', desc: 'Bold flavours, seasonal ingredients and modern techniques.', img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=2777&auto=format&fit=crop' },
              { title: 'THE BAR', desc: 'Signature cocktails, curated spirits and late-night energy.', img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2670&auto=format&fit=crop' },
              { title: 'THE TERRACE', desc: 'An open-air setting for relaxed evenings and celebrations.', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2670&auto=format&fit=crop' }
            ].map((exp, i) => (
              <motion.div 
                key={i} 
                className={styles.expCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className={styles.expImgWrapper}>
                  <img src={exp.img} alt={exp.title} />
                  <div className={styles.expOverlay}></div>
                </div>
                <div className={styles.expText}>
                  <h3>{exp.title}</h3>
                  <p>{exp.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signatures */}
      <section className={clsx('section', styles.signatures)}>
        <div className="container">
          <div className={styles.sigHeader}>
            <h2 className="heading-medium">SIGNATURES</h2>
            <Button to="/menu" variant="text">View Full Menu <ArrowRight size={16}/></Button>
          </div>
          
          <div className={styles.sigGrid}>
            {menuItems.filter(i => i.isSignature).slice(0, 4).map((dish, i) => (
              <motion.div 
                key={dish.id}
                className={styles.dishCard}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={styles.dishImg}>
                  <img src={dish.image} alt={dish.name} />
                </div>
                <div className={styles.dishInfo}>
                  <div className={styles.dishTitleRow}>
                    <h4>{dish.name}</h4>
                    <span className={styles.price}>₹{dish.price}</span>
                  </div>
                  <p>{dish.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
`,
  'src/pages/Home.module.scss': `
.home {
  width: 100%;
}

.hero {
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.heroBg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.heroOverlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.8) 100%);
}

.heroContent {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

.heroTitle {
  font-family: var(--font-heading);
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 600;
  letter-spacing: 4px;
  line-height: 1;
  margin-bottom: 20px;
  color: #fff;
}

.heroSubtitle {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-family: var(--font-heading);
  font-style: italic;
  color: var(--color-text-muted);
  margin-bottom: 40px;
}

.heroActions {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.scrollIndicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.scrollText {
  font-size: 0.7rem;
  letter-spacing: 2px;
  color: var(--color-text-muted);
}

.scrollLine {
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, var(--color-text-muted), transparent);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scaleY(0); transform-origin: top; }
  50% { transform: scaleY(1); transform-origin: top; }
  50.1% { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}

.sectionLabel {
  font-size: 0.8rem;
  letter-spacing: 2px;
  color: var(--color-accent);
  text-transform: uppercase;
  display: block;
  margin-bottom: 15px;
}

.storyGrid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
  align-items: center;
  
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    gap: 80px;
  }
}

.storyImageWrapper {
  position: relative;
  height: 60vh;
  border-radius: 4px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.storyContent {
  p {
    font-size: 1.2rem;
    color: var(--color-text-muted);
    margin: 30px 0;
    max-width: 500px;
  }
}

.storySecondaryImg {
  width: 200px;
  height: 250px;
  margin-bottom: 40px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
}

.experienceHeader {
  text-align: center;
  margin-bottom: 60px;
}

.experienceGrid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
}

.expCard {
  position: relative;
  height: 450px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  
  &:hover {
    .expImgWrapper img {
      transform: scale(1.05);
    }
    .expOverlay {
      background: linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.2) 100%);
    }
  }
}

.expImgWrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  }
}

.expOverlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.1) 100%);
  transition: background 0.4s;
}

.expText {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 40px;
  width: 100%;
  z-index: 2;
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 10px;
    color: #fff;
  }
  
  p {
    color: var(--color-text-muted);
    font-size: 1rem;
    transform: translateY(10px);
    opacity: 0.8;
    transition: all 0.3s;
  }
}

.expCard:hover .expText p {
  transform: translateY(0);
  opacity: 1;
}

.signatures {
  background-color: var(--color-surface);
}

.sigHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 50px;
  flex-wrap: wrap;
  gap: 20px;
}

.sigGrid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
}

.dishCard {
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  @media (min-width: 600px) {
    flex-direction: row;
    align-items: center;
  }
}

.dishImg {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.dishInfo {
  flex-grow: 1;
  
  p {
    color: var(--color-text-muted);
    font-size: 0.95rem;
    margin-top: 10px;
  }
}

.dishTitleRow {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px dashed var(--color-border);
  padding-bottom: 5px;
  
  h4 {
    font-size: 1.3rem;
    font-family: var(--font-heading);
  }
}

.price {
  color: var(--color-accent);
  font-family: var(--font-body);
  font-weight: 500;
}
`,
  'src/data/menu.ts': `
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isVegetarian: boolean;
  isSignature: boolean;
  image: string;
}

export const menuCategories = [
  'SIGNATURES', 'SMALL PLATES', 'SOUPS & SALADS', 'MAINS', 'BREADS & RICE', 'DESSERTS', 'COCKTAILS'
];

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Truffle Malai Mushroom',
    description: 'Charred wild mushrooms, truffle cream, smoked garlic',
    price: 595,
    category: 'SIGNATURES',
    isVegetarian: true,
    isSignature: true,
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Charred Burrata',
    description: 'Heirloom tomatoes, balsamic caviar, basil oil, sourdough crisp',
    price: 695,
    category: 'SIGNATURES',
    isVegetarian: true,
    isSignature: true,
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=2792&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Ember Butter Chicken',
    description: 'Smoked chicken tikka, rich tomato makhani, fenugreek dust',
    price: 795,
    category: 'SIGNATURES',
    isVegetarian: false,
    isSignature: true,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Miso Black Cod',
    description: 'Caramelized miso, pickled ginger root, edamame puree',
    price: 1295,
    category: 'SIGNATURES',
    isVegetarian: false,
    isSignature: true,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: '5',
    name: 'Smoked Dal Makhani',
    description: 'Slow-cooked black lentils, churned butter, charcoal smoke',
    price: 495,
    category: 'MAINS',
    isVegetarian: true,
    isSignature: false,
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: '6',
    name: 'Dark Chocolate Crème Brûlée',
    description: '70% dark chocolate, gold leaf, sea salt',
    price: 425,
    category: 'DESSERTS',
    isVegetarian: true,
    isSignature: true,
    image: 'https://images.unsplash.com/photo-1472555794301-77353b152fb7?q=80&w=2673&auto=format&fit=crop'
  },
  {
    id: '7',
    name: 'Crispy Lotus Stem',
    description: 'Honey chilli glaze, toasted sesame, scallions',
    price: 450,
    category: 'SMALL PLATES',
    isVegetarian: true,
    isSignature: false,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=2792&auto=format&fit=crop'
  },
  {
    id: '8',
    name: 'Smoked Old Fashioned',
    description: 'Bourbon, maple, angostura, applewood smoke',
    price: 850,
    category: 'COCKTAILS',
    isVegetarian: true,
    isSignature: true,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2670&auto=format&fit=crop'
  }
];
`,
  'src/data/mockDB.ts': `
// Mock local storage DB for reservations and contacts
export const saveReservation = (data: any) => {
  const existing = JSON.parse(localStorage.getItem('ei_reservations') || '[]');
  const newRes = {
    ...data,
    id: \`EI-2026-\${Math.floor(10000 + Math.random() * 90000)}\`,
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  };
  localStorage.setItem('ei_reservations', JSON.stringify([newRes, ...existing]));
  return newRes;
};

export const getReservations = () => {
  return JSON.parse(localStorage.getItem('ei_reservations') || '[]');
};

export const saveContactMessage = (data: any) => {
  const existing = JSON.parse(localStorage.getItem('ei_messages') || '[]');
  localStorage.setItem('ei_messages', JSON.stringify([{...data, createdAt: new Date().toISOString()}, ...existing]));
};
`,
  'src/components/reservation/ReservationModal.tsx': `
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Users, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import styles from './ReservationModal.module.scss';
import { saveReservation } from '../../data/mockDB';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', guests: '2', date: '', time: '', seating: 'Indoor', specialRequests: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock API call
    setTimeout(() => {
      const res = saveReservation(formData);
      setConfirmation(res);
      setLoading(false);
      setStep(3);
    }, 1500);
  };

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setConfirmation(null);
      setFormData({ name: '', phone: '', email: '', guests: '2', date: '', time: '', seating: 'Indoor', specialRequests: '' });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className={styles.modal}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={resetAndClose}><X size={24} /></button>
            
            <div className={styles.content}>
              {step === 1 && (
                <form onSubmit={() => setStep(2)}>
                  <h2 className={styles.title}>Book a Table</h2>
                  <p className={styles.subtitle}>Join us for an unforgettable experience.</p>
                  
                  <div className={styles.gridRow}>
                    <div className={styles.inputGroup}>
                      <label><Users size={16}/> Guests</label>
                      <select name="guests" value={formData.guests} onChange={handleChange} required>
                        {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} People</option>)}
                      </select>
                    </div>
                    <div className={styles.inputGroup}>
                      <label><Calendar size={16}/> Date</label>
                      <input type="date" name="date" value={formData.date} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div className={styles.inputGroup}>
                      <label><Clock size={16}/> Time</label>
                      <select name="time" value={formData.time} onChange={handleChange} required>
                        <option value="">Select Time</option>
                        <option value="19:00">7:00 PM</option>
                        <option value="19:30">7:30 PM</option>
                        <option value="20:00">8:00 PM</option>
                        <option value="20:30">8:30 PM</option>
                        <option value="21:00">9:00 PM</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label>Seating Preference</label>
                    <div className={styles.seatingOptions}>
                      {['Indoor', 'Outdoor', 'Bar'].map(opt => (
                        <div 
                          key={opt}
                          className={formData.seating === opt ? styles.seatActive : styles.seatOpt}
                          onClick={() => setFormData({...formData, seating: opt})}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button type="submit" className={styles.fullBtn}>Continue</Button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleSubmit}>
                  <h2 className={styles.title}>Your Details</h2>
                  
                  <div className={styles.gridCol}>
                    <div className={styles.inputGroup}>
                      <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className={styles.inputGroup}>
                      <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className={styles.inputGroup}>
                      <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className={styles.inputGroup}>
                      <textarea name="specialRequests" placeholder="Special Requests / Occasion (Optional)" value={formData.specialRequests} onChange={handleChange} rows={3}></textarea>
                    </div>
                  </div>
                  
                  <div className={styles.actions}>
                    <Button variant="text" onClick={() => setStep(1)}>Back</Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? 'Confirming...' : 'Confirm Reservation'}
                    </Button>
                  </div>
                </form>
              )}

              {step === 3 && confirmation && (
                <div className={styles.successView}>
                  <CheckCircle size={64} className={styles.successIcon} />
                  <h2 className={styles.title}>Reservation Confirmed</h2>
                  <p className={styles.subtitle}>Your table is waiting, {confirmation.name.split(' ')[0]}.</p>
                  
                  <div className={styles.ticket}>
                    <div className={styles.ticketRow}>
                      <span>Date</span>
                      <strong>{confirmation.date}</strong>
                    </div>
                    <div className={styles.ticketRow}>
                      <span>Time</span>
                      <strong>{confirmation.time}</strong>
                    </div>
                    <div className={styles.ticketRow}>
                      <span>Guests</span>
                      <strong>{confirmation.guests} People</strong>
                    </div>
                    <div className={styles.ticketRow}>
                      <span>Booking ID</span>
                      <strong>{confirmation.id}</strong>
                    </div>
                  </div>
                  
                  <Button onClick={resetAndClose} className={styles.fullBtn}>Done</Button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(rootDir, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim());
});

console.log('Core files generated.');
