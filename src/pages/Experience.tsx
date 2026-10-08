import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import styles from './Experience.module.scss';


export default function Experience() {
  return (
    <div className={styles.expPage}>
      <section className={styles.hero}>
        <div className="container">
          <motion.h1 className="heading-large" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>EXPERIENCE</motion.h1>
        </div>
      </section>
      
      <section className={styles.privateDining}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.content}>
              <span className={styles.label}>PRIVATE DINING</span>
              <h2>Curated for your celebrations</h2>
              <p>Whether you're planning an intimate anniversary dinner, a corporate gathering, or a milestone birthday, our private dining spaces offer exclusivity without losing the vibrant energy of the main restaurant.</p>
              
              <ul className={styles.features}>
                <li>Up to 24 guests seated</li>
                <li>Customized tasting menus</li>
                <li>Dedicated service team</li>
                <li>A/V capabilities for presentations</li>
              </ul>
              
              <Button to="/contact" variant="primary">Plan Your Event</Button>
            </div>
            <div className={styles.images}>
              <img src="https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=2670&auto=format&fit=crop" alt="Private Dining" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}