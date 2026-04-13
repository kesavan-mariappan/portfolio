import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { doc, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from './firebase';

const SECTION_LABELS = {
  'hero': 'Hero',
  'about': 'About',
  'experience': 'Experience',
  'personal-projects': 'Personal Projects',
  'projects': 'Featured Projects',
  'awards': 'Awards',
  'tech': 'Tech',
  'contact': 'Contact',
  'resumeViewed': '📄 Resume',
  'linkedinViewed': '💼 LinkedIn (Hero)',
  'contact_email': '📧 Email',
  'contact_linkedin': '💼 LinkedIn',
  'contact_instagram': '📸 Instagram',
  'contact_github': '🐈 GitHub',
  'contact_github_devops': '🐈 GitHub DevOps',
  'contact_medium': '📝 Medium',
  'contact_phone': '📞 Phone (Hero)',
};

const NAV_SECTIONS = ['hero', 'about', 'experience', 'personal-projects', 'projects', 'awards', 'tech', 'contact', 'resumeViewed', 'linkedinViewed'];
const SCROLL_SECTIONS = ['hero', 'about', 'experience', 'personal-projects', 'projects', 'awards', 'tech', 'contact'];
const CONTACT_SECTIONS = ['contact_email', 'contact_linkedin', 'contact_instagram', 'contact_github', 'contact_github_devops', 'contact_medium', 'contact_phone'];

const StatBox = ({ label, value, color = 'cyan', delay = 0 }) => {
  const colors = {
    cyan: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400',
    blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400',
    green: 'from-green-500/20 to-green-600/10 border-green-500/30 text-green-400',
    purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400',
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`bg-gradient-to-br ${colors[color]} border rounded-xl p-5 flex flex-col gap-1`}
    >
      <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">{label}</div>
      <div className={`text-3xl font-bold ${colors[color].split(' ').pop()}`}>{value}</div>
    </motion.div>
  );
};

const BarPanel = ({ title, data, sections, color = '#22d3ee', delay = 0 }) => {
  const total = sections.reduce((sum, s) => sum + (data[s] || 0), 0);
  const max = Math.max(...sections.map(s => data[s] || 0), 1);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-gray-900/80 border border-cyan-500/10 rounded-xl p-5"
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold text-gray-300 uppercase tracking-wider">{title}</span>
        <span className="text-xs text-gray-500">Total: {total}</span>
      </div>
      <div className="space-y-3">
        {sections.map((section, i) => {
          const count = data[section] || 0;
          const pct = (count / max) * 100;
          return (
            <div key={section}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">{SECTION_LABELS[section] || section}</span>
                <span className="text-gray-300 font-mono">{count}</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: delay + i * 0.05 }}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

const Analytics = ({ onBack }) => {
  const [pageViews, setPageViews] = useState(0);
  const [sectionClicks, setSectionClicks] = useState({});
  const [sectionViews, setSectionViews] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const unsubPV = onSnapshot(doc(db, 'analytics', 'pageViews'), (snap) => setPageViews(snap.data()?.count || 0));
    const unsubSC = onSnapshot(doc(db, 'analytics', 'sectionClicks'), (snap) => setSectionClicks(snap.data() || {}));
    const unsubSV = onSnapshot(doc(db, 'analytics', 'sectionViews'), (snap) => {
      setSectionViews(snap.data() || {});
      setLastUpdated(new Date().toLocaleTimeString());
      setLoading(false);
    });
    return () => { unsubPV(); unsubSC(); unsubSV(); };
  }, []);

  const totalNavClicks = NAV_SECTIONS.reduce((s, k) => s + (sectionClicks[k] || 0), 0);
  const totalScrollViews = SCROLL_SECTIONS.reduce((s, k) => s + (sectionViews[k] || 0), 0);
  const totalContactClicks = CONTACT_SECTIONS.reduce((s, k) => s + (sectionClicks[k] || 0), 0);
  const topSection = [...SCROLL_SECTIONS].sort((a, b) => (sectionViews[b] || 0) - (sectionViews[a] || 0))[0];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-cyan-500/10 bg-gray-950/80 backdrop-blur px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <motion.button
            onClick={() => { signOut(auth); onBack(); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1.5 border border-cyan-500/30 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-all text-sm"
          >
            ← Back
          </motion.button>
          <div>
            <h1 className="text-lg font-bold text-white">Portfolio Analytics</h1>
            <p className="text-xs text-gray-500">kesavan-mariappan.github.io</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-gray-500">Live · {lastUpdated}</span>
        </div>
      </div>

      <div className="px-6 py-6 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64 text-gray-500">
            <span className="animate-pulse">Loading data...</span>
          </div>
        ) : (
          <>
            {/* KPI Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatBox label="Page Views" value={pageViews.toLocaleString()} color="cyan" delay={0} />
              <StatBox label="Nav Clicks" value={totalNavClicks} color="blue" delay={0.05} />
              <StatBox label="Scroll Views" value={totalScrollViews} color="purple" delay={0.1} />
              <StatBox label="Contact Clicks" value={totalContactClicks} color="green" delay={0.15} />
            </div>

            {/* Top section + Resume + LinkedIn row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-900/80 border border-cyan-500/10 rounded-xl p-5 flex flex-col justify-between"
              >
                <div className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-2">Most Viewed Section</div>
                <div className="text-2xl font-bold text-white">{SECTION_LABELS[topSection] || topSection}</div>
                <div className="text-cyan-400 text-sm mt-1">{sectionViews[topSection] || 0} views</div>
              </motion.div>
              <StatBox label="📄 Resume Clicks" value={sectionClicks['resumeViewed'] || 0} color="cyan" delay={0.25} />
              <StatBox label="💼 LinkedIn Clicks" value={sectionClicks['linkedinViewed'] || 0} color="blue" delay={0.3} />
            </div>

            {/* Bar panels grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <BarPanel title="Nav Clicks" data={sectionClicks} sections={NAV_SECTIONS} color="#22d3ee" delay={0.35} />
              <BarPanel title="Scroll Views" data={sectionViews} sections={SCROLL_SECTIONS} color="#a78bfa" delay={0.4} />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <BarPanel title="Contact Link Clicks" data={sectionClicks} sections={CONTACT_SECTIONS} color="#34d399" delay={0.45} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;
