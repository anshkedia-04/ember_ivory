import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import styles from './Home.module.scss';
import clsx from 'clsx';
import { menuItems } from '../data/menu';
import SpotlightSlider from '../components/home/SpotlightSlider';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img src="https://i.pinimg.com/1200x/6c/64/95/6c6495d196620530dc97da2572646087.jpg" alt="Restaurant Interior" />
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

      {/* Featured Spotlight Slider (Inspired by Clean Juice / Editorial Product Showcase) */}
      <SpotlightSlider />

      {/* Signatures */}
      <section className={clsx('section', styles.signatures)}>
        <div className="container">
          <div className={styles.sigHeader}>
            <h2 className="heading-medium">SIGNATURES</h2>
            <Button to="/menu" variant="text">View Full Menu <ArrowRight size={16}/></Button>
          </div>
          
          <div className={styles.sigGrid}>
            {menuItems.filter(i => i.isSignature).slice(0, 6).map((dish, i) => (
              <motion.div 
                key={dish.id}
                className={styles.dishCard}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className={styles.dishImg}>
                  <img src={dish.image} alt={dish.name} />
                </div>
                <div className={styles.dishInfo}>
                  <div className={styles.dishTitleRow}>
                    <h4>{dish.name}</h4>
                    <span className={styles.price}>₹{dish.price.toLocaleString('en-IN')}</span>
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