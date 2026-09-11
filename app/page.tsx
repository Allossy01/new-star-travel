import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import QuickSearch from '@/components/sections/QuickSearch';
import Packages from '@/components/sections/Packages';
import WhyUs from '@/components/sections/WhyUs';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/ui/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <QuickSearch />
      <Packages />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
