import Navigation from '@/components/layout/Navigation';
import Hero from '@/components/sections/Hero';
import SkillGrid from '@/components/sections/SkillGrid';
import NavigationCards from '@/components/ui/NavigationCards';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Education from '@/components/sections/Education';
import ScrollToTop from '@/components/ui/ScrollToTop';
import PerformanceMetrics from '@/components/ui/PerformanceMetrics';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <SkillGrid />
        <NavigationCards />
        <About />
        <Skills />
        <Projects />
        <Education />
        
        {/* Performance Metrics Section */}
        <section className="py-20 bg-charcoal-200 dark:bg-charcoal-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-f1 tracking-tight sm:text-4xl text-charcoal-900">
                Portfolio Analytics
              </h2>
              <p className="mt-4 text-lg text-charcoal-800">
                Real-time performance and engagement metrics
              </p>
            </div>
            <PerformanceMetrics />
          </div>
        </section>
      </main>
      <ScrollToTop />
    </>
  );
}
