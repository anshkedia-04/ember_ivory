const fs = require('fs');
const path = require('path');

const rootDir = 'd:/ANSH/Restaurant Website/ember-and-ivory';

const files = {
  'src/pages/Story.tsx': `
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
`,
  'src/pages/Story.module.scss': `
.storyPage {
  padding-top: 100px;
}

.hero {
  padding: 80px 0;
  text-align: center;
  border-bottom: 1px solid var(--color-border);
}

.content {
  padding: 100px 0;
}

.section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
  margin-bottom: 150px;
  align-items: center;
  
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    gap: 100px;
  }
  
  &.reverse {
    @media (min-width: 992px) {
      .textBlock { order: 2; }
      .imgBlock { order: 1; }
    }
  }
}

.label {
  color: var(--color-accent);
  font-size: 0.8rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  display: block;
  margin-bottom: 15px;
}

.textBlock {
  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: 30px;
  }
  
  p {
    color: var(--color-text-muted);
    font-size: 1.1rem;
    line-height: 1.8;
  }
}

.imgBlock {
  height: 60vh;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
}
`,
  'src/pages/Events.tsx': `
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import styles from './Events.module.scss';
import { Calendar, Clock } from 'lucide-react';

export const eventsList = [
  {
    id: '1',
    title: 'FRIDAY AFTER DARK',
    date: 'Every Friday',
    time: '8:00 PM onwards',
    desc: 'Live DJ • Cocktails • Late-night dining',
    img: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'SUNDAY BRUNCH',
    date: 'Every Sunday',
    time: '11:00 AM – 4:00 PM',
    desc: 'Unlimited brunch • Live music • Family dining',
    img: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'WINE & DINE',
    date: '18 October 2026',
    time: '7:30 PM',
    desc: 'Chef\\'s tasting menu paired with curated wines.',
    img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2670&auto=format&fit=crop'
  }
];

export default function Events() {
  return (
    <div className={styles.eventsPage}>
      <section className={styles.hero}>
        <div className="container">
          <motion.h1 className="heading-large" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>WHAT'S ON</motion.h1>
        </div>
      </section>

      <section className={styles.list}>
        <div className="container">
          {eventsList.map((evt, i) => (
            <motion.div 
              key={evt.id} 
              className={styles.eventCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={styles.eventImg}>
                <img src={evt.img} alt={evt.title} />
              </div>
              <div className={styles.eventInfo}>
                <h2>{evt.title}</h2>
                <div className={styles.meta}>
                  <span><Calendar size={16}/> {evt.date}</span>
                  <span><Clock size={16}/> {evt.time}</span>
                </div>
                <p>{evt.desc}</p>
                <Button to={\`/events/\${evt.id}\`} variant="outline">View Details</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
`,
  'src/pages/Events.module.scss': `
.eventsPage { padding-top: 100px; }
.hero { padding: 80px 0; text-align: center; border-bottom: 1px solid var(--color-border); }
.list { padding: 80px 0; }

.eventCard {
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 40px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    height: 350px;
  }
}

.eventImg {
  @media (min-width: 768px) { width: 50%; }
  img { width: 100%; height: 100%; object-fit: cover; }
}

.eventInfo {
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  @media (min-width: 768px) { width: 50%; }
  
  h2 { font-size: 2rem; margin-bottom: 15px; }
  
  p { color: var(--color-text-muted); margin-bottom: 25px; line-height: 1.6; }
}

.meta {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  color: var(--color-accent);
  font-size: 0.9rem;
  
  span { display: flex; align-items: center; gap: 8px; }
}
`,
  'src/pages/EventDetail.tsx': `
import { useParams, Link } from 'react-router-dom';
import { eventsList } from './Events';
import Button from '../components/ui/Button';
import styles from './EventDetail.module.scss';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

export default function EventDetail() {
  const { id } = useParams();
  const event = eventsList.find(e => e.id === id);

  if (!event) return <div className={styles.notFound}>Event not found</div>;

  return (
    <div className={styles.detailPage}>
      <div className={styles.heroImg}>
        <img src={event.img} alt={event.title} />
        <div className={styles.overlay}></div>
      </div>
      
      <div className="container">
        <div className={styles.content}>
          <Link to="/events" className={styles.back}><ArrowLeft size={16}/> Back to Events</Link>
          
          <h1 className="heading-large">{event.title}</h1>
          
          <div className={styles.meta}>
            <span><Calendar size={20}/> {event.date}</span>
            <span><Clock size={20}/> {event.time}</span>
          </div>
          
          <div className={styles.body}>
            <p className={styles.lead}>{event.desc}</p>
            <p>Join us for an exclusive experience that brings together the best of culinary innovation and vibrant atmosphere. {event.title} is designed to be a celebration of flavors, perfectly curated to elevate your evening.</p>
            
            <h3>Highlights</h3>
            <ul>
              <li>Exclusive menu offerings tailored for the event</li>
              <li>Signature craft cocktails</li>
              <li>Immersive atmosphere with live entertainment</li>
            </ul>
          </div>
          
          <Button variant="primary" className={styles.cta}>Reserve Your Spot</Button>
        </div>
      </div>
    </div>
  );
}
`,
  'src/pages/EventDetail.module.scss': `
.notFound { padding: 200px 0; text-align: center; }
.heroImg {
  position: relative; height: 60vh;
  img { width: 100%; height: 100%; object-fit: cover; }
  .overlay { position: absolute; inset: 0; background: linear-gradient(to top, var(--color-bg), transparent); }
}

.content {
  max-width: 800px; margin: -100px auto 100px; position: relative; z-index: 10;
  background: var(--color-surface); padding: 50px; border-radius: 8px; border: 1px solid var(--color-border);
}

.back { display: inline-flex; align-items: center; gap: 8px; color: var(--color-text-muted); margin-bottom: 30px; &:hover { color: var(--color-text); } }

.meta { display: flex; gap: 30px; margin: 30px 0; color: var(--color-accent); span { display: flex; align-items: center; gap: 10px; font-size: 1.1rem; } }

.body {
  .lead { font-size: 1.3rem; margin-bottom: 30px; color: var(--color-text); }
  p { color: var(--color-text-muted); line-height: 1.8; margin-bottom: 20px; }
  h3 { margin: 40px 0 20px; font-size: 1.5rem; }
  ul { color: var(--color-text-muted); padding-left: 20px; li { margin-bottom: 10px; } }
}

.cta { margin-top: 40px; }
`
};

Object.entries(files).forEach(([filepath, content]) => {
  const fullPath = path.join(rootDir, filepath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim());
});

console.log('Story and Events added.');
