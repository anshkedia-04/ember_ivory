import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Gallery.module.scss';
import clsx from 'clsx';

const images = [
  { id: 1, src: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2574&auto=format&fit=crop', cat: 'INTERIORS' },
  { id: 2, src: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2670&auto=format&fit=crop', cat: 'FOOD' },
  { id: 3, src: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2670&auto=format&fit=crop', cat: 'BAR' },
  { id: 4, src: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=2777&auto=format&fit=crop', cat: 'PEOPLE' },
  { id: 5, src: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2670&auto=format&fit=crop', cat: 'INTERIORS' },
  { id: 6, src: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2670&auto=format&fit=crop', cat: 'FOOD' }
];

const categories = ['ALL', 'FOOD', 'INTERIORS', 'BAR', 'PEOPLE'];

export default function Gallery() {
  const [filter, setFilter] = useState('ALL');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === 'ALL' ? images : images.filter(img => img.cat === filter);

  return (
    <div className={styles.galleryPage}>
      <section className={styles.hero}>
        <div className="container">
          <motion.h1 className="heading-large" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>GALLERY</motion.h1>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.filters}>
            {categories.map(cat => (
              <button 
                key={cat} 
                className={clsx(styles.filterBtn, filter === cat && styles.active)}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.grid}>
            <AnimatePresence>
              {filtered.map((img) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={styles.imgItem}
                  onClick={() => setLightbox(img.id)}
                >
                  <img src={img.src} alt="Gallery item" />
                  <div className={styles.overlay}><span>{img.cat}</span></div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div className={styles.lightbox} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className={styles.closeBtn} onClick={() => setLightbox(null)}><X size={32}/></button>
            <div className={styles.lbContent}>
              <img src={images.find(i => i.id === lightbox)?.src} alt="Lightbox" />
            </div>
            <div className={styles.controls}>
              <button onClick={() => {
                const idx = images.findIndex(i => i.id === lightbox);
                setLightbox(images[idx === 0 ? images.length - 1 : idx - 1].id);
              }}><ChevronLeft size={48}/></button>
              <button onClick={() => {
                const idx = images.findIndex(i => i.id === lightbox);
                setLightbox(images[idx === images.length - 1 ? 0 : idx + 1].id);
              }}><ChevronRight size={48}/></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}