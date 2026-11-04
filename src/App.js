import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Disclaimer from './components/Disclaimer';
import Footer from './components/Footer';
import FloatingCall from './components/FloatingCall';
import BookingModal from './components/BookingModal';

function App() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <Navbar onBook={() => setBookingOpen(true)} />
      <main>
        <Hero onBook={() => setBookingOpen(true)} />
        <About />
        <Services onBook={() => setBookingOpen(true)} />
        <WhyUs onBook={() => setBookingOpen(true)} />
        <FAQ />
        <Contact onBook={() => setBookingOpen(true)} />
      </main>
      <Disclaimer />
      <Footer />
      <FloatingCall onBook={() => setBookingOpen(true)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}

export default App;
