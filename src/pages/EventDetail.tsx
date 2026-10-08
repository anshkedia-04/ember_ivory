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