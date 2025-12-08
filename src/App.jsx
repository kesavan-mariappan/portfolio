import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import heroImage from './assets/kesavan-m-hero-image.png';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const heroY = useTransform(smoothProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'projects', 'tech', 'contact'];
      const scrollPos = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Calculate years of experience from November 2020
  // Format: years.months (e.g., 5.01 = 5 years 1 month, 5.10 = 5 years 10 months)
  const calculateExperience = () => {
    const startDate = new Date(2020, 10, 1); // November 2020 (month is 0-indexed)
    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    // Format as "years.months" with months padded to 2 digits
    return months === 0 ? String(years) : `${years}.${months.toString().padStart(2, '0')}`;
  };

  return (
    <div ref={containerRef} className="bg-black text-white overflow-x-hidden">
      {/* Global DevOps Infinity Loop Animation - Fixed Background */}
      <div className="fixed inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
        {/* Large Thin SVG Infinity with Running Dot */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 200"
          preserveAspectRatio="xMidYMid meet"
          className="absolute"
          style={{ maxWidth: '2000px', maxHeight: '1000px', minWidth: '100vw' }}
        >
          <defs>
            {/* Glow filter for dot */}
            <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Define the infinity path for reference */}
            <path
              id="infinityPath"
              d="M100 100 C100 50, 150 50, 200 100 C250 150, 300 150, 300 100 C300 50, 250 50, 200 100 C150 150, 100 150, 100 100"
              fill="none"
            />
          </defs>

          {/* Static thin infinity outline - more visible */}
          <use href="#infinityPath" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1.5" strokeLinecap="round" />

          {/* Glowing dot running along the path */}
          <circle r="4" fill="cyan" filter="url(#dotGlow)">
            <animateMotion
              dur="5s"
              repeatCount="indefinite"
              path="M100 100 C100 50, 150 50, 200 100 C250 150, 300 150, 300 100 C300 50, 250 50, 200 100 C150 150, 100 150, 100 100"
            />
          </circle>
        </svg>
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/50 border-b border-cyan-500/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent cursor-pointer"
          >
            KM
          </motion.div>
          <div className="flex gap-8">
            {['About', 'Experience', 'Projects', 'Tech', 'Contact'].map((item, i) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                whileHover={{
                  scale: 1.1,
                  color: '#22d3ee',
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                className={`text-gray-300 hover:text-cyan-400 transition-colors relative ${activeSection === item.toLowerCase() ? 'text-cyan-400' : ''
                  }`}
              >
                {item}
                {activeSection === item.toLowerCase() && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        id="hero"
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="min-h-screen flex items-center justify-center relative overflow-hidden py-20"
      >
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, cyan 0.3px, transparent 0)`,
            backgroundSize: '40px 40px',
            opacity: 0.15
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center"
            >
              <div className="relative">
                {/* Glowing circle effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 blur-3xl opacity-50"
                />

                {/* Profile image container */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-cyan-400/30 shadow-2xl shadow-cyan-500/20"
                >
                  <img
                    src={heroImage}
                    alt="Kesavan Mariappan"
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay with gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-600/10" />
                </motion.div>

                {/* Floating particles around image */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.2, 1, 0.2],
                      scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2 + i * 0.3,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Right side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="space-y-6 text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex items-center gap-4"
              >
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-5xl md:text-7xl font-bold leading-tight"
              >
                <span className="text-cyan-400">DevOps Engineer</span>
                <br />
                <span className="text-white">Cloud</span>
                <br />
                <span className="text-white">Infrastructure and Automation</span>
                <br />
                <span className="text-white">Specialist</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-xl text-gray-400 leading-relaxed max-w-xl"
              >
                Building scalable, secure systems that enable businesses to ship faster and scale with confidence
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex gap-4 flex-wrap pt-4"
              >
                <motion.a
                  href="https://drive.google.com/file/d/1YPsVQWkU5LC8q7jEcXRZ1bKfD5NrWV1W/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, backgroundColor: '#0891b2' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-cyan-500 text-white rounded-md font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all inline-block"
                >
                  View Resume
                </motion.a>
                <motion.button
                  onClick={() => window.open('https://www.linkedin.com/in/kesavan-mariappan/', '_blank')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-cyan-500 text-cyan-400 rounded-md font-semibold hover:bg-cyan-500/10 transition-all"
                >
                  View LinkedIn Profile
                </motion.button>
              </motion.div>

              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="pt-8 space-y-3 text-gray-400"
              >
                <p className="text-sm uppercase tracking-wider text-cyan-400/70 font-semibold">Get in Touch</p>
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400">📧</span>
                  <a href="mailto:mkesavan170@gmail.com" className="hover:text-cyan-400 transition-colors">
                    mkesavan170@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400">📞</span>
                  <a href="tel:+919566856628" className="hover:text-cyan-400 transition-colors">
                    +91 9566856628
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </div>
      </motion.section >

      {/* About Section */}
      < Section id="about" title="About Me" >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <AnimatedCard delay={0.2}>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed relative">
              {/* Animated decorative line */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: false }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-transparent rounded-full mb-8"
              />

              {[
                {
                  text: (
                    <>
                      Senior Associate Consultant at <span className="text-cyan-400 font-semibold">Infosys Ltd</span>,
                      with <span className="text-cyan-400 font-semibold">{Math.floor(parseFloat(calculateExperience()))}+ years of hands-on experience</span> in
                      designing, automating, and optimizing cloud-native solutions.
                    </>
                  ),
                  icon: "🚀"
                },
                {
                  text: (
                    <>
                      I specialize in building <span className="text-cyan-400">scalable, secure, and cost-efficient systems</span> using
                      AWS cloud services, Infrastructure as Code, and CI/CD pipelines. My expertise spans containerization,
                      infrastructure migration, and end-to-end DevOps delivery.
                    </>
                  ),
                  icon: "☁️"
                },
                {
                  text: (
                    <>
                      Currently managing centralized <span className="text-cyan-400">GitLab CI/CD pipelines across 100+ AWS Lambda microservices</span> for
                      BT Telecommunication, where I've improved deployment efficiency and operational reliability by
                      <span className="text-cyan-400"> 40% through automation</span>.
                    </>
                  ),
                  icon: "⚡"
                },
                {
                  text: (
                    <>
                      Beyond technical execution, I excel in <span className="text-cyan-400">stakeholder management,
                        requirement gathering, and mentoring teams</span>, acting as a trusted advisor for cloud adoption and DevOps practices.
                    </>
                  ),
                  icon: "🎯"
                }
              ].map((paragraph, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.8 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2 + 0.4,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  whileHover={{
                    x: 10,
                    transition: { duration: 0.3 }
                  }}
                  className="flex gap-4 items-start p-4 rounded-xl hover:bg-cyan-500/5 transition-all group relative overflow-hidden"
                >
                  {/* Hover background effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />

                  <motion.span
                    className="text-3xl flex-shrink-0 relative z-10"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      delay: index * 0.5
                    }}
                  >
                    {paragraph.icon}
                  </motion.span>
                  <p className="relative z-10">{paragraph.text}</p>

                  {/* Decorative corner */}
                  <motion.div
                    className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400/0 rounded-tr-lg group-hover:border-cyan-400/30 transition-colors"
                    whileHover={{ scale: 1.5 }}
                  />
                </motion.div>
              ))}

              {/* Animated skills highlight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 1 }}
                className="mt-8 p-6 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                />
                <h4 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2 relative z-10">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    ⚙️
                  </motion.span>
                  Core Expertise
                </h4>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {['AWS Architecture', 'Terraform', 'Kubernetes', 'CI/CD', 'Python Automation', 'Infrastructure Migration'].map((skill, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: 1.2 + i * 0.1 }}
                      whileHover={{
                        scale: 1.15,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.3 }
                      }}
                      className="px-4 py-2 bg-cyan-500/20 border border-cyan-400/40 rounded-full text-sm text-cyan-300 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={0.4}>
            <div className="space-y-6 relative">
              {/* Animated connecting lines */}
              <svg className="absolute inset-0 w-full h-full -z-10 opacity-10" style={{ overflow: 'visible' }}>
                <motion.path
                  d="M 50 0 Q 50 50, 100 50 T 200 100 T 300 150 T 400 200"
                  stroke="cyan"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </svg>

              <StatCard
                number={calculateExperience()}
                label="Years Experience"
                icon="🚀"
                delay={0.5}
              />
              <StatCard
                number="100"
                label="Microservices Managed"
                icon="⚡"
                delay={0.6}
              />
              <StatCard
                number="40"
                label="Efficiency Improvement"
                icon="🎯"
                delay={0.7}
              />
              <StatCard
                number="15"
                label="Cost Reduction"
                icon="💰"
                delay={0.8}
              />

              {/* Animated achievement badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: false }}
                transition={{
                  duration: 0.8,
                  delay: 0.9,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.5 }
                }}
                className="relative p-6 bg-gradient-to-br from-yellow-500/10 to-orange-600/10 border-2 border-yellow-500/30 rounded-2xl text-center overflow-hidden group cursor-default"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/20 to-yellow-500/0"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="text-5xl mb-2 relative z-10"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🏆
                </motion.div>
                <p className="text-yellow-400 font-bold text-lg relative z-10">Zero Downtime</p>
                <p className="text-gray-400 text-sm relative z-10">AWS Infrastructure Migration</p>
              </motion.div>
            </div>
          </AnimatedCard>
        </div>

        {/* Additional animated metrics bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Cloud Platforms', value: '3+', color: 'from-blue-500 to-cyan-500' },
            { label: 'AWS Services', value: '20+', color: 'from-cyan-500 to-teal-500' },
            { label: 'Tools Mastered', value: '15+', color: 'from-teal-500 to-green-500' },
            { label: 'Projects Delivered', value: '50+', color: 'from-green-500 to-emerald-500' }
          ].map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
              whileHover={{
                y: -5,
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="text-center p-6 bg-gradient-to-br from-gray-900 to-black border border-cyan-500/20 rounded-xl hover:border-cyan-400/50 transition-all relative overflow-hidden group"
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${metric.color} opacity-0 group-hover:opacity-10 transition-opacity`}
              />
              <motion.div
                className={`text-4xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-2`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 1 + i * 0.1, type: "spring", stiffness: 200 }}
              >
                {metric.value}
              </motion.div>
              <div className="text-gray-400 text-sm">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </Section >

      {/* Experience Section */}
      < Section id="experience" title="Experience" >
        <div className="space-y-8">
          <ExperienceCard
            company="Infosys Ltd"
            role="Senior Associate Consultant (DevOps Engineer)"
            period="Aug 2024 – Present"
            project="BT Telecommunication Project"
            achievements={[
              "Managed centralized GitLab CI/CD pipelines across 100+ AWS Lambda microservices",
              "Automated SonarQube reports using Python, comparing weekly quality metrics",
              "Designed secure, scalable infrastructure using AWS (CloudFront, WAF, API Gateway, Cognito)",
              "Migrated entire infrastructure across AWS accounts with zero downtime",
              "Mentored team of 4 engineers on AWS, Linux, Terraform, and GitLab best practices",
              "Improved deployment efficiency and operational reliability by 40%"
            ]}
            delay={0.2}
          />
          <ExperienceCard
            company="Icanio Technologies"
            role="DevOps Engineer"
            period="Dec 2020 – Aug 2024"
            achievements={[
              "Built and maintained CI/CD pipelines using Jenkins, GitHub Actions, and Terraform",
              "Automated provisioning of EKS and ECS clusters with Docker & Kubernetes",
              "Managed cloud migrations and infrastructure automation across AWS, GCP, DigitalOcean",
              "Achieved 15% cost reduction through optimization strategies",
              "Led DevOps projects for Axis Securities, PluginLive, SmartSearch, QPay, and more"
            ]}
            delay={0.4}
          />
        </div>
      </Section >

      {/* Featured Projects */}
      < Section id="projects" title="Featured Projects" dark >
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Multi-Cloud Infrastructure",
              desc: "Deployed scalable infrastructure across AWS, GCP, and DigitalOcean using Terraform and Terragrunt",
              tech: ["Terraform", "AWS", "GCP"],
              color: "from-cyan-500 to-blue-600"
            },
            {
              title: "Zero-Downtime Migration",
              desc: "Migrated entire AWS infrastructure across accounts ensuring zero downtime and optimized cost efficiency",
              tech: ["AWS", "Terraform", "Migration"],
              color: "from-blue-500 to-purple-600"
            },
            {
              title: "Automated Quality Reports",
              desc: "Built Python automation for SonarQube weekly quality metrics with automated email reporting to stakeholders",
              tech: ["Python", "SonarQube", "Automation"],
              color: "from-purple-500 to-pink-600"
            },
            {
              title: "Container Orchestration",
              desc: "Automated provisioning of EKS and ECS clusters with containerized microservices using Docker & Kubernetes",
              tech: ["Kubernetes", "EKS", "Docker"],
              color: "from-pink-500 to-red-600"
            },
            {
              title: "Centralized CI/CD",
              desc: "Managed GitLab CI/CD pipelines for 100+ Lambda microservices integrated with Step Functions",
              tech: ["GitLab CI/CD", "Lambda", "Terraform"],
              color: "from-green-500 to-cyan-600"
            },
            {
              title: "Secure API Gateway",
              desc: "Designed secure, scalable API infrastructure with CloudFront, WAF, API Gateway, and Cognito authentication",
              tech: ["AWS WAF", "API Gateway", "Cognito"],
              color: "from-yellow-500 to-orange-600"
            }
          ].map((project, i) => (
            <ProjectCard key={i} project={project} delay={i * 0.15} />
          ))}
        </div>
      </Section >

      {/* Tech Stack */}
      < Section id="tech" title="Tech Stack" >
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              category: "Cloud Platforms",
              items: ["AWS", "GCP", "DigitalOcean"]
            },
            {
              category: "AWS Services",
              items: ["Lambda", "ECS/EKS", "RDS", "DynamoDB", "CloudFront", "WAF", "S3", "API Gateway"]
            },
            {
              category: "DevOps & IaC",
              items: ["Terraform", "Terragrunt", "GitLab CI/CD", "Jenkins", "GitHub Actions"]
            },
            {
              category: "Containers",
              items: ["Docker", "Kubernetes", "Helm", "ECR"]
            },
            {
              category: "Automation",
              items: ["Python", "Bash", "YAML", "Step Functions"]
            },
            {
              category: "Security & Quality",
              items: ["SonarQube", "AWS WAF", "Cognito", "Secrets Manager", "SSM"]
            },
            {
              category: "Monitoring",
              items: ["CloudWatch", "Grafana", "SNS", "SQS"]
            },
            {
              category: "Databases",
              items: ["MySQL", "PostgreSQL", "RDS", "DynamoDB"]
            }
          ].map((stack, i) => (
            <TechCard key={i} stack={stack} delay={i * 0.1} />
          ))}
        </div>
      </Section >

      {/* Contact Section */}
      < Section id="contact" title="Let's Connect" dark >
        <AnimatedCard delay={0.2}>
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <p className="text-xl text-gray-300">
              Passionate about DevOps, cloud architecture, and automation? Let's connect and share insights on building
              scalable systems, exploring new technologies, or discussing best practices in the tech community.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {[
                {
                  label: "Email",
                  value: "mkesavan170@gmail.com",
                  icon: "📧",
                  link: "mailto:mkesavan170@gmail.com",
                  gradient: "from-red-500/20 via-orange-500/10 to-yellow-500/20"
                },
                {
                  label: "LinkedIn",
                  value: "kesavan-mariappan",
                  icon: "💼",
                  link: "https://linkedin.com/in/kesavan-mariappan",
                  gradient: "from-blue-600/20 via-blue-500/10 to-cyan-500/20"
                },
                {
                  label: "Instagram",
                  value: "@_kesavan_mariappan_",
                  icon: "📸",
                  link: "https://www.instagram.com/_kesavan_mariappan_/",
                  gradient: "from-purple-500/20 via-pink-500/10 to-orange-500/20"
                },
                {
                  label: "GitHub",
                  value: "kesavan-mariappan",
                  icon: "💻",
                  link: "https://github.com/kesavan-mariappan",
                  gradient: "from-gray-500/20 via-slate-500/10 to-zinc-500/20"
                },
                {
                  label: "Medium",
                  value: "@mkesavan170",
                  icon: "✍️",
                  link: "https://medium.com/@mkesavan170",
                  gradient: "from-green-500/20 via-emerald-500/10 to-teal-500/20"
                }
              ].map((contact, i) => (
                <motion.a
                  key={i}
                  href={contact.link || '#'}
                  target={contact.link && !contact.link.startsWith('mailto:') ? "_blank" : undefined}
                  rel={contact.link && !contact.link.startsWith('mailto:') ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 40, scale: 0.9, rotateX: 15 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{
                    delay: i * 0.15 + 0.2,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{
                    scale: 1.08,
                    y: -10,
                    transition: { duration: 0.3, type: "spring", stiffness: 300 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative bg-gradient-to-br ${contact.gradient} border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-400/60 transition-all cursor-pointer group overflow-hidden`}
                >
                  {/* Animated background glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />

                  {/* Glowing border effect on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      boxShadow: '0 0 20px rgba(6, 182, 212, 0.3), inset 0 0 20px rgba(6, 182, 212, 0.1)'
                    }}
                  />

                  {/* Icon with bounce animation */}
                  <motion.div
                    className="text-4xl mb-3 relative z-10"
                    animate={{
                      y: [0, -5, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3 + i * 0.5,
                      ease: "easeInOut"
                    }}
                    whileHover={{
                      scale: 1.3,
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.4 }
                    }}
                  >
                    {contact.icon}
                  </motion.div>

                  {/* Label with slide-in effect */}
                  <motion.div
                    className="text-sm text-gray-400 mb-1 relative z-10 font-medium tracking-wide"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 + 0.4 }}
                  >
                    {contact.label}
                  </motion.div>

                  {/* Value with gradient text on hover */}
                  <motion.div
                    className="text-cyan-400 font-semibold break-all text-sm relative z-10 group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 + 0.5 }}
                  >
                    {contact.value}
                  </motion.div>

                  {/* Corner accent */}
                  <motion.div
                    className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400/0 group-hover:border-cyan-400/60 rounded-tr-lg transition-all duration-300"
                    whileHover={{ scale: 1.5 }}
                  />
                  <motion.div
                    className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400/0 group-hover:border-cyan-400/60 rounded-bl-lg transition-all duration-300"
                    whileHover={{ scale: 1.5 }}
                  />
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="pt-8"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 rounded-full">
                <span className="text-gray-400">Phone:</span>
                <span className="text-cyan-400 font-semibold">+91 9566856628</span>
              </div>
            </motion.div>
          </div>
        </AnimatedCard>
      </Section >

      {/* Footer */}
      < footer className="border-t border-cyan-500/10 py-8 text-center text-gray-500" >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="mb-2">© 2025 Kesavan Mariappan. Building resilient systems, one deployment at a time.</p>
          <div className="mt-4 flex gap-4 justify-center text-cyan-400/60">
            <span>DevOps Engineer</span>
          </div>
        </motion.div>
      </footer >
    </div >
  );
};

const Section = ({ id, title, children, dark }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section
      id={id}
      ref={ref}
      className={`min-h-screen py-20 px-6 ${dark ? 'bg-gradient-to-b from-black to-gray-900' : ''}`}
    >
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-bold mb-16 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          {title}
        </motion.h2>
        {children}
      </motion.div>
    </section>
  );
};

const AnimatedCard = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

const StatCard = ({ number, label, icon, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const target = parseFloat(number);
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(current);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, number]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.8, rotateY: -90 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        scale: 1.08,
        y: -8,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-400/50 transition-all relative overflow-hidden group"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="text-4xl mb-2 relative z-10"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        {icon}
      </motion.div>
      <div className="text-4xl font-bold text-cyan-400 mb-2 relative z-10">
        {typeof count === 'number' ? count.toFixed(number.includes('.') ? 2 : 0) : number}{number.includes('%') ? '%' : number.includes('+') ? '+' : ''}
      </div>
      <div className="text-gray-400 relative z-10">{label}</div>
    </motion.div>
  );
};

const ExperienceCard = ({ company, role, period, project, achievements, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/20 rounded-3xl p-8 hover:border-cyan-400/50 transition-all"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h3 className="text-3xl font-bold text-white mb-2">{company}</h3>
          <p className="text-xl text-cyan-400">{role}</p>
          {project && <p className="text-gray-400 mt-1 italic">{project}</p>}
        </div>
        <div className="text-gray-400 mt-2 md:mt-0">{period}</div>
      </div>

      <ul className="space-y-3">
        {achievements.map((achievement, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: delay + i * 0.1 }}
            className="flex items-start gap-3 text-gray-300"
          >
            <span className="text-cyan-400 mt-1">▹</span>
            <span>{achievement}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

const ProjectCard = ({ project, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, rotateX: 45 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 80, rotateX: 45 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -15, scale: 1.03, rotateY: 2 }}
      className="group relative bg-gradient-to-br from-gray-900 to-black border border-cyan-500/20 rounded-3xl p-8 overflow-hidden hover:border-cyan-400/50 transition-all"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Animated gradient background */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10`}
        animate={isHovered ? {
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        } : {}}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Animated border glow */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: `linear-gradient(${isHovered ? '90deg' : '0deg'}, transparent, rgba(6, 182, 212, 0.3), transparent)`
        }}
        animate={isHovered ? { rotate: 360 } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      <motion.h3
        className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors relative z-10"
        animate={isHovered ? { x: [0, 5, 0] } : {}}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        {project.title}
      </motion.h3>
      <p className="text-gray-400 mb-6 leading-relaxed relative z-10">{project.desc}</p>

      <div className="flex flex-wrap gap-2 relative z-10">
        {project.tech.map((t, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: delay + i * 0.1 + 0.3 }}
            whileHover={{ scale: 1.2, rotate: 5 }}
            className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm text-cyan-400"
          >
            {t}
          </motion.span>
        ))}
      </div>

      {/* Corner accent */}
      <motion.div
        className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-cyan-400/20 rounded-tr-2xl"
        animate={isHovered ? {
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2]
        } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.div>
  );
};

const TechCard = ({ stack, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, rotateX: -45 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: -45 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        y: -8,
        scale: 1.03,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-400/50 transition-all relative overflow-hidden group"
    >
      {/* Animated shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"
        animate={{
          x: ['-200%', '200%']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 5
        }}
      />

      <motion.h3
        className="text-xl font-bold mb-4 text-cyan-400 relative z-10"
        whileHover={{ x: 5 }}
      >
        {stack.category}
      </motion.h3>
      <ul className="space-y-2 relative z-10">
        {stack.items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: delay + i * 0.1 }}
            whileHover={{
              x: 8,
              color: '#22d3ee',
              transition: { duration: 0.2 }
            }}
            className="text-gray-300 hover:text-cyan-400 transition-colors cursor-default flex items-center gap-2"
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              className="text-cyan-400"
            >
              •
            </motion.span>
            {item}
          </motion.li>
        ))}
      </ul>

      {/* Corner decoration */}
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-400/10 rounded-br-xl group-hover:border-cyan-400/30 transition-colors" />
    </motion.div>
  );
};

export default Portfolio;