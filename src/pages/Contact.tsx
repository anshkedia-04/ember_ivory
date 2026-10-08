import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import styles from './Contact.module.scss';
import { saveContactMessage } from '../data/mockDB';
import { useToast } from '../context/ToastContext';

export default function Contact() {
  const [status, setStatus] = useState('');
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(fd.entries());
    const newMsg = saveContactMessage(data);
    setStatus('Thank you. Our hospitality concierge will get back to you shortly.');
    showToast({
      type: 'success',
      title: 'Inquiry Received',
      message: `Reference #${newMsg.id}: We have dispatched your request to the management desk.`
    });
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
                  <p className={styles.phone}>+91 87588 38722</p>
                  <p className={styles.phone}>ansh.kedia.dev@gmail.com</p>
                </div>
                <div className={styles.locCard}>
                  <h3>PUNE</h3>
                  <p>45 North Main Road, Koregaon Park<br/>Pune, Maharashtra 411001</p>
                  <p className={styles.phone}>+91 87588 38722</p>
                  <p className={styles.phone}>ansh.kedia.dev@gmail.com</p>
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
                  <input type="email" name="email" placeholder="ansh.kedia.dev@gmail.com" required />
                </div>
                <div className={styles.inputGroup}>
                  <input type="tel" name="phone" placeholder="8758838722" />
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