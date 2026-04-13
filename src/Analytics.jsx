import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

const SECTIONS = ['hero', 'about', 'experience', 'personal-projects', 'projects', 'awards', 'tech', 'contact', 'resumeViewed'];

const SECTION_LABELS = {
  'hero': 'Hero',
  'about': 'About',
  'experience': 'Experience',
  'personal-projects': 'Personal Projects',
  'projects': 'Featured Projects',
  'awards': 'Awards',
  'tech': 'Tech',
  'contact': 'Contact',
  'resumeViewed': '📄 Resume Viewed',
  'linkedinViewed': '💼 LinkedIn Viewed',
};

const SectionTable = ({ title, data, sections }) => {
  const total = Object.values(data).reduce((a, b) => a + b, 0);
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold text-gray-300 mb-4">{title}</h2>
      <div className="space-y-4">
        {sections.map((section, i) => {
          const count = data[section] || 0;
          const pct = total > 0 ? (count / total) * 100 : 0;
          const isResume = section === 'resumeViewed';
          const label = SECTION_LABELS[section] || section;
          return (
            <motion.div
              key={section}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className={`border rounded-xl p-5 ${
                isResume ? 'bg-cyan-500/10 border-cyan-400/40' : 'bg-gray-900/60 border-cyan-500/10'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className={`font-medium ${isResume ? 'text-cyan-300' : 'text-white'}`}>{label}</span>
                <span className={`font-bold ${isResume ? 'text-cyan-300 text-lg' : 'text-cyan-400'}`}>{count}</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: i * 0.07 + 0.3 }}
                  className={`h-full rounded-full ${isResume ? 'bg-gradient-to-r from-cyan-300 to-blue-400' : 'bg-gradient-to-r from-cyan-500 to-blue-500'}`}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">{pct.toFixed(1)}% of total</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const Analytics = ({ onBack }) => {
  const [pageViews, setPageViews] = useState(0);
  const [sectionClicks, setSectionClicks] = useState({});
  const [sectionViews, setSectionViews] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubPV = onSnapshot(doc(db, 'analytics', 'pageViews'), (snap) => setPageViews(snap.data()?.count || 0));
    const unsubSC = onSnapshot(doc(db, 'analytics', 'sectionClicks'), (snap) => setSectionClicks(snap.data() || {}));
    const unsubSV = onSnapshot(doc(db, 'analytics', 'sectionViews'), (snap) => {
      setSectionViews(snap.data() || {});
      setLoading(false);
    });
    return () => { unsubPV(); unsubSC(); unsubSV(); };
  }, []);

  const NAV_SECTIONS = ['hero', 'about', 'experience', 'personal-projects', 'projects', 'awards', 'tech', 'contact', 'resumeViewed', 'linkedinViewed'];
  const SCROLL_SECTIONS = ['hero', 'about', 'experience', 'personal-projects', 'projects', 'awards', 'tech', 'contact'];

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 border border-cyan-500/40 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-all text-sm"
          >
            ← Back
          </motion.button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Analytics
          </h1>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-20">Loading...</div>
        ) : (
          <>
            {/* Page Views */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl p-8 mb-10 text-center"
            >
              <div className="text-6xl font-bold text-cyan-400 mb-2">{pageViews.toLocaleString()}</div>
              <div className="text-gray-400 text-lg">Total Page Views</div>
            </motion.div>

            <SectionTable title="Nav Clicks" data={sectionClicks} sections={NAV_SECTIONS} />
            <SectionTable title="Scroll Views" data={sectionViews} sections={SCROLL_SECTIONS} />
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;
