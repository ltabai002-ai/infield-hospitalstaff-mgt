import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  Activity, Ambulance, ArrowRight, Building2, Check, CheckCircle, ChevronRight, Clock3, FlaskConical,
  HeartPulse, Instagram, Linkedin, Mail, MapPin, Menu, MessageCircle, Microscope,
  Phone, Pill, Search, ShieldCheck, Stethoscope, Users, X, XCircle
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { submitDemoRequest } from "@/lib/demo.functions";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { DemoForm } from "@/components/DemoForm";
// Fallback to high-quality Unsplash images since Lovable asset proxy isn't available locally
const heroPhoto = { url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80" };
const adminPhoto = { url: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&q=80" };
const ambulancePhoto = { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80" };
const stretcherPhoto = { url: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&q=80" };
const receptionPhoto = { url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80" };
const deskPhoto = { url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80" };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Infield7 | Real-Time Staff Tracking Software for Hospital Management" },
      { name: "description", content: "Stop losing precious minutes during emergencies. Track your entire hospital staff in real-time. Know exactly who is available and where they are." },
      { property: "og:title", content: "Infield7 | Staff Tracking Software for Hospital Management" },
      { property: "og:description", content: "Track your entire hospital staff in real-time. Know who is available, where they are, and contact the nearest person in one tap." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Infield7Page,
});

const waUrl = "https://wa.me/919164060961?text=Hi%20Infield7%20Team%2C%20I%27m%20interested%20in%20Infield7%20for%20Hospitals.";
const nav = [["How It Works", "how-it-works"], ["Features", "features"], ["Departments", "departments"], ["Contact", "contact"]] as const;

function scrollTo(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }

function Logo({ inverse = false }: { inverse?: boolean }) {
  return <a href="#top" className="flex items-center" aria-label="Infield7 home">
    <img src="/logo.png" alt="Infield7 Logo" className="h-10 w-auto object-contain" />
  </a>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 16); fn(); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  return <>
    <div className="hidden bg-primary text-xs text-primary-foreground lg:block">
      <div className="site-container flex h-9 items-center justify-between">
        <div className="flex gap-4"><Instagram size={14}/><Linkedin size={14}/></div>
        <div className="flex items-center gap-5"><span className="flex items-center gap-1.5"><Mail size={13}/> Email us</span><a href="tel:+919164060961" className="flex items-center gap-1.5"><Phone size={13}/> +91 9164060961</a><a href={waUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5"><MessageCircle size={13}/> WhatsApp</a></div>
      </div>
    </div>
    <header className={`sticky top-0 z-50 bg-background/95 backdrop-blur transition-shadow ${scrolled ? "shadow-nav" : "border-b border-border-light"}`}>
      <div className="site-container grid h-[80px] grid-cols-[auto_1fr_auto] items-center gap-8">
        <Logo />
        <nav className="hidden items-center justify-center gap-8 lg:flex" aria-label="Main navigation">
          {nav.map(([label,id]) => <button key={id} onClick={() => scrollTo(id)} className="text-sm font-bold text-foreground transition-colors hover:text-primary">{label}</button>)}
        </nav>
        <div className="hidden lg:block"><Button size="compact" onClick={() => scrollTo("contact")}>Book a Free Demo</Button></div>
        <button onClick={() => setMenuOpen(true)} aria-label="Open menu" className="grid size-11 place-items-center justify-self-end rounded-lg text-foreground lg:hidden"><Menu/></button>
      </div>
    </header>
    <AnimatePresence>{menuOpen && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[70] flex flex-col bg-deep-navy px-6 py-5 text-primary-foreground lg:hidden">
      <div className="flex items-center justify-between"><Logo inverse/><button className="grid size-11 place-items-center" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X/></button></div>
      <nav className="mt-20 flex flex-col gap-8 text-3xl font-bold">{nav.map(([label,id]) => <button key={id} className="text-left" onClick={() => { setMenuOpen(false); setTimeout(() => scrollTo(id), 100); }}>{label}</button>)}</nav>
      <Button className="mt-auto w-full" onClick={() => { setMenuOpen(false); setTimeout(() => scrollTo("contact"), 100); }}>Book a Free Demo <ArrowRight size={17}/></Button>
    </motion.div>}</AnimatePresence>
  </>;
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null); const reduced = useReducedMotion(); const seen = useInView(ref, { once: true, margin: "-70px" });
  return <motion.div ref={ref} className={className} initial={reduced ? false : { opacity: 0, y: 28 }} animate={seen ? { opacity: 1, y: 0 } : undefined} transition={{ duration: .55, delay }}>{children}</motion.div>;
}

function Eyebrow({ children }: { children: ReactNode }) { return <p className="mb-3 text-xs font-extrabold uppercase text-primary">{children}</p>; }
function SectionHeading({ eyebrow, title, sub, center=false }: { eyebrow:string; title:string; sub?:string; center?:boolean }) { return <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}><Eyebrow>{eyebrow}</Eyebrow><h2 className="section-title">{title}</h2>{sub && <p className="mt-4 text-body">{sub}</p>}</div>; }

const floors = [
  { floor: "Floor 1", dept: "Emergency", people: [["Nurse Anjali","Available","green"],["Dr. Rao","Busy","amber"]] },
  { floor: "Floor 2", dept: "Cardiology", people: [["Dr. Verma","Available","green"],["Nurse Mary","Available","green"]] },
  { floor: "Floor 3", dept: "OT / ICU", people: [["Dr. Khan","In Surgery","red"],["Nurse Priya","Busy","amber"]] },
];

function PhoneMockup({ large=false }: { large?:boolean }) {
  return <div className={`phone-shell ${large ? "w-[292px]" : "w-[250px]"}`}>
    <div className="mx-auto mb-3 h-4 w-20 rounded-b-xl bg-deep-navy"/>
    <div className="flex items-start justify-between border-b border-border px-3 pb-3"><div><p className="text-[9px] font-bold text-primary">CITY CARE HOSPITAL</p><p className="text-sm font-extrabold text-foreground">Live Staff</p></div><div className="relative"><Search size={18}/><span className="absolute -right-1 -top-1 size-2 rounded-full bg-status-green ring-2 ring-background animate-pulse"/></div></div>
    <div className="space-y-2 p-3">{floors.map((f, i) => <motion.div key={f.floor} initial={{opacity:0,x:12}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.13}} className="rounded-lg border border-border bg-background p-2.5 shadow-app">
      <div className="mb-2 flex justify-between"><span className="text-[10px] font-extrabold text-foreground">{f.floor} · {f.dept}</span><span className="text-[8px] text-muted-foreground">{f.people.length} staff</span></div>
      {f.people.map(([name,status,color]) => <div key={name} className="mb-1.5 flex items-center justify-between rounded-md bg-soft-blue px-2 py-1.5 last:mb-0"><div className="flex items-center gap-2"><span className={`status-dot bg-status-${color}`}/><span className="text-[9px] font-bold text-foreground">{name}</span></div><span className="text-[8px] text-muted-foreground">{status}</span></div>)}
    </motion.div>)}</div>
    <div className="mx-3 mb-3 rounded-lg bg-primary p-3 text-primary-foreground shadow-button"><p className="text-[9px] opacity-80">NEAREST AVAILABLE</p><p className="text-xs font-extrabold">Dr. Verma</p><div className="mt-1 flex items-center justify-between text-[9px]"><span>Cardiologist · Floor 2</span><span className="rounded bg-background/20 px-2 py-1">Call</span></div></div>
  </div>;
}

function Hero() {
  return (
    <section id="top" className="relative bg-[#0B1930] pt-28 pb-20 lg:pt-24 lg:pb-32 lg:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image on Right with Gradient Mask */}
      <div className="absolute top-0 right-0 w-full lg:w-[65%] h-full opacity-40 lg:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1930] via-[#0B1930]/80 to-transparent z-10 hidden lg:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1930] via-transparent to-transparent z-10" />
        <img src={heroPhoto.url} alt="Hospital staff" className="w-full h-full object-cover" />
      </div>

      <div className="site-container relative z-20 grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-10">
        <Reveal>
          {/* Eyebrow */}
          <div className="flex items-center gap-3 text-[11px] font-bold text-white tracking-[0.2em] uppercase mb-6 sm:mb-8">
            <div className="w-8 h-[2px] bg-[#FFD700]"></div>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-status-green animate-pulse"></span> HOSPITAL MANAGEMENT SOFTWARE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[3.8rem] font-extrabold text-white leading-[1.1] tracking-tight">
            Stop Losing Minutes.<br/>Track Your Entire Hospital Staff <span className="text-[#FFD700]">in Real-Time.</span>
          </h1>

          <p className="mt-8 text-lg md:text-[19px] text-white/90 max-w-[500px] leading-relaxed">
            Doctors, nurses, ward boys, and technicians are constantly moving. Infield7 gives you a live view of who is available, where they are, and how fast they can reach an emergency—all on one screen.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button className="bg-[#FFD700] hover:bg-[#E6C200] text-black text-[15px] font-bold h-14 px-8 rounded-full shadow-lg" onClick={() => scrollTo("contact")}>
              Get Your Free Demo <ArrowRight size={18} className="ml-2"/>
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white text-[15px] font-bold h-14 px-8 rounded-full bg-transparent" onClick={() => scrollTo("how-it-works")}>
              See how it works
            </Button>
          </div>

          <p className="mt-8 text-[13px] font-medium text-white/50">
            Works on Android &amp; iPhone · [Hindi supported]
          </p>
        </Reveal>

        {/* Floating Card */}
        <Reveal className="hidden lg:flex justify-end pr-8" delay={0.2}>
          <div className="w-[400px] rounded-2xl border border-white/10 bg-[#1A2639]/85 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-7">
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <span className="text-xs font-bold text-white/70 tracking-widest">EMERGENCY WARD — LIVE</span>
              <span className="flex items-center gap-2 text-[11px] font-bold text-status-green tracking-wider uppercase"><span className="w-1.5 h-1.5 rounded-full bg-status-green animate-pulse"></span> LIVE</span>
            </div>
            <div className="space-y-5">
              <div className="flex items-center gap-3.5">
                <CheckCircle size={18} strokeWidth={2.5} className="text-status-green"/>
                <span className="text-[15px] text-white"><b className="font-semibold">Dr. Verma</b> — available 8:02 AM</span>
              </div>
              <div className="flex items-center gap-3.5">
                <CheckCircle size={18} strokeWidth={2.5} className="text-status-green"/>
                <span className="text-[15px] text-white"><b className="font-semibold">Nurse Anjali</b> — available 8:15 AM</span>
              </div>
              <div className="flex items-center gap-3.5">
                <XCircle size={18} strokeWidth={2.5} className="text-status-red"/>
                <span className="text-[15px] text-white/80"><b className="font-semibold">Dr. Khan</b> — in surgery</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PainSection() {
  const points=["Valuable minutes lost making multiple phone calls","Nurses running between floors searching for doctors","No live visibility of who is on duty or on break","Every minute of delay impacts patient outcomes"];
  const photos=[[ambulancePhoto,"Ambulance"],[stretcherPhoto,"Stretcher"],[receptionPhoto,"Reception"],[deskPhoto,"Desk"]] as const;
  return <section className="section bg-background pt-24 lg:pt-32"><div className="site-container grid items-center gap-12 lg:grid-cols-2">
    <Reveal className="grid grid-cols-2 gap-4">{photos.map(([img,alt],i)=><img key={alt} src={img.url} alt={alt} loading="lazy" className={`h-40 w-full rounded-xl object-cover sm:h-64 ${i===1||i===2?"-translate-y-4":"translate-y-4"}`}/>)}</Reveal>
    <Reveal><SectionHeading eyebrow="THE REAL PROBLEM" title="Hospital Chaos &amp; Emergency Delays" sub="Imagine an emergency case arrives. The patient needs a specialist immediately. But which doctor is available? Who is the nearest? Precious minutes are lost just trying to find out."/>
      <ul className="mt-8 space-y-4">{points.map(p=><li key={p} className="flex items-center gap-3 text-[15px] font-bold text-foreground"><span className="grid size-6 shrink-0 place-items-center rounded-full bg-danger-soft text-status-red"><X size={14} strokeWidth={3}/></span>{p}</li>)}</ul>
      <Button className="mt-9" onClick={()=>scrollTo("contact")}>Stop Losing Time <ArrowRight size={17}/></Button>
    </Reveal>
  </div></section>;
}

function Solution() {
  return <section id="how-it-works" className="section bg-navy text-white pt-24 pb-28 relative overflow-hidden">
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-navy to-navy"></div>
    <div className="site-container relative z-10 grid items-center gap-16 lg:grid-cols-[1fr_1fr]">
    <Reveal>
      <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-sm font-bold text-[#93B4FF] mb-6">
        <Activity size={16}/> THE SOLUTION
      </div>
      <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white tracking-tight">Your Entire Hospital Staff. Live. On One Screen.</h2>
      <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-lg">The solution to hospital chaos is our dedicated staff tracking application. Designed exclusively for management and emergency response. With just one tap, know who is available, exactly where they are, and how quickly they can reach you.</p>
      
      <div className="mt-10 grid gap-4 sm:grid-cols-2 border-t border-white/10 pt-10">
        <div className="flex flex-col gap-3">
          <div className="grid size-12 place-items-center rounded-xl bg-white/5 text-[#93B4FF]"><MapPin size={24}/></div>
          <b className="text-[16px] text-white">Live Staff Map</b>
          <span className="text-sm text-white/60">Color-coded real-time availability across all hospital floors.</span>
        </div>
        <div className="flex flex-col gap-3">
          <div className="grid size-12 place-items-center rounded-xl bg-white/5 text-[#93B4FF]"><Phone size={24}/></div>
          <b className="text-[16px] text-white">Instant Connect</b>
          <span className="text-sm text-white/60">Call or message the nearest available staff member directly from the map.</span>
        </div>
      </div>
    </Reveal>
    <Reveal className="relative flex justify-center lg:justify-end">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="relative z-10 transform lg:rotate-[-2deg] transition-transform hover:rotate-0 duration-500">
        <div className="absolute -left-12 top-10 hidden rounded-xl border border-white/10 bg-white/10 backdrop-blur-md p-4 shadow-2xl sm:block animate-pulse">
          <span className="status-dot bg-status-green shadow-[0_0_8px_#22C55E]"/> <b className="text-sm text-white ml-2">Dr. Verma</b>
          <p className="mt-1 text-xs text-white/60">Cardiology · Floor 2</p>
        </div>
        <PhoneMockup large/>
        <div className="absolute -right-8 bottom-20 hidden rounded-xl border border-white/10 bg-white/10 backdrop-blur-md p-4 shadow-2xl sm:block">
          <span className="status-dot bg-status-amber"/> <b className="text-sm text-white ml-2">Dr. Khan · Busy</b>
          <p className="mt-1 text-xs text-white/60">Neurology · Floor 3</p>
        </div>
      </div>
    </Reveal>
  </div></section>;
}

function DarkBanner() { return <section className="relative overflow-hidden py-24"><img src={stretcherPhoto.url} alt="Hospital corridor" loading="lazy" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-banner-overlay"/><Reveal className="site-container relative z-10 text-center text-primary-foreground"><h2 className="mx-auto max-w-3xl text-3xl font-bold md:text-4xl">When Every Second Matters,<br/>Stop Wasting Them Searching.</h2><p className="mx-auto mt-6 max-w-2xl text-[17px] text-banner-muted">Empower your hospital management with real-time staff visibility for a faster, calmer, and more efficient emergency response.</p></Reveal></section>; }

const staff=[
  {name:"Ward Boy Raju",role:"Support Staff",status:"Available",color:"green",floor:"Floor 1",distance:"10 m",nearest:true,initials:"WR"},
  {name:"Nurse Anjali",role:"ICU Nurse",status:"Available",color:"green",floor:"Floor 1",distance:"15 m",initials:"NA"},
  {name:"Dr. Verma",role:"Cardiologist",status:"Busy",color:"amber",floor:"Floor 2",distance:"30 m",initials:"DV"},
];
function StaffCard({ person, i }: {person:typeof staff[number];i:number}) { const [calling,setCalling]=useState(false); return <Reveal delay={i*.1} className={`staff-card ${person.nearest?"border-primary shadow-blue":""}`}><div className="flex items-center justify-between">{person.nearest?<span className="nearest">NEAREST</span>:<span/>}<span className={`status-dot bg-status-${person.color}`}/></div><div className="avatar">{person.initials}</div><h3>{person.name}</h3><p className="text-sm text-muted-foreground">{person.role}</p><div className="mt-4 flex items-center justify-center gap-2 text-xs"><span className={`status-dot bg-status-${person.color}`}/><b>{person.status}</b></div><p className="mt-2 text-xs text-muted-foreground">{person.floor} · {person.distance}</p><div className="mt-5 grid grid-cols-2 gap-2"><Button size="compact" onClick={()=>{setCalling(true);setTimeout(()=>setCalling(false),2200)}}>{calling?<><span className="connecting-dot"/>Connecting…</>:<><Phone size={15}/> Call</>}</Button><Button size="compact" variant="outline"><MessageCircle size={15}/> Message</Button></div></Reveal>; }
function Nearest() { return <section id="features" className="section bg-background pt-24 pb-20"><div className="site-container"><Reveal><SectionHeading center eyebrow="EMERGENCY RESPONSE" title="Find the Nearest Available Staff Member Instantly" sub="Whether you need a specialist doctor, a critical care nurse, or a ward boy to move a patient, simply open the app and see who is closest. Dispatch the right person instantly."/></Reveal><div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">{staff.map((p,i)=><StaffCard key={p.name} person={p} i={i}/>)}</div>
    <Reveal className="mt-16 flex justify-center">
      <Button className="h-12 px-8 text-base font-bold shadow-blue" onClick={()=>scrollTo("contact")}>Book a Free Demo to See It Live <ArrowRight size={20} className="ml-2"/></Button>
    </Reveal>
  </div></section>; }

const departments=[["ICU",HeartPulse,12,"On Break",2],["OT",Stethoscope,8,"In Surgery",5],["Emergency",Ambulance,10,"On Break",1],["OPD",Users,15,"On Break",3],["Pharmacy",Pill,4,"On Break",1],["Lab",FlaskConical,6,"On Break",0]] as const;
function Count({value}:{value:number}) { const ref=useRef<HTMLSpanElement>(null); const inView=useInView(ref,{once:true}); const [n,setN]=useState(0); useEffect(()=>{if(!inView)return;let frame=0;const t=setInterval(()=>{frame++;setN(Math.min(value,Math.ceil(value*frame/18)));if(frame>=18)clearInterval(t)},45);return()=>clearInterval(t)},[inView,value]);return <span ref={ref}>{n}</span>; }
function Departments() { return <section id="departments" className="section bg-light-blue pt-20 pb-24"><div className="site-container"><Reveal><SectionHeading center eyebrow="IMAGINE A BETTER WAY" title="What If You Could Manage All Your Staff in One Single Dashboard?" sub="Imagine keeping track of every employee across your entire hospital. Know exactly who is in the ICU, who is in Surgery, and who is on a break—all at a glance."/></Reveal>
      <Reveal className="dashboard-mockup mt-14 max-w-4xl mx-auto"><div className="dashboard-top"><div><p className="text-xs font-bold text-primary">CITY CARE HOSPITAL</p><h3>Central Staff Dashboard</h3></div><span className="live-pill"><i/> LIVE</span></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{departments.map(([name,Icon,on,label,other])=><div key={name} className="dashboard-row"><Icon size={18}/><div className="min-w-0 flex-1"><b>{name}</b><p>{on} on duty · {other} {label.toLowerCase()}</p></div><ChevronRight size={16}/></div>)}</div></Reveal>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{departments.map(([name,Icon,on,label,other],i)=><Reveal key={name} delay={(i%3)*.08} className="feature-card text-center"><span className="icon-box mx-auto !bg-background border border-primary text-primary"><Icon/></span><h3 className="mt-4">{name}</h3><div className="mt-4 flex justify-center gap-6 text-sm"><span><b className="text-xl text-status-green"><Count value={on}/></b><small className="block mt-0.5">On Duty</small></span><span><b className={`text-xl ${label==="In Surgery"?"text-status-red":"text-status-amber"}`}><Count value={other}/></b><small className="block mt-0.5">{label}</small></span></div></Reveal>)}</div>
    </div></section>; }


function PartnerWithUs() {
  return <section className="section bg-light-blue pt-24 pb-20 border-b border-border/50">
    <div className="site-container max-w-4xl text-center">
      <Reveal>
        <SectionHeading center eyebrow="PARTNER WITH US" title="Ready to Make Your Hospital Operations More Effective?" sub="Managing a large hospital workforce doesn't have to be chaotic. If you want to take control of your staff management, eliminate wasted time during emergencies, and streamline your entire daily operation, we are here to help."/>
        <div className="mt-10 grid sm:grid-cols-3 gap-6 text-left">
          <div className="bg-background p-6 rounded-xl border border-border shadow-sm"><div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4"><ShieldCheck size={20}/></div><h4 className="font-bold text-foreground">Proven Expertise</h4><p className="text-sm text-muted-foreground mt-2">We specialize in healthcare tech, understanding exactly what hospital management needs.</p></div>
          <div className="bg-background p-6 rounded-xl border border-border shadow-sm"><div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4"><Activity size={20}/></div><h4 className="font-bold text-foreground">Seamless Integration</h4><p className="text-sm text-muted-foreground mt-2">Our software integrates perfectly into your existing hospital workflows without disruption.</p></div>
          <div className="bg-background p-6 rounded-xl border border-border shadow-sm"><div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4"><Users size={20}/></div><h4 className="font-bold text-foreground">Dedicated Support</h4><p className="text-sm text-muted-foreground mt-2">We provide hands-on setup and training for your entire management team and staff.</p></div>
        </div>
        <div className="mt-14">
          <p className="font-semibold text-foreground mb-4">Let's discuss how we can transform your hospital.</p>
          <Button size="lg" className="h-12 px-8 text-base font-bold shadow-blue" onClick={()=>scrollTo("contact")}>Contact Us to Get Started <ArrowRight size={18} className="ml-2"/></Button>
        </div>
      </Reveal>
    </div>
  </section>;
}

function FinalCta(){return <section id="contact" className="section bg-background"><div className="site-container"><div className="overflow-hidden rounded-xl bg-deep-navy shadow-card"><div className="grid lg:grid-cols-[.9fr_1.1fr]"><div className="relative min-h-[380px]"><img src={adminPhoto.url} alt="Hospital administrator looking at a phone" loading="lazy" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-cta-overlay"/><div className="absolute inset-x-0 bottom-0 z-10 p-7 text-primary-foreground md:p-10"><h2 className="text-3xl font-bold md:text-4xl">See Infield7 Live in Your Hospital</h2><ul className="mt-5 space-y-3">{["Free personalised demo","Setup for all your departments","No obligation"].map(t=><li key={t} className="flex items-center gap-2 text-sm font-semibold"><Check size={18}/>{t}</li>)}</ul></div></div><div className="p-4 sm:p-7 lg:p-10"><DemoForm/></div></div></div><p className="mt-5 text-center text-xs font-semibold text-muted-foreground">🔒 Tracks staff only during duty hours · Staff consent built-in · Patient data is never tracked</p></div></section>}

function Footer(){return <footer className="bg-deep-navy py-12 text-footer"><div className="site-container grid gap-8 md:grid-cols-[1fr_auto_auto]"><div><span className="inline-flex rounded-lg bg-background p-2"><Logo/></span><p className="mt-4 max-w-sm text-sm text-footer-muted">Real-time staff visibility for faster, calmer hospital response.</p></div><div><h3 className="font-bold text-primary-foreground">Explore</h3><div className="mt-4 grid gap-2 text-sm">{nav.map(([l,id])=><button key={id} className="text-left hover:text-primary-foreground" onClick={()=>scrollTo(id)}>{l}</button>)}</div></div><div><h3 className="font-bold text-primary-foreground">Contact</h3><div className="mt-4 space-y-2 text-sm"><a className="flex items-center gap-2" href="tel:+919164060961"><Phone size={15}/> +91 9164060961</a><a className="flex items-center gap-2" href={waUrl} target="_blank" rel="noreferrer"><MessageCircle size={15}/> WhatsApp</a></div></div></div><div className="site-container mt-10 flex flex-col gap-3 border-t border-footer-border pt-6 text-xs sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Infield7. All rights reserved.</p><div className="flex gap-5"><a href="#">Privacy Policy</a><a href="#">Terms &amp; Conditions</a></div></div></footer>}

function FloatingActions(){const [contactVisible,setContactVisible]=useState(false);useEffect(()=>{const el=document.getElementById("contact");if(!el)return;const o=new IntersectionObserver(([entry])=>setContactVisible(entry.isIntersecting),{threshold:.1});o.observe(el);return()=>o.disconnect()},[]);return <><a className="floating-wa" href={waUrl} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="size-6" /></a>{!contactVisible&&<Button className="floating-demo md:hidden" onClick={()=>scrollTo("contact")}>Book a Free Demo</Button>}</>}
function Infield7Page(){return <main className="overflow-x-clip"><Header/><Hero/><PainSection/><Departments/><Solution/><DarkBanner/><Nearest/><PartnerWithUs/><FinalCta/><Footer/><FloatingActions/><OnboardingFlow/></main>}
