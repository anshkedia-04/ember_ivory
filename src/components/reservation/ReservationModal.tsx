import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Users, Check, CheckCircle, 
  ChevronLeft, ChevronRight, Sparkles, MapPin, Download
} from 'lucide-react';
import styles from './ReservationModal.module.scss';
import clsx from 'clsx';
import { saveReservation } from '../../data/mockDB';
import { useToast } from '../../context/ToastContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LOCATIONS = [
  'Bandra West, Mumbai',
  'Koregaon Park, Pune',
  'Indiranagar, Bengaluru',
  'Aerocity, New Delhi'
];

const SEATING_AREAS = [
  { id: 'dining', name: 'The Dining Room', desc: 'Intimate lighting & ambient fine dining' },
  { id: 'chef', name: "The Chef's Table", desc: 'Front-row view of the live kitchen' },
  { id: 'bar', name: 'The Robata Bar', desc: 'Signature cocktail lounge & robata grill' },
  { id: 'terrace', name: 'The Terrace Garden', desc: 'Open-air al fresco starlit seating' },
  { id: 'pdr', name: 'Private Dining Suite', desc: 'Exclusive VIP room (Up to 12 guests)' }
];

const TIME_SLOTS = [
  { time: '12:30 PM', session: 'Lunch' },
  { time: '01:15 PM', session: 'Lunch' },
  { time: '02:00 PM', session: 'Lunch' },
  { time: '07:00 PM', session: 'Dinner' },
  { time: '07:45 PM', session: 'Dinner' },
  { time: '08:30 PM', session: 'Dinner' },
  { time: '09:15 PM', session: 'Dinner' },
  { time: '10:00 PM', session: 'Dinner & Late Night' }
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function ReservationModal({ isOpen, onClose }: Props) {
  // Navigation Steps: 1 = Experience & Guests, 2 = Date & Time, 3 = Guest Details, 4 = Confirmed
  const [step, setStep] = useState(2);
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<any>(null);

  // Form State
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [guests, setGuests] = useState('2');
  const [seatingArea, setSeatingArea] = useState(SEATING_AREAS[0]);
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[5].time); // 8:30 PM default

  // Calendar State (Current visible month & selected day)
  const today = useMemo(() => new Date(), []);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  // Contact Info
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    occasion: 'Dinner with Friends',
    specialRequests: ''
  });

  // Derived selected date object
  const selectedDateObj = useMemo(() => {
    return new Date(currentYear, currentMonth, selectedDay);
  }, [currentYear, currentMonth, selectedDay]);

  const formattedDateString = useMemo(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[selectedDateObj.getDay()];
    const monthName = MONTH_NAMES[selectedDateObj.getMonth()];
    return `${dayName}, ${selectedDateObj.getDate()} ${monthName} ${selectedDateObj.getFullYear()}`;
  }, [selectedDateObj]);

  const shortDateString = useMemo(() => {
    return `${selectedDateObj.getDate()} ${MONTH_NAMES[selectedDateObj.getMonth()]} ${selectedDateObj.getFullYear()}`;
  }, [selectedDateObj]);

  // Generate Calendar Grid Days
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun
    // Adjust so Monday is 0: (firstDayIndex + 6) % 7
    const startingOffset = (firstDayIndex + 6) % 7;
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const days = [];

    // Previous month padding days
    for (let i = startingOffset - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        isPast: true,
        month: currentMonth - 1,
        year: currentYear
      });
    }

    // Current month days
    for (let d = 1; d <= totalDaysInMonth; d++) {
      const thisDate = new Date(currentYear, currentMonth, d);
      const isPast = thisDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      days.push({
        day: d,
        isCurrentMonth: true,
        isPast,
        month: currentMonth,
        year: currentYear
      });
    }

    // Next month padding days to fill 35 or 42 grid cells
    const remaining = 35 - days.length > 0 ? 35 - days.length : (42 - days.length > 0 ? 42 - days.length : 0);
    for (let n = 1; n <= remaining; n++) {
      days.push({
        day: n,
        isCurrentMonth: false,
        isPast: false,
        month: currentMonth + 1,
        year: currentYear
      });
    }

    return days;
  }, [currentYear, currentMonth, today]);

  // Calendar Navigation
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const { showToast } = useToast();

  // Submit Reservation
  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const fullPayload = {
      name: contactData.name,
      phone: contactData.phone,
      email: contactData.email,
      guests: guests,
      date: formattedDateString,
      time: selectedTime,
      seating: seatingArea.name,
      location: location,
      occasion: contactData.occasion,
      specialRequests: contactData.specialRequests
    };

    setTimeout(() => {
      const res = saveReservation(fullPayload);
      setConfirmation(res);
      setLoading(false);
      setStep(4);
      showToast({
        type: 'success',
        title: 'Table Reserved Successfully',
        message: `Booking #${res.id}: Confirmation pass issued for ${res.name} (${res.guests} Guests).`
      });
    }, 1200);
  };

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setStep(2);
      setConfirmation(null);
      setContactData({ name: '', phone: '', email: '', occasion: 'Dinner with Friends', specialRequests: '' });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
        >
          <motion.div 
            className={styles.modalCard}
            initial={{ scale: 0.94, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button className={styles.closeBtn} onClick={resetAndClose} aria-label="Close modal">
              <X size={22} />
            </button>

            {/* Decorative Pearl Necklace / Jewel Graphic Ornament */}
            <div className={styles.decorativeJewels}>
              <svg viewBox="0 0 200 120" className={styles.pearlSvg} fill="none">
                <path 
                  d="M10,20 Q60,90 120,40 T180,60" 
                  stroke="rgba(184, 58, 34, 0.25)" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 6"
                />
                <circle cx="20" cy="30" r="4.5" fill="#ffffff" stroke="#c8924a" strokeWidth="1" />
                <circle cx="45" cy="55" r="5" fill="#ffffff" stroke="#c8924a" strokeWidth="1" />
                <circle cx="75" cy="72" r="5.5" fill="#ffffff" stroke="#c8924a" strokeWidth="1" />
                <circle cx="105" cy="58" r="5" fill="#ffffff" stroke="#c8924a" strokeWidth="1" />
                <circle cx="130" cy="42" r="4.5" fill="#ffffff" stroke="#c8924a" strokeWidth="1" />
                <circle cx="155" cy="50" r="5" fill="#ffffff" stroke="#c8924a" strokeWidth="1" />
                <circle cx="178" cy="62" r="5.5" fill="#ffffff" stroke="#c8924a" strokeWidth="1" />
              </svg>
            </div>

            {/* Step 1, 2, 3 Main Container */}
            <div className={styles.modalContent}>
              
              {/* Header Title with Artistic Flourished Initial Capital */}
              <div className={styles.headerBlock}>
                <div className={styles.titleRow}>
                  <h1 className={styles.mainHeading}>
                    <span className={styles.flourishLetter}>C</span>HOOSE A TIME
                  </h1>
                </div>

                {/* Progress Breadcrumbs */}
                <div className={styles.stepBreadcrumbs}>
                  <span className={clsx(styles.breadcrumb, step === 1 && styles.bcActive)}>
                    1. Experience & Guests
                  </span>
                  <span className={styles.bcDivider}>|</span>
                  <span className={clsx(styles.breadcrumb, step === 2 && styles.bcActive)}>
                    2. Date & Time
                  </span>
                  <span className={styles.bcDivider}>|</span>
                  <span className={clsx(styles.breadcrumb, step === 3 && styles.bcActive)}>
                    3. Guest Details
                  </span>
                  <span className={styles.bcDivider}>|</span>
                  <span className={clsx(styles.breadcrumb, step === 4 && styles.bcActive)}>
                    4. Confirmation
                  </span>
                </div>
              </div>

              {/* ================= STEP 1: Experience & Seating ================= */}
              {step === 1 && (
                <div className={styles.stepOneLayout}>
                  <div className={styles.stepOneGrid}>
                    <div className={styles.selectionPanel}>
                      <h3>Select Dining Outpost</h3>
                      <div className={styles.locationPills}>
                        {LOCATIONS.map(loc => (
                          <button
                            key={loc}
                            type="button"
                            className={clsx(styles.locPill, location === loc && styles.locPillActive)}
                            onClick={() => setLocation(loc)}
                          >
                            <MapPin size={14} /> {loc}
                          </button>
                        ))}
                      </div>

                      <h3 className={styles.subHeading}>Number of Guests</h3>
                      <div className={styles.guestSelector}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <button
                            key={num}
                            type="button"
                            className={clsx(styles.guestBtn, guests === String(num) && styles.guestBtnActive)}
                            onClick={() => setGuests(String(num))}
                          >
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </button>
                        ))}
                      </div>

                      <h3 className={styles.subHeading}>Preferred Dining Experience</h3>
                      <div className={styles.areaGrid}>
                        {SEATING_AREAS.map(area => (
                          <div 
                            key={area.id}
                            className={clsx(styles.areaCard, seatingArea.id === area.id && styles.areaCardActive)}
                            onClick={() => setSeatingArea(area)}
                          >
                            <div className={styles.areaHeader}>
                              <h4>{area.name}</h4>
                              {seatingArea.id === area.id && <Check size={16} className={styles.areaCheck} />}
                            </div>
                            <p>{area.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={styles.stepActionsRight}>
                    <button className={styles.primaryPillBtn} onClick={() => setStep(2)}>
                      Continue to Date & Time <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* ================= STEP 2: The 3-Column Luxury Booking Grid ================= */}
              {step === 2 && (
                <div className={styles.threeColGrid}>
                  
                  {/* Column 1: Experience Summary Pill + Interactive Calendar */}
                  <div className={styles.colCalendar}>
                    {/* Top Experience Selector Box */}
                    <div className={styles.experienceSummaryBox} onClick={() => setStep(1)}>
                      <div className={styles.expIconWrap}>
                        <Users size={18} />
                      </div>
                      <div className={styles.expInfo}>
                        <strong>{seatingArea.name}</strong>
                        <span>{guests} {guests === '1' ? 'Guest' : 'Guests'} • {location.split(',')[0]}</span>
                      </div>
                      <button className={styles.editStepBtn} title="Change area or guests">
                        <ChevronRight size={16} />
                      </button>
                    </div>

                    {/* Interactive Calendar Card */}
                    <div className={styles.calendarCard}>
                      <div className={styles.calendarHeader}>
                        <h4 className={styles.monthLabel}>
                          {MONTH_NAMES[currentMonth]} {currentYear}
                        </h4>
                        <div className={styles.monthNav}>
                          <button type="button" onClick={prevMonth} aria-label="Previous Month">
                            <ChevronLeft size={16} />
                          </button>
                          <button type="button" onClick={nextMonth} aria-label="Next Month">
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Day of Week Headers */}
                      <div className={styles.weekdaysRow}>
                        <span>Mo</span>
                        <span>Tu</span>
                        <span>We</span>
                        <span>Th</span>
                        <span>Fr</span>
                        <span>Sa</span>
                        <span>Su</span>
                      </div>

                      {/* Days Grid */}
                      <div className={styles.daysGrid}>
                        {calendarDays.map((item, idx) => {
                          const isSelected = item.isCurrentMonth && item.day === selectedDay && currentMonth === selectedDateObj.getMonth() && currentYear === selectedDateObj.getFullYear();
                          return (
                            <button
                              key={idx}
                              type="button"
                              disabled={item.isPast || !item.isCurrentMonth}
                              className={clsx(
                                styles.dayCell,
                                !item.isCurrentMonth && styles.otherMonth,
                                item.isPast && styles.pastDay,
                                isSelected && styles.selectedDay
                              )}
                              onClick={() => {
                                if (item.isCurrentMonth && !item.isPast) {
                                  setSelectedDay(item.day);
                                }
                              }}
                            >
                              <span>{item.day}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Date Header + Time Slot List */}
                  <div className={styles.colTimeSlots}>
                    {/* Selected Date Red Banner */}
                    <div className={styles.dateHeaderBanner}>
                      <span>{formattedDateString}</span>
                    </div>

                    {/* Time Slots List */}
                    <div className={styles.slotsList}>
                      {TIME_SLOTS.map((slot, idx) => {
                        const isChosen = selectedTime === slot.time;
                        return (
                          <div 
                            key={idx}
                            className={clsx(styles.timeSlotRow, isChosen && styles.timeSlotChosen)}
                            onClick={() => setSelectedTime(slot.time)}
                          >
                            <div className={styles.slotTimeInfo}>
                              <span className={styles.slotTimeText}>{slot.time}</span>
                              <span className={styles.slotSessionTag}>{slot.session}</span>
                            </div>

                            <div className={styles.radioIndicator}>
                              {isChosen ? (
                                <span className={styles.radioChecked}>
                                  <Check size={12} />
                                </span>
                              ) : (
                                <span className={styles.radioEmpty}></span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Column 3: Receipt Summary Card with Perforated Edge */}
                  <div className={styles.colReceipt}>
                    <div className={styles.receiptCard}>
                      {/* Restaurant Header */}
                      <div className={styles.receiptHeader}>
                        <h4 className={styles.receiptBrand}>Ember & Ivory</h4>
                        <p className={styles.receiptLocation}>{location}</p>
                      </div>

                      {/* Selected Schedule Row */}
                      <div className={styles.receiptMetaRow}>
                        <span className={styles.receiptDate}>{shortDateString}</span>
                        <span className={styles.receiptTime}>{selectedTime}</span>
                      </div>

                      {/* Line Items */}
                      <div className={styles.receiptItemsList}>
                        <div className={styles.receiptItem}>
                          <div>
                            <strong>Table Reservation</strong>
                            <p>{seatingArea.name} ({guests} {guests === '1' ? 'Guest' : 'Guests'})</p>
                          </div>
                          <span className={styles.itemPrice}>Complimentary</span>
                        </div>

                        <div className={styles.receiptItem}>
                          <div>
                            <strong>Chef's Welcome Toast</strong>
                            <p>Sparkling Brut & Amuse-bouche</p>
                          </div>
                          <span className={styles.itemPrice}>Included</span>
                        </div>

                        <div className={styles.receiptItem}>
                          <div>
                            <strong>Cancellation Policy</strong>
                            <p>Free cancellation up to 2 hours before</p>
                          </div>
                          <span className={styles.itemPrice}>Flexible</span>
                        </div>
                      </div>

                      {/* Perforated Divider */}
                      <div className={styles.perforatedLine}></div>

                      {/* Total & Deposit */}
                      <div className={styles.receiptTotalRow}>
                        <span className={styles.totalLabel}>Booking Deposit</span>
                        <span className={styles.totalAmount}>₹0.00</span>
                      </div>

                      {/* Serrated Cut Bottom */}
                      <div className={styles.serratedBottom}></div>
                    </div>

                    {/* Next Action Pill Button */}
                    <button 
                      type="button" 
                      className={styles.nextPillBtn}
                      onClick={() => setStep(3)}
                    >
                      Next <ChevronRight size={18} />
                    </button>
                  </div>

                </div>
              )}

              {/* ================= STEP 3: Guest Contact & Notes ================= */}
              {step === 3 && (
                <form onSubmit={handleFinalSubmit} className={styles.guestDetailsForm}>
                  <div className={styles.formGrid}>
                    <div className={styles.formColLeft}>
                      <h3>Primary Guest Details</h3>
                      <p className={styles.formSubText}>
                        Confirmation details and SMS pass will be dispatched to these coordinates.
                      </p>

                      <div className={styles.inputField}>
                        <label>Full Name *</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Lord Sterling / Ananya Sen" 
                          value={contactData.name} 
                          onChange={(e) => setContactData({...contactData, name: e.target.value})}
                          required 
                        />
                      </div>

                      <div className={styles.inputRowTwo}>
                        <div className={styles.inputField}>
                          <label>Phone Number *</label>
                          <input 
                            type="tel" 
                            placeholder="8758838722" 
                            value={contactData.phone} 
                            onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                            required 
                          />
                        </div>

                        <div className={styles.inputField}>
                          <label>Email Address *</label>
                          <input 
                            type="email" 
                            placeholder="ansh.kedia.dev@gmail.com" 
                            value={contactData.email} 
                            onChange={(e) => setContactData({...contactData, email: e.target.value})}
                            required 
                          />
                        </div>
                      </div>

                      <div className={styles.inputField}>
                        <label>Occasion of Celebration</label>
                        <select 
                          value={contactData.occasion} 
                          onChange={(e) => setContactData({...contactData, occasion: e.target.value})}
                        >
                          <option value="Dinner with Friends">Dinner with Friends</option>
                          <option value="Anniversary Celebration">Anniversary Celebration</option>
                          <option value="Birthday Dinner">Birthday Dinner</option>
                          <option value="Romantic Date Night">Romantic Date Night</option>
                          <option value="Corporate / Business Dining">Corporate / Business Dining</option>
                          <option value="Chef's Tasting Journey">Chef's Tasting Journey</option>
                        </select>
                      </div>

                      <div className={styles.inputField}>
                        <label>Special Dietary Requirements / Chef Notes</label>
                        <textarea 
                          placeholder="e.g. Shellfish allergy, quiet corner table preferred, champagne on arrival..."
                          rows={3}
                          value={contactData.specialRequests}
                          onChange={(e) => setContactData({...contactData, specialRequests: e.target.value})}
                        ></textarea>
                      </div>
                    </div>

                    {/* Summary Mini Receipt in Step 3 */}
                    <div className={styles.formColRight}>
                      <div className={styles.miniBookingSummary}>
                        <span className={styles.miniTag}>RESERVATION SUMMARY</span>
                        <h4>{seatingArea.name}</h4>
                        <p className={styles.miniLoc}>{location}</p>

                        <div className={styles.summaryList}>
                          <div className={styles.sRow}>
                            <span>Date</span>
                            <strong>{shortDateString}</strong>
                          </div>
                          <div className={styles.sRow}>
                            <span>Time Slot</span>
                            <strong>{selectedTime}</strong>
                          </div>
                          <div className={styles.sRow}>
                            <span>Party Size</span>
                            <strong>{guests} {guests === '1' ? 'Guest' : 'Guests'}</strong>
                          </div>
                          <div className={styles.sRow}>
                            <span>Occasion</span>
                            <strong>{contactData.occasion}</strong>
                          </div>
                        </div>

                        <div className={styles.instantBadge}>
                          <Sparkles size={14} /> Instant Confirmation Guaranteed
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.formActions}>
                    <button type="button" className={styles.backLinkBtn} onClick={() => setStep(2)}>
                      ← Back to Calendar
                    </button>
                    <button type="submit" className={styles.confirmPillBtn} disabled={loading}>
                      {loading ? 'Securing Your Table...' : 'Confirm Reservation'}
                    </button>
                  </div>
                </form>
              )}

              {/* ================= STEP 4: Confirmed Receipt Screen ================= */}
              {step === 4 && confirmation && (
                <div className={styles.confirmationScreen}>
                  <div className={styles.successBadge}>
                    <CheckCircle size={56} className={styles.checkIcon} />
                  </div>
                  <h2 className={styles.confTitle}>Your Table is Reserved</h2>
                  <p className={styles.confSubtitle}>
                    A confirmation pass has been registered for <strong>{confirmation.name}</strong>.
                  </p>

                  {/* Luxury Ticket Pass */}
                  <div className={styles.ticketPass}>
                    <div className={styles.ticketTop}>
                      <div>
                        <h3>EMBER & IVORY</h3>
                        <p>{confirmation.location}</p>
                      </div>
                      <div className={styles.ticketIdBlock}>
                        <span>RESERVATION ID</span>
                        <strong>{confirmation.id}</strong>
                      </div>
                    </div>

                    <div className={styles.ticketGrid}>
                      <div className={styles.tCell}>
                        <span>DATE</span>
                        <strong>{confirmation.date}</strong>
                      </div>
                      <div className={styles.tCell}>
                        <span>TIME</span>
                        <strong>{confirmation.time}</strong>
                      </div>
                      <div className={styles.tCell}>
                        <span>GUESTS</span>
                        <strong>{confirmation.guests} Guests</strong>
                      </div>
                      <div className={styles.tCell}>
                        <span>SEATING</span>
                        <strong>{confirmation.seating}</strong>
                      </div>
                    </div>

                    <div className={styles.ticketFooterNote}>
                      <p>Dress code: Smart Elegant • Valet parking is available at the main entrance.</p>
                    </div>
                  </div>

                  <div className={styles.confActions}>
                    <button 
                      type="button" 
                      className={styles.actionBtnOutline} 
                      onClick={() => alert(`Calendar event created for ${confirmation.date} at ${confirmation.time}`)}
                    >
                      <Download size={16} /> Add to Calendar
                    </button>
                    <button type="button" className={styles.actionBtnPrimary} onClick={resetAndClose}>
                      Return to Website
                    </button>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}