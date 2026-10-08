import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Building2, User, Target, Users, Phone, Clock, X, MapPin, Send } from "lucide-react";

type Question = {
  id: string;
  title: string;
  subtitle?: string;
  type: "single" | "multiple";
  options: { label: string; icon?: React.ReactNode; value: string }[];
};

const questions: Question[] = [
  {
    id: "role",
    title: "Welcome! First, what is your role at the hospital?",
    type: "single",
    options: [
      { label: "Owner / Director", value: "owner", icon: <Building2 size={20} /> },
      { label: "Administrator", value: "admin", icon: <User size={20} /> },
      { label: "Operations Manager", value: "operations", icon: <Target size={20} /> },
      { label: "Medical Staff", value: "medical", icon: <Users size={20} /> },
      { label: "IT / Tech Lead", value: "it", icon: <Check size={20} /> },
      { label: "Other", value: "other", icon: <Check size={20} /> },
    ],
  },

  {
    id: "challenge",
    title: "What is your biggest challenge during emergencies?",
    type: "single",
    options: [
      { label: "Wasting time searching for staff", value: "time", icon: <Clock size={20} /> },
      { label: "Not knowing who is on duty/break", value: "visibility", icon: <User size={20} /> },
      { label: "Communication delays", value: "communication", icon: <Phone size={20} /> },
      { label: "Lack of centralized management", value: "management", icon: <Building2 size={20} /> },
    ],
  },
  {
    id: "size",
    title: "How many staff members do you need to manage?",
    type: "single",
    options: [
      { label: "1 – 50 staff", value: "small", icon: <Users size={20} /> },
      { label: "51 – 200 staff", value: "medium", icon: <Users size={20} /> },
      { label: "201 – 500 staff", value: "large", icon: <Users size={20} /> },
      { label: "500+ staff", value: "enterprise", icon: <Users size={20} /> },
    ],
  },
];

// ── Inline form types ───────────────────────────────
type FormFields = {
  name: string;
  phone: string;
  email: string;
  hospitalName: string;
  address: string;
  city: string;
  appointmentDate: string;
  appointmentTime: string;
  message: string;
};

const initialForm: FormFields = {
  name: "",
  phone: "",
  email: "",
  hospitalName: "",
  address: "",
  city: "",
  appointmentDate: "",
  appointmentTime: "",
  message: "",
};

export function OnboardingFlow() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  // Form state
  const [formFields, setFormFields] = useState<FormFields>(initialForm);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormFields, string>>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleComplete = () => {
    setIsOpen(false);
  };

  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep(s => s + 1);
    }
  };

  const handleOptionClick = (questionId: string, value: string, isMultiple: boolean) => {
    setAnswers(prev => {
      if (!isMultiple) {
        return { ...prev, [questionId]: value };
      }
      
      const current = (prev[questionId] as string[]) || [];
      if (current.includes(value)) {
        return { ...prev, [questionId]: current.filter(v => v !== value) };
      } else {
        return { ...prev, [questionId]: [...current, value] };
      }
    });
  };

  // ── Form helpers ──────────────────────────────────
  const setField = (key: keyof FormFields, value: string) => {
    setFormFields(f => ({ ...f, [key]: value }));
    setFormErrors(e => ({ ...e, [key]: undefined }));
  };

  const validateForm = () => {
    const e: Partial<Record<keyof FormFields, string>> = {};
    if (formFields.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!formFields.phone.trim() || !/^\+?[0-9\s\-()]{6,20}$/.test(formFields.phone.trim())) e.phone = "Please enter a valid phone number with country code.";
    if (formFields.hospitalName.trim().length < 2) e.hospitalName = "Please enter your hospital name.";
    if (formFields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formFields.email)) e.email = "Enter a valid email address.";
    if (!formFields.appointmentDate) e.appointmentDate = "Please select a preferred date.";
    if (!formFields.appointmentTime) e.appointmentTime = "Please select a preferred time.";
    setFormErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Build appointment date/time
    const dateStr = formFields.appointmentDate; // YYYY-MM-DD
    const timeStr = formFields.appointmentTime; // HH:MM

    // Build Google Calendar event URL
    const startDate = new Date(`${dateStr}T${timeStr}:00`);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration

    const formatGCalDate = (d: Date) =>
      d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

    const calTitle = `GetWardRoster Demo – ${formFields.hospitalName.trim()}`;
    const calDetails = [
      `Demo appointment with ${formFields.name.trim()}`,
      `Phone: ${formFields.phone.trim()}`,
      formFields.email && `Email: ${formFields.email}`,
      `Hospital: ${formFields.hospitalName.trim()}`,
      formFields.address && `Address: ${formFields.address.trim()}`,
      formFields.city && `City: ${formFields.city.trim()}`,
      formFields.message && `Note: ${formFields.message.trim()}`,
      "",
      answers.role && `Role: ${answers.role}`,
      answers.challenge && `Biggest Challenge: ${answers.challenge}`,
      answers.size && `Staff Size: ${answers.size}`,
    ].filter(Boolean).join("\n");

    const calLocation = [
      formFields.hospitalName.trim(),
      formFields.address && formFields.address.trim(),
      formFields.city && formFields.city.trim(),
    ].filter(Boolean).join(", ");

    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(calTitle)}&dates=${formatGCalDate(startDate)}/${formatGCalDate(endDate)}&details=${encodeURIComponent(calDetails)}&location=${encodeURIComponent(calLocation)}`;

    // Also build WhatsApp message
    const lines = [
      "Hello GetWardRoster Team, I would like to book a demo appointment.",
      "",
      `Name: ${formFields.name.trim()}`,
      `Phone: ${formFields.phone.trim()}`,
      formFields.email && `Email: ${formFields.email}`,
      `Hospital: ${formFields.hospitalName.trim()}`,
      formFields.address && `Address: ${formFields.address.trim()}`,
      formFields.city && `City: ${formFields.city.trim()}`,
      `Preferred Date: ${dateStr}`,
      `Preferred Time: ${timeStr}`,
      formFields.message && `Message: ${formFields.message.trim()}`,
      "",
      answers.role && `Role: ${answers.role}`,
      answers.challenge && `Biggest Challenge: ${answers.challenge}`,
      answers.size && `Staff Size: ${answers.size}`,
    ].filter(Boolean).join("\n");

    const waUrl = `https://wa.me/919164060961?text=${encodeURIComponent(lines)}`;

    // ── Push data to Google Sheet ──────────────────────
    const questionnaire = [
      answers.role && `Role: ${answers.role}`,
      answers.challenge && `Challenge: ${answers.challenge}`,
      answers.size && `Staff Size: ${answers.size}`,
    ].filter(Boolean).join(", ");

    fetch("https://script.google.com/macros/s/AKfycbyqPLyQCg-OsB_YpypRg3jSQXfeFK6Cn4nH-C1tSWn0rFqFlSE3PD1AouGs2x8IKrfv/exec", {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        name: formFields.name.trim(),
        phone: formFields.phone.trim(),
        email: formFields.email,
        hospitalName: formFields.hospitalName.trim(),
        address: formFields.address.trim(),
        city: formFields.city.trim(),
        appointmentDate: dateStr,
        appointmentTime: timeStr,
        message: formFields.message.trim(),
        questionnaire,
      }),
    }).catch(() => {
      // Silently fail – WhatsApp is the fallback
    });

    handleComplete();
  };

  if (!isOpen) return null;

  const isFormStep = currentStep === questions.length;
  const question = isFormStep ? null : questions[currentStep];
  
  let canProceed = false;
  let isMultiple = false;
  let currentAnswer: string | string[] | undefined;
  if (question) {
    isMultiple = question.type === "multiple";
    currentAnswer = answers[question.id];
    canProceed = isMultiple ? (currentAnswer as string[])?.length > 0 : !!currentAnswer;
  }

  // ── Shared input styles for light background ──────
  const inputClass = "block w-full px-3 py-2.5 text-sm text-foreground bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition placeholder:text-muted-foreground/60";
  const labelClass = "block text-xs font-bold text-foreground/70 mb-1.5";
  const errorClass = "mt-1 text-xs text-red-500";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-deep-navy p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-background rounded-2xl shadow-2xl overflow-hidden border border-border relative my-auto">
        {/* Progress bar */}
        <div className="w-full bg-muted h-1.5">
          <div 
            className="bg-primary h-full transition-all duration-300 ease-out"
            style={{ width: `${(Math.min(currentStep + 1, questions.length + 1) / (questions.length + 1)) * 100}%` }}
          />
        </div>

        {/* Header containing Logo and Explore website button */}
        <div className="flex justify-between items-center px-8 pt-8 md:px-12 md:pt-10">
          <div className="flex items-center">
            <img src="/logo.png" alt="GetWardRoster Logo" className="h-10 w-auto object-contain" />
          </div>

          <button 
            onClick={handleComplete} 
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border/60 hover:bg-muted/50"
          >
            Explore website <X size={14} />
          </button>
        </div>

        <div className="p-8 md:p-12 pt-6 md:pt-8 overflow-y-auto max-h-[75vh]">
          <AnimatePresence mode="wait">
            {isFormStep ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-sm font-bold text-primary mb-2 block uppercase tracking-wider">
                  Book Your Appointment
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">
                  Fill in your details to schedule a demo
                </h2>
                <p className="text-muted-foreground mb-8">Pick a date & time that works for you. We'll confirm within 24 hours.</p>

                {formSubmitted ? (
                  <div className="rounded-xl bg-green-50 border border-green-200 p-6 text-center">
                    <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <Check size={24} strokeWidth={3} />
                    </div>
                    <h3 className="text-lg font-bold text-green-800">Appointment Requested!</h3>
                    <p className="mt-2 text-sm text-green-700">
                      Thank you for submitting your details. Our team will contact you shortly to confirm your booking.
                    </p>
                    <Button className="mt-6" onClick={handleComplete}>
                      Explore the Website <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} noValidate autoComplete="off">
                    <div className="grid gap-4 sm:grid-cols-2">
                      {/* Full Name */}
                      <div>
                        <label className={labelClass}>Full Name *</label>
                        <input
                          className={inputClass}
                          name="fullName"
                          autoComplete="name"
                          placeholder="John Doe"
                          value={formFields.name}
                          onChange={e => setField("name", e.target.value)}
                          maxLength={100}
                        />
                        {formErrors.name && <span className={errorClass}>{formErrors.name}</span>}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className={labelClass}>Phone Number *</label>
                        <input
                          className={inputClass}
                          name="userPhone"
                          autoComplete="tel"
                          placeholder="+1 234 567 8900"
                          value={formFields.phone}
                          onChange={e => setField("phone", e.target.value.replace(/[^\d+()\s-]/g, ""))}
                          inputMode="tel"
                        />
                        {formErrors.phone && <span className={errorClass}>{formErrors.phone}</span>}
                      </div>

                      {/* Email */}
                      <div>
                        <label className={labelClass}>Email</label>
                        <input
                          className={inputClass}
                          name="userEmail"
                          autoComplete="email"
                          placeholder="you@example.com"
                          value={formFields.email}
                          onChange={e => setField("email", e.target.value)}
                          type="email"
                          maxLength={255}
                        />
                        {formErrors.email && <span className={errorClass}>{formErrors.email}</span>}
                      </div>

                      {/* Hospital Name */}
                      <div>
                        <label className={labelClass}>Hospital Name *</label>
                        <input
                          className={inputClass}
                          name="hospitalName"
                          autoComplete="organization"
                          placeholder="City General Hospital"
                          value={formFields.hospitalName}
                          onChange={e => setField("hospitalName", e.target.value)}
                          maxLength={150}
                        />
                        {formErrors.hospitalName && <span className={errorClass}>{formErrors.hospitalName}</span>}
                      </div>

                      {/* Address */}
                      <div className="sm:col-span-2">
                        <label className={labelClass}>Hospital Address</label>
                        <input
                          className={inputClass}
                          name="hospitalAddress"
                          autoComplete="street-address"
                          placeholder="123, Main Road, Near City Center"
                          value={formFields.address}
                          onChange={e => setField("address", e.target.value)}
                          maxLength={300}
                        />
                      </div>

                      {/* City */}
                      <div>
                        <label className={labelClass}>City / State</label>
                        <input
                          className={inputClass}
                          name="hospitalCity"
                          autoComplete="address-level2"
                          placeholder="Bangalore, Karnataka"
                          value={formFields.city}
                          onChange={e => setField("city", e.target.value)}
                          maxLength={100}
                        />
                      </div>



                      {/* Preferred Date */}
                      <div>
                        <label className={labelClass}>Preferred Date *</label>
                        <input
                          className={inputClass}
                          name="appointmentDate"
                          autoComplete="off"
                          type="date"
                          value={formFields.appointmentDate}
                          onChange={e => setField("appointmentDate", e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                        />
                        {formErrors.appointmentDate && <span className={errorClass}>{formErrors.appointmentDate}</span>}
                      </div>

                      {/* Preferred Time */}
                      <div>
                        <label className={labelClass}>Preferred Time *</label>
                        <select
                          className={inputClass}
                          name="appointmentTime"
                          autoComplete="off"
                          value={formFields.appointmentTime}
                          onChange={e => setField("appointmentTime", e.target.value)}
                        >
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
                        {formErrors.appointmentTime && <span className={errorClass}>{formErrors.appointmentTime}</span>}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mt-4">
                      <label className={labelClass}>Message (optional)</label>
                      <textarea
                        className={`${inputClass} min-h-20 resize-y`}
                        name="userMessage"
                        autoComplete="off"
                        placeholder="Tell us anything else you'd like us to know..."
                        value={formFields.message}
                        onChange={e => setField("message", e.target.value)}
                        maxLength={1000}
                      />
                    </div>

                    <Button className="mt-6 w-full gap-2" size="lg" type="submit">
                      <Send size={16} />
                      Book an Appointment
                    </Button>
                    <p className="mt-3 text-center text-xs text-muted-foreground">
                      🔒 Your details are safe. We never spam.
                    </p>
                  </form>
                )}
              </motion.div>
            ) : question && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-sm font-bold text-primary mb-2 block uppercase tracking-wider">
                  Question {currentStep + 1} of {questions.length}
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">
                  {question.title}
                </h2>
                {question.subtitle && (
                  <p className="text-muted-foreground mb-8">{question.subtitle}</p>
                )}
                {!question.subtitle && <div className="mb-8" />}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {question.options.map(option => {
                    const isSelected = isMultiple
                      ? (currentAnswer as string[])?.includes(option.value)
                      : currentAnswer === option.value;

                    return (
                      <button
                        key={option.value}
                        onClick={() => handleOptionClick(question.id, option.value, isMultiple)}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                          isSelected 
                            ? "border-primary bg-primary/5 text-primary" 
                            : "border-border hover:border-primary/50 text-foreground"
                        }`}
                      >
                        <div className={`flex-shrink-0 size-5 rounded-full border flex items-center justify-center ${
                          isSelected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30"
                        }`}>
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </div>
                        <div className="flex-1 font-semibold">
                          {option.label}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-10 flex justify-end">
                  <Button 
                    size="lg" 
                    onClick={handleNext} 
                    disabled={!canProceed}
                    className="px-8"
                  >
                    Continue
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
