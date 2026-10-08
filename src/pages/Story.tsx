import { motion } from 'framer-motion';
import styles from './Story.module.scss';
import clsx from 'clsx';

export default function Story() {
  return (
    <div className={styles.storyPage}>
      <section className={styles.hero}>
        <div className="container">
          <motion.h1 
            className="heading-large"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            OUR STORY
          </motion.h1>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.section}>
            <div className={styles.textBlock}>
              <span className={styles.label}>THE BEGINNING</span>
              <h2>A Vision of Hospitality</h2>
              <p>Founded on the belief that a restaurant should be more than just a place to eat, Ember & Ivory was born from a desire to create a sanctuary where culinary excellence meets genuine connection. We set out to build a space that feels both aspirational and deeply welcoming.</p>
            </div>
            <div className={styles.imgBlock}>
              <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2574&auto=format&fit=crop" alt="Restaurant History" />
            </div>
          </div>

          <div className={clsx(styles.section, styles.reverse)}>
            <div className={styles.textBlock}>
              <span className={styles.label}>OUR PHILOSOPHY</span>
              <h2>Rooted in Tradition, Looking Forward</h2>
              <p>Our approach to food is simple: respect the ingredients, honour the traditions, and embrace modern techniques. We draw inspiration from global flavours but remain deeply rooted in our commitment to local, seasonal produce.</p>
            </div>
            <div className={styles.imgBlock}>
              <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2568&auto=format&fit=crop" alt="Ingredients" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}