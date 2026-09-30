import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Building2, User, Target, Users, MapPin, Phone, LayoutDashboard, Clock, X } from "lucide-react";

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
    id: "features",
    title: "Which features are you most interested in?",
    subtitle: "Select all that apply to help us understand your needs.",
    type: "multiple",
    options: [
      { label: "Real-Time Staff Tracking", value: "tracking", icon: <MapPin size={20} /> },
      { label: "Finding Nearest Available Staff", value: "nearest", icon: <Target size={20} /> },
      { label: "Centralized Staff Dashboard", value: "dashboard", icon: <LayoutDashboard size={20} /> },
      { label: "Instant Connect (Call/Message)", value: "connect", icon: <Phone size={20} /> },
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

export function OnboardingFlow() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  useEffect(() => {
    const hasCompleted = localStorage.getItem("infield7-onboarding-completed");
    const forceShow = window.location.search.includes("onboarding=true");
    if (!hasCompleted || forceShow) {
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  const handleComplete = () => {
    localStorage.setItem("infield7-onboarding-completed", "true");
    setIsOpen(false);
    // You could also send the 'answers' to your backend here
    console.log("Onboarding answers:", answers);
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      handleComplete();
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

  if (!isOpen) return null;

  const question = questions[currentStep];
  if (!question) return null;
  const isMultiple = question.type === "multiple";
  const currentAnswer = answers[question.id];
  const canProceed = isMultiple 
    ? (currentAnswer as string[])?.length > 0 
    : !!currentAnswer;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-deep-navy/95 backdrop-blur-md p-4">
      <div className="w-full max-w-2xl bg-background rounded-2xl shadow-2xl overflow-hidden border border-border relative">
        {/* Progress bar */}
        <div className="w-full bg-muted h-1.5">
          <div 
            className="bg-primary h-full transition-all duration-300 ease-out"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          />
        </div>

        <button 
          onClick={handleComplete} 
          className="absolute top-5 right-6 flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors z-10"
        >
          Move to the website <X size={16} />
        </button>

        <div className="p-8 md:p-12 pt-10">
          <AnimatePresence mode="wait">
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
                  {currentStep === questions.length - 1 ? "Explore Website" : "Continue"} 
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
