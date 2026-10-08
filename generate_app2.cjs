const fs = require('fs');
const path = require('path');

const rootDir = 'd:/ANSH/Restaurant Website/ember-and-ivory';

const files = {
  'src/components/reservation/ReservationModal.module.scss': `
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.modal {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.closeBtn {
  position: absolute;
  top: 20px;
  right: 20px;
  color: var(--color-text-muted);
  z-index: 10;
  &:hover { color: var(--color-text); }
}

.content {
  padding: 50px 40px;
}

.title {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  margin-bottom: 10px;
  text-align: center;
}

.subtitle {
  color: var(--color-text-muted);
  text-align: center;
  margin-bottom: 40px;
  font-size: 0.95rem;
}

.gridRow {
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr;
  gap: 15px;
  margin-bottom: 25px;
}

.gridCol {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.inputGroup {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  
  label {
    font-size: 0.8rem;
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  input, select, textarea {
    background: transparent;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    padding: 12px 15px;
    color: var(--color-text);
    font-family: var(--font-body);
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s;
    
    &:focus {
      border-color: var(--color-accent);
    }
  }
  
  select {
    appearance: none;
    background-color: var(--color-surface);
  }
}

.seatingOptions {
  display: flex;
  gap: 10px;
}

.seatOpt, .seatActive {
  flex: 1;
  text-align: center;
  padding: 12px 0;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.seatActive {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-text);
}

.seatOpt:hover {
  border-color: var(--color-text-muted);
}

.fullBtn {
  width: 100%;
  margin-top: 20px;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.successView {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.successIcon {
  color: var(--color-accent);
  margin-bottom: 20px;
}

.ticket {
  background: rgba(255,255,255,0.03);
  border: 1px dashed var(--color-border);
  border-radius: 8px;
  width: 100%;
  padding: 25px;
  margin: 30px 0;
}

.ticketRow {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 0.95rem;
  
  &:last-child {
    margin-bottom: 0;
    padding-top: 15px;
    border-top: 1px solid var(--color-border);
    color: var(--color-accent);
  }
  
  span {
    color: var(--color-text-muted);
  }
}
`,
  'src/pages/Menu.tsx': `
import { useState } from 'react';
import { motion } from 'framer-motion';
import { menuItems, menuCategories } from '../data/menu';
import styles from './Menu.module.scss';
import clsx from 'clsx';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0]);

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  return (
    <div className={styles.menuPage}>
      <section className={styles.hero}>
        <div className="container">
          <motion.h1 
            className="heading-large"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            THE MENU
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.heroText}
          >
            A carefully curated selection of global flavours, seasonal ingredients and modern techniques.
          </motion.p>
        </div>
      </section>

      <section className={styles.menuContent}>
        <div className="container">
          <div className={styles.layout}>
            <aside className={styles.sidebar}>
              <nav className={styles.categoryNav}>
                {menuCategories.map(cat => (
                  <button
                    key={cat}
                    className={clsx(styles.catBtn, activeCategory === cat && styles.active)}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </nav>
            </aside>
            
            <main className={styles.mainContent}>
              <h2 className={styles.categoryTitle}>{activeCategory}</h2>
              <div className={styles.grid}>
                {filteredItems.map((item, i) => (
                  <motion.div 
                    key={item.id}
                    className={styles.menuItem}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <div className={styles.itemHeader}>
                      <h3>{item.name}</h3>
                      <span className={styles.price}>₹{item.price}</span>
                    </div>
                    <p className={styles.desc}>{item.description}</p>
                    <div className={styles.badges}>
                      {item.isVegetarian && <span className={styles.vegBadge}>V</span>}
                      {item.isSignature && <span className={styles.sigBadge}>Signature</span>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
`,
  'src/pages/Menu.module.scss': `
.menuPage {
  padding-top: 100px;
}

.hero {
  padding: 80px 0;
  text-align: center;
  border-bottom: 1px solid var(--color-border);
}

.heroText {
  color: var(--color-text-muted);
  font-size: 1.2rem;
  max-width: 600px;
  margin: 20px auto 0;
}

.menuContent {
  padding: 80px 0;
}

.layout {
  display: flex;
  flex-direction: column;
  gap: 50px;
  
  @media (min-width: 992px) {
    flex-direction: row;
    align-items: flex-start;
  }
}

.sidebar {
  @media (min-width: 992px) {
    width: 250px;
    flex-shrink: 0;
    position: sticky;
    top: 120px;
  }
}

.categoryNav {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  
  @media (min-width: 992px) {
    flex-direction: column;
    gap: 10px;
  }
}

.catBtn {
  text-align: left;
  font-size: 0.85rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--color-text-muted);
  padding: 10px 15px;
  border-radius: 4px;
  transition: all 0.3s;
  border: 1px solid transparent;
  
  &:hover {
    color: var(--color-text);
  }
  
  &.active {
    color: var(--color-accent);
    border-color: var(--color-border);
    background: rgba(255,255,255,0.02);
  }
  
  @media (min-width: 992px) {
    padding: 12px 15px;
  }
}

.mainContent {
  flex-grow: 1;
}

.categoryTitle {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  margin-bottom: 40px;
  color: var(--color-text);
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
}

.menuItem {
  border-bottom: 1px dashed var(--color-border);
  padding-bottom: 20px;
}

.itemHeader {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
  
  h3 {
    font-size: 1.25rem;
  }
}

.price {
  color: var(--color-accent);
  font-family: var(--font-body);
  font-weight: 500;
}

.desc {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  margin-bottom: 15px;
}

.badges {
  display: flex;
  gap: 10px;
}

.vegBadge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 1px solid #4ade80;
  color: #4ade80;
  font-size: 0.6rem;
  font-weight: bold;
}

.sigBadge {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
  padding: 2px 8px;
  border-radius: 2px;
}
`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(rootDir, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim());
});

console.log('Styles and Menu added.');
