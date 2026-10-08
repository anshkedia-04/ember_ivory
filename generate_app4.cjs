const fs = require('fs');
const path = require('path');

const rootDir = 'd:/ANSH/Restaurant Website/ember-and-ivory';

const files = {
  'src/pages/Experience.tsx': `
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import styles from './Experience.module.scss';
import clsx from 'clsx';

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
`,
  'src/pages/Experience.module.scss': `
.expPage { padding-top: 100px; }
.hero { padding: 80px 0; text-align: center; border-bottom: 1px solid var(--color-border); }
.privateDining { padding: 100px 0; }
.grid { display: grid; grid-template-columns: 1fr; gap: 50px; align-items: center; @media (min-width: 992px) { grid-template-columns: 1fr 1fr; } }
.label { color: var(--color-accent); font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 15px; display: block; }
.content { h2 { font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 30px; } p { color: var(--color-text-muted); font-size: 1.1rem; line-height: 1.8; margin-bottom: 30px; } }
.features { margin-bottom: 40px; list-style: none; li { padding: 10px 0; border-bottom: 1px solid var(--color-border); color: var(--color-text-muted); &::before { content: '•'; color: var(--color-accent); margin-right: 10px; } } }
.images { height: 70vh; img { width: 100%; height: 100%; object-fit: cover; border-radius: 4px; } }
`,
  'src/pages/Gallery.tsx': `
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
`,
  'src/pages/Gallery.module.scss': `
.galleryPage { padding-top: 100px; }
.hero { padding: 80px 0; text-align: center; border-bottom: 1px solid var(--color-border); }
.content { padding: 60px 0 100px; }

.filters { display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; margin-bottom: 50px; }
.filterBtn { font-size: 0.85rem; letter-spacing: 1.5px; padding: 8px 16px; border: 1px solid transparent; color: var(--color-text-muted); transition: all 0.3s;
  &:hover { color: var(--color-text); }
  &.active { border-color: var(--color-accent); color: var(--color-accent); border-radius: 20px; }
}

.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
.imgItem { position: relative; height: 350px; overflow: hidden; cursor: pointer; border-radius: 4px;
  img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
  &:hover img { transform: scale(1.05); }
  &:hover .overlay { opacity: 1; }
}

.overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5); opacity: 0; transition: opacity 0.3s; display: flex; justify-content: center; align-items: center;
  span { color: #fff; font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; border: 1px solid rgba(255,255,255,0.3); padding: 8px 16px; backdrop-filter: blur(4px); }
}

.lightbox { position: fixed; inset: 0; z-index: 1000; background: rgba(0,0,0,0.95); display: flex; justify-content: center; align-items: center; }
.closeBtn { position: absolute; top: 30px; right: 30px; color: #fff; z-index: 10; }
.lbContent { width: 80%; height: 80%; display: flex; justify-content: center; align-items: center;
  img { max-width: 100%; max-height: 100%; object-fit: contain; }
}
.controls { position: absolute; top: 50%; width: 100%; display: flex; justify-content: space-between; padding: 0 5%; transform: translateY(-50%);
  button { color: rgba(255,255,255,0.5); transition: color 0.3s; &:hover { color: #fff; } }
}
`,
  'src/pages/Contact.tsx': `
import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import styles from './Contact.module.scss';
import { saveContactMessage } from '../data/mockDB';

export default function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(fd.entries());
    saveContactMessage(data);
    setStatus('Thank you. Our team will get back to you shortly.');
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setStatus(''), 5000);
  };

  return (
    <div className={styles.contactPage}>
      <section className={styles.hero}>
        <div className="container">
          <motion.h1 className="heading-large" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>GET IN TOUCH</motion.h1>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.info}>
              <h2>Locations</h2>
              <div className={styles.locationList}>
                <div className={styles.locCard}>
                  <h3>MUMBAI</h3>
                  <p>123 Culinary Ave, Bandra West<br/>Mumbai, Maharashtra 400050</p>
                  <p className={styles.phone}>+91 98765 43210</p>
                </div>
                <div className={styles.locCard}>
                  <h3>PUNE</h3>
                  <p>45 North Main Road, Koregaon Park<br/>Pune, Maharashtra 411001</p>
                  <p className={styles.phone}>+91 98765 43211</p>
                </div>
              </div>
              
              <div className={styles.hours}>
                <h3>Opening Hours</h3>
                <p>Monday - Sunday<br/>12:00 PM - 1:30 AM</p>
              </div>
            </div>
            
            <div className={styles.formWrapper}>
              <h2>Send a Message</h2>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <input type="text" name="name" placeholder="Name" required />
                </div>
                <div className={styles.inputGroup}>
                  <input type="email" name="email" placeholder="Email" required />
                </div>
                <div className={styles.inputGroup}>
                  <input type="tel" name="phone" placeholder="Phone (Optional)" />
                </div>
                <div className={styles.inputGroup}>
                  <select name="subject" required>
                    <option value="">Select Subject</option>
                    <option value="Private Event">Private Event</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Careers">Careers</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <textarea name="message" placeholder="Your Message" rows={5} required></textarea>
                </div>
                <Button type="submit" variant="primary">Send Message</Button>
                {status && <p className={styles.success}>{status}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
`,
  'src/pages/Contact.module.scss': `
.contactPage { padding-top: 100px; }
.hero { padding: 80px 0; text-align: center; border-bottom: 1px solid var(--color-border); }
.content { padding: 100px 0; }
.grid { display: grid; grid-template-columns: 1fr; gap: 80px; @media (min-width: 992px) { grid-template-columns: 1fr 1fr; } }
.info { h2 { font-size: 2.5rem; margin-bottom: 40px; } }
.locationList { display: flex; flex-direction: column; gap: 30px; margin-bottom: 50px; }
.locCard { h3 { font-family: var(--font-body); font-size: 1.1rem; letter-spacing: 2px; color: var(--color-accent); margin-bottom: 10px; } p { color: var(--color-text-muted); line-height: 1.6; } .phone { color: var(--color-text); margin-top: 10px; } }
.hours { h3 { font-family: var(--font-body); font-size: 1.1rem; letter-spacing: 2px; color: var(--color-accent); margin-bottom: 10px; text-transform: uppercase; } p { color: var(--color-text-muted); line-height: 1.6; } }

.formWrapper { h2 { font-size: 2.5rem; margin-bottom: 40px; } }
.form { display: flex; flex-direction: column; gap: 20px; }
.inputGroup { 
  input, select, textarea { width: 100%; background: transparent; border: 1px solid var(--color-border); padding: 15px; color: var(--color-text); font-family: var(--font-body); font-size: 1rem; border-radius: 4px; outline: none; transition: border-color 0.3s; &:focus { border-color: var(--color-accent); } }
  select { appearance: none; background: var(--color-surface); }
}
.success { margin-top: 15px; color: #4ade80; }
`,
  'src/pages/Admin.tsx': `
import { useState, useEffect } from 'react';
import { getReservations } from '../data/mockDB';
import styles from './Admin.module.scss';
import { Users, Calendar, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Admin() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    setReservations(getReservations());
    setMessages(JSON.parse(localStorage.getItem('ei_messages') || '[]'));
  }, []);

  return (
    <div className={styles.adminPage}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1>Admin Dashboard</h1>
          <Link to="/">Back to Site</Link>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <Calendar className={styles.icon} />
            <div>
              <h3>Total Reservations</h3>
              <p>{reservations.length}</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <Users className={styles.icon} />
            <div>
              <h3>Total Guests</h3>
              <p>{reservations.reduce((acc, curr) => acc + parseInt(curr.guests), 0)}</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <Mail className={styles.icon} />
            <div>
              <h3>Enquiries</h3>
              <p>{messages.length}</p>
            </div>
          </div>
        </div>

        <div className={styles.tables}>
          <div className={styles.section}>
            <h2>Recent Reservations</h2>
            <div className={styles.tableWrapper}>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Date & Time</th>
                    <th>Guests</th>
                    <th>Phone</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((res: any, i) => (
                    <tr key={i}>
                      <td>{res.id}</td>
                      <td>{res.name}</td>
                      <td>{res.date} at {res.time}</td>
                      <td>{res.guests}</td>
                      <td>{res.phone}</td>
                      <td><span className={styles.status}>{res.status}</span></td>
                    </tr>
                  ))}
                  {reservations.length === 0 && <tr><td colSpan={6}>No reservations found</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
  'src/pages/Admin.module.scss': `
.adminPage { background: #000; min-height: 100vh; color: #fff; font-family: sans-serif; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
.header { background: #111; padding: 20px 0; border-bottom: 1px solid #333; .container { display: flex; justify-content: space-between; align-items: center; } a { color: #888; text-decoration: none; &:hover { color: #fff; } } }
.stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 40px 0; }
.statCard { background: #111; padding: 30px; border-radius: 8px; border: 1px solid #333; display: flex; align-items: center; gap: 20px; .icon { width: 40px; height: 40px; color: #c67c4e; } h3 { color: #888; font-size: 0.9rem; margin-bottom: 5px; text-transform: uppercase; } p { font-size: 2rem; font-weight: bold; } }
.section { background: #111; border-radius: 8px; border: 1px solid #333; padding: 30px; margin-bottom: 40px; h2 { margin-bottom: 20px; font-size: 1.5rem; } }
.tableWrapper { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; th, td { padding: 15px; text-align: left; border-bottom: 1px solid #333; } th { color: #888; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px; } }
.status { background: rgba(74, 222, 128, 0.2); color: #4ade80; padding: 5px 10px; border-radius: 20px; font-size: 0.8rem; }
`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(rootDir, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim());
});

console.log('Final pages added.');
