/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Banknote, 
  ArrowLeft,
  ShieldCheck,
  X,
  Clock,
  Info
} from "lucide-react";
import { PackageData } from "../types";
import { useTranslation } from "../lib/TranslationContext";

interface PackageDetailsProps {
  packageData: PackageData;
  onBack: () => void;
}

export default function PackageDetails({ packageData, onBack }: PackageDetailsProps) {
  const { t, language } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-primary hover:text-secondary font-bold transition-all group text-sm"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        {t("common.back")}
      </motion.button>

      {/* Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-lg"
        >
          <img 
            src={packageData.image} 
            alt={packageData.title} 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer"
          />
          <div className={`absolute top-4 left-4 ${packageData.color} text-white px-4 py-1 rounded-full font-bold text-xs shadow-md`}>
            {packageData.tag}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col justify-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{packageData.title}</h1>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-extrabold text-secondary">{packageData.price}</span>
            <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-lg text-[10px] font-medium uppercase tracking-wider">{t("common.per_person")}</span>
          </div>
          
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-bold text-primary flex items-center gap-2">
              <Info size={18} className="text-accent-gold" /> {t("packages.details")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {packageData.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <CheckCircle2 size={16} className="text-primary shrink-0" />
                  <span className="text-slate-700 text-xs font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/8801879216736?text=${encodeURIComponent(
                (language === "bn" 
                  ? `আসসালামু আলাইকুম, আমি মাতৃভূমি হজ্জ কাফেলা থেকে *${packageData.title}* প্যাকেজটি বুক করতে আগ্রহী।` 
                  : `Assalamu Alaikum, I am interested in booking the *${packageData.title}* package from Matribhumi Hajj Kafela.`)
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-grow bg-primary text-white py-3.5 rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              {t("packages.booking")}
            </a>
            <a
              href="tel:+8801879216736"
              className="px-6 py-3.5 border-2 border-primary text-primary rounded-xl font-bold text-sm hover:bg-primary/5 transition-all active:scale-95 flex items-center gap-2"
            >
              {t("nav.contact")}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Itinerary - 7 columns */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-primary mb-8 flex items-center gap-3">
              <Calendar size={20} className="text-accent-gold" />
              {t("details.itinerary")}
            </h3>
            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-50">
              {packageData.itinerary.map((step, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -5 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="relative pl-10"
                >
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-4 border-primary z-10 flex items-center justify-center text-[10px] font-bold text-primary shadow-sm">
                    {idx + 1}
                  </div>
                  <div className="font-bold text-base text-primary mb-1">{step.day}</div>
                  <div className="text-slate-600 leading-relaxed text-sm">{step.activity}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Info & Pricing - 5 columns */}
        <div className="lg:col-span-5 space-y-6">
          {/* Inclusions */}
          <div className="bg-green-50/30 rounded-3xl p-6 border border-green-100">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-green-500" /> {t("details.inclusions")}
            </h3>
            <div className="space-y-2.5">
              {packageData.inclusions.map((item, idx) => (
                <div key={idx} className="flex gap-2.5 text-slate-700 bg-white p-3 rounded-lg shadow-sm border border-green-50">
                  <ShieldCheck size={16} className="text-green-600 shrink-0 mt-0.5" />
                  <span className="text-xs font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Exclusions */}
          <div className="bg-red-50/30 rounded-3xl p-6 border border-red-100">
            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <XCircle size={18} className="text-red-500" /> {t("details.exclusions")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {packageData.exclusions.map((item, idx) => (
                <div key={idx} className="px-3 py-2 bg-white text-red-700 rounded-lg text-[11px] font-medium border border-red-50 flex items-center gap-2 shadow-sm">
                  <X size={12} className="shrink-0" /> {item}
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-primary text-white rounded-3xl p-7 shadow-xl relative overflow-hidden">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 relative z-10">
              <Banknote size={18} className="text-accent-gold" /> {t("details.pricing")}
            </h3>
            <div className="space-y-3 mb-6 relative z-10">
              {packageData.pricing.map((price, idx) => (
                <div key={idx} className="flex justify-between items-center py-3 border-b border-white/10 last:border-0 opacity-80 text-xs">
                  <span>{price.item}</span>
                  <span className="font-bold">{price.cost}</span>
                </div>
              ))}
              <div className="pt-4 flex justify-between items-center">
                <span className="font-bold opacity-60 text-xs">{t("details.total")}</span>
                <span className="font-extrabold text-secondary text-2xl">{packageData.price}</span>
              </div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl flex items-start gap-3 relative z-10">
              <Clock size={16} className="text-accent-gold shrink-0 mt-0.5" />
              <p className="text-[10px] opacity-80 leading-relaxed italic">আমাদের প্রতিটি প্যাকেজ সর্বোচ্চ মানের নিশ্চয়তা দেয় এবং অভিজ্ঞ গাইড দ্বারা পরিচালিত হয়।</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
