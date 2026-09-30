import { useState, FormEvent, ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitDemoRequest } from "@/lib/demo.functions";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const waUrl = "https://wa.me/919164060961?text=Hi%20Infield7%20Team%2C%20I%27m%20interested%20in%20Infield7%20for%20Hospitals.";

type Fields = {
  name: string;
  hospital: string;
  phone: string;
  email: string;
  staffCount: string;
  role: string;
  message: string;
};

const initial: Fields = {
  name: "",
  hospital: "",
  phone: "",
  email: "",
  staffCount: "",
  role: "",
  message: ""
};

function Eyebrow({ children }: { children: ReactNode }) { 
  return <p className="mb-3 text-xs font-extrabold uppercase text-primary">{children}</p>; 
}

function Field({ label, error, children }: { label: string; error?: string | undefined; children: ReactNode }) { 
  return (
    <label className="block text-xs font-bold text-form-label">
      <span className="mb-1.5 block">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-form-error">{error}</span>}
    </label>
  ); 
}

export function DemoForm() {
  const save = useServerFn(submitDemoRequest); 
  const [fields, setFields] = useState(initial); 
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({}); 
  const [loading, setLoading] = useState(false); 
  const [success, setSuccess] = useState(false); 
  const [fallback, setFallback] = useState(waUrl);

  const set = (key: keyof Fields, value: string) => {
    setFields(f => ({ ...f, [key]: value }));
    setErrors(e => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof Fields, string>> = {};
    if (fields.name.trim().length < 2) e.name = "Please enter your full name.";
    if (fields.hospital.trim().length < 2) e.hospital = "Please enter your hospital name.";
    if (!/^[6-9]\d{9}$/.test(fields.phone)) e.phone = "Enter a valid 10-digit Indian mobile number.";
    if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "Enter a valid email address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildUrl = () => {
    const lines = [
      "Hello Infield7 Team, I would like a demo of Infield7 for Hospitals.",
      "",
      `Name: ${fields.name.trim()}`,
      `Hospital: ${fields.hospital.trim()}`,
      `Phone: +91 ${fields.phone}`,
      fields.email && `Email: ${fields.email}`,
      fields.staffCount && `Staff: ${fields.staffCount}`,
      fields.role && `Role: ${fields.role}`,
      fields.message && `Message: ${fields.message.trim()}`
    ].filter(Boolean).join("\n");
    return `https://wa.me/919164060961?text=${encodeURIComponent(lines)}`;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading || !validate()) return;
    setLoading(true);
    try {
      await save({
        data: {
          name: fields.name,
          hospital: fields.hospital,
          phone: fields.phone,
          email: fields.email,
          staffCount: fields.staffCount as any,
          role: fields.role as any,
          message: fields.message
        }
      });
      const url = buildUrl();
      setFallback(url);
      setSuccess(true);
      if (window.matchMedia("(max-width: 767px)").matches) {
        window.location.href = url;
      } else {
        const win = window.open(url, "_blank", "noopener,noreferrer");
        if (!win) window.location.href = url;
      }
    } catch {
      setErrors({ name: "We could not save your request. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "form-input"; 

  return (
    <form onSubmit={submit} noValidate className="form-card">
      <Eyebrow>PERSONALISED WALKTHROUGH</Eyebrow>
      <h3>Book Your Free Demo</h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Full Name*" error={errors.name}>
          <input className={inputClass} value={fields.name} onChange={e => set("name", e.target.value)} maxLength={100}/>
        </Field>
        <Field label="Hospital Name*" error={errors.hospital}>
          <input className={inputClass} value={fields.hospital} onChange={e => set("hospital", e.target.value)} maxLength={150}/>
        </Field>
        <Field label="Phone*" error={errors.phone}>
          <div className="flex">
            <span className="prefix">+91</span>
            <input className={`${inputClass} rounded-l-none`} value={fields.phone} onChange={e => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))} inputMode="tel"/>
          </div>
        </Field>
        <Field label="Email" error={errors.email}>
          <input className={inputClass} value={fields.email} onChange={e => set("email", e.target.value)} type="email" maxLength={255}/>
        </Field>
        <Field label="Number of Staff">
          <select className={inputClass} value={fields.staffCount} onChange={e => set("staffCount", e.target.value)}>
            <option value="">Select</option>
            <option>1–50</option>
            <option>51–200</option>
            <option>201–500</option>
            <option>500+</option>
          </select>
        </Field>
        <Field label="Your Role">
          <select className={inputClass} value={fields.role} onChange={e => set("role", e.target.value)}>
            <option value="">Select</option>
            <option>Owner/Director</option>
            <option>Administrator</option>
            <option>Operations</option>
            <option>Other</option>
          </select>
        </Field>
      </div>
      <Field label="Message">
        <textarea className={`${inputClass} mt-4 min-h-24 resize-y`} value={fields.message} onChange={e => set("message", e.target.value)} maxLength={1000}/>
      </Field>
      <Button disabled={loading} className="mt-5 w-full" type="submit">
        {loading ? (
          <><span className="spinner"/>Saving…</>
        ) : (
          <>Book My Free Demo on WhatsApp <ArrowRight size={17}/></>
        )}
      </Button>
      <p className="mt-3 text-center text-xs text-form-muted">🔒 Your details are safe. We never spam.</p>
      {success && (
        <div className="mt-4 rounded-lg bg-success-soft p-4 text-sm text-success">
          <b className="flex items-center gap-2"><Check size={18}/> Almost done! Please tap 'Send' in WhatsApp to confirm your demo.</b>
          <a href={fallback} target="_blank" rel="noreferrer" className="mt-2 inline-block underline">Didn't open WhatsApp? Click here</a>
        </div>
      )}
    </form>
  );
}
