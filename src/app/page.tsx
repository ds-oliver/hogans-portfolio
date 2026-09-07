import Navigation from '@/components/layout/Navigation';
import Hero from '@/components/sections/Hero';
import SkillGrid from '@/components/sections/SkillGrid';
import ScrollToTop from '@/components/ui/ScrollToTop';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <SkillGrid />
      </main>
      <ScrollToTop />
    </>
  );
}
