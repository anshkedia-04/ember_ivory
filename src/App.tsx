import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Experience from './pages/Experience';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Gallery from './pages/Gallery';
import Story from './pages/Story';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import ScrollToTop from './components/utils/ScrollToTop';
import { ToastProvider } from './context/ToastContext';

function App() {
  const location = useLocation();

  return (
    <ToastProvider>
      <ScrollToTop />
      {location.pathname !== '/admin' && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/our-story" element={<Story />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </AnimatePresence>
      {location.pathname !== '/admin' && <Footer />}
    </ToastProvider>
  );
}

export default App;