import Navigation from '@/components/layout/Navigation';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import SkillGrid from '@/components/sections/SkillGrid';
import Work from '@/components/sections/Work';
import Engagement from '@/components/sections/Engagement';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Services />
        <SkillGrid />
        <Work />
        <Engagement />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
