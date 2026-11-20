import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Reel = { id: number; title: string; video: string; poster: string; };
type Project = { id: number; title: string; category: string; summary: string; video: string; poster: string; };

const reels: Reel[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1, title: `Reel Placeholder 0${i + 1}`,
  video: `/videos/reels/reel-0${i + 1}.mp4`, poster: `/images/reels/reel-0${i + 1}.jpg`,
}));
const projects: Project[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1, title: `Project Placeholder 0${i + 1}`,
  category: 'WEBSITE DESIGN · DEVELOPMENT',
  summary: 'Add your project title, description and website demo video here. This dedicated project page is ready for your content.',
  video: `/videos/projects/project-0${i + 1}.mp4`, poster: `/images/projects/project-0${i + 1}.jpg`,
}));

function Logo({ large = false }: { large?: boolean }) {
  return <a className={large ? 'brand brand-large' : 'brand'} href="/" onClick={(e) => navigate(e, '/') } aria-label="MentorEx Digital home">
    <span className="brand-mark">M<span>•</span></span><span className="brand-name">MENTOREX <b>DIGITAL</b></span>
  </a>;
}
let routeTo: ((path: string) => void) | null = null;
function navigate(e: React.MouseEvent<HTMLAnchorElement>, path: string) {
  e.preventDefault(); routeTo?.(path);
}
function Link({ to, children, className = '' }: { to: string; children: React.ReactNode; className?: string }) {
  return <a href={to} className={className} onClick={(e) => navigate(e, to)}>{children}</a>;
}
function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  const links = [{ label: 'Home', to: '/' }, { label: 'Reels', to: '/reels' }, { label: 'Projects', to: '/projects' }, { label: 'Our Stories', to: '/stories' }, { label: 'Contact', to: '/contact' }];
  return <header className="navbar">
    <Logo />
    <button className="menu-toggle" onClick={() => setOpen(v => !v)}>{open ? 'CLOSE −' : 'MENU +'}</button>
    <nav className={open ? 'nav-links open' : 'nav-links'}>{links.map(l => <Link key={l.to} to={l.to} className={path === l.to || (l.to === '/projects' && path.startsWith('/projects/')) ? 'active' : ''}>{l.label}</Link>)}</nav>
    <Link to="/contact" className="nav-cta">LET’S TALK <span>↗</span></Link>
  </header>;
}
function PageIntro({ number, eyebrow, title, copy }: { number: string; eyebrow: string; title: React.ReactNode; copy: string }) {
  return <div className="page-intro"><p className="eyebrow">{number} / {eyebrow}</p><h1>{title}</h1><p className="page-copy">{copy}</p></div>;
}
function Footer() {
  return <footer className="footer"><Logo /><p>© {new Date().getFullYear()} MENTOREX DIGITAL. ALL RIGHTS RESERVED.</p><Link to="/">BACK TO HOME ↑</Link></footer>;
}
function ReelCard({ reel }: { reel: Reel }) {
  return <article className="media-card"><div className="media-poster" style={{ backgroundImage: `linear-gradient(180deg,transparent,rgba(0,0,0,.75)),url("${reel.poster}")` }}><span className="media-index">0{reel.id}</span><span className="media-play">▶</span><span className="placeholder-tag">VIDEO SLOT</span></div><div className="media-caption"><span>MENTOREX REEL · 0{reel.id}</span><h2>{reel.title}</h2><p>Upload your vertical reel to <code>{reel.video}</code></p></div></article>;
}
function ProjectCard({ project }: { project: Project }) {
  return <Link to={`/projects/project-0${project.id}`} className="project-tile"><div className="project-poster" style={{ backgroundImage: `linear-gradient(180deg,transparent,rgba(0,0,0,.8)),url("${project.poster}")` }}><span className="media-index">0{project.id}</span><span className="project-open">VIEW PROJECT ↗</span><span className="placeholder-tag">DEMO VIDEO SLOT</span></div><div className="media-caption"><span>{project.category}</span><h2>{project.title}</h2><p>Open dedicated project page</p></div></Link>;
}
function HomePage() {
  return <><section className="hero home-hero"><div className="hero-orb orb-one"/><div className="hero-orb orb-two"/><div className="hero-content"><p className="eyebrow">INDEPENDENT DIGITAL CREATIVE STUDIO</p><h1>WE MAKE<br/><span>DIGITAL</span> MATTER<span className="red-dot">.</span></h1><div className="hero-bottom"><p>We build bold digital experiences that help ambitious businesses stand out, connect and grow.</p><Link to="/projects" className="round-link">↘</Link></div></div><div className="hero-meta"><span>STRATEGY / DESIGN / DEVELOPMENT</span><span>SCROLL TO EXPLORE ↓</span><span>AN EDUCATED CHOICE</span></div><div className="hero-stamp"><span>CREATIVE<br/>THINKING</span><b>✳</b><span>DIGITAL<br/>IMPACT</span></div></section>
    <section className="home-feature"><p className="eyebrow">EXPLORE THE MENTOREX UNIVERSE</p><h2>ONE STUDIO.<br/><em>MANY POSSIBILITIES.</em></h2><div className="feature-links"><Link to="/reels">01 — WATCH OUR REELS <span>↗</span></Link><Link to="/projects">02 — EXPLORE PROJECTS <span>↗</span></Link><Link to="/stories">03 — OUR STORIES <span>↗</span></Link></div></section>
    <section className="home-contact"><p className="eyebrow">HAVE AN IDEA?</p><h2>LET’S MAKE<br/><em>IT HAPPEN.</em></h2><Link to="/contact" className="contact-button">START A CONVERSATION ↗</Link></section></>;
}
function ReelsPage() {
  return <section className="inner-page"><PageIntro number="01" eyebrow="THE SHOWREEL" title={<>SHORT FORM.<br/><em>BIG IMPACT.</em></>} copy="Five dedicated spaces for the reels you’ll upload. Each card is ready for your video and poster artwork."/><div className="media-grid">{reels.map(r => <ReelCard key={r.id} reel={r}/>)}</div><p className="asset-note">Upload MP4 files to <code>public/videos/reels/</code> and matching JPG poster images to <code>public/images/reels/</code>.</p></section>;
}
function ProjectsPage() {
  return <section className="inner-page"><PageIntro number="02" eyebrow="SELECTED WORK" title={<>MADE TO<br/><em>MAKE AN IMPACT.</em></>} copy="Explore each project on its own page. Add a website demo video, screenshots and project details whenever you’re ready."/><div className="project-grid">{projects.map(p => <ProjectCard key={p.id} project={p}/>)}</div><p className="asset-note">Upload project demo MP4 files to <code>public/videos/projects/</code> and poster JPGs to <code>public/images/projects/</code>.</p></section>;
}
function ProjectDetail({ project }: { project: Project }) {
  return <section className="inner-page project-detail"><Link to="/projects" className="back-link">← ALL PROJECTS</Link><PageIntro number={`PROJECT 0${project.id}`} eyebrow={project.category} title={<>{project.title.split(' ')[0]}<br/><em>{project.title.split(' ').slice(1).join(' ') || 'SHOWCASE'}</em></>} copy={project.summary}/><div className="demo-frame"><div className="demo-label">WEBSITE DEMO · VIDEO PLACEHOLDER</div><video controls playsInline poster={project.poster}><source src={project.video} type="video/mp4"/>Your browser does not support video playback.</video><p>Place your website walkthrough video at <code>{project.video}</code>.</p></div><div className="detail-bottom"><div><span>PROJECT TYPE</span><p>Website Design & Development</p></div><div><span>BUILT BY</span><p>MentorEx Digital</p></div><div><span>WANT SOMETHING SIMILAR?</span><Link to="/contact">LET’S TALK ↗</Link></div></div><div className="detail-pagination">{project.id > 1 ? <Link to={`/projects/project-0${project.id - 1}`}>← PREVIOUS PROJECT</Link> : <span/>}{project.id < 5 ? <Link to={`/projects/project-0${project.id + 1}`}>NEXT PROJECT →</Link> : <Link to="/projects">BACK TO PROJECTS →</Link>}</div></section>;
}
function StoriesPage() {
  const stories = [{n:'01',t:'BEHIND THE BUILD',d:'Every project starts with listening. We understand the business, the audience and the goal before shaping the digital experience.'},{n:'02',t:'THE MENTOREX APPROACH',d:'Strategy, design and technology come together to build a clear and consistent digital presence.'},{n:'03',t:'DESIGN DIARIES',d:'From the first wireframe to the finishing details, we care about clarity, usability and memorable experiences.'}];
  return <section className="inner-page"><PageIntro number="03" eyebrow="OUR STORIES" title={<>THE THINKING<br/><em>BEHIND THE WORK.</em></>} copy="A little about the ideas, process and creative thinking that shape every MentorEx project."/><div className="stories-list">{stories.map(s=><article className="story-row" key={s.n}><span className="story-number">{s.n}</span><div><p className="eyebrow">MENTOREX JOURNAL</p><h2>{s.t}</h2><p className="story-text">{s.d}</p></div><span className="story-spark">✳</span></article>)}</div></section>;
}
function ContactPage() {
  return <section className="inner-page contact-page"><PageIntro number="04" eyebrow="CONTACT THE STUDIO" title={<>HAVE A GOOD<br/><em>ONE IN MIND?</em></>} copy="Tell us what you’re planning. We’d love to hear about your business, idea or next big project."/><a className="contact-button" href="mailto:contact@mentorex.in?subject=Project%20enquiry">EMAIL MENTOREX ↗</a><div className="contact-details"><div><span>EMAIL</span><a href="mailto:contact@mentorex.in">contact@mentorex.in</a></div><div><span>BRAND PROMISE</span><p>AN EDUCATED CHOICE.</p></div><div><span>STUDIO</span><p>MENTOREX DIGITAL</p></div></div></section>;
}
function LogoReveal({ done }: { done: () => void }) {
  useEffect(() => { const t = window.setTimeout(done, 2800); return () => window.clearTimeout(t); }, [done]);
  return <motion.div className="logo-reveal" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .65 }}>
    <motion.div className="reveal-logo" initial={{ opacity: 0, scale: .7, filter: 'blur(18px)', letterSpacing: '.5em' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', letterSpacing: '.08em' }} transition={{ duration: 1.25, ease: [0.16,1,0.3,1] }}>
      <span className="reveal-symbol">M<span>•</span></span><span className="reveal-word">MENTOREX<br/><b>DIGITAL</b></span>
    </motion.div>
    <motion.div className="reveal-line" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.1, delay: .55 }}/>
    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>AN EDUCATED CHOICE</motion.p>
  </motion.div>;
}
export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [showIntro, setShowIntro] = useState(!sessionStorage.getItem('mentorex-intro-seen'));
  useEffect(() => { routeTo = (next) => { window.history.pushState({}, '', next); setPath(next); window.scrollTo(0,0); }; const pop = () => { setPath(window.location.pathname); window.scrollTo(0,0); }; window.addEventListener('popstate',pop); return () => { window.removeEventListener('popstate',pop); routeTo = null; }; }, []);
  const finishIntro = () => { sessionStorage.setItem('mentorex-intro-seen','1'); setShowIntro(false); };
  const match = path.match(/^\/projects\/project-0([1-5])\/?$/);
  const project = match ? projects[Number(match[1])-1] : null;
  let page;
  if (project) page = <ProjectDetail project={project}/>;
  else if (path === '/reels') page = <ReelsPage/>;
  else if (path === '/projects') page = <ProjectsPage/>;
  else if (path === '/stories') page = <StoriesPage/>;
  else if (path === '/contact') page = <ContactPage/>;
  else page = <HomePage/>;
  return <div className="site-shell"><div className="noise"/><Header path={path}/><main key={path}><AnimatePresence mode="wait"><motion.div key={path} initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:.35}}>{page}</motion.div></AnimatePresence></main><Footer/><AnimatePresence>{showIntro && <LogoReveal done={finishIntro}/>}</AnimatePresence></div>;
}
