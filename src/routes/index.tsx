import { createFileRoute, useServerFn } from "@tanstack/react-router";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  Activity, Ambulance, ArrowRight, Building2, Check, ChevronRight, Clock3, FlaskConical,
  HeartPulse, Instagram, Linkedin, Mail, MapPin, Menu, MessageCircle, Microscope,
  Phone, Pill, Search, ShieldCheck, Stethoscope, Users, X,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { submitDemoRequest } from "@/lib/demo.functions";
import heroPhoto from "@/assets/doctor-phone.jpg.asset.json";
import adminPhoto from "@/assets/administrator-phone.jpg.asset.json";
import ambulancePhoto from "@/assets/ambulance.jpg.asset.json";
import stretcherPhoto from "@/assets/stretcher.jpg.asset.json";
import receptionPhoto from "@/assets/reception.jpg.asset.json";
import deskPhoto from "@/assets/clinical-desk.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "INFIELD for Hospitals — Find Any Doctor or Nurse Instantly | Staff Tracking App" },
      { name: "description", content: "See which doctors and nurses are available, where they are, and contact the nearest one in one tap. Real-time hospital staff tracking app. Book a free demo." },
      { property: "og:title", content: "INFIELD for Hospitals — Find Any Doctor or Nurse Instantly" },
      { property: "og:description", content: "Real-time hospital staff tracking. See who is available, where they are, and contact the nearest person in one tap." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: InfieldPage,
});

const waUrl = "https://wa.me/919164060961?text=Hi%20INFIELD%20Team%2C%20I%27m%20interested%20in%20INFIELD%20for%20Hospitals.";
const nav = [["How It Works", "how-it-works"], ["Features", "features"], ["Departments", "departments"], ["Contact", "contact"]] as const;

function scrollTo(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }

function Logo({ inverse = false }: { inverse?: boolean }) {
  return <a href="#top" className="flex items-center gap-2.5" aria-label="INFIELD home">
    <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground"><MapPin size={21} strokeWidth={2.6} /></span>
    <span className={`text-xl font-extrabold tracking-normal ${inverse ? "text-primary-foreground" : "text-foreground"}`}>INFIELD</span>
  </a>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 16); fn(); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, []);
  return <>
    <div className="hidden bg-deep-navy text-xs text-topbar lg:block">
      <div className="site-container flex h-9 items-center justify-between">
        <div className="flex gap-4"><Instagram size={14}/><Linkedin size={14}/></div>
        <div className="flex items-center gap-5"><span className="flex items-center gap-1.5"><Mail size={13}/> Email us</span><a href="tel:+919164060961" className="flex items-center gap-1.5"><Phone size={13}/> +91 9164060961</a><a href={waUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5"><MessageCircle size={13}/> WhatsApp</a></div>
      </div>
    </div>
    <header className={`sticky top-0 z-50 bg-background/95 backdrop-blur transition-shadow ${scrolled ? "shadow-nav" : "border-b border-border"}`}>
      <div className="site-container grid h-[70px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {nav.map(([label,id]) => <button key={id} onClick={() => scrollTo(id)} className="text-sm font-semibold text-foreground transition-colors hover:text-primary">{label}</button>)}
          <Button size="compact" onClick={() => scrollTo("contact")}>Book a Free Demo <ArrowRight size={16}/></Button>
        </nav>
        <button onClick={() => setMenuOpen(true)} aria-label="Open menu" className="grid size-11 place-items-center rounded-lg text-foreground lg:hidden"><Menu/></button>
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
  const cards = [[MapPin,"Live Staff Location","See where every staff member is, right now."],[Phone,"Nearest Doctor in One Tap","Find and call the closest available doctor."],[Building2,"Department-Wise View","ICU, OT, Emergency, OPD, Pharmacy and Lab at a glance."]] as const;
  return <section id="top" className="relative bg-hero pt-10 md:pt-14 lg:pb-20">
    <div className="site-container grid items-center gap-10 lg:grid-cols-[1.02fr_.98fr]">
      <Reveal className="relative z-10"><Eyebrow>STAFF TRACKING APP FOR HOSPITALS</Eyebrow><h1 className="hero-title">Find Any Doctor or Nurse in Your Hospital — In One Tap.</h1><p className="mt-5 max-w-2xl text-body">Doctors, nurses, ward boys, technicians and housekeeping are always on the move. INFIELD shows you who is available, where they are and how fast they can reach you — live, on your phone.</p>
        <div className="mt-7 grid gap-3 sm:flex"><Button onClick={() => scrollTo("contact")}>Book a Free Demo <ArrowRight size={17}/></Button><Button variant="outline" onClick={() => scrollTo("how-it-works")}>See How It Works</Button></div>
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-muted-foreground"><span>✓ Free demo</span><span>✓ Works on Android &amp; iPhone</span><span>✓ No obligation</span></div>
      </Reveal>
      <Reveal className="relative mx-auto w-full max-w-[590px] pb-16 lg:pb-0" delay={.12}><div className="photo-frame aspect-[1.12] overflow-hidden"><img src={heroPhoto.url} alt="Doctor using a phone in a hospital" className="h-full w-full object-cover" fetchPriority="high"/></div><div className="absolute -bottom-1 left-1/2 -translate-x-1/2 lg:-bottom-12 lg:left-5 lg:translate-x-0"><PhoneMockup/></div></Reveal>
    </div>
    <div className="site-container relative z-20 mt-8 grid gap-4 md:grid-cols-3 lg:mt-14">{cards.map(([Icon,title,desc],i)=><Reveal key={title} delay={i*.09} className="feature-card flex items-start gap-4 text-left"><span className="icon-box"><Icon/></span><div><h3>{title}</h3><p>{desc}</p></div></Reveal>)}</div>
  </section>;
}

function PainSection() {
  const pains=["Multiple phone calls just to find one doctor","Nurses running between floors searching","No live view of who is on duty or on break","Every minute of delay puts patients at risk"];
  const [step,setStep]=useState(0); const times=["00:30","02:00","05:00"];
  useEffect(()=>{const t=setInterval(()=>setStep(s=>(s+1)%3),1600);return()=>clearInterval(t)},[]);
  const photos=[[ambulancePhoto,"Ambulance at hospital emergency entrance"],[stretcherPhoto,"Patient care in a hospital corridor"],[receptionPhoto,"Hospital receptionist on the phone"],[deskPhoto,"Empty clinical department desk"]] as const;
  return <section className="section bg-background"><div className="site-container grid items-center gap-12 lg:grid-cols-2">
    <Reveal className="grid grid-cols-2 gap-2.5">{photos.map(([img,alt],i)=><img key={alt} src={img.url} alt={alt} loading="lazy" className={`h-36 w-full rounded-lg object-cover sm:h-52 ${i===1||i===2?"translate-y-4":""}`}/>)}</Reveal>
    <Reveal><SectionHeading eyebrow="THE REAL PROBLEM" title="An Emergency Arrives. Who Is Available — Right Now?" sub="The patient needs a specialist immediately. But which doctor is free? Who is nearest? Precious minutes are lost making phone calls and searching corridors."/>
      <ul className="mt-6 space-y-3">{pains.map(p=><li key={p} className="flex items-start gap-3 text-sm font-semibold text-foreground"><span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-danger-soft text-status-red"><X size={12}/></span>{p}</li>)}</ul>
      <div className="mt-6 flex w-fit items-center gap-4 rounded-lg border border-border bg-light-blue px-5 py-3"><Clock3 className="text-status-red"/><div><AnimatePresence mode="wait"><motion.p key={step} initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-5}} className="font-mono text-xl font-extrabold text-foreground">{times[step]}</motion.p></AnimatePresence><p className="text-[11px] font-semibold text-muted-foreground">Time lost searching</p></div></div>
      <Button className="mt-7 w-full sm:w-auto" onClick={()=>scrollTo("contact")}>Stop Losing Minutes <ArrowRight size={17}/></Button>
    </Reveal>
  </div></section>;
}

function Solution() {
  return <section id="how-it-works" className="section bg-light-blue"><div className="site-container grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
    <Reveal><SectionHeading eyebrow="MEET INFIELD" title="Your Entire Hospital Staff. Live. On One Screen." sub="INFIELD tracks your hospital staff in real time. With one tap you know who is available, where they are, and how quickly they can reach you."/>
      <div className="mt-7 grid grid-cols-2 gap-3"><div className="mini-feature"><Activity/><div><b>Real-Time Status</b><span>Updated live</span></div></div><div className="mini-feature"><Phone/><div><b>One-Tap Contact</b><span>Call or message instantly</span></div></div></div>
      <div className="mt-5 flex flex-wrap gap-4 text-xs font-bold text-foreground"><span><i className="status-dot bg-status-green"/> Available</span><span><i className="status-dot bg-status-amber"/> Busy</span><span><i className="status-dot bg-status-red"/> In Surgery</span></div>
    </Reveal>
    <Reveal className="relative flex min-h-[520px] items-center justify-center"><div className="absolute left-0 top-10 hidden rounded-lg border border-border bg-background p-3 shadow-card sm:block"><span className="status-dot bg-status-green"/> <b className="text-xs">Dr. Verma</b><p className="mt-1 text-[10px] text-muted-foreground">Cardiology · Floor 2</p></div><PhoneMockup large/><div className="absolute bottom-12 right-0 hidden rounded-lg border border-border bg-background p-3 shadow-card sm:block"><span className="status-dot bg-status-amber"/> <b className="text-xs">Dr. Khan · Busy</b><p className="mt-1 text-[10px] text-muted-foreground">Neurology · Floor 3</p></div></Reveal>
  </div><div className="site-container mt-12"><h3 className="text-center text-xl font-extrabold text-foreground">How it works</h3><div className="mt-6 grid gap-4 md:grid-cols-3">{[[1,Users,"Staff check in on the app"],[2,Activity,"INFIELD shows their live status and location"],[3,Phone,"You find and contact the right person in one tap"]].map(([n,Icon,text],i)=><Reveal key={String(n)} delay={i*.1} className="step-card"><span>{n}</span><Icon className="text-primary"/><p>{text}</p></Reveal>)}</div></div></section>;
}

function DarkBanner() { return <section className="relative overflow-hidden py-20"><img src={stretcherPhoto.url} alt="Hospital corridor" loading="lazy" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-banner-overlay"/><Reveal className="site-container relative z-10 text-center text-primary-foreground"><h2 className="mx-auto max-w-3xl text-3xl font-bold md:text-4xl">When Every Second Matters, Don't Waste Them Searching.</h2><p className="mt-4 text-base text-banner-muted">Know exactly who can respond — before you pick up the phone.</p></Reveal></section>; }

const staff=[
  {name:"Nurse Anjali",role:"Staff Nurse",status:"Available",color:"green",floor:"Floor 1",distance:"15 m",nearest:true,initials:"NA"},
  {name:"Dr. Verma",role:"Cardiologist",status:"Available",color:"green",floor:"Floor 2",distance:"30 m",initials:"DV"},
  {name:"Dr. Khan",role:"Neurologist",status:"Busy",color:"amber",floor:"Floor 3",distance:"50 m",initials:"DK"},
];
function StaffCard({ person, i }: {person:typeof staff[number];i:number}) { const [calling,setCalling]=useState(false); return <Reveal delay={i*.1} className={`staff-card ${person.nearest?"border-primary shadow-blue":""}`}><div className="flex items-center justify-between">{person.nearest?<span className="nearest">NEAREST</span>:<span/>}<span className={`status-dot bg-status-${person.color}`}/></div><div className="avatar">{person.initials}</div><h3>{person.name}</h3><p className="text-sm text-muted-foreground">{person.role}</p><div className="mt-4 flex items-center justify-center gap-2 text-xs"><span className={`status-dot bg-status-${person.color}`}/><b>{person.status}</b></div><p className="mt-2 text-xs text-muted-foreground">{person.floor} · {person.distance}</p><div className="mt-5 grid grid-cols-2 gap-2"><Button size="compact" onClick={()=>{setCalling(true);setTimeout(()=>setCalling(false),2200)}}>{calling?<><span className="connecting-dot"/>Connecting…</>:<><Phone size={15}/> Call</>}</Button><Button size="compact" variant="outline"><MessageCircle size={15}/> Message</Button></div></Reveal>; }
function Nearest() { return <section id="features" className="section bg-background"><div className="site-container"><Reveal><SectionHeading center eyebrow="EMERGENCY RESPONSE" title="Emergency? See the Nearest Available Doctor Instantly." sub="Open the app, see who is closest to the Emergency Ward, and call or message them in one tap."/></Reveal><div className="mx-auto mt-7 flex w-fit items-center gap-2 rounded-lg bg-danger-soft px-4 py-2 text-sm font-extrabold text-status-red"><MapPin size={17}/> Emergency Ward</div><div className="mx-auto mt-7 grid max-w-5xl gap-4 md:grid-cols-3">{staff.map((p,i)=><StaffCard key={p.name} person={p} i={i}/>)}</div><p className="mt-8 text-center font-bold text-foreground">From emergency to response — without a single wasted call.</p></div></section>; }

const departments=[["ICU",HeartPulse,12,"On Break",2],["OT",Stethoscope,8,"In Surgery",5],["Emergency",Ambulance,10,"On Break",1],["OPD",Users,15,"On Break",3],["Pharmacy",Pill,4,"On Break",1],["Lab",FlaskConical,6,"On Break",0]] as const;
function Count({value}:{value:number}) { const ref=useRef<HTMLSpanElement>(null); const inView=useInView(ref,{once:true}); const [n,setN]=useState(0); useEffect(()=>{if(!inView)return;let frame=0;const t=setInterval(()=>{frame++;setN(Math.min(value,Math.ceil(value*frame/18)));if(frame>=18)clearInterval(t)},45);return()=>clearInterval(t)},[inView,value]);return <span ref={ref}>{n}</span>; }
function Departments() { return <section id="departments" className="section bg-light-blue"><div className="site-container"><Reveal><SectionHeading center eyebrow="DEPARTMENT VIEW" title="Every Department. Every Shift. At a Glance." sub="See how many staff are in each department, who is on duty and who is on a break."/></Reveal><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{departments.map(([name,Icon,on,label,other],i)=><Reveal key={name} delay={(i%3)*.08} className="feature-card text-center"><span className="icon-box mx-auto"><Icon/></span><h3 className="mt-4">{name}</h3><div className="mt-3 flex justify-center gap-5 text-sm"><span><b className="text-xl text-status-green"><Count value={on}/></b><small>On Duty</small></span><span><b className={`text-xl ${label==="In Surgery"?"text-status-red":"text-status-amber"}`}><Count value={other}/></b><small>{label}</small></span></div></Reveal>)}</div>
      <Reveal className="dashboard-mockup"><div className="dashboard-top"><div><p className="text-xs font-bold text-primary">CITY CARE HOSPITAL</p><h3>Department Live Summary</h3></div><span className="live-pill"><i/> LIVE</span></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{departments.map(([name,Icon,on,label,other])=><div key={name} className="dashboard-row"><Icon size={18}/><div className="min-w-0 flex-1"><b>{name}</b><p>{on} on duty · {other} {label.toLowerCase()}</p></div><ChevronRight size={16}/></div>)}</div></Reveal>
    </div></section>; }

type Fields={name:string;hospital:string;phone:string;email:string;staffCount:string;role:string;message:string};
const initial:Fields={name:"",hospital:"",phone:"",email:"",staffCount:"",role:"",message:""};
function DemoForm() {
  const save=useServerFn(submitDemoRequest); const [fields,setFields]=useState(initial); const [errors,setErrors]=useState<Partial<Record<keyof Fields,string>>>({}); const [loading,setLoading]=useState(false); const [success,setSuccess]=useState(false); const [fallback,setFallback]=useState(waUrl);
  const set=(key:keyof Fields,value:string)=>{setFields(f=>({...f,[key]:value}));setErrors(e=>({...e,[key]:undefined}))};
  const validate=()=>{const e:Partial<Record<keyof Fields,string>>={};if(fields.name.trim().length<2)e.name="Please enter your full name.";if(fields.hospital.trim().length<2)e.hospital="Please enter your hospital name.";if(!/^[6-9]\d{9}$/.test(fields.phone))e.phone="Enter a valid 10-digit Indian mobile number.";if(fields.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))e.email="Enter a valid email address.";setErrors(e);return Object.keys(e).length===0};
  const buildUrl=()=>{const lines=["Hello INFIELD Team, I would like a demo of INFIELD for Hospitals.","",`Name: ${fields.name.trim()}`,`Hospital: ${fields.hospital.trim()}`,`Phone: +91 ${fields.phone}`,fields.email&&`Email: ${fields.email}`,fields.staffCount&&`Staff: ${fields.staffCount}`,fields.role&&`Role: ${fields.role}`,fields.message&&`Message: ${fields.message.trim()}`].filter(Boolean).join("\n");return `https://wa.me/919164060961?text=${encodeURIComponent(lines)}`};
  const submit=async(e:FormEvent)=>{e.preventDefault();if(loading||!validate())return;setLoading(true);try{await save({data:{name:fields.name,hospital:fields.hospital,phone:fields.phone,email:fields.email,staffCount:fields.staffCount as "1–50"|"51–200"|"201–500"|"500+"|undefined,role:fields.role as "Owner/Director"|"Administrator"|"Operations"|"Other"|undefined,message:fields.message}});const url=buildUrl();setFallback(url);setSuccess(true);if(window.matchMedia("(max-width: 767px)").matches) window.location.href=url; else {const win=window.open(url,"_blank","noopener,noreferrer");if(!win) window.location.href=url;}}catch{setErrors({name:"We could not save your request. Please try again."})}finally{setLoading(false)}};
  const inputClass="form-input"; return <form onSubmit={submit} noValidate className="form-card"><Eyebrow>PERSONALISED WALKTHROUGH</Eyebrow><h3>Book Your Free Demo</h3><div className="mt-6 grid gap-4 sm:grid-cols-2"><Field label="Full Name*" error={errors.name}><input className={inputClass} value={fields.name} onChange={e=>set("name",e.target.value)} maxLength={100}/></Field><Field label="Hospital Name*" error={errors.hospital}><input className={inputClass} value={fields.hospital} onChange={e=>set("hospital",e.target.value)} maxLength={150}/></Field><Field label="Phone*" error={errors.phone}><div className="flex"><span className="prefix">+91</span><input className={`${inputClass} rounded-l-none`} value={fields.phone} onChange={e=>set("phone",e.target.value.replace(/\D/g,"").slice(0,10))} inputMode="tel"/></div></Field><Field label="Email" error={errors.email}><input className={inputClass} value={fields.email} onChange={e=>set("email",e.target.value)} type="email" maxLength={255}/></Field><Field label="Number of Staff"><select className={inputClass} value={fields.staffCount} onChange={e=>set("staffCount",e.target.value)}><option value="">Select</option><option>1–50</option><option>51–200</option><option>201–500</option><option>500+</option></select></Field><Field label="Your Role"><select className={inputClass} value={fields.role} onChange={e=>set("role",e.target.value)}><option value="">Select</option><option>Owner/Director</option><option>Administrator</option><option>Operations</option><option>Other</option></select></Field></div><Field label="Message"><textarea className={`${inputClass} mt-4 min-h-24 resize-y`} value={fields.message} onChange={e=>set("message",e.target.value)} maxLength={1000}/></Field><Button disabled={loading} className="mt-5 w-full" type="submit">{loading?<><span className="spinner"/>Saving…</>:<>Book My Free Demo on WhatsApp <ArrowRight size={17}/></>}</Button><p className="mt-3 text-center text-xs text-form-muted">🔒 Your details are safe. We never spam.</p>{success&&<div className="mt-4 rounded-lg bg-success-soft p-4 text-sm text-success"><b className="flex items-center gap-2"><Check size={18}/> Almost done! Please tap 'Send' in WhatsApp to confirm your demo.</b><a href={fallback} target="_blank" rel="noreferrer" className="mt-2 inline-block underline">Didn't open WhatsApp? Click here</a></div>}</form>;
}
function Field({label,error,children}:{label:string;error?:string;children:ReactNode}) { return <label className="block text-xs font-bold text-form-label"><span className="mb-1.5 block">{label}</span>{children}{error&&<span className="mt-1 block text-xs text-form-error">{error}</span>}</label>; }
function FinalCta(){return <section id="contact" className="section bg-background"><div className="site-container"><div className="overflow-hidden rounded-xl bg-deep-navy shadow-card"><div className="grid lg:grid-cols-[.9fr_1.1fr]"><div className="relative min-h-[380px]"><img src={adminPhoto.url} alt="Hospital administrator looking at a phone" loading="lazy" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-cta-overlay"/><div className="absolute inset-x-0 bottom-0 z-10 p-7 text-primary-foreground md:p-10"><h2 className="text-3xl font-bold md:text-4xl">See INFIELD Live in Your Hospital</h2><ul className="mt-5 space-y-3">{["Free personalised demo","Setup for all your departments","No obligation"].map(t=><li key={t} className="flex items-center gap-2 text-sm font-semibold"><Check size={18}/>{t}</li>)}</ul></div></div><div className="p-4 sm:p-7 lg:p-10"><DemoForm/></div></div></div><p className="mt-5 text-center text-xs font-semibold text-muted-foreground">🔒 Tracks staff only during duty hours · Staff consent built-in · Patient data is never tracked</p></div></section>}

function Footer(){return <footer className="bg-deep-navy py-12 text-footer"><div className="site-container grid gap-8 md:grid-cols-[1fr_auto_auto]"><div><span className="inline-flex rounded-lg bg-background p-2"><Logo/></span><p className="mt-4 max-w-sm text-sm text-footer-muted">Real-time staff visibility for faster, calmer hospital response.</p></div><div><h3 className="font-bold text-primary-foreground">Explore</h3><div className="mt-4 grid gap-2 text-sm">{nav.map(([l,id])=><button key={id} className="text-left hover:text-primary-foreground" onClick={()=>scrollTo(id)}>{l}</button>)}</div></div><div><h3 className="font-bold text-primary-foreground">Contact</h3><div className="mt-4 space-y-2 text-sm"><a className="flex items-center gap-2" href="tel:+919164060961"><Phone size={15}/> +91 9164060961</a><a className="flex items-center gap-2" href={waUrl} target="_blank" rel="noreferrer"><MessageCircle size={15}/> WhatsApp</a></div></div></div><div className="site-container mt-10 flex flex-col gap-3 border-t border-footer-border pt-6 text-xs sm:flex-row sm:items-center sm:justify-between"><p>© 2026 INFIELD. All rights reserved.</p><div className="flex gap-5"><a href="#">Privacy Policy</a><a href="#">Terms &amp; Conditions</a></div></div></footer>}

function FloatingActions(){const [contactVisible,setContactVisible]=useState(false);useEffect(()=>{const el=document.getElementById("contact");if(!el)return;const o=new IntersectionObserver(([entry])=>setContactVisible(entry.isIntersecting),{threshold:.1});o.observe(el);return()=>o.disconnect()},[]);return <><a className="floating-wa" href={waUrl} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle/><span>Chat on WhatsApp</span></a>{!contactVisible&&<Button className="floating-demo md:hidden" onClick={()=>scrollTo("contact")}>Book a Free Demo</Button>}</>}
function InfieldPage(){return <main className="overflow-x-clip"><Header/><Hero/><PainSection/><Solution/><DarkBanner/><Nearest/><Departments/><FinalCta/><Footer/><FloatingActions/></main>}