import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Work = { title: string; type: string; description: string; image: string; };
type Reel = { title: string; category: string; video: string; poster: string; };

const reels: Reel[] = [
  { title: 'Restaurant & Food Films', category: 'REEL 01 · HOSPITALITY', video: '/videos/reels/restaurant-promo.mp4', poster: '/images/reels/restaurant-promo.jpg' },
  { title: 'Hotel Experiences', category: 'REEL 02 · TRAVEL', video: '/videos/reels/hotel-promo.mp4', poster: '/images/reels/hotel-promo.jpg' },
  { title: 'Website Showcases', category: 'REEL 03 · WEB', video: '/videos/reels/website-showcase.mp4', poster: '/images/reels/website-showcase.jpg' },
  { title: 'Campaign Stories', category: 'REEL 04 · CAMPAIGNS', video: '/videos/reels/digital-ad.mp4', poster: '/images/reels/digital-ad.jpg' },
];

const projects: Work[] = [
  { title: 'Ahmed Foodverse', type: 'HOSPITALITY · WEB EXPERIENCE', description: 'A dark, premium restaurant website concept built around rich food visuals, menu discovery and direct WhatsApp ordering.', image: '/images/projects/ahmed-foodverse.jpg' },
  { title: 'Hospitality Experiences', type: 'HOTELS · CAFÉS · RESTAURANTS', description: 'Digital experiences that help hospitality brands present their spaces, services and signature offerings.', image: '/images/projects/hospitality.jpg' },
  { title: 'Business Websites', type: 'WEB DESIGN · DEVELOPMENT', description: 'Responsive websites designed to make small businesses easier to discover, understand and contact.', image: '/images/projects/business-websites.jpg' },
  { title: 'Campaign Studio', type: 'CREATIVE · SOCIAL MEDIA', description: 'Short-form promotional concepts and creative assets built to communicate a brand message clearly.', image: '/images/projects/campaign-studio.jpg' },
];

const stories = [
  { number: '01', title: 'Behind the Build', tag: 'OUR PROCESS', text: 'Every project begins with understanding the business, its audience and the action the website should inspire.' },
  { number: '02', title: 'The MentorEx Approach', tag: 'OUR THINKING', text: 'Strategy, design and technology come together to create a consistent digital presence—not just a pretty page.' },
  { number: '03', title: 'Design Diaries', tag: 'OUR CRAFT', text: 'From the first wireframe to the finishing details, we focus on clarity, speed and memorable experiences.' },
];

const services = ['Website Design', 'Website Development', 'Social Media Marketing', 'SEO & Local Visibility', 'Branding & Creative Design', 'Video & Ad Creatives', 'Digital Strategy'];

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{copy && <p className="section-copy">{copy}</p>}</div>;
}

function App() {
  const [activeReel, setActiveReel] = useState<Reel | null>(null);
  const [activeProject, setActiveProject] = useState<Work | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = activeReel || activeProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeReel, activeProject]);

  const closeOverlays = () => { setActiveReel(null); setActiveProject(null); };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') closeOverlays(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="site-shell">
      <div className="noise" aria-hidden="true" />
      <header className="navbar">
        <a className="brand" href="#home" aria-label="MentorEx Digital home"><span className="brand-mark">M<span>•</span></span><span className="brand-name">MENTOREX <b>DIGITAL</b></span></a>
        <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? 'CLOSE −' : 'MENU +'}</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          {['Home', 'Reels', 'Projects', 'Our Stories', 'Contact'].map((item) => <a key={item} href={'#' + item.toLowerCase().replaceAll(' ', '-')} onClick={() => setMenuOpen(false)}>{item}</a>)}
        </nav>
        <a className="nav-cta" href="#contact">LET’S TALK <span>↗</span></a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
          <div className="hero-content">
            <motion.p className="eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>INDEPENDENT DIGITAL CREATIVE STUDIO</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, delay: .12 }}>WE MAKE<br /><span>DIGITAL</span> MATTER<span className="red-dot">.</span></motion.h1>
            <motion.div className="hero-bottom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5, duration: .8 }}>
              <p>We build bold digital experiences that help ambitious businesses stand out, connect and grow.</p>
              <a href="#projects" className="round-link" aria-label="Explore projects">↘</a>
            </motion.div>
          </div>
          <div className="hero-meta"><span>STRATEGY / DESIGN / DEVELOPMENT</span><span>SCROLL TO EXPLORE ↓</span><span>EST. 2023</span></div>
          <div className="hero-stamp"><span>CREATIVE<br />THINKING</span><b>✳</b><span>DIGITAL<br />IMPACT</span></div>
        </section>

        <section className="intro-strip">
          <p>GOOD DESIGN GETS ATTENTION.</p><p className="outline">GREAT DIGITAL BUILDS TRUST.</p>
        </section>

        <section className="section reels-section" id="reels">
          <SectionHeading eyebrow="01 / THE SHOWREEL" title={<>SMALL SCREENS.<br /><em>BIG IMPACT.</em></>} copy="A glimpse into the creative work, visual stories and digital moments we bring to life." />
          <div className="reel-grid">
            {reels.map((reel, i) => <motion.button className="reel-card" key={reel.title} onClick={() => setActiveReel(reel)} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * .08, duration: .6 }}>
              <div className="reel-poster" style={{ backgroundImage: `linear-gradient(180deg,rgba(0,0,0,.04),rgba(0,0,0,.72)),url("${reel.poster}")` }}><span className="play-icon">▶</span><span className="reel-index">0{i + 1}</span></div>
              <div className="reel-info"><span>{reel.category}</span><h3>{reel.title}</h3><b>↗</b></div>
            </motion.button>)}
          </div>
          <p className="asset-note">MEDIA NOTE: Add your finished vertical videos to <code>public/videos/reels/</code> and matching poster images to <code>public/images/reels/</code>.</p>
        </section>

        <section className="section projects-section" id="projects">
          <SectionHeading eyebrow="02 / SELECTED WORK" title={<>BUILT WITH<br /><em>INTENTION.</em></>} copy="A selection of digital experiences and creative directions from the MentorEx studio." />
          <div className="project-grid">
            {projects.map((project, i) => <motion.button className={'project-card project-' + i} key={project.title} onClick={() => setActiveProject(project)} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ delay: i * .09 }}>
              <div className="project-image" style={{ backgroundImage: `linear-gradient(180deg,transparent 45%,rgba(0,0,0,.72)),url("${project.image}")` }}><span className="project-number">0{i + 1}</span><span className="project-arrow">↗</span></div>
              <div className="project-info"><span>{project.type}</span><h3>{project.title}</h3></div>
            </motion.button>)}
          </div>
          <p className="asset-note">PROJECT IMAGES: Place approved project screenshots or photography in <code>public/images/projects/</code>. Replace the sample descriptions with verified case-study details before launch.</p>
        </section>

        <section className="manifesto">
          <p className="eyebrow">THE MENTOREX MINDSET</p>
          <h2>NOT JUST AN ONLINE PRESENCE.<br /><span>A REASON TO REMEMBER YOU.</span></h2>
          <p>We combine thoughtful design, practical technology and purposeful storytelling to give businesses a stronger place in the digital world.</p>
        </section>

        <section className="section stories-section" id="our-stories">
          <SectionHeading eyebrow="03 / OUR STORIES" title={<>MORE THAN<br /><em>THE FINISH.</em></>} copy="The thinking, people and little details behind every digital experience." />
          <div className="stories-list">{stories.map((story, i) => <motion.article className="story-row" key={story.number} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * .1 }}><span className="story-number">{story.number}</span><div><p className="eyebrow">{story.tag}</p><h3>{story.title}</h3><p className="story-text">{story.text}</p></div><span className="story-spark">✳</span></motion.article>)}</div>
        </section>

        <section className="services-band"><p className="eyebrow">WHAT WE BRING TO THE TABLE</p><div className="service-ticker">{[...services, ...services].map((service, i) => <span key={service + i}>{service}<b>✳</b></span>)}</div></section>

        <section className="contact-section" id="contact">
          <div className="contact-glow" />
          <div className="contact-content"><p className="eyebrow">04 / HAVE A PROJECT IN MIND?</p><h2>LET’S MAKE<br /><em>IT HAPPEN.</em></h2><p className="contact-copy">Tell us what you’re building. We’ll bring the ideas, the craft and the digital thinking.</p>
            <a className="contact-button" href="mailto:contact@mentorex.in?subject=Project%20enquiry">START A CONVERSATION <span>↗</span></a>
            <div className="contact-details"><div><span>EMAIL US</span><a href="mailto:contact@mentorex.in">contact@mentorex.in</a></div><div><span>OUR PROMISE</span><p>AN EDUCATED CHOICE.</p></div><div><span>FOLLOW THE JOURNEY</span><p>ADD OFFICIAL SOCIAL LINKS</p></div></div>
          </div>
        </section>
      </main>

      <footer className="footer"><a className="brand" href="#home"><span className="brand-mark">M<span>•</span></span><span className="brand-name">MENTOREX <b>DIGITAL</b></span></a><p>© {new Date().getFullYear()} MENTOREX DIGITAL. ALL RIGHTS RESERVED.</p><a href="#home">BACK TO TOP ↑</a></footer>

      <AnimatePresence>
        {activeReel && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeOverlays}><motion.div className="video-modal" initial={{ scale: .94, y: 22 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .96, y: 10 }} onClick={e => e.stopPropagation()}><button className="modal-close" onClick={closeOverlays} aria-label="Close video">×</button><video controls autoPlay playsInline poster={activeReel.poster}><source src={activeReel.video} type="video/mp4" />Your browser does not support video playback.</video><div className="modal-caption"><span>{activeReel.category}</span><h3>{activeReel.title}</h3></div></motion.div></motion.div>}
        {activeProject && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeOverlays}><motion.div className="project-modal" initial={{ scale: .95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .97 }} onClick={e => e.stopPropagation()}><button className="modal-close" onClick={closeOverlays} aria-label="Close project">×</button><div className="project-modal-image" style={{ backgroundImage: `url("${activeProject.image}")` }} /><div className="project-modal-copy"><p className="eyebrow">{activeProject.type}</p><h3>{activeProject.title}</h3><p>{activeProject.description}</p><a href="mailto:contact@mentorex.in?subject=I%20want%20a%20project%20like%20this">DISCUSS A SIMILAR PROJECT ↗</a></div></motion.div></motion.div>}
      </AnimatePresence>
    </div>
  );
}

export default App;
