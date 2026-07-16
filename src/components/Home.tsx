/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { IMAGES } from "../constants";
import {
  ArrowRight,
  MessageCircle,
  FileText,
  CreditCard,
  PlaneTakeoff,
  ShieldCheck,
  Star,
  Quote,
  Send,
  ChevronLeft,
  ChevronRight,
  X,
  Phone,
  MapPin
} from "lucide-react";
import { PackageData } from "../types";
import { useTranslation } from "../lib/TranslationContext";
import Album from "./Album";

interface HomeProps {
  onPackageSelect: (pkg: PackageData) => void;
  onStepSelect: (stepId: "advice" | "documents" | "booking" | "travel") => void;
  onAlbumOpenChange?: (isOpen: boolean) => void;
  onScreenChange?: (screen: string) => void;
}

export default function Home({ onPackageSelect, onStepSelect, onAlbumOpenChange, onScreenChange }: HomeProps) {
  const { t, language } = useTranslation();

  const stats = [
    { label: t("stats.experience"), value: language === "bn" ? "১৪+ বছর" : "14+ Years" },
    { label: t("stats.families"), value: language === "bn" ? "১২০০+" : "1200+" },
    { label: t("stats.visa"), value: language === "bn" ? "১০০%" : "100%" },
  ];

  const [testimonials, setTestimonials] = useState([
    {
      name: language === "bn" ? "মাওলানা আব্দুর রহিম" : "Maulana Abdur Rahim",
      rating: 5,
      feedback: language === "bn" 
        ? "মাতৃভূমি হজ্জ কাফেলা গাইডেন্স ছিল অতুলনীয়। হজ্জের প্রতিটি আরকান পালনে তাদের আলেম প্যানেল আমাদের দারুণভাবে সাহায্য করেছে।" 
        : "Matribhumi Hajj Kafela's guidance was unparalleled. Their scholar panel helped us tremendously in performing every ritual of Hajj.",
      location: language === "bn" ? "ঢাকা" : "Dhaka"
    },
    {
      name: language === "bn" ? "জনাব ফখরুল আলম" : "Mr. Fakhrul Alam",
      rating: 5,
      feedback: language === "bn" 
        ? "তাদের আবাসন ব্যবস্থা এবং খাবার মান সত্যিই প্রশংসনীয়। বিশেষ করে হারামের খুব কাছে হোটেল থাকায় ইবাদতে অনেক সুবিধা হয়েছে।" 
        : "Their accommodation and food quality are truly commendable. Especially being so close to the Haram, worshiping was very convenient.",
      location: language === "bn" ? "কুমিল্লা" : "Cumilla"
    },
    {
      name: language === "bn" ? "হাজ্বী নূর জাহান বেগম" : "Hajji Nur Jahan Begum",
      rating: 4,
      feedback: language === "bn" 
        ? "মহিলা হাজীদের জন্য তাদের আলাদা গাইড ও বিশেষ যত্ন ছিল খুবই ভালো। পরের বারও তাদের সাথেই যাওয়ার ইচ্ছা আছে।" 
        : "Their separate guides and special care for female pilgrims was excellent. I intend to go with them again next time.",
      location: language === "bn" ? "চাঁদপুর" : "Chandpur"
    }
  ]);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", location: "", rating: 5, feedback: "" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(true);

  // Fetch packages from API
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('/api/packages');
        if (response.ok) {
          const data = await response.json();
          setPackages(data);
        }
      } catch (error) {
        console.error('Failed to fetch packages:', error);
      } finally {
        setLoadingPackages(false);
      }
    };
    fetchPackages();
  }, []);

  // Booking State
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);
  const [bookingForm, setBookingForm] = useState({ name: "", age: "", phone: "" });

  const handleBookingClick = (pkg: PackageData) => {
    setSelectedPackage(pkg);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage) return;

    const whatsappNumber = "8801879216736";
    const messageTemplate = t("booking.whatsapp_msg");
    const message = messageTemplate
      .replace("{package}", selectedPackage.title)
      .replace("{name}", bookingForm.name)
      .replace("{age}", bookingForm.age)
      .replace("{phone}", bookingForm.phone);

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
    
    setShowBookingModal(false);
    setBookingForm({ name: "", age: "", phone: "" });
  };

  const itemsPerView = typeof window !== 'undefined' 
    ? (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1)
    : 1;

  const nextSlide = () => {
    if (currentIndex < testimonials.length - itemsPerView) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // 5 seconds interval
    return () => clearInterval(interval);
  }, [currentIndex, testimonials.length, itemsPerView]);

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(Math.max(0, testimonials.length - itemsPerView));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTestimonial = {
      name: formData.name,
      location: formData.location,
      rating: formData.rating,
      feedback: formData.feedback
    };
    
    setTestimonials([newTestimonial, ...testimonials]);
    setFormSubmitted(true);
    
    setTimeout(() => {
      setFormSubmitted(false);
      setShowForm(false);
      setFormData({ name: "", location: "", rating: 5, feedback: "" });
    }, 2000);
  };


  const steps = [
    { icon: MessageCircle, title: language === "bn" ? "পরামর্শ নিন" : "Advice", desc: language === "bn" ? "আমাদের টিমের সাথে কথা বলে সঠিক প্যাকেজ নির্বাচন করুন।" : "Consult our team." },
    { icon: FileText, title: language === "bn" ? "কাগজপত্র জমা" : "Documents", desc: language === "bn" ? "আপনার পাসপোর্ট ও প্রয়োজনীয় ডকুমেন্টস জমা দিন।" : "Submit passport." },
    { icon: CreditCard, title: language === "bn" ? "বুকিং সম্পন্ন" : "Booking", desc: language === "bn" ? "বুকিং মানি জমা দিয়ে আপনার আসনটি নিশ্চিত করুন।" : "Confirm seat." },
    { icon: PlaneTakeoff, title: language === "bn" ? "পবিত্র যাত্রা" : "Travel", desc: language === "bn" ? "দয়াল আল্লার মেহমান হিসেবে যাত্রা শুরু করুন।" : "Start journey." }
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[240px] md:h-[650px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            alt="Hero" 
            className="w-full h-full object-cover" 
            src={IMAGES.hero} 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-900/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/20 to-white" />
        </div>
        <div className="relative z-10 text-center px-4 py-20 max-w-3xl">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-arabic text-3xl md:text-5xl text-accent-gold mb-3 md:mb-5 drop-shadow-lg">لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ</motion.div>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-2xl md:text-5xl text-white font-bold mb-4 md:mb-6 drop-shadow-xl">
            {t("hero.title")}
          </motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-white font-medium text-xs md:text-base mb-4 md:mb-8 max-w-2xl mx-auto drop-shadow-md">
            {t("hero.subtitle")}
          </motion.p>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="flex justify-center gap-2 md:gap-3">
            <button 
              onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-bold text-xs md:text-base hover:bg-primary-container transition-all shadow-lg active:scale-95"
            >
              {t("hero.cta")}
            </button>
            <a
              href="tel:+8801879216736"
              className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-bold text-xs md:text-base hover:bg-white/20 transition-all flex items-center justify-center active:scale-95"
            >
              <Phone size={16} className="mr-1 md:mr-2" />
              {language === "bn" ? "কল করুন" : "Call Now"}
            </a>
          </motion.div>
        </div>
        <div className="absolute -bottom-28 md:-bottom-8 left-0 w-full px-3 md:px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-3 md:p-8 border border-slate-100 relative">
            <div className="absolute -top-2.5 md:-top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[8px] md:text-[10px] px-2 md:px-4 py-0.5 md:py-1 rounded-full font-bold uppercase tracking-widest shadow-sm">
              {language === "bn" ? "আমাদের অর্জন" : "Our Track Record"}
            </div>
            <div className="grid grid-cols-3 gap-1 md:gap-4">
              {stats.map(s => (
                <div key={s.label} className="text-center border-r last:border-0 border-slate-100 py-1 px-0.5 md:p-2">
                  <div className="text-base md:text-2xl font-bold text-primary mb-0 md:mb-1">{s.value}</div>
                  <div className="text-slate-400 font-bold text-[7px] md:text-xs uppercase tracking-wider leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="pt-6 md:pt-0 pb-12 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
            {t("packages.title")}
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            {t("packages.subtitle")}
          </p>
        </div>
        {loadingPackages ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <p>{language === "bn" ? "কোন প্যাকেজ উপলব্ধ নেই" : "No packages available"}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 items-start">
            {packages.map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all group flex flex-col"
              >
                <div className="relative h-24 md:h-48 overflow-hidden shrink-0">
                  <img src={pkg.image} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt="" referrerPolicy="no-referrer" />
                  <div className={`absolute top-2 right-2 md:top-3 md:right-3 ${pkg.color} text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[8px] md:text-[10px] font-bold shadow-sm`}>{pkg.tag}</div>
                </div>
                <div className="p-3 md:p-6 flex flex-col flex-grow">
                  <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2 text-primary leading-tight">{pkg.title}</h3>
                  <div className="text-base md:text-xl font-bold text-secondary mb-2 md:mb-4">{pkg.price}</div>
                  <div className="hidden md:block space-y-2 mb-4 flex-grow">
                    {pkg.features.slice(0, 2).map(f => (
                      <div key={f} className="flex items-center gap-2 text-[11px] text-slate-600">
                        <ShieldCheck size={12} className="text-primary shrink-0" /> <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-1.5 md:gap-2 shrink-0 mt-auto">
                    <button
                      onClick={() => onPackageSelect(pkg)}
                      className="flex-1 bg-slate-50 text-primary py-2 md:py-3 rounded-md md:rounded-lg font-bold text-[10px] md:text-sm hover:bg-slate-100 transition-all border border-slate-100"
                    >
                      {language === "bn" ? "বিস্তারিত" : "Details"}
                    </button>
                    <button
                      onClick={() => handleBookingClick(pkg)}
                      className="flex-[1.5] bg-primary text-white py-2 md:py-3 rounded-md md:rounded-lg font-bold text-[10px] md:text-sm hover:bg-primary-container transition-all flex items-center justify-center gap-1 md:gap-2 shadow-lg shadow-primary/10"
                    >
                      <span className="hidden md:inline">{t("packages.book_now")}</span>
                      <span className="md:hidden">{language === "bn" ? "বুক" : "Book"}</span>
                      <ArrowRight size={12} className="md:w-[14px]"/>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Hajj 2027 Card — always visible */}
        <div className="mt-6 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border-2 border-accent-gold/30 hover:shadow-xl transition-all group flex flex-col cursor-pointer relative col-span-2 md:col-span-2 lg:col-span-1"
              onClick={() => onScreenChange?.("hajj-2027")}
            >
              <div className="absolute top-2 right-2 md:top-3 md:right-3 z-10 bg-accent-gold text-primary px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[8px] md:text-[10px] font-bold shadow-sm">
                {language === "bn" ? "নতুন" : "NEW"}
              </div>
              <div className="relative h-24 md:h-48 overflow-hidden shrink-0">
                <img src="/hajj-2027/page1.png" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt="Hajj 2027" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
              </div>
              <div className="p-3 md:p-6 flex flex-col flex-grow">
                <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2 text-primary leading-tight">
                  {language === "bn" ? "হজ্জ প্যাকেজ ২০২৭" : "Hajj Package 2027"}
                </h3>
                <div className="text-base md:text-xl font-bold text-secondary mb-2 md:mb-4">
                  {language === "bn" ? "৫,৭৫,০০০ টাকা থেকে" : "From 5,75,000 BDT"}
                </div>
                <div className="hidden md:block space-y-2 mb-4 flex-grow">
                  <div className="flex items-center gap-2 text-[11px] text-slate-600">
                    <span className="w-3.5 h-3.5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600"><Star size={7} /></span>
                    <span>{language === "bn" ? "৪টি প্যাকেজ — বি, এ, স্ট্যান্ডার্ড, ভিআইপি" : "4 packages — B, A, Standard, VIP"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-600">
                    <span className="w-3.5 h-3.5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600"><Star size={7} /></span>
                    <span>{language === "bn" ? "সরাসরি ফ্লাইট, ডি ক্যাটাগরি তাঁবু" : "Direct flights, Category D tents"}</span>
                  </div>
                </div>
                <div className="flex gap-1.5 md:gap-2 shrink-0 mt-auto">
                  <span className="flex-1 bg-amber-50 text-amber-800 py-2 md:py-3 rounded-md md:rounded-lg font-bold text-[10px] md:text-sm text-center border border-amber-200">
                    {language === "bn" ? "বিস্তারিত" : "Details"}
                  </span>
                  <span className="flex-[1.5] bg-gradient-to-r from-accent-gold to-amber-500 text-primary py-2 md:py-3 rounded-md md:rounded-lg font-bold text-[10px] md:text-sm flex items-center justify-center gap-1 md:gap-2 shadow-lg shadow-accent-gold/20">
                    {language === "bn" ? "এখনই দেখুন" : "Explore"}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Variable Pricing Notice */}
        <div className="mt-8 bg-amber-50 border border-amber-100 rounded-xl p-4 max-w-3xl mx-auto">
          <p className="text-amber-800 text-xs md:text-sm text-center font-medium">
            <span className="font-bold">{language === "bn" ? "দ্রষ্টব্য: " : "Note: "}</span>
            {language === "bn"
              ? "বিমান টিকিট ও রিয়ালের মূল্য বৃদ্ধির সাথে প্যাকেজ মূল্য পরিবর্তনশীল।"
              : "Package prices are subject to change with increases in air ticket and Riyal rates."}
          </p>
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-primary mb-2">
              {language === "bn" ? "যেভাবে শুরু করবেন" : "How to Start"}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {steps.map((s, i) => {
              const stepIds: ("advice" | "documents" | "booking" | "travel")[] = ["advice", "documents", "booking", "travel"];
              return (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onStepSelect(stepIds[i])}
                  className="text-center group cursor-pointer"
                >
                  <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mx-auto shadow-sm mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all"><s.icon size={24}/></div>
                  <h4 className="text-sm md:text-base font-bold mb-2">{s.title}</h4>
                  <p className="text-[11px] md:text-xs text-slate-500 line-clamp-2 md:line-clamp-none leading-relaxed px-2">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ziyarah Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
              {language === "bn" ? "জিয়ারতের দর্শনীয় স্থানসমূহ" : "Ziyarah Places"}
            </h2>
            <p className="text-slate-500 text-sm max-w-2xl mx-auto">
              {language === "bn"
                ? "পবিত্র মক্কা, মদিনা, তায়েফ ও জেদ্দার ঐতিহাসিক স্থানসমূহ"
                : "Historical places of holy Makkah, Madinah, Taif and Jeddah"}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {/* Makkah */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-3 md:p-6 shadow-sm border border-slate-100"
            >
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                <div className="w-7 h-7 md:w-10 md:h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <MapPin size={14} className="md:w-5 md:h-5" />
                </div>
                <h3 className="text-sm md:text-lg font-bold text-primary">
                  {language === "bn" ? "পবিত্র মক্কায়" : "In Holy Makkah"}
                </h3>
              </div>
              <ul className="space-y-0.5 md:space-y-2 text-[11px] md:text-sm text-slate-600">
                <li className="flex items-start gap-1.5 md:gap-2">
                  <span className="text-accent-gold mt-0.5 md:mt-1">•</span>
                  <span className="leading-tight">{language === "bn" ? "বায়তুল্লাহ" : "Baitullah"}</span>
                </li>
                <li className="flex items-start gap-1.5 md:gap-2">
                  <span className="text-accent-gold mt-0.5 md:mt-1">•</span>
                  <span className="leading-tight">{language === "bn" ? "হযরতের জন্মস্থান" : "Birthplace"}</span>
                </li>
                <li className="flex items-start gap-1.5 md:gap-2">
                  <span className="text-accent-gold mt-0.5 md:mt-1">•</span>
                  <span className="leading-tight">{language === "bn" ? "গারে হেরা" : "Gare Hera"}</span>
                </li>
                <li className="flex items-start gap-1.5 md:gap-2 hidden md:flex">
                  <span className="text-accent-gold mt-0.5 md:mt-1">•</span>
                  <span className="leading-tight">{language === "bn" ? "জান্নাতুল মুয়াল্লা" : "Jannatul Mualla"}</span>
                </li>
                <li className="flex items-start gap-1.5 md:gap-2 hidden md:flex">
                  <span className="text-accent-gold mt-0.5 md:mt-1">•</span>
                  <span className="leading-tight">{language === "bn" ? "জাবালে আবু কুবায়েস" : "Jabal Abu Qubais"}</span>
                </li>
              </ul>
            </motion.div>

            {/* Madinah */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-3 md:p-6 shadow-sm border border-slate-100"
            >
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                <div className="w-7 h-7 md:w-10 md:h-10 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary">
                  <MapPin size={14} className="md:w-5 md:h-5" />
                </div>
                <h3 className="text-sm md:text-lg font-bold text-primary">
                  {language === "bn" ? "পবিত্র মদিনায়" : "In Holy Madinah"}
                </h3>
              </div>
              <ul className="space-y-0.5 md:space-y-2 text-[11px] md:text-sm text-slate-600">
                <li className="flex items-start gap-1.5 md:gap-2">
                  <span className="text-accent-gold mt-0.5 md:mt-1">•</span>
                  <span className="leading-tight">{language === "bn" ? "রওজাতুর রাসূল" : "Rawdatul Rasul"}</span>
                </li>
                <li className="flex items-start gap-1.5 md:gap-2">
                  <span className="text-accent-gold mt-0.5 md:mt-1">•</span>
                  <span className="leading-tight">{language === "bn" ? "জান্নাতুল বাকী" : "Jannatul Baqi"}</span>
                </li>
                <li className="flex items-start gap-1.5 md:gap-2">
                  <span className="text-accent-gold mt-0.5 md:mt-1">•</span>
                  <span className="leading-tight">{language === "bn" ? "উহুদ পাহাড়" : "Uhud Mountain"}</span>
                </li>
                <li className="flex items-start gap-1.5 md:gap-2 hidden md:flex">
                  <span className="text-accent-gold mt-0.5 md:mt-1">•</span>
                  <span className="leading-tight">{language === "bn" ? "মসজিদে কুবা" : "Masjid Quba"}</span>
                </li>
                <li className="flex items-start gap-1.5 md:gap-2 hidden md:flex">
                  <span className="text-accent-gold mt-0.5 md:mt-1">•</span>
                  <span className="leading-tight">{language === "bn" ? "বদরের ময়দান" : "Badr Battlefield"}</span>
                </li>
              </ul>
            </motion.div>

            {/* Taif & Jeddah */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-3 md:p-6 shadow-sm border border-slate-100"
            >
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                <div className="w-7 h-7 md:w-10 md:h-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-600">
                  <MapPin size={14} className="md:w-5 md:h-5" />
                </div>
                <h3 className="text-sm md:text-lg font-bold text-primary">
                  {language === "bn" ? "তায়েফ ও জেদ্দা" : "Taif & Jeddah"}
                </h3>
              </div>
              <ul className="space-y-0.5 md:space-y-2 text-[11px] md:text-sm text-slate-600">
                <li className="flex items-start gap-1.5 md:gap-2">
                  <span className="text-accent-gold mt-0.5 md:mt-1">•</span>
                  <span className="leading-tight">{language === "bn" ? "হালিমার বাড়ি" : "Halima's House"}</span>
                </li>
                <li className="flex items-start gap-1.5 md:gap-2">
                  <span className="text-accent-gold mt-0.5 md:mt-1">•</span>
                  <span className="leading-tight">{language === "bn" ? "ইবনে আব্বাসের কবর" : "Ibn Abbas Grave"}</span>
                </li>
                <li className="flex items-start gap-1.5 md:gap-2">
                  <span className="text-accent-gold mt-0.5 md:mt-1">•</span>
                  <span className="leading-tight">{language === "bn" ? "মা হাওয়ার কবর" : "Mother Hawa Grave"}</span>
                </li>
                <li className="flex items-start gap-1.5 md:gap-2 hidden md:flex">
                  <span className="text-accent-gold mt-0.5 md:mt-1">•</span>
                  <span className="leading-tight">{language === "bn" ? "লোহিত সাগর" : "Red Sea"}</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Album Section */}
      <Album onOpenChange={onAlbumOpenChange} />

      {/* Testimonials */}
      <section className="py-20 px-4 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                {t("testimonials.title")}
              </h2>
              <p className="text-slate-500 text-sm md:text-base">
                {t("testimonials.subtitle")}
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm active:scale-90"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm active:scale-90"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="relative overflow-visible">
            <div className="overflow-hidden p-2 -m-2">
              <motion.div 
                animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="flex gap-6"
              >
                {testimonials.map((t, i) => (
                  <motion.div 
                    key={`${t.name}-${i}`}
                    layout
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full shrink-0 md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col relative"
                  >
                    <Quote className="absolute top-5 right-6 text-primary/5 w-8 h-8" />
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(5)].map((_, index) => (
                        <Star 
                          key={index} 
                          size={12} 
                          className={index < t.rating ? "text-[#D4AF37]" : "text-slate-200"} 
                          fill={index < t.rating ? "currentColor" : "none"} 
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-4 italic text-xs md:text-sm flex-grow">
                      "{t.feedback}"
                    </p>
                    <div className="flex items-center gap-3 border-t border-slate-50 pt-4">
                       <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-base">
                         {t.name.charAt(0)}
                       </div>
                       <div>
                         <h4 className="font-bold text-primary text-xs">{t.name}</h4>
                         <p className="text-[9px] text-slate-400 font-medium uppercase tracking-widest">{t.location}</p>
                       </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </div>
        </div>

          <div className="mt-16 max-w-2xl mx-auto">
            {!showForm ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-primary rounded-3xl p-6 md:p-10 text-center text-white relative overflow-hidden shadow-xl shadow-primary/20"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <svg viewBox="0 0 100 100" className="w-full h-full"><path d="M0 0l100 100M100 0L0 100" stroke="currentColor" strokeWidth="0.5" fill="none" /></svg>
                </div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20">
                    <MessageCircle size={24} className="text-accent-gold" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3">
                    {language === "bn" ? "আপনার অভিজ্ঞতা শেয়ার করুন" : "Share Your Experience"}
                  </h3>
                  <p className="text-white/70 max-w-md mx-auto mb-8 text-xs md:text-sm leading-relaxed">
                    {language === "bn" 
                      ? "আপনার মূল্যবান মতামত অন্যান্য হাজীদের সঠিক সিদ্ধান্ত নিতে সাহায্য করবে।" 
                      : "Your valuable feedback will help other pilgrims make the right decision."}
                  </p>
                  <button 
                    onClick={() => setShowForm(true)}
                    className="bg-accent-gold text-[#00526A] px-8 py-3.5 rounded-xl font-bold hover:bg-white transition-all shadow-lg active:scale-95 flex items-center gap-2 mx-auto text-sm"
                  >
                    <span>{t("testimonials.form_title")}</span>
                    <Quote size={14} className="opacity-50" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl shadow-primary/5 border border-slate-100 relative"
              >
                <button 
                  onClick={() => setShowForm(false)}
                  className="absolute top-4 right-6 text-slate-300 hover:text-slate-600 transition-colors"
                >
                  ✕
                </button>

                <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-primary/5 text-primary rounded-lg flex items-center justify-center">
                    <Quote size={16} />
                  </span>
                  {t("testimonials.form_title")}
                </h3>
                
                {formSubmitted ? (
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-green-50 text-green-700 p-6 rounded-2xl border border-green-100 text-center py-12"
                  >
                    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md shadow-green-100">
                      <ShieldCheck size={24} />
                    </div>
                    <p className="font-bold">{t("testimonials.success")}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-primary/60 uppercase tracking-widest ml-1">{t("testimonials.label_name")}</label>
                        <input 
                          required
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs md:text-sm focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-medium placeholder:text-slate-300 outline-none"
                          placeholder="e.g. Abdullah"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-primary/60 uppercase tracking-widest ml-1">{t("testimonials.label_location")}</label>
                        <input 
                          required
                          type="text" 
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs md:text-sm focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-medium placeholder:text-slate-300 outline-none"
                          placeholder="e.g. Dhaka"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-primary/60 uppercase tracking-widest ml-1">{t("testimonials.label_rating")}</label>
                      <div className="flex gap-1 p-1 bg-slate-50 rounded-xl border border-slate-200 w-fit">
                        {[1,2,3,4,5].map(star => (
                          <button 
                            key={star}
                            type="button"
                            onClick={() => setFormData({...formData, rating: star})}
                            className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${formData.rating >= star ? "bg-white text-[#D4AF37] shadow-sm scale-110 border border-slate-100" : "text-slate-300 hover:text-slate-400"}`}
                          >
                            <Star size={18} fill={formData.rating >= star ? "currentColor" : "none"} strokeWidth={1.5} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-primary/60 uppercase tracking-widest ml-1">{t("testimonials.label_feedback")}</label>
                      <textarea 
                        required
                        value={formData.feedback}
                        onChange={(e) => setFormData({...formData, feedback: e.target.value})}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs md:text-sm focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all min-h-[120px] font-medium resize-none placeholder:text-slate-300 outline-none"
                        placeholder={language === "bn" ? "আপনার অভিজ্ঞতা..." : "Your feedback..."}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button 
                        type="submit"
                        className="flex-1 bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-[#002d3a] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/10 group active:scale-[0.98] text-sm"
                      >
                        {t("testimonials.submit")}
                        <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </button>
                      <button 
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-8 py-3.5 bg-white border border-slate-200 text-slate-500 rounded-xl font-bold hover:bg-slate-50 hover:text-primary transition-all text-sm"
                      >
                        {language === "bn" ? "বাতিল" : "Cancel"}
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowBookingModal(false)}
            className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <div className="bg-primary p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <button 
                onClick={() => setShowBookingModal(false)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="w-12 h-12 bg-accent-gold/20 rounded-xl flex items-center justify-center mb-4 border border-accent-gold/30">
                <Phone size={24} className="text-accent-gold" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t("booking.title")}</h3>
              <p className="text-white/60 text-sm">{selectedPackage?.title}</p>
            </div>

            <form onSubmit={handleBookingSubmit} className="p-8 space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-primary/60 uppercase tracking-widest ml-1">{t("booking.label_name")}</label>
                <input 
                  required
                  type="text" 
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-medium outline-none"
                  placeholder="e.g. Abdullah"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-primary/60 uppercase tracking-widest ml-1">{t("booking.label_age")}</label>
                  <input 
                    required
                    type="number" 
                    value={bookingForm.age}
                    onChange={(e) => setBookingForm({...bookingForm, age: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-medium outline-none"
                    placeholder="e.g. 45"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-primary/60 uppercase tracking-widest ml-1">{t("booking.label_phone")}</label>
                  <input 
                    required
                    type="tel" 
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all font-medium outline-none"
                    placeholder="017XXXXXXXX"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-[#002d3a] transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20 group active:scale-[0.98]"
                >
                  {t("booking.submit")}
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-4 leading-relaxed">
                {language === "bn" 
                  ? "*বুকিং বাটনে ক্লিক করলে আপনাকে সরাসরি আমাদের অফিসিয়াল হোয়াটসঅ্যাপে নিয়ে যাওয়া হবে।" 
                  : "*Clicking the booking button will take you directly to our official WhatsApp."}
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
