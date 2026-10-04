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
  address: string;
  city: string;
  appointmentDate: string;
  appointmentTime: string;
  role: string;
  challenge: string;
  staffCount: string;
  message: string;
};

const initial: Fields = {
  name: "",
  hospital: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  appointmentDate: "",
  appointmentTime: "",
  role: "",
  challenge: "",
  staffCount: "",
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
    if (!fields.phone.trim() || !/^\+?[0-9\s\-()]{6,20}$/.test(fields.phone.trim())) {
      e.phone = "Please enter a valid phone number with country code.";
    }
    if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "Enter a valid email address.";
    if (!fields.appointmentDate) e.appointmentDate = "Please select a preferred date.";
    if (!fields.appointmentTime) e.appointmentTime = "Please select a preferred time.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildUrl = () => {
    const lines = [
      "Hello Infield7 Team, I would like a demo of Infield7 for Hospitals.",
      "",
      `Name: ${fields.name.trim()}`,
      `Hospital: ${fields.hospital.trim()}`,
      `Phone: ${fields.phone.trim()}`,
      fields.email && `Email: ${fields.email}`,
      fields.address && `Address: ${fields.address.trim()}`,
      fields.city && `City: ${fields.city.trim()}`,
      fields.appointmentDate && `Preferred Date: ${fields.appointmentDate}`,
      fields.appointmentTime && `Preferred Time: ${fields.appointmentTime}`,
      fields.role && `Role: ${fields.role}`,
      fields.challenge && `Biggest Challenge: ${fields.challenge}`,
      fields.staffCount && `Staff Size: ${fields.staffCount}`,
      fields.message && `Message: ${fields.message.trim()}`
    ].filter(Boolean).join("\n");
    return `https://wa.me/919164060961?text=${encodeURIComponent(lines)}`;
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading || !validate()) return;
    setLoading(true);

    const questionnaireParts = [
      fields.role && `Role: ${fields.role}`,
      fields.challenge && `Challenge: ${fields.challenge}`,
      fields.staffCount && `Staff Size: ${fields.staffCount}`
    ].filter(Boolean);

    const questionnaire = questionnaireParts.join(", ");

    // Send all data to Google Sheets Apps Script Web App
    fetch("https://script.google.com/macros/s/AKfycbyqPLyQCg-OsB_YpypRg3jSQXfeFK6Cn4nH-C1tSWn0rFqFlSE3PD1AouGs2x8IKrfv/exec", {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        name: fields.name.trim(),
        phone: fields.phone.trim(),
        email: fields.email.trim(),
        hospitalName: fields.hospital.trim(),
        address: fields.address.trim(),
        city: fields.city.trim(),
        appointmentDate: fields.appointmentDate,
        appointmentTime: fields.appointmentTime,
        message: fields.message.trim(),
        questionnaire: questionnaire
      })
    }).catch(() => {
      // Ignore background errors
    });

    try {
      await save({
        data: {
          name: fields.name,
          hospital: fields.hospital,
          phone: fields.phone.trim(),
          email: fields.email,
          staffCount: fields.staffCount,
          role: fields.role,
          challenge: fields.challenge,
          message: fields.message
        }
      });
    } catch {
      // Ignore secondary backend errors
    }

    const url = buildUrl();
    setFallback(url);
    setSuccess(true);
    setFields(initial);
    setLoading(false);
  };

  const inputClass = "form-input"; 

  return (
    <form onSubmit={submit} noValidate autoComplete="off" className="form-card">
      <Eyebrow>PERSONALISED WALKTHROUGH</Eyebrow>
      <h3>Book Your Free Demo</h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {/* Full Name */}
        <Field label="Full Name*" error={errors.name}>
          <input className={inputClass} name="fullName" autoComplete="name" placeholder="John Doe" value={fields.name} onChange={e => set("name", e.target.value)} maxLength={100}/>
        </Field>

        {/* Hospital Name */}
        <Field label="Hospital Name*" error={errors.hospital}>
          <input className={inputClass} name="hospitalName" autoComplete="organization" placeholder="City General Hospital" value={fields.hospital} onChange={e => set("hospital", e.target.value)} maxLength={150}/>
        </Field>

        {/* Phone Number */}
        <Field label="Phone Number*" error={errors.phone}>
          <input 
            className={inputClass} 
            name="userPhone"
            autoComplete="tel"
            placeholder="+1 234 567 8900" 
            value={fields.phone} 
            onChange={e => set("phone", e.target.value.replace(/[^\d+()\s-]/g, ""))} 
            inputMode="tel"
          />
        </Field>

        {/* Email */}
        <Field label="Email" error={errors.email}>
          <input className={inputClass} name="userEmail" autoComplete="email" placeholder="you@example.com" value={fields.email} onChange={e => set("email", e.target.value)} type="email" maxLength={255}/>
        </Field>

        {/* Address */}
        <div className="sm:col-span-2">
          <Field label="Hospital Address">
            <input className={inputClass} name="hospitalAddress" autoComplete="street-address" placeholder="123 Main Road, Near City Center" value={fields.address} onChange={e => set("address", e.target.value)} maxLength={300}/>
          </Field>
        </div>

        {/* City / State */}
        <div>
          <Field label="City / State">
            <input className={inputClass} name="hospitalCity" autoComplete="address-level2" placeholder="Bangalore, Karnataka" value={fields.city} onChange={e => set("city", e.target.value)} maxLength={100}/>
          </Field>
        </div>

        {/* Preferred Date */}
        <Field label="Preferred Date*" error={errors.appointmentDate}>
          <input 
            className={inputClass} 
            name="appointmentDate"
            autoComplete="off"
            type="date" 
            value={fields.appointmentDate} 
            onChange={e => set("appointmentDate", e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </Field>

        {/* Preferred Time */}
        <Field label="Preferred Time*" error={errors.appointmentTime}>
          <select className={inputClass} name="appointmentTime" autoComplete="off" value={fields.appointmentTime} onChange={e => set("appointmentTime", e.target.value)}>
            <option value="">Select a time slot</option>
            <option value="09:00">09:00 AM</option>
            <option value="09:30">09:30 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="10:30">10:30 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="11:30">11:30 AM</option>
            <option value="12:00">12:00 PM</option>
            <option value="12:30">12:30 PM</option>
            <option value="13:00">01:00 PM</option>
            <option value="13:30">01:30 PM</option>
            <option value="14:00">02:00 PM</option>
            <option value="14:30">02:30 PM</option>
            <option value="15:00">03:00 PM</option>
            <option value="15:30">03:30 PM</option>
            <option value="16:00">04:00 PM</option>
            <option value="16:30">04:30 PM</option>
            <option value="17:00">05:00 PM</option>
            <option value="17:30">05:30 PM</option>
            <option value="18:00">06:00 PM</option>
          </select>
        </Field>

        {/* Onboarding Question 1: Role */}
        <Field label="What is your role at the hospital?">
          <select className={inputClass} name="hospitalRole" autoComplete="off" value={fields.role} onChange={e => set("role", e.target.value)}>
            <option value="">Select Role</option>
            <option value="Owner / Director">Owner / Director</option>
            <option value="Administrator">Administrator</option>
            <option value="Operations Manager">Operations Manager</option>
            <option value="Medical Staff">Medical Staff</option>
            <option value="IT / Tech Lead">IT / Tech Lead</option>
            <option value="Other">Other</option>
          </select>
        </Field>

        {/* Onboarding Question 2: Staff Size */}
        <Field label="How many staff members do you need to manage?">
          <select className={inputClass} name="staffSize" autoComplete="off" value={fields.staffCount} onChange={e => set("staffCount", e.target.value)}>
            <option value="">Select Staff Size</option>
            <option value="1 – 50 staff">1 – 50 staff</option>
            <option value="51 – 200 staff">51 – 200 staff</option>
            <option value="201 – 500 staff">201 – 500 staff</option>
            <option value="500+ staff">500+ staff</option>
          </select>
        </Field>

        {/* Onboarding Question 3: Challenge */}
        <div className="sm:col-span-2">
          <Field label="What is your biggest challenge during emergencies?">
            <select className={inputClass} name="emergencyChallenge" autoComplete="off" value={fields.challenge} onChange={e => set("challenge", e.target.value)}>
              <option value="">Select Challenge</option>
              <option value="Wasting time searching for staff">Wasting time searching for staff</option>
              <option value="Not knowing who is on duty/break">Not knowing who is on duty/break</option>
              <option value="Communication delays">Communication delays</option>
              <option value="Lack of centralized management">Lack of centralized management</option>
            </select>
          </Field>
        </div>
      </div>

      <Field label="Message">
        <textarea className={`${inputClass} mt-4 min-h-24 resize-y`} name="userMessage" autoComplete="off" placeholder="Tell us anything else..." value={fields.message} onChange={e => set("message", e.target.value)} maxLength={1000}/>
      </Field>

      <Button disabled={loading} className="mt-5 w-full" type="submit">
        {loading ? (
          <><span className="spinner"/>Saving…</>
        ) : (
          <>Book My Free Demo <ArrowRight size={17}/></>
        )}
      </Button>
      <p className="mt-3 text-center text-xs text-form-muted">🔒 Your details are safe. We never spam.</p>

      {success && (
        <div className="mt-4 rounded-lg bg-success-soft p-4 text-sm text-success">
          <b className="flex items-center gap-2"><Check size={18}/> Demo Request Submitted Successfully!</b>
          <p className="mt-1 text-xs text-foreground/80">Thank you for submitting your details. Our team will contact you shortly.</p>
          <a href={fallback} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs font-semibold text-primary underline">Optional: Send via WhatsApp too</a>
        </div>
      )}
    </form>
  );
}
