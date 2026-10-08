import { useState, useEffect, useMemo } from 'react';
import { 
  getReservations, updateReservationStatus, deleteReservation, saveReservation,
  getContactMessages, updateContactStatus, getNewsletterSubscribers,
  getDashboardAnalytics, resetToDefaultDemoData, 
  type ReservationRecord, type ContactMessageRecord 
} from '../data/mockDB';
import styles from './Admin.module.scss';
import { 
  Users, Calendar, Mail, TrendingUp, Sparkles, Plus, 
  Search, Filter, RotateCcw, Download, Eye, Trash2, X, ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function Admin() {
  const [reservations, setReservations] = useState<ReservationRecord[]>([]);
  const [messages, setMessages] = useState<ContactMessageRecord[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  
  // UI Tabs & Filters
  const [activeTab, setActiveTab] = useState<'reservations' | 'inquiries' | 'subscribers' | 'logs'>('reservations');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [locationFilter, setLocationFilter] = useState<string>('ALL');
  
  // Modals
  const [selectedBooking, setSelectedBooking] = useState<ReservationRecord | null>(null);
  const [isWalkInOpen, setIsWalkInOpen] = useState(false);
  const [walkInForm, setWalkInForm] = useState({
    name: '',
    phone: '8758838722',
    email: 'ansh.kedia.dev@gmail.com',
    guests: '2',
    time: '08:00 PM',
    seating: 'The Dining Room',
    location: 'Bandra West, Mumbai',
    occasion: 'Walk-in Table'
  });

  const { showToast } = useToast();

  const reloadData = () => {
    setReservations(getReservations());
    setMessages(getContactMessages());
    setSubscribers(getNewsletterSubscribers());
  };

  useEffect(() => {
    reloadData();
  }, []);

  // Compute Live Analytics
  const analytics = useMemo(() => {
    return getDashboardAnalytics();
  }, [reservations, messages, subscribers]);

  // Handle Status Change
  const handleStatusChange = (id: string, newStatus: ReservationRecord['status']) => {
    const updated = updateReservationStatus(id, newStatus);
    setReservations(updated);
    showToast({
      type: 'success',
      title: 'Reservation Updated',
      message: `Booking #${id} status changed to ${newStatus}.`
    });
  };

  // Handle Delete
  const handleDeleteBooking = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove reservation #${id} for ${name}?`)) {
      const updated = deleteReservation(id);
      setReservations(updated);
      showToast({
        type: 'info',
        title: 'Reservation Removed',
        message: `Booking #${id} has been archived.`
      });
      if (selectedBooking?.id === id) setSelectedBooking(null);
    }
  };

  // Handle Message Status
  const handleMessageStatus = (id: string, newStatus: ContactMessageRecord['status']) => {
    const updated = updateContactStatus(id, newStatus);
    setMessages(updated);
    showToast({
      type: 'success',
      title: 'Inquiry Status Updated',
      message: `Message #${id} marked as ${newStatus}.`
    });
  };

  // Handle Reset Demo Data
  const handleResetData = () => {
    if (window.confirm('Reset all demo data back to default luxury VIP reservations?')) {
      resetToDefaultDemoData();
      reloadData();
      showToast({
        type: 'info',
        title: 'Demo Data Restored',
        message: 'Pre-populated with 10 VIP reservations and luxury event inquiries.'
      });
    }
  };

  // Handle Quick Walk-in Creation
  const handleWalkInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRes = saveReservation(walkInForm);
    reloadData();
    setIsWalkInOpen(false);
    setWalkInForm({
      name: '',
      phone: '8758838722',
      email: 'ansh.kedia.dev@gmail.com',
      guests: '2',
      time: '08:00 PM',
      seating: 'The Dining Room',
      location: 'Bandra West, Mumbai',
      occasion: 'Walk-in Table'
    });
    showToast({
      type: 'success',
      title: 'Walk-in Table Assigned',
      message: `Reserved #${newRes.id} for ${newRes.name} (${newRes.guests} Guests).`
    });
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Guest Name', 'Phone', 'Email', 'Guests', 'Date', 'Time', 'Area', 'Location', 'Status', 'Estimated Spend'];
    const rows = reservations.map(r => [
      r.id,
      `"${r.name}"`,
      r.phone,
      r.email,
      r.guests,
      `"${r.date}"`,
      r.time,
      `"${r.seating}"`,
      `"${r.location}"`,
      r.status,
      r.estimatedSpend || 0
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Ember_and_Ivory_Reservations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast({
      type: 'success',
      title: 'CSV Export Generated',
      message: `Downloaded ${reservations.length} reservation records.`
    });
  };

  // Filtered reservations
  const filteredReservations = useMemo(() => {
    return reservations.filter(r => {
      const matchesSearch = searchQuery.trim() === '' || 
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.phone.includes(searchQuery);

      const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
      const matchesLoc = locationFilter === 'ALL' || r.location.includes(locationFilter);

      return matchesSearch && matchesStatus && matchesLoc;
    });
  }, [reservations, searchQuery, statusFilter, locationFilter]);

  return (
    <div className={styles.adminPage}>
      {/* Top Command Header */}
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.brandRow}>
            <Link to="/" className={styles.logo}>
              EMBER & IVORY <span>ADMIN SUITE</span>
            </Link>
            <div className={styles.livePill}>
              <span className={styles.liveDot}></span>
              LIVE CLIENT DEMO ENGINE
            </div>
          </div>

          <div className={styles.topActions}>
            <button className={styles.actionBtnOutline} onClick={handleExportCSV} title="Export CSV Report">
              <Download size={15} /> Export CSV
            </button>
            <button className={styles.actionBtnOutline} onClick={handleResetData} title="Restore Sample Data">
              <RotateCcw size={15} /> Reset Demo Data
            </button>
            <button className={styles.primaryBtn} onClick={() => setIsWalkInOpen(true)}>
              <Plus size={16} /> New Table
            </button>
            <Link to="/" className={styles.backLink}>
              Website <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </header>

      <div className={styles.container}>
        {/* Executive KPI Cards */}
        <section className={styles.statsSection}>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>Total Covers</span>
              <Users className={styles.statIcon} size={20} />
            </div>
            <div className={styles.statNumber}>{analytics.totalCovers}</div>
            <div className={styles.statSub}>
              <TrendingUp size={13} color="#22c55e" /> +18% from last week
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>Active Bookings</span>
              <Calendar className={styles.statIcon} size={20} />
            </div>
            <div className={styles.statNumber}>{analytics.totalBookings}</div>
            <div className={styles.statSub}>
              <span className={styles.badgeGreen}>{analytics.confirmedBookings} Confirmed</span>
              <span className={styles.badgeYellow}>{analytics.pendingBookings} Pending</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>Est. Revenue</span>
              <TrendingUp className={styles.statIcon} size={20} />
            </div>
            <div className={styles.statNumber}>₹{analytics.estimatedRevenue.toLocaleString('en-IN')}</div>
            <div className={styles.statSub}>
              Avg. Spend ₹4,500 / cover
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.statLabel}>Client Inquiries</span>
              <Mail className={styles.statIcon} size={20} />
            </div>
            <div className={styles.statNumber}>{messages.length}</div>
            <div className={styles.statSub}>
              <span className={styles.badgeRed}>{analytics.unreadInquiries} New Inquiries</span>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className={styles.tabsNav}>
          <button 
            className={clsx(styles.tabBtn, activeTab === 'reservations' && styles.tabActive)}
            onClick={() => setActiveTab('reservations')}
          >
            <Calendar size={16} /> Table Reservations ({reservations.length})
          </button>
          <button 
            className={clsx(styles.tabBtn, activeTab === 'inquiries' && styles.tabActive)}
            onClick={() => setActiveTab('inquiries')}
          >
            <Mail size={16} /> Banquet & Private Inquiries ({messages.length})
          </button>
          <button 
            className={clsx(styles.tabBtn, activeTab === 'subscribers' && styles.tabActive)}
            onClick={() => setActiveTab('subscribers')}
          >
            <Users size={16} /> Newsletter Subscribers ({subscribers.length})
          </button>
          <button 
            className={clsx(styles.tabBtn, activeTab === 'logs' && styles.tabActive)}
            onClick={() => setActiveTab('logs')}
          >
            <Sparkles size={16} /> Dispatch Logs
          </button>
        </div>

        {/* ================= TAB 1: RESERVATIONS ================= */}
        {activeTab === 'reservations' && (
          <div className={styles.tableCard}>
            {/* Filter Bar */}
            <div className={styles.filterBar}>
              <div className={styles.searchBox}>
                <Search size={16} className={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder="Search by Guest Name, Phone or ID (e.g. Vikram, 8758838722)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className={styles.clearSearch}>
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className={styles.filterGroup}>
                <div className={styles.filterSelectWrap}>
                  <Filter size={14} />
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="ALL">All Statuses</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Seated">Seated</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className={styles.filterSelectWrap}>
                  <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
                    <option value="ALL">All Locations</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Reservations Table */}
            <div className={styles.tableResponsive}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Guest Details</th>
                    <th>Date & Time</th>
                    <th>Area & Covers</th>
                    <th>Est. Spend</th>
                    <th>Live Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.map((res) => (
                    <tr key={res.id}>
                      <td>
                        <strong className={styles.bookingId}>{res.id}</strong>
                        <span className={styles.timeAgo}>
                          {res.occasion}
                        </span>
                      </td>

                      <td>
                        <div className={styles.guestInfo}>
                          <strong>{res.name}</strong>
                          {res.vipTag && (
                            <span className={styles.vipTagBadge}>
                              <Sparkles size={10} /> {res.vipTag}
                            </span>
                          )}
                        </div>
                        <span className={styles.subText}>{res.phone} • {res.email}</span>
                      </td>

                      <td>
                        <strong>{res.date.split(',')[1] || res.date}</strong>
                        <span className={styles.subText}>{res.time}</span>
                      </td>

                      <td>
                        <strong>{res.seating}</strong>
                        <span className={styles.subText}>{res.guests} Guests • {res.location.split(',')[0]}</span>
                      </td>

                      <td>
                        <strong className={styles.spendText}>
                          ₹{(res.estimatedSpend || parseInt(res.guests) * 4500).toLocaleString('en-IN')}
                        </strong>
                      </td>

                      <td>
                        <select 
                          className={clsx(
                            styles.statusSelect,
                            res.status === 'Confirmed' && styles.statusConfirmed,
                            res.status === 'Seated' && styles.statusSeated,
                            res.status === 'Pending' && styles.statusPending,
                            res.status === 'Completed' && styles.statusCompleted,
                            res.status === 'Cancelled' && styles.statusCancelled
                          )}
                          value={res.status}
                          onChange={(e) => handleStatusChange(res.id, e.target.value as any)}
                        >
                          <option value="Confirmed">● Confirmed</option>
                          <option value="Seated">● Seated</option>
                          <option value="Pending">● Pending</option>
                          <option value="Completed">● Completed</option>
                          <option value="Cancelled">● Cancelled</option>
                        </select>
                      </td>

                      <td style={{ textAlign: 'right' }}>
                        <div className={styles.rowActions}>
                          <button 
                            className={styles.iconBtn} 
                            onClick={() => setSelectedBooking(res)} 
                            title="View Reservation Card"
                          >
                            <Eye size={16} />
                          </button>
                          <button 
                            className={clsx(styles.iconBtn, styles.deleteBtn)} 
                            onClick={() => handleDeleteBooking(res.id, res.name)} 
                            title="Cancel / Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredReservations.length === 0 && (
                    <tr>
                      <td colSpan={7} className={styles.emptyRow}>
                        No reservations match your search or filter query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 2: INQUIRIES ================= */}
        {activeTab === 'inquiries' && (
          <div className={styles.tableCard}>
            <div className={styles.tableResponsive}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Ref ID</th>
                    <th>Client / Organiser</th>
                    <th>Subject</th>
                    <th>Message Details</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg) => (
                    <tr key={msg.id}>
                      <td><strong className={styles.bookingId}>{msg.id}</strong></td>
                      <td>
                        <strong>{msg.name}</strong>
                        <span className={styles.subText}>{msg.phone} • {msg.email}</span>
                      </td>
                      <td><span className={styles.subjectBadge}>{msg.subject}</span></td>
                      <td style={{ maxWidth: '400px' }}>
                        <p className={styles.msgBody}>{msg.message}</p>
                      </td>
                      <td>
                        <select 
                          className={clsx(
                            styles.statusSelect,
                            msg.status === 'Unread' && styles.statusPending,
                            msg.status === 'In Review' && styles.statusConfirmed,
                            msg.status === 'Responded' && styles.statusCompleted
                          )}
                          value={msg.status}
                          onChange={(e) => handleMessageStatus(msg.id, e.target.value as any)}
                        >
                          <option value="Unread">● Unread</option>
                          <option value="In Review">● In Review</option>
                          <option value="Responded">● Responded</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                  {messages.length === 0 && (
                    <tr><td colSpan={5} className={styles.emptyRow}>No inquiries recorded.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 3: SUBSCRIBERS ================= */}
        {activeTab === 'subscribers' && (
          <div className={styles.tableCard}>
            <div className={styles.tableResponsive}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Sub ID</th>
                    <th>Subscriber Email</th>
                    <th>Priority Level</th>
                    <th>Subscribed Date</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((sub, i) => (
                    <tr key={sub.id || i}>
                      <td><strong className={styles.bookingId}>SUB-0{i + 1}</strong></td>
                      <td><strong>{sub.email}</strong></td>
                      <td><span className={styles.vipTagBadge}>Exclusive Cellar List</span></td>
                      <td><span className={styles.subText}>{sub.subscribedAt || '2026-10-04'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 4: DISPATCH LOGS ================= */}
        {activeTab === 'logs' && (
          <div className={styles.tableCard}>
            <div className={styles.logsContainer}>
              <div className={styles.logHeader}>
                <h4>Simulated Dispatch Gateway (Demo)</h4>
                <p>All client bookings trigger automated confirmation events to ansh.kedia.dev@gmail.com and guests.</p>
              </div>

              <div className={styles.logsList}>
                {reservations.slice(0, 5).map((r, i) => (
                  <div key={r.id} className={styles.logItem}>
                    <div className={styles.logIcon}>
                      <Mail size={16} />
                    </div>
                    <div className={styles.logContent}>
                      <div className={styles.logTop}>
                        <strong>EMAIL CONFIRMATION DISPATCHED</strong>
                        <span>{new Date(Date.now() - (i * 3600000 * 3)).toLocaleTimeString()}</span>
                      </div>
                      <p>
                        Recipient: <code>{r.email}</code> & Concierge <code>ansh.kedia.dev@gmail.com</code> • Subject: <em>"Table Confirmed: #{r.id} for {r.name}"</em>
                      </p>
                      <span className={styles.logStatus}>✓ 200 OK — Delivery Simulated</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ================= BOOKING DETAIL MODAL ================= */}
      <AnimatePresence>
        {selectedBooking && (
          <div className={styles.modalOverlay} onClick={() => setSelectedBooking(null)}>
            <motion.div 
              className={styles.modalPass}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.modalClose} onClick={() => setSelectedBooking(null)}>
                <X size={20} />
              </button>

              <div className={styles.passHeader}>
                <span className={styles.passTag}>RESERVATION CARD</span>
                <h2>{selectedBooking.name}</h2>
                <p>{selectedBooking.location}</p>
              </div>

              <div className={styles.passGrid}>
                <div className={styles.passCell}>
                  <span>BOOKING ID</span>
                  <strong>{selectedBooking.id}</strong>
                </div>
                <div className={styles.passCell}>
                  <span>STATUS</span>
                  <strong style={{ color: '#22c55e' }}>{selectedBooking.status}</strong>
                </div>
                <div className={styles.passCell}>
                  <span>DATE</span>
                  <strong>{selectedBooking.date}</strong>
                </div>
                <div className={styles.passCell}>
                  <span>TIME</span>
                  <strong>{selectedBooking.time}</strong>
                </div>
                <div className={styles.passCell}>
                  <span>PARTY SIZE</span>
                  <strong>{selectedBooking.guests} Guests</strong>
                </div>
                <div className={styles.passCell}>
                  <span>SEATING AREA</span>
                  <strong>{selectedBooking.seating}</strong>
                </div>
              </div>

              {selectedBooking.specialRequests && (
                <div className={styles.specialReqBlock}>
                  <span>CHEF & DIETARY NOTES:</span>
                  <p>{selectedBooking.specialRequests}</p>
                </div>
              )}

              <div className={styles.passFooter}>
                <button className={styles.primaryBtn} onClick={() => setSelectedBooking(null)}>
                  Close Card
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= QUICK WALK-IN CREATION MODAL ================= */}
      <AnimatePresence>
        {isWalkInOpen && (
          <div className={styles.modalOverlay} onClick={() => setIsWalkInOpen(false)}>
            <motion.div 
              className={styles.walkInModal}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.modalClose} onClick={() => setIsWalkInOpen(false)}>
                <X size={20} />
              </button>

              <div className={styles.passHeader}>
                <span className={styles.passTag}>HOST DESK • WALK-IN ASSIGNMENT</span>
                <h2>New Table Booking</h2>
              </div>

              <form onSubmit={handleWalkInSubmit} className={styles.walkInForm}>
                <div className={styles.inputGroup}>
                  <label>Guest Name *</label>
                  <input 
                    type="text" 
                    placeholder="Guest Name"
                    value={walkInForm.name}
                    onChange={(e) => setWalkInForm({...walkInForm, name: e.target.value})}
                    required
                  />
                </div>

                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      value={walkInForm.phone}
                      onChange={(e) => setWalkInForm({...walkInForm, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Party Size</label>
                    <select 
                      value={walkInForm.guests}
                      onChange={(e) => setWalkInForm({...walkInForm, guests: e.target.value})}
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 12].map(n => (
                        <option key={n} value={n}>{n} Guests</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label>Seating Area</label>
                    <select 
                      value={walkInForm.seating}
                      onChange={(e) => setWalkInForm({...walkInForm, seating: e.target.value})}
                    >
                      <option value="The Dining Room">The Dining Room</option>
                      <option value="The Chef's Table">The Chef's Table</option>
                      <option value="The Robata Bar">The Robata Bar</option>
                      <option value="The Terrace Garden">The Terrace Garden</option>
                      <option value="Private Dining Suite">Private Dining Suite</option>
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Time Slot</label>
                    <select 
                      value={walkInForm.time}
                      onChange={(e) => setWalkInForm({...walkInForm, time: e.target.value})}
                    >
                      <option value="07:00 PM">07:00 PM</option>
                      <option value="07:45 PM">07:45 PM</option>
                      <option value="08:00 PM">08:00 PM</option>
                      <option value="08:30 PM">08:30 PM</option>
                      <option value="09:15 PM">09:15 PM</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className={styles.primaryBtn} style={{ marginTop: '10px' }}>
                  Assign Table & Confirm
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}