import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { menuItems, menuCategories } from '../data/menu';
import styles from './Menu.module.scss';
import clsx from 'clsx';
import { Sparkles, Search, Star, X } from 'lucide-react';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0]);
  const [dietaryFilter, setDietaryFilter] = useState<'ALL' | 'VEG' | 'NON_VEG' | 'SIGNATURE'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemImage, setSelectedItemImage] = useState<string | null>(null);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    menuCategories.forEach(cat => {
      counts[cat] = menuItems.filter(item => item.category === cat).length;
    });
    return counts;
  }, []);

  // Filtered items based on category, dietary preference and search
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory = item.category === activeCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tag && item.tag.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesDietary = true;
      if (dietaryFilter === 'VEG') matchesDietary = item.isVegetarian;
      if (dietaryFilter === 'NON_VEG') matchesDietary = !item.isVegetarian;
      if (dietaryFilter === 'SIGNATURE') matchesDietary = item.isSignature;

      return matchesCategory && matchesSearch && matchesDietary;
    });
  }, [activeCategory, dietaryFilter, searchQuery]);

  return (
    <div className={styles.menuPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.heroHeader}
          >
            <span className={styles.sectionBadge}>
              <Sparkles size={14} className={styles.badgeIcon} /> HAUTE CUISINE & COCKTAILS
            </span>
            <h1 className="heading-large">THE MENU</h1>
            <p className={styles.heroText}>
              An artisanal curation of rare imports, seasonal luxuries, wood-fired signatures, and bespoke mixology.
            </p>
          </motion.div>

          {/* Search & Filter Bar */}
          <div className={styles.filterControls}>
            <div className={styles.searchWrapper}>
              <Search size={18} className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search caviar, wagyu, cocktails, truffle..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              {searchQuery && (
                <button className={styles.clearSearch} onClick={() => setSearchQuery('')}>
                  <X size={16} />
                </button>
              )}
            </div>

            <div className={styles.dietaryTabs}>
              <button 
                className={clsx(styles.dietTab, dietaryFilter === 'ALL' && styles.dietActive)}
                onClick={() => setDietaryFilter('ALL')}
              >
                All Offerings
              </button>
              <button 
                className={clsx(styles.dietTab, dietaryFilter === 'VEG' && styles.dietActive)}
                onClick={() => setDietaryFilter('VEG')}
              >
                <span className={styles.vegDot}></span> Vegetarian
              </button>
              <button 
                className={clsx(styles.dietTab, dietaryFilter === 'NON_VEG' && styles.dietActive)}
                onClick={() => setDietaryFilter('NON_VEG')}
              >
                <span className={styles.nonVegDot}></span> Non-Vegetarian
              </button>
              <button 
                className={clsx(styles.dietTab, dietaryFilter === 'SIGNATURE' && styles.dietActive)}
                onClick={() => setDietaryFilter('SIGNATURE')}
              >
                <Star size={13} className={styles.starIcon} /> Signatures Only
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Menu Layout */}
      <section className={styles.menuContent}>
        <div className="container">
          <div className={styles.layout}>
            {/* Sticky Sidebar Navigation */}
            <aside className={styles.sidebar}>
              <span className={styles.sidebarTitle}>SECTIONS</span>
              <nav className={styles.categoryNav}>
                {menuCategories.map(cat => (
                  <button
                    key={cat}
                    className={clsx(styles.catBtn, activeCategory === cat && styles.active)}
                    onClick={() => setActiveCategory(cat)}
                  >
                    <span className={styles.catName}>{cat}</span>
                    <span className={styles.catCount}>{categoryCounts[cat] || 0}</span>
                  </button>
                ))}
              </nav>

              <div className={styles.chefNote}>
                <h4>Chef's Tasting Note</h4>
                <p>All our meats are ethically sourced; seafood is air-flown weekly from Tokyo & Brittany. Shaved seasonal truffles are curated from Périgord, France.</p>
              </div>
            </aside>
            
            {/* Menu Items Grid */}
            <main className={styles.mainContent}>
              <div className={styles.categoryHeader}>
                <div>
                  <h2 className={styles.categoryTitle}>{activeCategory}</h2>
                  <p className={styles.categoryDesc}>
                    {activeCategory === 'SIGNATURES' && 'The crown jewels of Ember & Ivory — culinary masterpieces crafted with rare ingredients.'}
                    {activeCategory === 'RAW BAR & CAVIAR' && 'Pristine raw bar selections, air-flown sashimi grade fish, and imperial caviar services.'}
                    {activeCategory === 'SMALL PLATES' && 'Artfully composed appetizer creations infused with wood-fired smoke and bold aromatic profiles.'}
                    {activeCategory === 'SOUPS & SALADS' && 'Silky veloutés and vibrant seasonal botanicals with artisanal dressings.'}
                    {activeCategory === 'MAINS & ROBATA' && 'Slow-braised heritage cuts, Robata-fired steaks, and rich signature gravies.'}
                    {activeCategory === 'BREADS & RICE' && 'Leavened clay-oven artisanal flatbreads and sealed dum handi biryanis.'}
                    {activeCategory === 'DESSERTS' && 'High-concept confectionery featuring single-origin Valrhona chocolate and gold leaf.'}
                    {activeCategory === 'COCKTAILS & RESERVE' && 'Mixology alchemy with rare single malts, botanical tinctures, and aromatic vapor.'}
                    {activeCategory === 'MOCKTAILS & ZERO PROOF' && 'Sophisticated zero-proof distillations, sparkling botanical infusions, and cold-pressed elixirs.'}
                  </p>
                </div>
                <span className={styles.resultsCount}>{filteredItems.length} items</span>
              </div>

              {filteredItems.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>No dishes found matching your current filters in <strong>{activeCategory}</strong>.</p>
                  <button 
                    className={styles.resetBtn} 
                    onClick={() => { setDietaryFilter('ALL'); setSearchQuery(''); }}
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className={styles.grid}>
                  {filteredItems.map((item, i) => (
                    <motion.div 
                      key={item.id}
                      className={styles.menuItem}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.04 }}
                    >
                      <div className={styles.itemImageContainer} onClick={() => setSelectedItemImage(item.image)}>
                        <img src={item.image} alt={item.name} loading="lazy" />
                        <span className={styles.expandHint}>View</span>
                      </div>

                      <div className={styles.itemDetails}>
                        <div className={styles.itemHeader}>
                          <div className={styles.titleWithBadge}>
                            {/* Dietary symbol */}
                            <span 
                              className={clsx(styles.dietSymbol, item.isVegetarian ? styles.vegSymbol : styles.nonVegSymbol)}
                              title={item.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
                            >
                              <span className={styles.innerDot}></span>
                            </span>
                            <h3>{item.name}</h3>
                          </div>
                          <span className={styles.price}>₹{item.price.toLocaleString('en-IN')}</span>
                        </div>

                        <p className={styles.desc}>{item.description}</p>
                        
                        <div className={styles.badges}>
                          {item.tag && (
                            <span className={styles.tagBadge}>
                              <Sparkles size={11} /> {item.tag}
                            </span>
                          )}
                          {item.isSignature && (
                            <span className={styles.sigBadge}>
                              <Star size={11} /> Signature
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {selectedItemImage && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItemImage(null)}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.modalClose} onClick={() => setSelectedItemImage(null)}>
                <X size={24} />
              </button>
              <img src={selectedItemImage} alt="Dish presentation" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}