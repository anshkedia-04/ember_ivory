export interface ReservationRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  guests: string;
  date: string;
  time: string;
  seating: string;
  location: string;
  occasion: string;
  specialRequests?: string;
  status: 'Confirmed' | 'Seated' | 'Pending' | 'Completed' | 'Cancelled';
  estimatedSpend?: number;
  vipTag?: string;
  createdAt: string;
}

export interface ContactMessageRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'Unread' | 'In Review' | 'Responded';
  createdAt: string;
}

export interface NewsletterRecord {
  id: string;
  email: string;
  subscribedAt: string;
}

const INITIAL_RESERVATIONS: ReservationRecord[] = [
  {
    id: 'EI-2026-98214',
    name: 'Vikramaditya Singhania',
    phone: '8758838722',
    email: 'ansh.kedia.dev@gmail.com',
    guests: '6',
    date: 'Saturday, 24 October 2026',
    time: '08:30 PM',
    seating: "The Chef's Table",
    location: 'Bandra West, Mumbai',
    occasion: 'Anniversary Celebration',
    specialRequests: 'Dom Pérignon 2013 on arrival, window corner booth, shellfish allergy for 1 guest.',
    status: 'Confirmed',
    estimatedSpend: 28500,
    vipTag: 'VIP Client',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'EI-2026-94812',
    name: 'Princess Ananya Scindia',
    phone: '8758838722',
    email: 'ansh.kedia.dev@gmail.com',
    guests: '8',
    date: 'Saturday, 24 October 2026',
    time: '09:15 PM',
    seating: 'Private Dining Suite',
    location: 'Bandra West, Mumbai',
    occasion: 'Corporate / Business Dining',
    specialRequests: 'Imperial Kaluga Caviar Service & Macallan 18 Reserve pairings pre-ordered.',
    status: 'Seated',
    estimatedSpend: 64000,
    vipTag: 'Black Card Member',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'EI-2026-91204',
    name: 'Rohan & Natasha Mehra',
    phone: '8758838722',
    email: 'natasha.mehra@atelier.com',
    guests: '2',
    date: 'Saturday, 24 October 2026',
    time: '07:45 PM',
    seating: 'The Terrace Garden',
    location: 'Bandra West, Mumbai',
    occasion: 'Romantic Date Night',
    specialRequests: 'Candlelit terrace table overlooking the sea line.',
    status: 'Confirmed',
    estimatedSpend: 14200,
    vipTag: 'Regular Guest',
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString()
  },
  {
    id: 'EI-2026-88310',
    name: 'Marcus Vance (Michelin Guide)',
    phone: '8758838722',
    email: 'm.vance@culinaryreview.co.uk',
    guests: '2',
    date: 'Sunday, 25 October 2026',
    time: '08:00 PM',
    seating: 'The Dining Room',
    location: 'Bandra West, Mumbai',
    occasion: "Chef's Tasting Journey",
    specialRequests: '7-Course Autumn Degustation menu with Sommelier Reserve pairings.',
    status: 'Confirmed',
    estimatedSpend: 32000,
    vipTag: 'Critic Review',
    createdAt: new Date(Date.now() - 3600000 * 14).toISOString()
  },
  {
    id: 'EI-2026-85471',
    name: 'Siddharth Roy Kapur',
    phone: '8758838722',
    email: 'siddharth@filmlogic.in',
    guests: '4',
    date: 'Sunday, 25 October 2026',
    time: '09:00 PM',
    seating: 'The Robata Bar',
    location: 'Bandra West, Mumbai',
    occasion: 'Dinner with Friends',
    specialRequests: 'Robata Wagyu skewers & Smoky Old Fashioneds on table reserve.',
    status: 'Pending',
    estimatedSpend: 22000,
    vipTag: 'VIP Guest',
    createdAt: new Date(Date.now() - 3600000 * 20).toISOString()
  },
  {
    id: 'EI-2026-82190',
    name: 'Dr. Zeeshan & Farida Merchant',
    phone: '8758838722',
    email: 'z.merchant@cardiocare.org',
    guests: '4',
    date: 'Friday, 23 October 2026',
    time: '07:30 PM',
    seating: 'The Dining Room',
    location: 'Koregaon Park, Pune',
    occasion: 'Birthday Dinner',
    specialRequests: 'Complimentary Golden Valrhona Sphere cake with candle.',
    status: 'Completed',
    estimatedSpend: 19500,
    createdAt: new Date(Date.now() - 3600000 * 30).toISOString()
  },
  {
    id: 'EI-2026-79402',
    name: 'Aarav Mahindra',
    phone: '8758838722',
    email: 'aarav.m@capitalventure.com',
    guests: '10',
    date: 'Friday, 30 October 2026',
    time: '08:30 PM',
    seating: 'Private Dining Suite',
    location: 'Indiranagar, Bengaluru',
    occasion: 'Corporate / Business Dining',
    specialRequests: 'Projector setup for discreet deck presentation followed by 5-course banquet.',
    status: 'Confirmed',
    estimatedSpend: 85000,
    vipTag: 'Corporate Account',
    createdAt: new Date(Date.now() - 3600000 * 42).toISOString()
  },
  {
    id: 'EI-2026-76819',
    name: 'Kavita Chawla',
    phone: '8758838722',
    email: 'kavita.c@designhouse.com',
    guests: '2',
    date: 'Thursday, 22 October 2026',
    time: '01:15 PM',
    seating: 'The Dining Room',
    location: 'Aerocity, New Delhi',
    occasion: 'Lunch with Friends',
    specialRequests: 'Strictly vegetarian & gluten-free degustation.',
    status: 'Completed',
    estimatedSpend: 9800,
    createdAt: new Date(Date.now() - 3600000 * 60).toISOString()
  },
  {
    id: 'EI-2026-74102',
    name: 'Aditya Birla Group VIP Desk',
    phone: '8758838722',
    email: 'vipdesk@adityabirla.com',
    guests: '12',
    date: 'Saturday, 31 October 2026',
    time: '08:00 PM',
    seating: 'Private Dining Suite',
    location: 'Bandra West, Mumbai',
    occasion: 'Private Event',
    specialRequests: 'Sommelier curated flight of Burgundy Grands Crus & customized print menus.',
    status: 'Confirmed',
    estimatedSpend: 110000,
    vipTag: 'VIP Reserve',
    createdAt: new Date(Date.now() - 3600000 * 70).toISOString()
  },
  {
    id: 'EI-2026-71092',
    name: 'Elena Rostova',
    phone: '8758838722',
    email: 'elena.rostova@geneva-art.ch',
    guests: '2',
    date: 'Wednesday, 21 October 2026',
    time: '09:30 PM',
    seating: 'The Robata Bar',
    location: 'Bandra West, Mumbai',
    occasion: 'Late Night Cocktails',
    specialRequests: 'Table near the DJ booth.',
    status: 'Cancelled',
    estimatedSpend: 8500,
    createdAt: new Date(Date.now() - 3600000 * 95).toISOString()
  }
];

const INITIAL_MESSAGES: ContactMessageRecord[] = [
  {
    id: 'MSG-4091',
    name: 'Zoya Akhtar Productions',
    email: 'ansh.kedia.dev@gmail.com',
    phone: '8758838722',
    subject: 'Private Event',
    message: 'We are looking to host an exclusive cast & crew wrap party for 60 guests on the Terrace Garden next month. Please share private buyout options and customized beverage packages.',
    status: 'In Review',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString()
  },
  {
    id: 'MSG-3920',
    name: 'Rajesh & Simran Malhotra',
    email: 'rajesh.malhotra@zenith.com',
    phone: '8758838722',
    subject: 'Private Event',
    message: 'Inquiring about hosting an intimate 25th Wedding Anniversary reception for 24 guests in your Private Dining Suite with custom printed tasting menus.',
    status: 'Unread',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'MSG-3811',
    name: 'Sommelier Guild India',
    email: 'sommelierguild@wineindia.org',
    phone: '8758838722',
    subject: 'Feedback',
    message: 'Compliments to your head sommelier on the Burgundy reserve list during our visit last Friday. Exceptional temperature control and pairing notes.',
    status: 'Responded',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

const INITIAL_SUBSCRIBERS: NewsletterRecord[] = [
  { id: 'sub-1', email: 'ansh.kedia.dev@gmail.com', subscribedAt: '2026-10-01' },
  { id: 'sub-2', email: 'luxurytaster@forbes.com', subscribedAt: '2026-10-02' },
  { id: 'sub-3', email: 'concierge@oberoihotels.com', subscribedAt: '2026-10-03' },
  { id: 'sub-4', email: 'gourmand.mumbai@lifestyle.in', subscribedAt: '2026-10-04' }
];

// Helper to get or seed storage
const getStorage = <T>(key: string, defaultData: T): T => {
  const existing = localStorage.getItem(key);
  if (!existing) {
    localStorage.setItem(key, JSON.stringify(defaultData));
    return defaultData;
  }
  try {
    return JSON.parse(existing);
  } catch (e) {
    localStorage.setItem(key, JSON.stringify(defaultData));
    return defaultData;
  }
};

// ==================== RESERVATIONS API ====================

export const getReservations = (): ReservationRecord[] => {
  return getStorage<ReservationRecord[]>('ei_reservations', INITIAL_RESERVATIONS);
};

export const saveReservation = (data: Partial<ReservationRecord>): ReservationRecord => {
  const existing = getReservations();
  const newRes: ReservationRecord = {
    id: `EI-2026-${Math.floor(10000 + Math.random() * 90000)}`,
    name: data.name || 'Anonymous Guest',
    phone: data.phone || '8758838722',
    email: data.email || 'ansh.kedia.dev@gmail.com',
    guests: data.guests || '2',
    date: data.date || 'Saturday, 24 October 2026',
    time: data.time || '08:00 PM',
    seating: data.seating || 'The Dining Room',
    location: data.location || 'Bandra West, Mumbai',
    occasion: data.occasion || 'Dinner with Friends',
    specialRequests: data.specialRequests || '',
    status: 'Confirmed',
    estimatedSpend: parseInt(data.guests || '2') * 4500,
    vipTag: parseInt(data.guests || '2') >= 6 ? 'VIP Party' : undefined,
    createdAt: new Date().toISOString()
  };

  const updated = [newRes, ...existing];
  localStorage.setItem('ei_reservations', JSON.stringify(updated));
  return newRes;
};

export const updateReservationStatus = (
  id: string, 
  status: ReservationRecord['status']
): ReservationRecord[] => {
  const existing = getReservations();
  const updated = existing.map(r => r.id === id ? { ...r, status } : r);
  localStorage.setItem('ei_reservations', JSON.stringify(updated));
  return updated;
};

export const deleteReservation = (id: string): ReservationRecord[] => {
  const existing = getReservations();
  const updated = existing.filter(r => r.id !== id);
  localStorage.setItem('ei_reservations', JSON.stringify(updated));
  return updated;
};

// ==================== INQUIRIES API ====================

export const getContactMessages = (): ContactMessageRecord[] => {
  return getStorage<ContactMessageRecord[]>('ei_messages', INITIAL_MESSAGES);
};

export const saveContactMessage = (data: any): ContactMessageRecord => {
  const existing = getContactMessages();
  const newMsg: ContactMessageRecord = {
    id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
    name: data.name || 'Guest',
    email: data.email || 'ansh.kedia.dev@gmail.com',
    phone: data.phone || '8758838722',
    subject: data.subject || 'General Inquiry',
    message: data.message || '',
    status: 'Unread',
    createdAt: new Date().toISOString()
  };

  const updated = [newMsg, ...existing];
  localStorage.setItem('ei_messages', JSON.stringify(updated));
  return newMsg;
};

export const updateContactStatus = (
  id: string, 
  status: ContactMessageRecord['status']
): ContactMessageRecord[] => {
  const existing = getContactMessages();
  const updated = existing.map(m => m.id === id ? { ...m, status } : m);
  localStorage.setItem('ei_messages', JSON.stringify(updated));
  return updated;
};

// ==================== NEWSLETTER API ====================

export const getNewsletterSubscribers = (): NewsletterRecord[] => {
  return getStorage<NewsletterRecord[]>('ei_subscribers', INITIAL_SUBSCRIBERS);
};

export const saveNewsletterSubscriber = (email: string): boolean => {
  const existing = getNewsletterSubscribers();
  if (existing.some(s => s.email.toLowerCase() === email.toLowerCase())) {
    return false;
  }
  const newSub: NewsletterRecord = {
    id: `sub-${Date.now()}`,
    email,
    subscribedAt: new Date().toISOString().split('T')[0]
  };
  localStorage.setItem('ei_subscribers', JSON.stringify([newSub, ...existing]));
  return true;
};

// ==================== ANALYTICS & DEMO CONTROLS ====================

export const getDashboardAnalytics = () => {
  const reservations = getReservations();
  const messages = getContactMessages();
  const subscribers = getNewsletterSubscribers();

  const totalCovers = reservations.reduce((acc, curr) => acc + parseInt(curr.guests || '1'), 0);
  const totalSpend = reservations
    .filter(r => r.status !== 'Cancelled')
    .reduce((acc, curr) => acc + (curr.estimatedSpend || parseInt(curr.guests || '1') * 4500), 0);
  
  const confirmedCount = reservations.filter(r => r.status === 'Confirmed' || r.status === 'Seated').length;
  const pendingCount = reservations.filter(r => r.status === 'Pending').length;
  const unreadMessages = messages.filter(m => m.status === 'Unread').length;

  return {
    totalBookings: reservations.length,
    totalCovers,
    estimatedRevenue: totalSpend,
    confirmedBookings: confirmedCount,
    pendingBookings: pendingCount,
    unreadInquiries: unreadMessages,
    totalSubscribers: subscribers.length
  };
};

export const resetToDefaultDemoData = () => {
  localStorage.setItem('ei_reservations', JSON.stringify(INITIAL_RESERVATIONS));
  localStorage.setItem('ei_messages', JSON.stringify(INITIAL_MESSAGES));
  localStorage.setItem('ei_subscribers', JSON.stringify(INITIAL_SUBSCRIBERS));
};