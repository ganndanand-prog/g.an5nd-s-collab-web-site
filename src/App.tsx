import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SpotlightHero } from './components/SpotlightHero';
import { AboutSection } from './components/AboutSection';
import { InstagramStatsSection } from './components/InstagramStatsSection';
import { SkillsSection } from './components/SkillsSection';
import { PricingSection } from './components/PricingSection';
import { PrinciplesSection } from './components/PrinciplesSection';
import { MarketingCollabSection } from './components/MarketingCollabSection';
import { ContactSection } from './components/ContactSection';
import { SubmissionsInboxModal } from './components/SubmissionsInboxModal';
import { Footer } from './components/Footer';
import { profileData } from './data/portfolioData';
import { getSubmissions } from './utils/submissionsStorage';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [submissionsCount, setSubmissionsCount] = useState(0);

  // Sync submissions count
  useEffect(() => {
    const updateCount = () => {
      const subs = getSubmissions();
      setSubmissionsCount(subs.filter(s => s.status === 'new').length);
    };
    updateCount();
    window.addEventListener('submissions_updated', updateCount);
    return () => window.removeEventListener('submissions_updated', updateCount);
  }, []);

  // Scroll spy active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'works', 'skills', 'pricing', 'principles', 'collaboration', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors selection:bg-pink-500 selection:text-white">
      
      {/* Navigation */}
      <Navbar
        activeSection={activeSection}
        onOpenInbox={() => setIsInboxOpen(true)}
        submissionsCount={submissionsCount}
      />

      <main>
        {/* 1. Hero Section */}
        <SpotlightHero profile={profileData} />

        {/* 2. "Миний тухай" (About Section) */}
        <AboutSection />

        {/* 3. "Миний бүтээлүүд" & Инстаграм аккаунтын үзэлт, хандалтын тоо */}
        <InstagramStatsSection />

        {/* 4. "Миний эзэмшсэн ур чадварууд" (3 хэсэг бүхий ур чадвар) */}
        <SkillsSection />

        {/* 5. "Хамтын ажиллагааны нөхцөл & Үнийн санал" (Reel хийх багцууд) */}
        <PricingSection />

        {/* 6. "Анхаарах зүйлс & Миний зарчим" (Мөрийтэй тоглоом, ёс бус зүйл сурталчлахгүй) */}
        <PrinciplesSection />

        {/* 7. Хамтын ажиллагааны маягт (Marketing Collaboration Form) */}
        <MarketingCollabSection />

        {/* 8. Холбоо барих хэсэг (Contact Section) */}
        <ContactSection />
      </main>

      {/* 9. Footer */}
      <Footer />

      {/* 10. Submissions Inbox Modal for Anand */}
      <SubmissionsInboxModal
        isOpen={isInboxOpen}
        onClose={() => setIsInboxOpen(false)}
      />

    </div>
  );
}
