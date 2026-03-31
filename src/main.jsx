import { useEffect, useRef, useState } from "react";

// ── DATOS ────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    num: "001",
    name: "SIGEPO",
    desc: "Sistema de Gestión Política — plataforma web full stack con panel admin, autenticación multi-rol, WebServices externos y base de datos relacional optimizada. Entregado a cliente real.",
    tags: ["PHP", "Laravel", "Java", "Spring Boot", "PostgreSQL", "Bootstrap", "REST APIs"],
    status: "cliente real",
    url: "https://github.com/damian7777777777/sigepo",
    live: null,
  },
  {
    num: "002",
    name: "DAALAN",
    desc: "Control de asistencia QR en tiempo real — app móvil + backend propio con APIs REST, JWT y reportes automáticos. En producción activa con usuarios reales.",
    tags: ["React Native", "Node.js", "Express", "MySQL", "JWT", "REST APIs"],
    status: "en producción",
    url: "https://github.com/damian7777777777/daalan",
    live: null,
  },
  {
    num: "003",
    name: "Barber Shop",
    desc: "Landing page para barbería con diseño responsivo, secciones de servicios, galería y formulario de contacto.",
    tags: ["HTML5", "CSS3", "Responsive"],
    status: "live",
    url: "https://github.com/damian7777777777/Barber",
    live: "https://damian7777777777.github.io/Barber/",
  },
  {
    num: "004",
    name: "Sabor Mexicano",
    desc: "Sitio web para restaurante de comida mexicana con menú interactivo, galería de platillos y diseño colorido responsivo.",
    tags: ["HTML5", "CSS3", "Responsive"],
    status: "live",
    url: "https://github.com/damian7777777777/Sabor-Mexicano",
    live: "https://damian7777777777.github.io/Sabor-Mexicano/",
  },
];

const STACK = [
  { cat: "Backend",        items: ["PHP", "Laravel", "Node.js", "Express", "Java", "Spring Boot", "REST APIs", "JWT", "WebServices"], hot: ["PHP","Laravel","Node.js","REST APIs"] },
  { cat: "Frontend",       items: ["JavaScript ES6+", "TypeScript", "HTML5", "CSS3", "Bootstrap", "jQuery", "AJAX", "React Native"], hot: ["JavaScript ES6+","HTML5","CSS3","Bootstrap"] },
  { cat: "Bases de datos", items: ["MySQL", "PostgreSQL", "SQL Server", "MongoDB"], hot: ["MySQL","PostgreSQL"] },
  { cat: "Herramientas",   items: ["Git", "Postman", "MVC · POO", "SOLID · DRY", "Scrum", "Linux básico"], hot: ["Git"] },
];

// ── HOOK: INTERSECTION OBSERVER ──────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(28px)",
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ── COMPONENTES ──────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "1.2rem 2.5rem",
      borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.08)" : "transparent"}`,
      background: scrolled ? "rgba(10,10,10,0.9)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      transition: "all 0.3s ease",
    }}>
      <a href="#top" style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1rem", color:"#f0ede8", textDecoration:"none", letterSpacing:"-0.02em" }}>
        DA<span style={{ color:"#e8ff47" }}>.</span>
      </a>
      <div style={{ display:"flex", gap:"2rem" }}>
        {["sobre mí","proyectos","experiencia","contacto"].map((l, i) => (
          <a key={i} href={`#${["about","projects","experience","contact"][i]}`} style={{
            fontSize:"0.78rem", color:"#888480", textDecoration:"none",
            fontFamily:"'DM Mono',monospace", letterSpacing:"0.05em", transition:"color 0.2s"
          }}
          onMouseEnter={e => e.target.style.color="#e8ff47"}
          onMouseLeave={e => e.target.style.color="#888480"}>
            {l}
          </a>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="top" style={{
      minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"flex-end",
      padding:"0 2.5rem 5rem", position:"relative", overflow:"hidden",
    }}>
      {/* grid bg */}
      <div style={{
        position:"absolute", inset:0, zIndex:0,
        backgroundImage:"linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)",
        backgroundSize:"64px 64px",
        WebkitMaskImage:"radial-gradient(ellipse 80% 70% at 50% 100%,black 30%,transparent 100%)",
        maskImage:"radial-gradient(ellipse 80% 70% at 50% 100%,black 30%,transparent 100%)",
      }} />
      {/* accent blob */}
      <div style={{
        position:"absolute", bottom:"-10%", left:"60%",
        width:"420px", height:"420px", borderRadius:"50%",
        background:"rgba(232,255,71,0.04)",
        filter:"blur(80px)", zIndex:0,
      }} />
      <div style={{ position:"relative", zIndex:1 }}>
        <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.72rem", color:"#e8ff47", letterSpacing:"0.14em", textTransform:"uppercase", marginBottom:"1.5rem",
          opacity:0, animation:"fadeUp 0.6s ease forwards 0.2s" }}>
          // desarrollador full stack · querétaro, mx
        </p>
        <h1 style={{
          fontFamily:"'Syne',sans-serif", fontWeight:800,
          fontSize:"clamp(3.5rem,10vw,8rem)", lineHeight:0.92,
          letterSpacing:"-0.04em", color:"#f0ede8", margin:0,
          opacity:0, animation:"fadeUp 0.7s ease forwards 0.35s",
        }}>
          Damian<br /><span style={{ color:"#e8ff47" }}>Aguilera.</span>
        </h1>
        <p style={{ marginTop:"2rem", maxWidth:"480px", fontSize:"1rem", color:"#888480", fontWeight:300, lineHeight:1.7,
          opacity:0, animation:"fadeUp 0.7s ease forwards 0.5s" }}>
          Construyo aplicaciones web y móviles que van a producción.<br />PHP · Laravel · Node.js · JavaScript · React Native · PostgreSQL.
        </p>
        <div style={{ marginTop:"2.5rem", display:"flex", gap:"1rem", flexWrap:"wrap",
          opacity:0, animation:"fadeUp 0.7s ease forwards 0.65s" }}>
          <a href="#projects" style={btnPrimary}>Ver proyectos ↓</a>
          <a href="#contact" style={btnOutline}
            onMouseEnter={e => { e.currentTarget.style.borderColor="#e8ff47"; e.currentTarget.style.color="#e8ff47"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.14)"; e.currentTarget.style.color="#888480"; }}>
            Contactar
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding:"6rem 2.5rem" }}>
      <SectionLabel n="01" label="sobre mí" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"start" }}>
        <Reveal>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(1.8rem,4vw,2.6rem)", fontWeight:700, letterSpacing:"-0.03em", lineHeight:1.15, marginBottom:"1.5rem" }}>
            Full stack Jr. con proyectos <span style={{ color:"#e8ff47" }}>reales</span> en producción.
          </h2>
          <p style={{ color:"#888480", fontSize:"0.95rem", fontWeight:300, lineHeight:1.7, marginBottom:"1rem" }}>
            Estudiante de Ingeniería en Software en la UTEQ con experiencia práctica entregando aplicaciones completas a clientes reales y en entornos universitarios activos.
          </p>
          <p style={{ color:"#888480", fontSize:"0.95rem", fontWeight:300, lineHeight:1.7, marginBottom:"2rem" }}>
            Me enfoco en código limpio, arquitectura MVC, APIs bien diseñadas y trabajo colaborativo con Git. Disponibilidad presencial inmediata en Querétaro.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px", background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"8px", overflow:"hidden" }}>
            {[["2","proyectos en producción"],["0","downtime en prod."],["B1","inglés técnico"],["QRO","disponible presencial"]].map(([n,l]) => (
              <div key={l} style={{ background:"#111", padding:"1.4rem" }}>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"2rem", fontWeight:800, color:"#e8ff47", letterSpacing:"-0.04em", lineHeight:1 }}>{n}</div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.72rem", color:"#555250", marginTop:"0.3rem" }}>{l}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div style={{ display:"flex", flexDirection:"column", gap:"1.2rem" }}>
            {STACK.map(({ cat, items, hot }) => (
              <div key={cat}>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.67rem", color:"#555250", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.5rem" }}>{cat}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.35rem" }}>
                  {items.map(item => (
                    <span key={item} style={{
                      fontFamily:"'DM Mono',monospace", fontSize:"0.75rem",
                      padding:"0.28rem 0.7rem", borderRadius:"3px",
                      border: hot.includes(item) ? "1px solid rgba(232,255,71,0.35)" : "1px solid rgba(255,255,255,0.1)",
                      color: hot.includes(item) ? "#e8ff47" : "#888480",
                      background: hot.includes(item) ? "rgba(232,255,71,0.06)" : "#1a1a1a",
                    }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ padding:"6rem 2.5rem", background:"#111" }}>
      <SectionLabel n="02" label="proyectos" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>
        {PROJECTS.map((p, i) => <ProjectCard key={p.num} project={p} delay={i * 80} />)}
      </div>
    </section>
  );
}

function ProjectCard({ project, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background:"#0a0a0a", border:`1px solid ${hovered ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.07)"}`,
          borderRadius:"8px", padding:"2rem", position:"relative", overflow:"hidden",
          transform: hovered ? "translateY(-4px)" : "none",
          transition:"all 0.25s ease",
        }}>
        {/* top accent */}
        <div style={{
          position:"absolute", top:0, left:0, right:0, height:"2px",
          background:"#e8ff47",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin:"left", transition:"transform 0.3s ease",
        }} />
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.65rem", color:"#555250", marginBottom:"1rem", letterSpacing:"0.1em" }}>{project.num}</div>
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.3rem", fontWeight:700, letterSpacing:"-0.02em", marginBottom:"0.6rem" }}>{project.name}</div>
        <p style={{ fontSize:"0.87rem", color:"#888480", fontWeight:300, lineHeight:1.6, marginBottom:"1.5rem" }}>{project.desc}</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.3rem", marginBottom:"1.5rem" }}>
          {project.tags.map(tag => (
            <span key={tag} style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.67rem", color:"#555250", background:"#1a1a1a", padding:"0.2rem 0.6rem", borderRadius:"3px" }}>{tag}</span>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:"1rem", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.72rem", color:"#4ade80", display:"flex", alignItems:"center", gap:"0.4rem" }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#4ade80", display:"inline-block", animation:"pulse 2s infinite" }} />
            {project.status}
          </span>
          <div style={{ display:"flex", gap:"1rem" }}>
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer"
                style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.73rem", color: hovered ? "#e8ff47" : "#555250", textDecoration:"none", transition:"color 0.2s" }}>
                ver live ↗
              </a>
            )}
            <a href={project.url} target="_blank" rel="noreferrer"
              style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.73rem", color: hovered ? "#e8ff47" : "#555250", textDecoration:"none", transition:"color 0.2s" }}>
              código →
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Experience() {
  const items = [
    {
      date: "Abr — Ago 2025",
      role: "Desarrollador Full Stack",
      company: "SIGEPO · Querétaro",
      bullets: [
        "Desarrollo end-to-end: frontend JS/HTML5/CSS3/Bootstrap y backend PHP/Laravel + Java/Spring Boot.",
        "APIs REST con autenticación segura, control multi-rol y lógica de negocio compleja (MVC + POO).",
        "Integración de WebServices externos, optimización de PostgreSQL y documentación técnica.",
        "Entregado a cliente real con requerimientos formales. Code review con Git flow.",
      ]
    },
    {
      date: "Abr — Ago 2025",
      role: "Desarrollador Full Stack",
      company: "UTEQ · Querétaro",
      bullets: [
        "App móvil React Native con validación QR en tiempo real integrada a backend Node.js/Express.",
        "Base de datos MySQL: esquema normalizado, índices y consultas optimizadas.",
        "Backups automáticos, reportes y scripts en servidor de producción — cero downtime.",
        "Trabajo en equipo con Git en sprints cortos y entregas iterativas.",
      ]
    },
    {
      date: "2024 — Presente",
      role: "Ingeniería en Desarrollo y Gestión de Software",
      company: "Universidad Tecnológica de Querétaro (UTEQ)",
      bullets: ["Estudiante activo. Bases de datos, arquitectura de sistemas, redes y metodologías ágiles."]
    },
  ];

  return (
    <section id="experience" style={{ padding:"6rem 2.5rem" }}>
      <SectionLabel n="03" label="experiencia" />
      <div>
        {items.map((item, i) => (
          <Reveal key={i} delay={i * 100}>
            <div style={{
              display:"grid", gridTemplateColumns:"180px 1fr", gap:"2.5rem",
              padding:"2rem 0", borderBottom: i < items.length-1 ? "1px solid rgba(255,255,255,0.07)" : "none",
            }}>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.74rem", color:"#555250", paddingTop:"0.2rem" }}>{item.date}</div>
              <div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.1rem", fontWeight:700, letterSpacing:"-0.02em", marginBottom:"0.3rem" }}>{item.role}</div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.78rem", color:"#e8ff47", marginBottom:"0.9rem" }}>{item.company}</div>
                <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"0.45rem" }}>
                  {item.bullets.map((b, j) => (
                    <li key={j} style={{ fontSize:"0.88rem", color:"#888480", fontWeight:300, paddingLeft:"1rem", position:"relative", lineHeight:1.6 }}>
                      <span style={{ position:"absolute", left:0, color:"#e8ff47", fontSize:"0.7rem" }}>—</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ padding:"6rem 2.5rem", background:"#111" }}>
      <Reveal>
        <div style={{ maxWidth:"600px", margin:"0 auto", textAlign:"center" }}>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(2rem,5vw,3.5rem)", fontWeight:800, letterSpacing:"-0.04em", lineHeight:1.1, marginBottom:"1rem" }}>
            ¿Trabajamos <span style={{ color:"#e8ff47" }}>juntos?</span>
          </h2>
          <p style={{ color:"#888480", fontWeight:300, marginBottom:"2.5rem", fontSize:"0.95rem" }}>
            Disponibilidad presencial inmediata en Querétaro. Abierto a oportunidades Jr. full stack.
          </p>
          <div style={{ display:"flex", justifyContent:"center", gap:"0.75rem", flexWrap:"wrap" }}>
            {[
              { icon:"✉", label:"damiantego@gmail.com", href:"mailto:damiantego@gmail.com" },
              { icon:"📞", label:"442 848 4517", href:"tel:+524428484517" },
              { icon:"⌥", label:"github / damian7777777777", href:"https://github.com/damian7777777777" },
            ].map(({ icon, label, href }) => (
              <ContactItem key={label} icon={icon} label={label} href={href} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ContactItem({ icon, label, href }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:"flex", alignItems:"center", gap:"0.6rem",
        padding:"0.75rem 1.25rem",
        background:"#0a0a0a",
        border:`1px solid ${hovered ? "#e8ff47" : "rgba(255,255,255,0.1)"}`,
        borderRadius:"4px",
        fontFamily:"'DM Mono',monospace", fontSize:"0.78rem",
        color: hovered ? "#e8ff47" : "#888480",
        textDecoration:"none", transition:"all 0.2s",
      }}>
      <span style={{ fontSize:14 }}>{icon}</span> {label}
    </a>
  );
}

function Footer() {
  return (
    <footer style={{
      padding:"1.5rem 2.5rem",
      borderTop:"1px solid rgba(255,255,255,0.07)",
      display:"flex", justifyContent:"space-between", alignItems:"center",
      fontFamily:"'DM Mono',monospace", fontSize:"0.7rem", color:"#555250",
    }}>
      <span>Damian Aguilera © 2025</span>
      <span>Querétaro, México</span>
    </footer>
  );
}

function SectionLabel({ n, label }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"3rem" }}>
      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"0.7rem", color:"#e8ff47", letterSpacing:"0.14em", textTransform:"uppercase" }}>
        {n} — {label}
      </span>
      <div style={{ width:40, height:1, background:"rgba(232,255,71,0.35)" }} />
    </div>
  );
}

// ── ESTILOS BOTONES ───────────────────────────────────────────────────────────
const btnPrimary = {
  display:"inline-flex", alignItems:"center", gap:"0.5rem",
  padding:"0.75rem 1.5rem", borderRadius:"4px",
  background:"#e8ff47", color:"#0a0a0a",
  fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.88rem",
  textDecoration:"none", border:"none", cursor:"pointer",
  transition:"background 0.2s, transform 0.2s",
};

const btnOutline = {
  display:"inline-flex", alignItems:"center",
  padding:"0.75rem 1.5rem", borderRadius:"4px",
  background:"transparent", color:"#888480",
  border:"1px solid rgba(255,255,255,0.14)", fontSize:"0.88rem",
  textDecoration:"none", cursor:"pointer", transition:"all 0.2s",
};

// ── CSS GLOBAL ────────────────────────────────────────────────────────────────
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&family=DM+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #0a0a0a; color: #f0ede8; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.35; } }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #0a0a0a; }
  ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
`;

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = globalCSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
