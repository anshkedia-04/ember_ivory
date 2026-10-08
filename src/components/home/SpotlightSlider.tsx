import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './SpotlightSlider.module.scss';
import clsx from 'clsx';

interface SpotlightItem {
  id: string;
  tagline: string;
  watermark: string;
  title: string;
  category: string;
  price: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  floatingElements: {
    src: string;
    alt: string;
    className: string;
  }[];
}

const spotlightItems: SpotlightItem[] = [
  {
    id: '1',
    tagline: 'Discover our Reserve Bar',
    watermark: 'BOURBON',
    title: 'The Sovereign Old Fashioned',
    category: 'RARE RESERVE COCKTAIL',
    price: '₹2,600',
    description: 'The Macallan 18 Double Cask infused with Madagascar smoked vanilla, flamed orange oils, and 24K gold leaf over hand-carved crystal ice.',
    ctaText: 'Explore the Bar',
    ctaLink: '/menu',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200&auto=format&fit=crop',
    floatingElements: [
      {
        src: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=400&auto=format&fit=crop',
        alt: 'Botanical Garnish',
        className: styles.floatItemTopLeft
      },
      {
        src: 'https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=400&auto=format&fit=crop',
        alt: 'Citrus Twist',
        className: styles.floatItemBottomRight
      }
    ]
  },
  {
    id: '2',
    tagline: 'Imperial Culinary Heritage',
    watermark: 'CAVIAR',
    title: 'Imperial Kaluga Caviar Service',
    category: 'RAW BAR SELECTION',
    price: '₹4,850',
    description: 'Royal Kaluga hybrid caviar (30g), smoked malai blinis, chive-infused Normandy butter, cured egg mimosa and 24k gold leaf.',
    ctaText: 'View Tasting Menu',
    ctaLink: '/menu',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1200&auto=format&fit=crop',
    floatingElements: [
      {
        src: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=400&auto=format&fit=crop',
        alt: 'Blini Service',
        className: styles.floatItemTopRight
      },
      {
        src: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=400&auto=format&fit=crop',
        alt: 'Gold Flakes',
        className: styles.floatItemBottomLeft
      }
    ]
  },
  {
    id: '3',
    tagline: 'Wood-Fired Mastery',
    watermark: 'WAGYU',
    title: 'A5 Miyazaki Wagyu Tenderloin',
    category: 'ROBATA GRILL SPECIAL',
    price: '₹4,950',
    description: 'Grade A5 Japanese Wagyu seared over binchō-tan charcoal, smoked bone marrow reduction, shaved Périgord black truffle & 10-year aged tare.',
    ctaText: 'Discover Robata',
    ctaLink: '/menu',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    floatingElements: [
      {
        src: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=400&auto=format&fit=crop',
        alt: 'Truffle Shavings',
        className: styles.floatItemTopLeft
      },
      {
        src: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=400&auto=format&fit=crop',
        alt: 'Herb Garnish',
        className: styles.floatItemBottomRight
      }
    ]
  },
  {
    id: '4',
    tagline: 'Floral Mixology Alchemy',
    watermark: 'SAKURA',
    title: 'Sakura & White Peach Highball',
    category: 'BOTANICAL COCKTAIL',
    price: '₹1,350',
    description: 'Roku Japanese Gin, cherry blossom liqueur, white peach puree, clarified lemon essence, and Bollinger Brut Champagne float.',
    ctaText: 'Reserve Experience',
    ctaLink: '/contact',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=1200&auto=format&fit=crop',
    floatingElements: [
      {
        src: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=400&auto=format&fit=crop',
        alt: 'Sakura Petals',
        className: styles.floatItemTopRight
      },
      {
        src: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400&auto=format&fit=crop',
        alt: 'Champagne Flute',
        className: styles.floatItemBottomLeft
      }
    ]
  }
];

export default function SpotlightSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentItem = spotlightItems[currentIndex];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % spotlightItems.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + spotlightItems.length) % spotlightItems.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 260, damping: 28 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring' as const, stiffness: 260, damping: 28 },
        opacity: { duration: 0.4 }
      }
    })
  };

  return (
    <section className={styles.spotlightSection}>
      <div className={styles.sliderContainer}>
        {/* Navigation Arrows */}
        <button 
          className={clsx(styles.navBtn, styles.navBtnPrev)} 
          onClick={handlePrev}
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} />
        </button>

        <button 
          className={clsx(styles.navBtn, styles.navBtnNext)} 
          onClick={handleNext}
          aria-label="Next Slide"
        >
          <ChevronRight size={24} />
        </button>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div 
            key={currentItem.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className={styles.slide}
          >
            {/* Top Bar Indicators */}
            <div className={styles.topBar}>
              <span className={styles.tagline}>
                <Sparkles size={14} className={styles.sparkle} /> {currentItem.tagline}
              </span>
              <div className={styles.counter}>
                <strong>0{currentIndex + 1}</strong>
                <span> / 0{spotlightItems.length}</span>
              </div>
            </div>

            {/* Giant Background Typography Watermark */}
            <div className={styles.watermarkWrapper}>
              <h2 className={styles.watermarkText}>{currentItem.watermark}</h2>
            </div>

            {/* Floating Parallax Elements */}
            <div className={styles.floatingContainer}>
              <motion.div 
                className={clsx(styles.floatingElement, styles.float1)}
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className={styles.floatCircle}>
                  <img src={currentItem.floatingElements[0].src} alt={currentItem.floatingElements[0].alt} />
                </div>
              </motion.div>

              <motion.div 
                className={clsx(styles.floatingElement, styles.float2)}
                animate={{ y: [0, 20, 0], rotate: [0, -6, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <div className={styles.floatCircle}>
                  <img src={currentItem.floatingElements[1].src} alt={currentItem.floatingElements[1].alt} />
                </div>
              </motion.div>

              {/* Glowing Ember Particles */}
              <div className={styles.emberGlow}></div>
            </div>

            {/* Central Main Showcase Product Image */}
            <div className={styles.centerStage}>
              <motion.div 
                className={styles.mainImageCard}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className={styles.mainImageWrapper}>
                  <img src={currentItem.image} alt={currentItem.title} />
                  <div className={styles.imageOverlay}></div>
                </div>
                <div className={styles.priceTag}>
                  <span>{currentItem.price}</span>
                </div>
              </motion.div>
            </div>

            {/* Bottom Flanking Content */}
            <div className={styles.bottomBar}>
              <div className={styles.bottomLeft}>
                <Link to={currentItem.ctaLink} className={styles.pillCta}>
                  <span>{currentItem.ctaText}</span>
                  <ArrowRight size={16} />
                </Link>
                <span className={styles.categoryLabel}>{currentItem.category}</span>
              </div>

              <div className={styles.bottomRight}>
                <h3 className={styles.itemTitle}>{currentItem.title}</h3>
                <p className={styles.itemDescription}>{currentItem.description}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Pagination Dots */}
        <div className={styles.paginationDots}>
          {spotlightItems.map((item, idx) => (
            <button
              key={item.id}
              className={clsx(styles.dot, currentIndex === idx && styles.dotActive)}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
