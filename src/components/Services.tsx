/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { IMAGES } from "../constants";
import {
  Shield,
  Map,
  Hotel,
  Users,
  Headphones,
  Briefcase,
  Phone,
  GraduationCap,
  Zap
} from "lucide-react";
import { useTranslation } from "../lib/TranslationContext";

interface ServicesProps {
  onScreenChange: (screen: string) => void;
}

export default function Services({ onScreenChange }: ServicesProps) {
  const { t, language } = useTranslation();

  const services = [
    {
      title: language === "bn" ? "ব্যক্তিগত তত্ত্বাবধান" : "Personal Supervision",
      desc: language === "bn" ? "প্রতি কাফেলায় মুফতি মোঃ আখতার হোসাইন নিজে উপস্থিত থেকে হাজীদের হজ্জ ও ওমরাহর যাবতীয় কার্যাদি পালন নিশ্চিত করেন।" : "Mufti Md. Akhtar Hossain personally supervises each caravan to ensure all Hajj and Umrah rituals are performed correctly.",
      icon: Shield,
      img: IMAGES.consultation
    },
    {
      title: language === "bn" ? "উন্নত খাবার ব্যবস্থা" : "Quality Food Service",
      desc: language === "bn" ? "নিজস্ব ব্যবস্থাপনায় দেশি বাবুর্চি দ্বারা মানসম্মত খাবার পরিবেশন করা হয়।" : "Quality food is served through our own management by experienced local chefs.",
      icon: Users,
      img: IMAGES.luxury_hotel
    },
    {
      title: language === "bn" ? "প্রশিক্ষণ ব্যবস্থা" : "Training System",
      desc: language === "bn" ? "হজ্জ ও ওমরাহ পালনের পূর্বে সঠিক নিয়ম ও সচেতনতা বৃদ্ধির জন্য বিশেষ প্রশিক্ষণের ব্যবস্থা করা হয়।" : "Special training is arranged before performing Hajj and Umrah to learn correct rules and increase awareness.",
      icon: Map,
      img: IMAGES.group_support
    },
    {
      title: language === "bn" ? "তাৎক্ষণিক সমাধান" : "Instant Solution",
      desc: language === "bn" ? "সফরকালীন যেকোনো সমস্যা দ্রুত সমাধানের নিশ্চয়তা।" : "Guarantee of quick solution to any problem during the journey.",
      icon: Headphones,
      img: IMAGES.visa
    },
    {
      title: language === "bn" ? "নিজস্ব গাইড ও হোটেল" : "Own Guide & Hotels",
      desc: language === "bn" ? "মক্কা ও মদিনায় নিজস্ব গাইড এবং নিজস্ব হোটেলের সুবিধা।" : "Benefit of our own guides and own hotels in Makkah and Madinah.",
      icon: Hotel,
      img: IMAGES.hotel_view
    }
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="relative h-60 md:h-72 bg-primary flex items-center justify-center overflow-hidden">
        <img src={IMAGES.kaaba_dusk} className="absolute inset-0 w-full h-full object-cover opacity-20" alt="" referrerPolicy="no-referrer" />
        <div className="relative text-center z-10 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{t("services.hero_title")}</h1>
          <p className="text-white/70 text-sm md:text-base max-w-lg mx-auto">{t("services.hero_subtitle")}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 items-center bg-slate-50 p-6 md:p-8 rounded-3xl hover:shadow-md transition-all border border-slate-100"
            >
              <div className="w-full sm:w-2/5 h-48 rounded-2xl overflow-hidden shrink-0">
                <img src={s.img} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
              </div>
              <div className="w-full sm:w-3/5">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                  <s.icon size={20} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{s.title}</h3>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Support Section */}
        <section className="mt-20 bg-primary rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 islamic-pattern w-1/2 h-full opacity-5"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">{t("services.support_title")}</h2>
              <p className="text-white/80 text-sm md:text-base mb-8 leading-relaxed">
                {t("services.support_desc")}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:+8801879216736"
                  className="bg-accent-gold text-primary font-bold px-6 py-3 rounded-lg text-sm hover:bg-white transition-all active:scale-95 flex items-center gap-2"
                >
                  <Phone size={16} />
                  {language === "bn" ? "কল করুন এখনই" : "Call Now"}
                </a>
                <button 
                  onClick={() => {
                    onScreenChange("home");
                    setTimeout(() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" }), 100);
                  }}
                  className="bg-white/10 border border-white/30 px-6 py-3 rounded-lg text-sm hover:bg-white/20 transition-all active:scale-95"
                >
                  {t("packages.title")}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: language === "bn" ? "১৫০০+" : "1500+", sub: language === "bn" ? "সাফল্যের গল্প" : "Stories", icon: Headphones },
                { title: language === "bn" ? "২৪/৭" : "24/7", sub: language === "bn" ? "কাস্টমার কেয়ার" : "Care", icon: Briefcase }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <item.icon size={20} className="text-accent-gold" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{item.title}</div>
                  <div className="text-[10px] text-white/60 uppercase font-black tracking-widest">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
