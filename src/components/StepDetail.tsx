import React from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  MessageCircle, 
  FileText, 
  CreditCard, 
  PlaneTakeoff,
  Clock,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { useTranslation } from "../lib/TranslationContext";

const icons = {
  advice: MessageCircle,
  documents: FileText,
  booking: CreditCard,
  travel: PlaneTakeoff,
};

interface StepDetailProps {
  stepId: "advice" | "documents" | "booking" | "travel";
  onBack: () => void;
}

export default function StepDetail({ stepId, onBack }: StepDetailProps) {
  const { t, language } = useTranslation();
  const Icon = icons[stepId];

  const renderContent = () => {
    switch (stepId) {
      case "advice":
        return (
          <div className="space-y-8">
            <section className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <MessageCircle size={24} className="text-blue-500" />
                {language === "bn" ? "কেন আমাদের পরামর্শ নেবেন?" : "Why get our advice?"}
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {t("steps.advice.detail")}
              </p>
            </section>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck size={20} />
                </div>
                <h4 className="font-bold text-primary mb-2">{t("steps.advice.feature1")}</h4>
                <p className="text-xs text-slate-500">{language === "bn" ? "অভিজ্ঞ আলেম ও মুফতিদের সরাসরি তত্ত্বাবধান।" : "Direct supervision by experienced scholars and muftis."}</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                  <CreditCard size={20} />
                </div>
                <h4 className="font-bold text-primary mb-2">{t("steps.advice.feature2")}</h4>
                <p className="text-xs text-slate-500">{language === "bn" ? "আপনার বাজেট অনুযায়ী সাশ্রয়ী হজ্জ পরিকল্পনা।" : "Affordable Hajj planning according to your budget."}</p>
              </div>
            </div>
          </div>
        );
      case "documents":
        const checklist = language === "bn" 
          ? ["পাসপোর্ট (অন্তত ৬ মাস মেয়াদ)", "৪ কপি রঙিন ছবি (সাদা ব্যাকরউন্ড)", "করোনা ও ম্যানিনজাইটিস টিকার সনদ", "জাতীয় পরিচয়পত্রের ফটোকপি"]
          : ["Passport (6 months validity)", "4 Copies Photo (White BG)", "Vaccination Certificate", "NID Photocopy"];
        return (
          <div className="space-y-8">
            <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                <FileText size={24} className="text-slate-400" />
                {language === "bn" ? "প্রয়োজনীয় কাগজপত্রের তালিকা" : "Required Documents List"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {checklist.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-xl">
                    <CheckCircle2 size={18} className="text-green-500" />
                    <span className="text-slate-700 font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </section>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 p-6 bg-white rounded-2xl border border-dashed border-slate-200 text-center">
                <div className="text-slate-400 mb-2">📁</div>
                <h4 className="font-bold text-primary text-sm mb-1">{t("steps.documents.feature1")}</h4>
                <p className="text-[10px] text-slate-400">{language === "bn" ? "পাসপোর্ট সংক্রান্ত সকল সহায়তা।" : "Complete support for passport processing."}</p>
              </div>
              <div className="flex-1 p-6 bg-white rounded-2xl border border-dashed border-slate-200 text-center">
                <div className="text-slate-400 mb-2">🛂</div>
                <h4 className="font-bold text-primary text-sm mb-1">{t("steps.documents.feature2")}</h4>
                <p className="text-[10px] text-slate-400">{language === "bn" ? "নির্ভুল ভিসা আবেদন ও ট্র্যাকিং।" : "Accurate visa filing and tracking."}</p>
              </div>
            </div>
          </div>
        );
      case "booking":
        return (
          <div className="space-y-8">
            <section className="bg-green-50/50 p-6 rounded-2xl border border-green-100">
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                <CheckCircle2 size={24} className="text-green-500" />
                {language === "bn" ? "বুকিং নিশ্চিত করার ধাপসমূহ" : "Booking Confirmation Steps"}
              </h2>
              <div className="relative border-l-2 border-green-100 ml-4 pl-8 space-y-8">
                {[
                  { 
                    t: language === "bn" ? "প্যাকেজ চূড়ান্ত করা" : "Finalize Package", 
                    d: language === "bn" ? "পছন্দের হজ্জ/উমরাহ প্যাকেজটি নির্ধারণ করুন।" : "Select your Hajj/Umrah package."
                  },
                  { 
                    t: language === "bn" ? "বুকিং মানি প্রদান" : "Deposit Booking Money", 
                    d: language === "bn" ? "ন্যূনতম ৫০,০০০ টাকা জমা দিয়ে আসন সংরক্ষণ করুন।" : "Deposit min 50k BDT to reserve seat."
                  },
                  { 
                    t: language === "bn" ? "কনফার্মেশন রিপোর্ট" : "Confirmation Report", 
                    d: language === "bn" ? "বুকিং স্লিপ ও সরকারি পোর্টাল আপডেট সংগ্রহ করুন।" : "Collect booking slip and portal updates."
                  }
                ].map((step, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[42px] top-0 w-5 h-5 rounded-full bg-green-500 border-4 border-white shadow-sm" />
                    <h4 className="font-bold text-primary text-sm mb-1">{step.t}</h4>
                    <p className="text-xs text-slate-500">{step.d}</p>
                  </div>
                ))}
              </div>
            </section>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-primary text-sm">{t("steps.booking.feature1")}</h4>
                <p className="text-[10px] text-slate-400">{t("steps.booking.feature2")}</p>
              </div>
              <div className="flex gap-2">
                 <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center text-[10px] font-bold">BANK</div>
                 <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center text-[10px] font-bold">BKASH</div>
              </div>
            </div>
          </div>
        );
      case "travel":
        return (
          <div className="space-y-8">
            <section className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                <PlaneTakeoff size={24} className="text-accent-gold" />
                {language === "bn" ? "যাত্রার বিশেষ সুবিধা" : "Journey Special Facilities"}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { icon: "✈️", title: t("steps.travel.feature1"), val: language === "bn" ? "অভিজ্ঞ মোয়াল্লেম" : "Expert Guides" },
                   { icon: "🚐", title: t("steps.travel.feature2"), val: language === "bn" ? "এসি বাস সার্ভিস" : "AC Bus Service" },
                   { icon: "🏨", title: language === "bn" ? "হোটেল" : "Hotel", val: language === "bn" ? "হারামের নিকটবর্তী" : "Near Haram" },
                   { icon: "🍲", title: language === "bn" ? "খাবার" : "Food", val: language === "bn" ? "রুম সার্ভিস সুবিধা" : "Room Service" },
                 ].map((item, i) => (
                   <div key={i} className="p-4 bg-white rounded-xl shadow-sm border border-slate-100 group">
                     <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                     <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">{item.title}</div>
                     <div className="text-xs font-bold text-primary">{item.val}</div>
                   </div>
                 ))}
              </div>
            </section>
            <div className="p-6 bg-accent-gold/10 border border-accent-gold/20 rounded-2xl flex items-start gap-4">
               <Clock className="text-accent-gold shrink-0 mt-1" size={20} />
               <p className="text-slate-700 text-sm leading-relaxed">
                 {language === "bn" 
                   ? "যাত্রার অন্তত ৭ দিন আগে হজ্জ ওরিয়েন্টেশন প্রোগ্রামে অংশগ্রহণ করা বাধ্যতামূলক।" 
                   : "Mandatory to attend the Hajj orientation program at least 7 days before journey."}
               </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-primary hover:text-secondary font-bold transition-all group text-sm"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        {t("common.back")}
      </motion.button>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100">
          {/* Header */}
          <div className="bg-primary p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none islamic-pattern"></div>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 text-white relative z-10"
            >
              <Icon size={40} />
            </motion.div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl md:text-5xl font-bold text-white mb-4 relative z-10"
            >
              {t(`steps.${stepId}.title`)}
            </motion.h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              className="h-1 bg-accent-gold mx-auto rounded-full relative z-10" 
            />
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                {renderContent()}
              </div>

              <div className="md:col-span-1">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 sticky top-24">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Clock size={16} /> {language === "bn" ? "পরামর্শ সময়" : "Support Hours"}
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white rounded-xl shadow-sm">
                      <div className="text-xs text-slate-400 mb-1">{language === "bn" ? "শনিবার - বৃহস্পতিবার" : "Sat - Thu"}</div>
                      <div className="font-bold text-primary text-xs md:text-sm">09:00 AM - 08:00 PM</div>
                    </div>
                    <div className="p-4 bg-white rounded-xl shadow-sm">
                      <div className="text-xs text-slate-400 mb-1">{language === "bn" ? "শুক্রবার" : "Friday"}</div>
                      <div className="font-bold text-primary text-xs md:text-sm">02:30 PM - 08:00 PM</div>
                    </div>
                  </div>
                  <a
                    href="tel:+8801879216736"
                    className="w-full mt-8 bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary-container transition-all text-xs md:text-sm flex items-center justify-center shadow-lg"
                  >
                    {language === "bn" ? "কল করুন এখনই" : "Call Now"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
