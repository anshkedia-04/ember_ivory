import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';
import { saveNewsletterSubscriber } from '../../data/mockDB';
import { useToast } from '../../context/ToastContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      const isNew = saveNewsletterSubscriber(email);
      setSubscribed(true);
      showToast({
        type: 'success',
        title: 'Welcome to the Table',
        message: isNew 
          ? `Subscription confirmed for ${email}. You will receive exclusive reserve invitations.`
          : `You are already on our priority reserve list!`
      });
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerContainer}>
        {/* Main Ivory Rounded Card */}
        <div className={styles.footerCard}>
          {/* Top Brand Header Row */}
          <div className={styles.topHeader}>
            <h1 className={styles.brandTitle}>EMBER & IVORY</h1>
            <p className={styles.tagline}>
              Good food. Great company. Unforgettable nights.
            </p>
          </div>

          {/* Middle 4-Column Navigation & Newsletter Grid */}
          <div className={styles.mainGrid}>
            {/* Column 1: Contact */}
            <div className={styles.col}>
              <span className={styles.colTitle}>CONTACT</span>
              <p className={styles.contactItem}>Ember & Ivory Luxury Dining</p>
              <a href="mailto:ansh.kedia.dev@gmail.com" className={styles.linkItem}>
                ansh.kedia.dev@gmail.com
              </a>
              <a href="tel:+918758838722" className={styles.linkItem}>
                +91 87588 38722
              </a>
              <p className={styles.contactSub}>
                123 Culinary Ave, Bandra West<br />Mumbai, Maharashtra 400050
              </p>
            </div>

            {/* Column 2: Navigation / Explore */}
            <div className={styles.col}>
              <span className={styles.colTitle}>EXPLORE</span>
              <div className={styles.linkList}>
                <Link to="/our-story" className={styles.linkItem}>Our Story</Link>
                <Link to="/menu" className={styles.linkItem}>The Menu</Link>
                <Link to="/experience" className={styles.linkItem}>The Experience</Link>
                <Link to="/events" className={styles.linkItem}>Events & Nightlife</Link>
                <Link to="/gallery" className={styles.linkItem}>Visual Gallery</Link>
                <Link to="/contact" className={styles.linkItem}>Reservations & Enquiries</Link>
              </div>
            </div>

            {/* Column 3: Hours & Social */}
            <div className={styles.col}>
              <span className={styles.colTitle}>HOURS & SOCIAL</span>
              <p className={styles.hoursText}>
                Monday – Sunday<br />
                12:00 PM – 1:30 AM
              </p>
              <div className={styles.socialList}>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.linkItem}>
                  Instagram
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.linkItem}>
                  Facebook
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.linkItem}>
                  YouTube
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.linkItem}>
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Column 4: Newsletter */}
            <div className={styles.colNewsletter}>
              <span className={styles.colTitle}>NEWSLETTER</span>
              <p className={styles.newsletterText}>
                Join the table for private reserve releases, chef tastings & seasonal invitations.
              </p>
              
              <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
                <div className={styles.inputRow}>
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.emailInput}
                    required
                  />
                  <button type="submit" className={styles.submitArrow} aria-label="Subscribe to newsletter">
                    {subscribed ? <Check size={20} className={styles.checkIcon} /> : <ArrowRight size={20} />}
                  </button>
                </div>
              </form>
              
              {subscribed ? (
                <span className={styles.subscribedMsg}>Welcome to the table. We have noted your preference.</span>
              ) : (
                <span className={styles.consentText}>
                  By subscribing, you agree to receive private communications from Ember & Ivory Hospitality Group.
                </span>
              )}
            </div>
          </div>

          {/* Bottom Row: Legal, Admin, and Copyright */}
          <div className={styles.bottomBar}>
            <div className={styles.bottomLeft}>
              <span>Crafted for luxury hospitality</span>
            </div>

            <div className={styles.bottomCenter}>
              <Link to="#" className={styles.legalLink}>Privacy Policy</Link>
              <span className={styles.divider}>•</span>
              <Link to="#" className={styles.legalLink}>Terms & Conditions</Link>
              <span className={styles.divider}>•</span>
              <Link to="/admin" className={styles.adminLink}>Admin Portal</Link>
            </div>

            <div className={styles.bottomRight}>
              <span>© {new Date().getFullYear()} Ember & Ivory. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}