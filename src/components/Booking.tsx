/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { useState } from "react";
import { 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  CreditCard,
  Send,
  CheckCircle,
  FileBadge
} from "lucide-react";
import { useTranslation } from "../lib/TranslationContext";

interface BookingProps {
  onBack: () => void;
}

export default function Booking({ onBack }: BookingProps) {
  const { t, language } = useTranslation();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-background p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-lg border border-slate-100"
        >
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-primary mb-3">
            {language === "bn" ? "ধন্যবাদ! আপনার অনুরোধ জমা হয়েছে।" : "Thank You! Your Request Submitted."}
          </h2>
          <p className="text-slate-600 mb-8 text-sm">
            {language === "bn" 
              ? "আমাদের প্রতিনিধি খুব শীঘ্রই আপনার প্রদত্ত নম্বরে যোগাযোগ করবেন।" 
              : "Our representative will contact you soon on your provided number."}
          </p>
          <button 
            onClick={onBack}
            className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-container transition-all shadow-lg active:scale-95"
          >
            {t("nav.home")}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 md:py-16 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8 border border-slate-100">
            <div className="flex items-center gap-6 mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= s ? "bg-primary text-white" : "bg-slate-100 text-slate-400"}`}>
                    {s}
                  </div>
                  <div className={`hidden sm:block h-0.5 w-8 rounded-full ${step > s ? "bg-primary" : "bg-slate-100"}`} />
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                  <h3 className="text-lg font-bold text-primary mb-6 border-b pb-3">
                    {language === "bn" ? "ব্যক্তিগত তথ্য" : "Personal Information"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {language === "bn" ? "পূর্ণ নাম" : "Full Name"}
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input required className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-lg focus:ring-2 focus:ring-primary/10 text-sm outline-none transition-all" placeholder={language === "bn" ? "নাম টাইপ করুন" : "Enter Name"} type="text" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {language === "bn" ? "মোবাইল নম্বর" : "Mobile Number"}
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input required className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-lg focus:ring-2 focus:ring-primary/10 text-sm outline-none transition-all" placeholder="+৮৮০" type="tel" />
                      </div>
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {language === "bn" ? "বর্তমান ঠিকানা" : "Current Address"}
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input required className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-lg focus:ring-2 focus:ring-primary/10 text-sm outline-none transition-all" placeholder={language === "bn" ? "গ্রাম/রাস্তা, থানা, জেলা" : "Road/Village, PS, District"} type="text" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                  <h3 className="text-lg font-bold text-primary mb-6 border-b pb-3">
                    {language === "bn" ? "ভ্রমণ সংক্রান্ত তথ্য" : "Travel Information"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {t("nav.packages")}
                      </label>
                      <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-lg focus:ring-2 focus:ring-primary/10 text-sm appearance-none outline-none">
                        <option>{language === "bn" ? "প্রিমিয়াম হজ্জ প্যাকেজ" : "Premium Hajj Package"}</option>
                        <option>{language === "bn" ? "ইকোনমি হজ্জ প্যাকেজ" : "Economy Hajj Package"}</option>
                        <option>{language === "bn" ? "১৪ দিনের উমরাহ" : "14 Days Umrah"}</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {language === "bn" ? "ভ্রমণের সম্ভাব্য তারিখ" : "Expected Travel Date"}
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input required className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-lg focus:ring-2 focus:ring-primary/10 text-sm outline-none" type="date" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                  <h3 className="text-lg font-bold text-primary mb-6 border-b pb-3">
                    {language === "bn" ? "পাসপোর্ট ও অন্যান্য" : "Passport & Others"}
                  </h3>
                  <div className="space-y-5">
                    <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer group">
                      <FileBadge className="mx-auto mb-3 text-slate-400 group-hover:text-primary transition-colors" size={32} />
                      <p className="text-slate-600 font-bold mb-1 text-sm">
                        {language === "bn" ? "পাসপোর্ট স্ক্যান কপি আপলোড করুন" : "Upload Passport Scan Copy"}
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Max size: 5MB (PDF, JPG)</p>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="pt-6 flex justify-between gap-4">
                {step > 1 && (
                  <button 
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-8 py-3 rounded-lg font-bold border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all text-sm"
                  >
                    {language === "bn" ? "পূর্ববর্তী" : "Previous"}
                  </button>
                )}
                <button 
                  type="submit"
                  className="bg-primary text-white ml-auto px-8 py-3 rounded-lg font-bold hover:bg-primary-container transition-all flex items-center gap-2.5 shadow-md text-sm"
                >
                  {step === 3 ? (language === "bn" ? "অনুরোধ জমা দিন" : "Submit Request") : (language === "bn" ? "পরবর্তী ধাপ" : "Next Step")} <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-1">
          <div className="bg-primary text-white rounded-3xl p-8 shadow-lg sticky top-24 overflow-hidden border border-white/10">
            <div className="absolute top-0 right-0 islamic-pattern w-full h-full opacity-5 pointer-events-none"></div>
            <h3 className="text-base font-bold mb-6 flex items-center gap-2.5 border-b border-white/10 pb-5 relative z-10">
              <CreditCard size={18} /> {language === "bn" ? "প্যাকেজ সারসংক্ষেপ" : "Package Summary"}
            </h3>
            <div className="space-y-4 mb-8 relative z-10">
              <div className="flex justify-between">
                <span className="text-white/60 text-xs">{language === "bn" ? "প্যাকেজের মূল্য" : "Price"}</span>
                <span className="font-bold text-xs">৳ ৫,৫০,০০০</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 text-xs">{language === "bn" ? "হোটেল টাইপ" : "Hotel"}</span>
                <span className="font-bold text-xs">{language === "bn" ? "৫ তারকা" : "5 Star"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60 text-xs">{language === "bn" ? "রুম শেয়ারিং" : "Sharing"}</span>
                <span className="font-bold text-xs">{language === "bn" ? "৪ জন/রুম" : "4 Pax/Room"}</span>
              </div>
              <div className="h-px bg-white/10 w-full" />
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                <span className="font-bold text-xs">{language === "bn" ? "মোট দেয়" : "Total"}</span>
                <span className="text-xl font-black text-accent-gold">৳ ৫,৫০,০০০</span>
              </div>
            </div>
            <p className="text-[10px] text-white/40 leading-relaxed italic relative z-10">
              {language === "bn" 
                ? "* সরকারের হজ্জ নীতিমালা অনুযায়ী মূল্য পরিবর্তিত হতে পারে।" 
                : "* Price may change as per govt policy."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
