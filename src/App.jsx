import { useState, useEffect, useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, ChevronDown, Phone, Volume2, VolumeX, MessageCircle } from "lucide-react";

const WEDDING_DATE = new Date("2026-11-22T10:30:00+05:30");
const MAP_LINK = "https://maps.app.goo.gl/toj4o5vkayJp4Bdc7";
const YT_ID = ""; // YouTube player turned off (it always shows a visible video)
const VENUE_ADDRESS = ""; // optional, e.g. "MUM Hall, Pathiriyal, Malappuram, Kerala"
const CONTACT_PHONE = ""; // optional, e.g. "+919XXXXXXXXX" (adds a Call for Directions button)
const MUSIC_URL = "/music.mp3"; // put your mp3 at public/music.mp3. If the file is missing, the built-in music plays instead
const RSVP_PHONE = ""; // WhatsApp number with country code, e.g. "919XXXXXXXXX"

const C = { emerald: "#0B3B2E", deep: "#06261D", ivory: "#FAF6EC", gold: "#B8934A", goldL: "#E3C888", ink: "#1F2A26" };
const F = { cin: "'Tenor Sans', 'Cormorant Garamond', sans-serif", cor: "'Cormorant Garamond', serif", pin: "'Pinyon Script', cursive", ami: "'Amiri', 'Scheherazade New', 'Noto Naskh Arabic', 'Traditional Arabic', serif" };
const PATTERN = "url(\"data:image/svg+xml," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><path d='M32 6 L38.5 25.5 L58 32 L38.5 38.5 L32 58 L25.5 38.5 L6 32 L25.5 25.5Z' fill='none' stroke='#B8934A' stroke-width='0.7'/></svg>") + "\")";
const SHIMMER = { backgroundImage: "linear-gradient(100deg, #FAF6EC 0%, #FAF6EC 38%, #F2D27A 50%, #FAF6EC 62%, #FAF6EC 100%)", backgroundSize: "250% 100%", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" };
const FONTS = "@import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Noto+Naskh+Arabic:wght@400;600&family=Pinyon+Script&family=Scheherazade+New:wght@400;700&family=Tenor+Sans&display=swap');";

function GoldDust() {
  const ps = useMemo(() => Array.from({ length: 14 }, (_, i) => ({ id: i, x: Math.random() * 100, drift: (Math.random() - 0.5) * 60, d: 10 + Math.random() * 12, delay: Math.random() * 12, s: Math.random() * 2 + 1.2 })), []);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {ps.map(p => (
        <motion.div key={p.id} className="absolute rounded-full" style={{ left: p.x + "%", bottom: "-5%", width: p.s, height: p.s, background: C.goldL, opacity: 0 }}
          animate={{ y: [0, -800], x: [0, p.drift], opacity: [0, 0.5, 0.5, 0] }} transition={{ duration: p.d, delay: p.delay, repeat: Infinity, ease: "linear" }} />
      ))}
    </div>
  );
}

function Lantern({ index }) {
  const cfg = useMemo(() => {
    const depth = Math.random();
    return { left: Math.random() * 100, startY: 70 + Math.random() * 60, duration: 9 + Math.random() * 8, size: 18 + depth * 24, blur: (1 - depth) * 2.5, glow: 10 + depth * 20, glowOp: 0.55 + depth * 0.4, drift: (Math.random() - 0.5) * 60 };
  }, []);
  return (
    <motion.div initial={{ y: cfg.startY + "vh", x: cfg.left + "vw", opacity: 0 }}
      animate={{ y: "-15vh", x: "calc(" + cfg.left + "vw + " + cfg.drift + "px)", opacity: [0, 1, 1, 0.9, 0] }}
      transition={{ duration: cfg.duration, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
      className="absolute pointer-events-none" style={{ filter: "blur(" + cfg.blur + "px)" }}>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", inset: -cfg.glow, background: "radial-gradient(circle, rgba(255,196,60," + cfg.glowOp + ") 0%, rgba(255,170,40,0.3) 45%, transparent 72%)", borderRadius: "50%", filter: "blur(6px)" }} />
        <svg viewBox="0 0 40 70" style={{ width: cfg.size, height: cfg.size * 1.75, display: "block", position: "relative", filter: "drop-shadow(0 0 6px rgba(255,185,40,0.95))" }}>
          <defs>
            <radialGradient id={"lg" + index} cx="50%" cy="40%" r="55%"><stop offset="0%" stopColor="#FFFDF0" /><stop offset="40%" stopColor="#FFD866" /><stop offset="100%" stopColor="#C8901E" /></radialGradient>
            <radialGradient id={"in" + index} cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(255,255,230,0.95)" /><stop offset="100%" stopColor="rgba(255,210,70,0)" /></radialGradient>
          </defs>
          <path d="M20 4 L36 16 L34 50 L20 62 L6 50 L4 16 Z" fill={"url(#lg" + index + ")"} />
          <ellipse cx="20" cy="32" rx="9" ry="11" fill={"url(#in" + index + ")"} />
          <rect x="17" y="0" width="6" height="6" rx="2" fill="#B8860B" />
          <line x1="4" y1="22" x2="36" y2="22" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" />
          <line x1="4" y1="44" x2="36" y2="44" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" />
          <line x1="20" y1="62" x2="20" y2="70" stroke="#B8860B" strokeWidth="1.5" />
          <circle cx="20" cy="70" r="2" fill="#D4AF37" />
        </svg>
      </div>
    </motion.div>
  );
}

const starPts = (r1, r2, n, c = 60) => Array.from({ length: n * 2 }, (_, k) => { const a = (Math.PI * k) / n - Math.PI / 2, r = k % 2 ? r2 : r1; return (c + r * Math.cos(a)).toFixed(1) + "," + (c + r * Math.sin(a)).toFixed(1); }).join(" ");

function Grain() {
  const svg = "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>";
  return <div style={{ position: "fixed", inset: 0, zIndex: 55, pointerEvents: "none", opacity: 0.07, mixBlendMode: "multiply", backgroundImage: "url(\"data:image/svg+xml," + encodeURIComponent(svg) + "\")" }} />;
}

function HangingLantern({ left, len, size, dur, i }) {
  return (
    <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "absolute", top: 0, left, transformOrigin: "50% 0%", display: "flex", flexDirection: "column", alignItems: "center", marginLeft: -size / 2 }}>
      <div style={{ width: 1, height: len, background: "linear-gradient(to bottom, rgba(184,147,74,0.15), " + C.gold + ")" }} />
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", inset: -size * 0.7, background: "radial-gradient(circle, rgba(255,196,60,0.7) 0%, rgba(255,170,40,0.25) 45%, transparent 72%)", borderRadius: "50%", filter: "blur(5px)" }} />
        <svg viewBox="0 0 40 70" style={{ width: size, height: size * 1.75, display: "block", position: "relative", filter: "drop-shadow(0 0 6px rgba(255,185,40,0.9))" }}>
          <defs><radialGradient id={"hl" + i} cx="50%" cy="40%" r="55%"><stop offset="0%" stopColor="#FFFDF0" /><stop offset="40%" stopColor="#FFD866" /><stop offset="100%" stopColor="#C8901E" /></radialGradient></defs>
          <path d="M20 4 L36 16 L34 50 L20 62 L6 50 L4 16 Z" fill={"url(#hl" + i + ")"} />
          <rect x="17" y="0" width="6" height="6" rx="2" fill="#B8860B" />
          <line x1="4" y1="22" x2="36" y2="22" stroke="rgba(255,255,255,0.45)" strokeWidth="0.6" />
          <line x1="4" y1="44" x2="36" y2="44" stroke="rgba(255,255,255,0.45)" strokeWidth="0.6" />
          <circle cx="20" cy="66" r="2.2" fill="#D4AF37" />
        </svg>
      </div>
    </motion.div>
  );
}

function Mandala() {
  return (
    <motion.svg viewBox="0 0 300 300" animate={{ rotate: 360 }} transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
      style={{ position: "absolute", top: "50%", left: "50%", width: 320, height: 320, marginLeft: -160, marginTop: -160, zIndex: -1, opacity: 0.35, pointerEvents: "none" }}>
      <circle cx="150" cy="150" r="146" fill="none" stroke={C.gold} strokeWidth="0.8" />
      <circle cx="150" cy="150" r="136" fill="none" stroke={C.gold} strokeWidth="0.4" strokeDasharray="2 5" />
      <polygon points={starPts(132, 104, 8, 150)} fill="none" stroke={C.gold} strokeWidth="0.7" />
      <polygon points={starPts(104, 76, 8, 150)} fill="none" stroke={C.gold} strokeWidth="0.6" transform="rotate(22.5 150 150)" />
      <circle cx="150" cy="150" r="68" fill="none" stroke={C.gold} strokeWidth="0.4" />
    </motion.svg>
  );
}

function Frame() {
  const dia = (pos) => <span style={{ position: "absolute", width: 7, height: 7, background: C.gold, transform: "rotate(45deg)", ...pos }} />;
  return (
    <div style={{ position: "fixed", inset: 10, zIndex: 4, pointerEvents: "none", border: "1px solid rgba(184,147,74,0.6)" }}>
      <div style={{ position: "absolute", inset: 5, border: "0.5px solid rgba(184,147,74,0.35)" }} />
      {dia({ top: -4, left: -4 })}{dia({ top: -4, right: -4 })}{dia({ bottom: -4, left: -4 })}{dia({ bottom: -4, right: -4 })}
    </div>
  );
}

function Ornament({ color = C.gold, w = 56 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
      <div style={{ height: 1, width: w, background: "linear-gradient(to right, transparent, " + color + ")" }} />
      <svg width="14" height="14" viewBox="0 0 20 20"><path d="M10 1 L12.5 7.5 L19 10 L12.5 12.5 L10 19 L7.5 12.5 L1 10 L7.5 7.5Z" fill={color} /></svg>
      <div style={{ height: 1, width: w, background: "linear-gradient(to left, transparent, " + color + ")" }} />
    </div>
  );
}

function Reveal({ children, delay = 0, style }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }} style={style}>{children}</motion.div>
  );
}

function Crest({ size = 104 }) {
  const star = (r1, r2, n) => Array.from({ length: n * 2 }, (_, k) => { const a = (Math.PI * k) / n - Math.PI / 2, r = k % 2 ? r2 : r1; return (60 + r * Math.cos(a)).toFixed(1) + "," + (60 + r * Math.sin(a)).toFixed(1); }).join(" ");
  return (
    <svg viewBox="0 0 120 120" style={{ width: size, height: size, filter: "drop-shadow(0 0 10px rgba(227,200,136,0.5))" }}>
      <circle cx="60" cy="60" r="56" fill="none" stroke={C.goldL} strokeWidth="1" />
      <circle cx="60" cy="60" r="51" fill="none" stroke={C.goldL} strokeWidth="0.5" opacity="0.6" />
      <polygon points={star(47, 38, 8)} fill="none" stroke={C.goldL} strokeWidth="0.7" opacity="0.7" />
      <text x="42" y="73" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontWeight="500" fontSize="38" fill={C.goldL}>F</text>
      <text x="78" y="73" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontWeight="500" fontSize="38" fill={C.goldL}>N</text>
      <text x="60" y="66" textAnchor="middle" fontFamily="Pinyon Script, cursive" fontSize="24" fill={C.ivory}>&amp;</text>
    </svg>
  );
}

function LandingGate({ onOpen, opening }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [setTimeout(() => setPhase(1), 900), setTimeout(() => setPhase(2), 2200), setTimeout(() => setPhase(3), 3600)];
    return () => t.forEach(clearTimeout);
  }, []);
  const SUB = "We Are Getting Married";
  const bg = "radial-gradient(ellipse at 50% 40%, #145243 0%, " + C.emerald + " 45%, " + C.deep + " 100%)";
  const panel = (side) => ({ position: "absolute", top: 0, bottom: 0, [side]: 0, width: "50%", background: bg, backgroundSize: "200% 100%", backgroundPosition: side === "left" ? "0% 0" : "100% 0", [side === "left" ? "borderRight" : "borderLeft"]: "1px solid " + C.gold });
  const door = { duration: 1.5, delay: 0.4, ease: [0.7, 0, 0.2, 1] };
  return (
    <div onClick={opening ? undefined : onOpen} className="fixed inset-0 z-50 cursor-pointer overflow-hidden select-none" style={{ pointerEvents: opening ? "none" : "auto" }}>
      <motion.div style={panel("left")} animate={{ x: opening ? "-101%" : 0 }} transition={door} />
      <motion.div style={panel("right")} animate={{ x: opening ? "101%" : 0 }} transition={door} />
      <motion.div animate={{ opacity: opening ? 0 : 1, scale: opening ? 1.06 : 1 }} transition={{ duration: 0.8 }} className="absolute inset-0 flex flex-col items-center justify-between overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: PATTERN, opacity: 0.07 }} />
        <GoldDust />
        {Array.from({ length: 6 }).map((_, i) => <Lantern key={i} index={i} />)}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0.85 }} transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }} style={{ marginBottom: 22, position: "relative" }}>
            <div style={{ position: "relative" }}><Crest /></div>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: phase >= 1 ? 1 : 0 }} transition={{ duration: 1.6 }}
            style={{ fontFamily: F.cin, letterSpacing: "0.4em", fontSize: 12, color: C.goldL, textTransform: "uppercase", marginBottom: 24 }}>Peace Be Upon You</motion.p>
          <div style={{ height: 24, display: "flex", justifyContent: "center", marginBottom: 26, overflow: "hidden" }}>
            {SUB.split("").map((ch, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 12 }} transition={{ duration: 0.5, delay: i * 0.04 }}
                style={{ fontFamily: F.cin, fontSize: 12, letterSpacing: "0.28em", color: "rgba(250,246,236,0.85)", textTransform: "uppercase", whiteSpace: "pre" }}>{ch}</motion.span>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 20 }} transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}>
            <motion.h1 animate={{ backgroundPosition: ["0% 50%", "-250% 50%"] }} transition={{ duration: 7, repeat: Infinity, ease: "linear" }} style={{ fontFamily: F.cor, fontSize: "clamp(26px, 8.2vw, 50px)", fontWeight: 500, letterSpacing: "0.14em", lineHeight: 1.15, ...SHIMMER }}>SHAHEEN FARHAN</motion.h1>
            <div style={{ fontFamily: F.pin, fontSize: "clamp(36px, 12vw, 68px)", color: C.goldL, margin: "2px 0", lineHeight: 1 }}>Weds</div>
            <motion.h1 animate={{ backgroundPosition: ["0% 50%", "-250% 50%"] }} transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 1 }} style={{ fontFamily: F.cor, fontSize: "clamp(26px, 8.2vw, 50px)", fontWeight: 500, letterSpacing: "0.14em", lineHeight: 1.2, ...SHIMMER }}>NASIFA USMAN</motion.h1>
            <div style={{ marginTop: 26 }}><Ornament color={C.goldL} w={40} /></div>
            <p style={{ marginTop: 14, fontFamily: F.cin, fontSize: 16, fontWeight: 400, letterSpacing: "0.35em", color: C.goldL }}>22 · 11 · 2026</p>
          </motion.div>
        </div>
        <motion.div animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: Infinity }}
          style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: 40, gap: 8 }}>
          <span style={{ fontFamily: F.cin, fontSize: 11, letterSpacing: "0.4em", color: C.goldL, textTransform: "uppercase" }}>Tap to Enter</span>
          <ChevronDown size={18} color={C.goldL} strokeWidth={1.2} />
        </motion.div>
      </motion.div>
      <style>{FONTS}</style>
    </div>
  );
}

function Countdown({ target }) {
  const [t, setT] = useState({ Days: 0, Hours: 0, Min: 0, Sec: 0 });
  const [done, setDone] = useState(false);
  useEffect(() => {
    const tick = () => {
      const d = target - new Date();
      if (d <= 0) { setDone(true); return; }
      setT({ Days: Math.floor(d / 86400000), Hours: Math.floor((d / 3600000) % 24), Min: Math.floor((d / 60000) % 60), Sec: Math.floor((d / 1000) % 60) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  if (done) return <p style={{ textAlign: "center", fontFamily: F.pin, fontSize: 34, color: C.emerald }}>Alhamdulillah, today is the day</p>;
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {Object.entries(t).map(([k, v]) => (
        <div key={k} style={{ flex: 1, textAlign: "center", padding: "18px 4px 14px", borderRadius: 16, background: "linear-gradient(160deg, " + C.emerald + ", " + C.deep + ")", border: "1px solid " + C.gold, boxShadow: "0 8px 22px rgba(6,38,29,0.22)" }}>
          <span style={{ display: "block", fontFamily: F.cor, fontSize: 38, fontWeight: 500, color: C.goldL, lineHeight: 1 }}>{String(v).padStart(2, "0")}</span>
          <span style={{ display: "block", marginTop: 8, fontFamily: F.cin, fontSize: 10, color: "rgba(250,246,236,0.75)", textTransform: "uppercase", letterSpacing: "0.2em" }}>{k}</span>
        </div>
      ))}
    </div>
  );
}

const btn = (primary) => ({
  display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "15px 0", borderRadius: 14, cursor: "pointer",
  fontFamily: F.cin, fontSize: 11, fontWeight: 400, letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none",
  ...(primary ? { background: "linear-gradient(135deg, " + C.emerald + ", " + C.deep + ")", color: C.goldL, boxShadow: "0 6px 20px rgba(11,59,46,0.28)" } : { background: "transparent", color: C.emerald, border: "1px solid " + C.gold }),
});

function Label({ children }) {
  const line = (d) => <div style={{ height: 1, width: 36, background: "linear-gradient(to " + d + ", transparent, " + C.gold + ")" }} />;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 20 }}>
      {line("right")}
      <p style={{ fontFamily: F.cin, fontSize: 11, letterSpacing: "0.4em", color: C.gold, textTransform: "uppercase", textAlign: "center", paddingLeft: "0.4em" }}>{children}</p>
      {line("left")}
    </div>
  );
}

function Person({ name, rel, parents }) {
  return (
    <div style={{ textAlign: "center" }}>
      <motion.h2 animate={{ backgroundPosition: ["0% 50%", "-250% 50%"] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} style={{ fontFamily: F.cor, fontStyle: "italic", fontWeight: 500, fontSize: "clamp(36px, 11vw, 48px)", letterSpacing: "0.02em", lineHeight: 1.2, margin: 0, padding: "0 0.1em", backgroundImage: "linear-gradient(100deg, " + C.emerald + " 0%, " + C.emerald + " 38%, #C9A24D 50%, " + C.emerald + " 62%, " + C.emerald + " 100%)", backgroundSize: "250% 100%", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>{name}</motion.h2>
      <p style={{ fontFamily: F.cin, fontSize: 11, letterSpacing: "0.3em", color: C.gold, textTransform: "uppercase", marginTop: 8 }}>{rel}</p>
      <p style={{ fontFamily: F.cor, fontSize: 19, fontWeight: 600, color: C.ink, marginTop: 4 }}>{parents}</p>
    </div>
  );
}

function Seal() {
  const arch = "999px 999px 16px 16px";
  return (
    <Reveal style={{ marginBottom: 56, display: "flex", justifyContent: "center" }}>
      <div style={{ padding: 3, borderRadius: arch, background: "linear-gradient(135deg, #E8CD85, #B8934A, #E8CD85)", boxShadow: "0 18px 40px rgba(6,38,29,0.28)" }}>
        <div style={{ padding: 6, background: C.ivory, borderRadius: arch }}>
          <div style={{ position: "relative", width: 190, height: 240, borderRadius: arch, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(ellipse at 50% 38%, #145243 0%, " + C.emerald + " 55%, " + C.deep + " 100%)" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: PATTERN, opacity: 0.2 }} />
            <div style={{ position: "relative" }}><Crest size={132} /></div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function DateBlock() {
  const line = <div style={{ height: 1, flex: 1, background: "linear-gradient(to right, transparent, " + C.gold + ")" }} />;
  return (
    <Reveal style={{ marginBottom: 56, textAlign: "center" }}>
      <Label>Save the Date</Label>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {line}
        <div style={{ position: "relative", zIndex: 0 }}>
          <p style={{ fontFamily: F.cin, fontSize: 13, fontWeight: 400, letterSpacing: "0.5em", color: C.gold, paddingLeft: "0.5em" }}>SUNDAY</p>
          <motion.p animate={{ backgroundPosition: ["0% 50%", "-250% 50%"] }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }} style={{ fontFamily: F.cor, fontSize: 124, fontWeight: 500, lineHeight: 1, margin: "4px 0", backgroundImage: "linear-gradient(110deg, #8A6A22 0%, #E8CD85 18%, #B8934A 36%, #F6E6B0 50%, #B8934A 64%, #8A6A22 100%)", backgroundSize: "250% 100%", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>22</motion.p>
          <p style={{ fontFamily: F.cin, fontSize: 20, fontWeight: 400, letterSpacing: "0.35em", color: C.emerald, paddingLeft: "0.35em" }}>NOVEMBER</p>
          <p style={{ fontFamily: F.cin, fontSize: 16, fontWeight: 400, letterSpacing: "0.4em", color: C.gold, marginTop: 6, paddingLeft: "0.4em" }}>2026</p>
        </div>
        <div style={{ height: 1, flex: 1, background: "linear-gradient(to left, transparent, " + C.gold + ")" }} />
      </div>
    </Reveal>
  );
}

function EventCard() {
  return (
    <Reveal>
      <div style={{ position: "relative", background: "#FFFDF7", border: "1px solid " + C.gold, borderRadius: 26, padding: "38px 26px 28px", textAlign: "center", overflow: "hidden", boxShadow: "0 14px 36px rgba(6,38,29,0.14)" }}>
        <motion.div initial={{ x: "-130%" }} animate={{ x: "130%" }} transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }} style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(110deg, transparent 38%, rgba(227,200,136,0.5) 50%, transparent 62%)" }} />
        <div style={{ position: "absolute", inset: 7, border: "0.5px solid rgba(184,147,74,0.45)", borderRadius: 20, pointerEvents: "none" }} />
        {[["top", "left"], ["top", "right"], ["bottom", "left"], ["bottom", "right"]].map(([v, h]) => <div key={v + h} style={{ position: "absolute", [v]: 18, [h]: 18, width: 16, height: 16, pointerEvents: "none", ["border" + (v === "top" ? "Top" : "Bottom")]: "1px solid " + C.gold, ["border" + (h === "left" ? "Left" : "Right")]: "1px solid " + C.gold }} />)}
        <p style={{ fontFamily: F.cin, fontSize: 12, letterSpacing: "0.45em", color: C.gold, textTransform: "uppercase", marginBottom: 16, paddingLeft: "0.45em" }}>Nikkah</p>
        <p style={{ fontFamily: F.cor, fontSize: 46, fontWeight: 600, color: C.emerald, lineHeight: 1 }}>10:30<span style={{ fontSize: 22, marginLeft: 6, letterSpacing: "0.08em" }}>AM</span></p>
        <p style={{ fontFamily: F.cin, fontSize: 16, fontWeight: 400, letterSpacing: "0.15em", color: C.ink, marginTop: 16 }}>MUM Hall</p>
        <p style={{ fontFamily: F.cor, fontSize: 18, fontStyle: "italic", color: C.gold, marginBottom: 10 }}>Pathiriyal</p>
        {VENUE_ADDRESS && <p style={{ fontFamily: F.cor, fontSize: 16, color: C.ink, lineHeight: 1.5, marginBottom: 10 }}>{VENUE_ADDRESS}</p>}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, position: "relative", marginTop: 16 }}>
          <a href={MAP_LINK} target="_blank" rel="noreferrer" style={btn(true)}><MapPin size={14} /> Open Map Location</a>
          {CONTACT_PHONE && <a href={"tel:" + CONTACT_PHONE} style={btn(false)}><Phone size={14} /> Call for Directions</a>}
          {RSVP_PHONE && (
            <a href={"https://wa.me/" + RSVP_PHONE + "?text=" + encodeURIComponent("Assalamu alaikum, I will be attending the Nikkah on 22 November.")} target="_blank" rel="noreferrer" style={btn(false)}><MessageCircle size={14} /> RSVP on WhatsApp</a>
          )}
        </div>
      </div>
    </Reveal>
  );
}

function MainContent() {
  const { scrollY, scrollYProgress } = useScroll();
  const py = useTransform(scrollY, [0, 2500], [0, -200]);
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4 }} style={{ minHeight: "100vh", position: "relative", color: C.ink, overflowX: "hidden" }}>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "linear-gradient(to bottom, #FDFAF2 0%, " + C.ivory + " 50%, #F3EBD6 100%)" }} />
      <motion.div style={{ position: "fixed", top: -220, bottom: -220, left: 0, right: 0, zIndex: 1, pointerEvents: "none", backgroundImage: PATTERN, opacity: 0.08, y: py }} />
      <Frame />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 0, zIndex: 5, pointerEvents: "none" }}>
        <HangingLantern left="9%" len={70} size={24} dur={5.5} i={1} />
        <HangingLantern left="91%" len={95} size={26} dur={6} i={2} />
      </div>
      <div style={{ position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none", overflow: "hidden" }}>
        {Array.from({ length: 5 }).map((_, i) => <Lantern key={i} index={i + 20} />)}
      </div>
      <div style={{ position: "relative", zIndex: 10, maxWidth: 440, margin: "0 auto", padding: "56px 24px 90px" }}>
        <motion.header initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.3, delay: 0.3 }} style={{ textAlign: "center", marginBottom: 56 }}>
          <div dir="rtl" style={{ fontFamily: F.ami, fontSize: "clamp(26px, 8vw, 34px)", color: C.gold, lineHeight: 1.8, maxWidth: "100%", overflow: "hidden", wordBreak: "keep-all" }}>بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>
          <p dir="rtl" style={{ fontFamily: F.ami, fontSize: "clamp(19px, 5.6vw, 23px)", lineHeight: 2.2, color: C.emerald, marginTop: 10, textAlign: "center", letterSpacing: 0, wordSpacing: "0.05em" }}>وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً</p>
          <p style={{ fontFamily: F.cor, fontSize: 16, fontStyle: "italic", color: "rgba(31,42,38,0.8)", lineHeight: 1.6, marginTop: 8 }}>"And He placed between you affection and mercy." <span style={{ fontStyle: "normal", fontFamily: F.cin, fontSize: 11, letterSpacing: "0.15em", color: C.gold }}>(Ar-Rum 30:21)</span></p>
          <div style={{ margin: "30px 0 26px" }}><Ornament /></div>
          <p style={{ fontFamily: F.cin, fontSize: 11, letterSpacing: "0.4em", color: C.gold, textTransform: "uppercase", marginBottom: 18 }}>Together with their families</p>
          <Person name="Shaheen Farhan" rel="Son of" parents="Muneer Vallanchira" />
          <div style={{ fontFamily: F.pin, fontSize: 44, color: C.gold, margin: "4px 0" }}>&</div>
          <Person name="Nasifa Usman" rel="Daughter of" parents="Usman Mannilkkadavan" />
          <p style={{ fontFamily: F.cor, fontSize: 18, fontStyle: "italic", color: C.ink, lineHeight: 1.7, marginTop: 28 }}>request the honour of your presence<br />at their Nikkah ceremony</p>
        </motion.header>
        <Seal />
        <DateBlock />
        <Reveal style={{ marginBottom: 56 }}><Label>Counting Down</Label><Countdown target={WEDDING_DATE} /></Reveal>
        <div style={{ marginBottom: 56 }}><Label>The Celebration</Label><EventCard /></div>
        <Reveal style={{ textAlign: "center" }}>
          <Ornament />
          <p style={{ fontFamily: F.cor, fontSize: 18, fontStyle: "italic", color: C.ink, lineHeight: 1.8, marginTop: 22 }}>Your presence will be our greatest joy<br />and your prayers our greatest blessing</p>
          <p style={{ fontFamily: F.cin, fontSize: 12, fontWeight: 400, letterSpacing: "0.45em", color: C.gold, marginTop: 24, paddingLeft: "0.45em" }}>22 · 11 · 2026</p>
          <p style={{ fontFamily: F.pin, fontSize: 30, color: C.emerald, marginTop: 18 }}>With best compliments</p>
        </Reveal>
      </div>
    </motion.main>
  );
}

// Joyful generative wedding music (bright major key, soft plucks, warm pad, gentle hand-drum). No audio file needed
function createAmbience() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  const ctx = new AC();
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 4);
  master.connect(ctx.destination);
  const bus = ctx.createGain();
  const tone = ctx.createBiquadFilter(); tone.type = "lowpass"; tone.frequency.value = 3200;
  const echo = ctx.createDelay(1); echo.delayTime.value = 0.33;
  const fb = ctx.createGain(); fb.gain.value = 0.3;
  bus.connect(master); bus.connect(tone); tone.connect(echo); echo.connect(fb); fb.connect(echo); echo.connect(master);
  const padLp = ctx.createBiquadFilter(); padLp.type = "lowpass"; padLp.frequency.value = 1100; padLp.connect(master);
  const nb = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.06), ctx.sampleRate);
  const nd = nb.getChannelData(0); for (let k = 0; k < nd.length; k++) nd[k] = Math.random() * 2 - 1;

  const pluck = (freq, t, vol, len) => {
    const o = ctx.createOscillator(); o.type = "triangle"; o.frequency.value = freq;
    const o2 = ctx.createOscillator(); o2.type = "sine"; o2.frequency.value = freq * 2;
    const g = ctx.createGain(); const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 2600;
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0008, t + len);
    o.connect(lp); o2.connect(lp); lp.connect(g); g.connect(bus);
    o.start(t); o2.start(t); o.stop(t + len + 0.1); o2.stop(t + len + 0.1);
  };
  const pad = (freq, t, len) => {
    const o = ctx.createOscillator(); o.type = "sine"; o.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.04, t + 0.7); g.gain.setValueAtTime(0.04, t + len - 0.2); g.gain.linearRampToValueAtTime(0.0001, t + len + 0.7);
    o.connect(g); g.connect(padLp); o.start(t); o.stop(t + len + 0.8);
  };
  const dum = (t) => {
    const o = ctx.createOscillator(); o.type = "sine"; o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(55, t + 0.12);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.3, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + 0.25);
  };
  const tek = (t) => {
    const n = ctx.createBufferSource(); n.buffer = nb;
    const hp = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 3500;
    const g = ctx.createGain(); g.gain.setValueAtTime(0.07, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    n.connect(hp); hp.connect(g); g.connect(master); n.start(t);
  };

  // D major, I - V - vi - IV, semitones relative to D3 (146.83 Hz) for chords, D4 (293.66 Hz) for lead
  const chords = [[0, 4, 7], [-5, -1, 2], [-3, 0, 4], [-7, -3, 0]];
  const lead = [
    [12, null, 16, null, 14, 12, 9, null],
    [16, null, 19, null, 16, 14, 12, null],
    [14, null, 16, null, 14, 12, 11, null],
    [11, null, 14, null, 12, 11, 9, null],
  ];
  const arpOrder = [0, 1, 2, 1, 0, 1, 2, 1];
  const maqsum = ["D", "T", null, "T", "D", null, "T", null];
  const step = 0.28; let next = ctx.currentTime + 0.4, i = 0;
  const timer = setInterval(() => {
    while (next < ctx.currentTime + 1.2) {
      const bar = Math.floor(i / 8) % 4, st = i % 8, ch = chords[bar];
      if (st === 0) ch.forEach((semi) => pad(146.83 * Math.pow(2, semi / 12), next, step * 8));
      pluck(146.83 * 2 * Math.pow(2, ch[arpOrder[st]] / 12), next, 0.06, 0.7);
      const L = lead[bar][st];
      if (L !== null) pluck(293.66 * Math.pow(2, L / 12), next, 0.16, 1.4);
      if (maqsum[st] === "D") dum(next); else if (maqsum[st] === "T") tek(next);
      next += step; i++;
    }
  }, 250);
  return { ctx, timer };
}

function loadYT(cb) {
  if (window.YT && window.YT.Player) { cb(); return; }
  const prev = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = () => { if (prev) prev(); cb(); };
  if (!document.getElementById("yt-api")) {
    const t = document.createElement("script"); t.id = "yt-api"; t.src = "https://www.youtube.com/iframe_api"; document.head.appendChild(t);
  }
}

export default function WeddingInvitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [gone, setGone] = useState(false);
  const audioRef = useRef(null);
  const engineRef = useRef(null);
  const ytRef = useRef(null);
  const openedRef = useRef(false);
  useEffect(() => {
    document.title = "Shaheen Farhan & Nasifa Usman · Nikkah · 22 November 2026";
    if (YT_ID) {
      // Starts playing (muted) as soon as the site loads; the first tap unmutes it
      loadYT(() => {
        ytRef.current = new window.YT.Player("yt-player", {
          videoId: YT_ID, width: "200", height: "112",
          playerVars: { autoplay: 1, mute: 1, loop: 1, playlist: YT_ID, playsinline: 1, controls: 1, rel: 0, modestbranding: 1 },
          events: { onReady: (e) => { e.target.mute(); e.target.playVideo(); if (openedRef.current) { e.target.unMute(); e.target.setVolume(30); } } },
        });
      });
    }
    return () => {
      const e = engineRef.current; if (e) { clearInterval(e.timer); e.ctx.close(); }
      if (ytRef.current && ytRef.current.destroy) ytRef.current.destroy();
    };
  }, []);
  const open = () => {
    setIsOpen(true); openedRef.current = true; setTimeout(() => setGone(true), 2200);
    try {
      const y = ytRef.current;
      if (YT_ID) { if (y && y.unMute) { y.unMute(); y.setVolume(30); y.playVideo(); } }
      else if (MUSIC_URL && audioRef.current) { audioRef.current.volume = 0.3; audioRef.current.play().catch(() => { if (!engineRef.current) engineRef.current = createAmbience(); }); }
      else if (!engineRef.current) engineRef.current = createAmbience();
    } catch (e) {}
  };
  const toggle = () => {
    const next = !muted; setMuted(next);
    if (audioRef.current) audioRef.current.muted = next;
    const e = engineRef.current; if (e) { next ? e.ctx.suspend() : e.ctx.resume(); }
    const y = ytRef.current; if (y && y.mute) { next ? y.mute() : (y.unMute(), y.setVolume(30)); }
  };
  return (
    <div style={{ minHeight: "100vh", background: C.deep, overflowX: "hidden" }}>
      {!YT_ID && MUSIC_URL && <audio ref={audioRef} src={MUSIC_URL} loop preload="auto" />}
      <Grain />
      {isOpen && <MainContent />}
      {!gone && <LandingGate opening={isOpen} onOpen={open} />}
      {YT_ID && (
        <div style={{ position: "fixed", left: 14, bottom: 14, zIndex: 60, width: 200, height: 112, borderRadius: 12, overflow: "hidden", border: "1px solid " + C.gold, boxShadow: "0 6px 18px rgba(0,0,0,0.25)", background: C.deep, visibility: isOpen ? "visible" : "hidden" }}>
          <div id="yt-player" />
        </div>
      )}
      {isOpen && (
        <button onClick={toggle} aria-label={muted ? "Unmute music" : "Mute music"}
          style={{ position: "fixed", right: 18, bottom: 18, zIndex: 60, width: 46, height: 46, borderRadius: "50%", border: "1px solid " + C.gold, background: C.emerald, color: C.goldL, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 6px 18px rgba(0,0,0,0.25)" }}>
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      )}
      <style>{FONTS + " * { box-sizing: border-box; margin: 0; padding: 0; } body { overflow-x: hidden; background: " + C.ivory + "; }"}</style>
    </div>
  );
}
