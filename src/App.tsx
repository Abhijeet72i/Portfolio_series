import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Reel = { id: string; title: string; category: string; video: string; poster: string };
type Project = { id: string; title: string; category: string; description: string; video: string; poster: string };

const reels: Reel[] = Array.from({ length: 5 }, (_, i) => ({
  id: String(i + 1).padStart(2, '0'),
  title: `Reel Placeholder ${i + 1}`,
  category: 'ADD YOUR REEL',
  video: `/videos/reels/reel-${i + 1}.mp4`,
  poster: `/images/reels/reel-${i + 1}.jpg`,
}));

const projects: Project[] = Array.from({ length: 5 }, (_, i) => ({
  id: `project-${String(i + 1).padStart(2, '0')}`,
  title: `Project Placeholder ${i + 1}`,
  category: 'WEBSITE DESIGN & DEVELOPMENT',
  description: 'Add your project description, website link, technologies and project highlights here.',
  video: `/videos/projects/project-${i + 1}-demo.mp4`,
  poster: `/images/projects/project-${i + 1}.jpg`,
}));

const nav = [
  { label: 'Home', path: '/' },
  { label: 'Reels', path: '/reels' },
  { label: 'Projects', path: '/projects' },
  { label: 'Our Stories', path: '/stories' },
  { label: 'Contact', path: '/contact' },
];

function App() {
  const [path, setPath] = useState(window.location.pathname.replace(/\/$/, '') || '/');
  const [intro, setIntro] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [playing, setPlaying] = useState<Reel | Project | null>(null);

  const navigate = (next: string) => {
    window.history.pushState({}, '', next);
    setPath(next);
    setMenuOpen(false);
    setPlaying(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    const pop = () => { setPath(window.location.pathname.replace(/\/$/, '') || '/'); setPlaying(null); };
    window.addEventListener('popstate', pop);
    const timer = window.setTimeout(() => setIntro(false), 2900);
    return () => { window.removeEventListener('popstate', pop); window.clearTimeout(timer); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = playing || intro ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [playing, intro]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setPlaying(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const activeProject = path.startsWith('/projects/') ? projects.find(p => p.id === path.split('/')[2]) : undefined;
  const isActive = (p: string) => p === '/' ? path === '/' : path === p || path.startsWith(p + '/');

  return (
    <div className="site-shell">
      <div className="noise" aria-hidden="true" />
      <AnimatePresence>
        {intro && <motion.div className="brand-intro" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .8 }}>
          <motion.div className="intro-logo-wrap" initial={{ scale: .78, opacity: 0, filter: 'blur(12px)' }} animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 1.1, ease: [0.22,1,0.36,1] }}>
            <img src="/images/mentorex-logo.png" alt="MentorEx" className="intro-logo" onError={e => { e.currentTarget.style.display = 'none'; }} />
            <div className="intro-wordmark">MENTOREX<span> DIGITAL</span></div>
          </motion.div>
          <motion.div className="intro-line" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: .65, duration: .8 }} />
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>AN EDUCATED CHOICE</motion.p>
        </motion.div>}
      </AnimatePresence>

      <header className="navbar">
        <button className="brand brand-button" onClick={() => navigate('/')} aria-label="MentorEx Digital home">
          <img src="/images/mentorex-logo.png" alt="" className="nav-logo" onError={e => { e.currentTarget.style.display = 'none'; }} />
          <span className="brand-name">MENTOREX <b>DIGITAL</b></span>
        </button>
        <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>{menuOpen ? 'CLOSE −' : 'MENU +'}</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          {nav.map(item => <button key={item.path} className={isActive(item.path) ? 'nav-item active' : 'nav-item'} onClick={() => navigate(item.path)}>{item.label}</button>)}
        </nav>
        <button className="nav-cta" onClick={() => navigate('/contact')}>LET’S TALK <span>↗</span></button>
      </header>

      <main>
        {path === '/' && <Home navigate={navigate} />}
        {path === '/reels' && <ReelsPage onPlay={setPlaying} />}
        {path === '/projects' && <ProjectsPage navigate={navigate} />}
        {activeProject && <ProjectDetail project={activeProject} onPlay={() => setPlaying(activeProject)} />}
        {path === '/stories' && <StoriesPage />}
        {path === '/contact' && <ContactPage />}
        {!['/','/reels','/projects','/stories','/contact'].includes(path) && !activeProject && <NotFound navigate={navigate} />}
      </main>

      <footer className="footer"><button className="footer-brand" onClick={() => navigate('/')}><span className="brand-name">MENTOREX <b>DIGITAL</b></span></button><p>© {new Date().getFullYear()} MENTOREX DIGITAL. ALL RIGHTS RESERVED.</p><button onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>BACK TO TOP ↑</button></footer>

      <AnimatePresence>
        {playing && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPlaying(null)}>
          <motion.div className="video-modal" initial={{ scale: .94, y: 22 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .96 }} onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setPlaying(null)} aria-label="Close video">×</button>
            <video controls autoPlay playsInline poster={playing.poster}><source src={playing.video} type="video/mp4" />Your browser does not support video playback.</video>
            <div className="modal-caption"><span>{'category' in playing ? playing.category : 'PROJECT DEMO'}</span><h3>{playing.title}</h3></div>
          </motion.div>
        </motion.div>}
      </AnimatePresence>
    </div>
  );
}

function Home({ navigate }: { navigate: (path: string) => void }) {
  return <>
    <section className="hero" id="home">
      <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
      <div className="hero-content">
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>INDEPENDENT DIGITAL CREATIVE STUDIO</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, delay: .12 }}>WE MAKE<br /><span>DIGITAL</span> MATTER<span className="red-dot">.</span></motion.h1>
        <motion.div className="hero-bottom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }}>
          <p>We build bold digital experiences that help ambitious businesses stand out, connect and grow.</p>
          <button className="round-link" onClick={() => navigate('/projects')} aria-label="Explore projects">↘</button>
        </motion.div>
      </div>
      <div className="hero-meta"><span>STRATEGY / DESIGN / DEVELOPMENT</span><span>SCROLL TO EXPLORE ↓</span><span>EST. 2023</span></div>
      <div className="hero-stamp"><span>CREATIVE<br />THINKING</span><b>✳</b><span>DIGITAL<br />IMPACT</span></div>
    </section>
    <section className="home-feature"><p className="eyebrow">EXPLORE THE MENTOREX UNIVERSE</p><h2>ONE STUDIO.<br /><em>MANY POSSIBILITIES.</em></h2>
      <div className="feature-grid">
        <button onClick={() => navigate('/reels')}><span>01 / SHORT-FORM FILMS</span><b>THE REELS <i>↗</i></b><small>Creative videos, campaigns and visual stories.</small></button>
        <button onClick={() => navigate('/projects')}><span>02 / DIGITAL EXPERIENCES</span><b>THE PROJECTS <i>↗</i></b><small>Explore our website work and live demos.</small></button>
        <button onClick={() => navigate('/stories')}><span>03 / OUR STUDIO</span><b>OUR STORIES <i>↗</i></b><small>The ideas and process behind the work.</small></button>
      </div>
    </section>
    <section className="home-contact"><p className="eyebrow">HAVE AN IDEA?</p><h2>LET’S MAKE<br /><em>IT HAPPEN.</em></h2><button className="contact-button" onClick={() => navigate('/contact')}>START A CONVERSATION ↗</button></section>
  </>;
}

function PageIntro({ eyebrow, title, copy }: { eyebrow: string; title: ReactNode; copy: string }) {
  return <div className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{copy}</p></div>;
}

function ReelsPage({ onPlay }: { onPlay: (reel: Reel) => void }) {
  return <section className="inner-page"><PageIntro eyebrow="01 / THE SHOWREEL" title={<>OUR <em>REELS.</em></>} copy="Five spaces for the videos and creative campaigns you’ll add. Select a card to preview its video once uploaded." />
    <div className="reel-grid reel-grid-five">{reels.map((reel,i) => <motion.button className="reel-card" key={reel.id} onClick={() => onPlay(reel)} initial={{ opacity:0,y:24 }} animate={{ opacity:1,y:0 }} transition={{ delay:i*.08 }}><div className="reel-poster placeholder-poster"><span className="reel-index">{reel.id}</span><span className="placeholder-symbol">＋</span><span className="placeholder-label">VIDEO PLACEHOLDER</span></div><div className="reel-info"><span>{reel.category}</span><h3>{reel.title}</h3><b>↗</b></div></motion.button>)}</div>
    <p className="asset-note">Upload MP4 files as <code>public/videos/reels/reel-1.mp4</code> through <code>reel-5.mp4</code>. Optional poster images: <code>public/images/reels/reel-1.jpg</code> through <code>reel-5.jpg</code>.</p>
  </section>;
}

function ProjectsPage({ navigate }: { navigate: (path: string) => void }) {
  return <section className="inner-page"><PageIntro eyebrow="02 / SELECTED WORK" title={<>OUR <em>PROJECTS.</em></>} copy="Each project has its own page, dedicated demo video and space for project details." />
    <div className="project-grid project-grid-five">{projects.map((project,i) => <motion.button className="project-card" key={project.id} onClick={() => navigate('/projects/' + project.id)} initial={{ opacity:0,y:24 }} animate={{ opacity:1,y:0 }} transition={{ delay:i*.08 }}><div className="project-image project-placeholder"><span className="project-number">{String(i+1).padStart(2,'0')}</span><span className="placeholder-symbol">＋</span><span className="placeholder-label">WEBSITE DEMO PLACEHOLDER</span><span className="project-arrow">↗</span></div><div className="project-info"><span>{project.category}</span><h3>{project.title}</h3></div></motion.button>)}</div>
    <p className="asset-note">Upload each website demo as <code>public/videos/projects/project-1-demo.mp4</code> through <code>project-5-demo.mp4</code>. Optional thumbnails: <code>public/images/projects/project-1.jpg</code> through <code>project-5.jpg</code>.</p>
  </section>;
}

function ProjectDetail({ project, onPlay }: { project: Project; onPlay: () => void }) {
  return <section className="inner-page project-detail"><p className="eyebrow">PROJECT / {project.id.toUpperCase()}</p><h1>{project.title.split(' ').slice(0,1)} <em>{project.title.split(' ').slice(1).join(' ')}</em></h1><p className="detail-lead">{project.description}</p>
    <button className="project-demo-frame" onClick={onPlay}><span className="placeholder-symbol">▶</span><span>PLAY WEBSITE DEMO</span><small>YOUR PROJECT VIDEO WILL APPEAR HERE</small></button>
    <div className="detail-bottom"><div><span>PROJECT TYPE</span><p>{project.category}</p></div><div><span>PROJECT DETAILS</span><p>Add the brief, features, technologies and live website link for this project.</p></div></div>
  </section>;
}

function StoriesPage() {
  return <section className="inner-page"><PageIntro eyebrow="03 / THE STUDIO" title={<>OUR <em>STORIES.</em></>} copy="The thinking, people and little details behind every digital experience." />
    <div className="stories-list">{[{n:'01',t:'Behind the Build',d:'Every project begins with understanding the business, its audience and the action the website should inspire.'},{n:'02',t:'The MentorEx Approach',d:'Strategy, design and technology come together to create a consistent digital presence.'},{n:'03',t:'Design Diaries',d:'From the first wireframe to the finishing details, we focus on clarity, speed and memorable experiences.'}].map(s=><article className="story-row" key={s.n}><span className="story-number">{s.n}</span><div><p className="eyebrow">MENTOREX JOURNAL</p><h3>{s.t}</h3><p className="story-text">{s.d}</p></div><span className="story-spark">✳</span></article>)}</div>
  </section>;
}

function ContactPage() {
  return <section className="inner-page contact-page"><p className="eyebrow">04 / HAVE A PROJECT IN MIND?</p><h1>LET’S MAKE<br /><em>IT HAPPEN.</em></h1><p className="detail-lead">Tell us what you’re building. We’ll bring the ideas, the craft and the digital thinking.</p><a className="contact-button" href="mailto:contact@mentorex.in?subject=Project%20enquiry">EMAIL MENTOREX ↗</a><div className="contact-details"><div><span>EMAIL US</span><a href="mailto:contact@mentorex.in">contact@mentorex.in</a></div><div><span>OUR PROMISE</span><p>AN EDUCATED CHOICE.</p></div></div></section>;
}

function NotFound({ navigate }: { navigate: (path: string) => void }) {
  return <section className="inner-page"><p className="eyebrow">404 / NOT FOUND</p><h1>THIS PAGE<br /><em>IS MISSING.</em></h1><button className="contact-button" onClick={() => navigate('/')}>BACK HOME ↗</button></section>;
}

export default App;
