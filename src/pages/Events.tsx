
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
    desc: 'Chef\'s tasting menu paired with curated wines.',
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
                <Button to={`/events/${evt.id}`} variant="outline">View Details</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}