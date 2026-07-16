import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "../lib/TranslationContext";
import { hajj2027Data, packageColors, packageAccentColors } from "../data/hajj2027";
import { Plane, Building, Building2, Tent, Bed, Check, X, FileText, Info, Star, Utensils, Bus, Backpack, UserCheck, ClipboardCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const pageBg = {
  p1: "/hajj-2027/page1.png",
  p2: "/hajj-2027/page2.png",
  p3: "/hajj-2027/page3.png",
  p4: "/hajj-2027/page4.png",
  p5: "/hajj-2027/page5.png",
  p6: "/hajj-2027/page6.png",
  p7: "/hajj-2027/page7.png",
};

const pageDescriptions = [
  {
    img: pageBg.p1,
    titleBn: "প্যাকেজ বি",
    titleEn: "Package B",
    descBn: "সাশ্রয়ী মূল্যের বেসিক প্যাকেজ। ৫,৭৫,০০০ টাকা থেকে শুরু, সরাসরি ফ্লাইট ও স্ট্যান্ডার্ড হোটেলে আবাসন।",
    descEn: "Affordable basic package. Starting from 5,75,000 BDT, direct flights, standard hotel accommodation.",
  },
  {
    img: pageBg.p2,
    titleBn: "প্যাকেজ এ",
    titleEn: "Package A",
    descBn: "আপগ্রেডেড প্যাকেজ। ৬,৭৫,০০০ টাকা, মক্কায় কাছাকাছি হোটেল (৫০০-৮০০ মিটার) ও উন্নত সেবা।",
    descEn: "Upgraded package. 6,75,000 BDT, closer Makkah hotel (500-800m) & enhanced services.",
  },
  {
    img: pageBg.p3,
    titleBn: "সাধারণ সেবাসমূহ",
    titleEn: "Common Services",
    descBn: "সকল প্যাকেজের জন্য প্রযোজ্য সাধারণ সেবা — ভিসা, ফ্লাইট, আবাসন, স্থানীয় পরিবহন, খাবার ও অভিজ্ঞ গাইড।",
    descEn: "Common services for all packages — visa, flights, accommodation, local transport, meals & expert guide.",
  },
  {
    img: pageBg.p4,
    titleBn: "স্ট্যান্ডার্ড ও ভিআইপি",
    titleEn: "Standard & VIP",
    descBn: "প্রিমিয়াম হজ্জ প্যাকেজ। বিলাসবহুল হোটেল, প্রাইভেট রুম ও বিশেষ সুবিধাসমূহ।",
    descEn: "Premium Hajj packages. Luxury hotels, private rooms & special amenities.",
  },
  {
    img: pageBg.p5,
    titleBn: "অন্তর্ভুক্তি ও শর্তাবলি",
    titleEn: "Inclusions & Terms",
    descBn: "প্যাকেজে কী কী থাকছে, কী কী থাকছে না এবং সম্পূর্ণ শর্তাবলি সম্পর্কে বিস্তারিত জানুন।",
    descEn: "Know what's included, what's not, and the complete terms & conditions.",
  },
  {
    img: pageBg.p6,
    titleBn: "প্যাকিং তালিকা",
    titleEn: "Packing List",
    descBn: "হজ্জ ও ওমরাহ যাত্রীদের জন্য প্রয়োজনীয় মালামালের বিস্তারিত তালিকা — পুরুষ ও মহিলা উভয়ের জন্য।",
    descEn: "Detailed packing list for Hajj & Umrah pilgrims — for both men and women.",
  },
  {
    img: pageBg.p7,
    titleBn: "যোগাযোগ",
    titleEn: "Contact",
    descBn: "ঢাকা ও কুমিল্লা অফিসের ঠিকানা, ফোন নম্বর ও WhatsApp যোগাযোগের তথ্য।",
    descEn: "Dhaka & Comilla office addresses, phone numbers & WhatsApp contact info.",
  },
];

export default function Hajj2027Page() {
  const { language } = useTranslation();
  const isBn = language === "bn";
  const [packingTab, setPackingTab] = useState<"hajj" | "umrah">("hajj");
  const [genderTab, setGenderTab] = useState<"men" | "women">("men");

  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    parallaxRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el, { y: 0 }, {
        y: () => (i % 2 === 0 ? 80 : -80),
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const setParallaxRef = (i: number) => (el: HTMLDivElement | null) => { parallaxRefs.current[i] = el; };

  const serviceIconMap = [
    <Utensils key="0" size={20} />,
    <Bus key="1" size={20} />,
    <Backpack key="2" size={20} />,
    <Building2 key="3" size={20} />,
    <Tent key="4" size={20} />,
    <UserCheck key="5" size={20} />,
    <ClipboardCheck key="6" size={20} />,
  ];

  return (
    <div className="bg-background overflow-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/hajj-assets/The-Kaaba.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/85 via-slate-900/50 to-slate-900/90" />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
        </div>

        <div className="absolute inset-0 opacity-[0.03]">
          <div className="islamic-pattern w-full h-full" />
        </div>

        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-accent-gold/10 blur-3xl"
            animate={{
              x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 15 + i * 4, repeat: Infinity, repeatType: "reverse" }}
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: `${5 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
          />
        ))}

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-arabic text-5xl md:text-7xl lg:text-8xl text-accent-gold/90 mb-6 tracking-[0.15em] drop-shadow-2xl"
          >
            لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-5 py-1.5 rounded-full bg-white/10 text-accent-gold text-xs font-bold tracking-[0.3em] uppercase mb-5 border border-accent-gold/20 backdrop-blur-md">
              {isBn ? "হজ্জ প্যাকেজ ২০২৭" : "Hajj Package 2027"}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-hajj leading-tight drop-shadow-2xl">
              {isBn ? "২০২৭ সালের পবিত্র হজ্জ" : "Hajj 2027"}
              <br />
              <span className="text-accent-gold">
                {isBn ? "সেরা চারটি প্যাকেজ" : "Four Premium Packages"}
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              {isBn
                ? "৫৭৫,০০০ টাকা থেকে শুরু — সরাসরি ফ্লাইট, ডি ক্যাটাগরি তাঁবু ও অভিজ্ঞ আলেমের গাইডলাইন।"
                : "Starting from 5,75,000 BDT — direct flights, Category D tents, and expert guidance."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#packages-section"
              className="inline-flex h-13 items-center justify-center rounded-full bg-accent-gold text-primary px-9 font-bold text-sm hover:brightness-110 transition-all shadow-2xl shadow-accent-gold/30 active:scale-95"
            >
              {isBn ? "প্যাকেজ দেখুন" : "View Packages"}
            </a>
            <a href="https://wa.me/8801879216736" target="_blank" rel="noopener noreferrer"
              className="inline-flex h-13 items-center justify-center rounded-full border-2 border-white/25 bg-white/10 backdrop-blur-md text-white px-9 font-bold text-sm hover:bg-white/20 transition-all active:scale-95"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="mr-2"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771z"/></svg>
              WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-16"
          >
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="text-white/30 text-sm">
              <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── PAGE GALLERY ─── */}
      <section className="relative py-20 md:py-28 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-white to-background" />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold tracking-wider uppercase mb-4 border border-primary/10">
              {isBn ? "ব্রোশিওর গ্যালারি" : "Brochure Gallery"}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-primary font-hajj">
              {isBn ? "সম্পূর্ণ প্যাকেজ বিবরণী" : "Complete Package Details"}
            </h2>
            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
              {isBn
                ? "নিচের প্রতিটি পৃষ্ঠায় হজ্জ প্যাকেজ ২০২৭-এর বিস্তারিত তথ্য দেওয়া হয়েছে"
                : "Each page below contains detailed information about Hajj Package 2027"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {pageDescriptions.map((page, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-400 border border-slate-100 flex flex-row"
              >
                <div className="w-24 md:w-48 shrink-0 overflow-hidden">
                  <img
                    src={page.img}
                    alt={isBn ? page.titleBn : page.titleEn}
                    className="w-full h-full min-h-20 md:min-h-32 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-3 md:p-5 flex flex-col justify-center min-w-0">
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1">
                    <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/10 flex items-center justify-center text-[8px] md:text-[10px] text-primary font-bold shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-bold text-primary text-xs md:text-base leading-tight">
                      {isBn ? page.titleBn : page.titleEn}
                    </h3>
                  </div>
                  <p className="text-[11px] md:text-sm text-slate-500 leading-relaxed">
                    {isBn ? page.descBn : page.descEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PACKAGES ─── */}
      <section id="packages-section" className="relative py-20 md:py-28 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div ref={setParallaxRef(0)} className="absolute inset-0">
            <img src={pageBg.p2} alt="" className="w-full h-full object-cover opacity-[0.04]" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-white to-background" />
        </div>
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-bold tracking-wider uppercase mb-4 border border-primary/10">
              {isBn ? "২০২৭ সালের হজ্জ প্যাকেজ" : "Hajj 2027 Packages"}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-primary font-hajj">
              {isBn ? "আপনার জন্য চারটি প্যাকেজ" : "Four Packages For You"}
            </h2>
            <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
              {isBn
                ? "বাজেট ও আরামের ভিত্তিতে প্যাকেজ বেছে নিন — বি, এ, স্ট্যান্ডার্ড ও ভিআইপি।"
                : "Choose based on budget and comfort — B, A, Standard & VIP."}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
            {hajj2027Data.packages.map((pkg, pi) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: pi * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-400 overflow-hidden border border-slate-100"
              >
                <div className={`h-1.5 bg-gradient-to-r ${packageColors[pkg.id]}`} />
                <div className="p-5 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${packageColors[pkg.id]} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                        {pi + 1}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-primary leading-tight">
                          {isBn ? pkg.name.bn : pkg.name.en}
                        </h3>
                        <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${packageAccentColors[pkg.id]}`}>
                          {isBn ? pkg.duration.bn : pkg.duration.en}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">{isBn ? "মূল্য" : "Price"}</p>
                      <p className="text-xl font-bold text-slate-800 leading-tight">
                        {isBn ? pkg.price.bn.replace(" (সম্ভাব্য)", "") : pkg.price.en.replace(" (Estimated)", "")}
                      </p>
                      {pkg.price.bn.includes("সম্ভাব্য") && (
                        <p className="text-[10px] text-amber-500">{isBn ? "সম্ভাব্য" : "Estimated"}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2.5 text-sm text-slate-600 border-t border-slate-100 pt-4">
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-sky-50 flex items-center justify-center shrink-0 text-sky-600"><Plane size={10} /></span>
                      <span>{isBn ? pkg.flight.bn : pkg.flight.en}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-amber-50 flex items-center justify-center shrink-0 text-amber-600"><Building size={10} /></span>
                      <span><strong className="text-primary">{isBn ? "মক্কা:" : "Makkah:"}</strong> {isBn ? pkg.makkahHotel.bn : pkg.makkahHotel.en}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 text-emerald-600"><Building2 size={10} /></span>
                      <span><strong className="text-primary">{isBn ? "মদিনা:" : "Madinah:"}</strong> {isBn ? pkg.madinahHotel.bn : pkg.madinahHotel.en}</span>
                    </div>
                    {pkg.extraAccommodation && (
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-purple-50 flex items-center justify-center shrink-0 text-purple-600"><Tent size={10} /></span>
                        <span>{isBn ? pkg.extraAccommodation.bn : pkg.extraAccommodation.en}</span>
                      </div>
                    )}
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center shrink-0 text-slate-600"><Bed size={10} /></span>
                      <span>{isBn ? pkg.roomSharing.bn : pkg.roomSharing.en}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <p className="text-[11px] text-slate-400 italic leading-relaxed">
                      <Info size={12} className="inline mr-1 -mt-0.5 text-slate-400" />
                      {isBn ? pkg.specialNote.bn : pkg.specialNote.en}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMMON SERVICES ─── */}
      <section className="relative py-20 md:py-28 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div ref={setParallaxRef(1)} className="absolute inset-0">
            <img src={pageBg.p5} alt="" className="w-full h-full object-cover opacity-[0.04]" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-white to-background" />
        </div>
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold tracking-wider uppercase mb-4 border border-amber-200">
              {isBn ? "সকল প্যাকেজের জন্য সাধারণ" : "Common For All Packages"}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-primary font-hajj">
              {isBn ? "বিশেষ সেবাসমূহ" : "Special Services"}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {hajj2027Data.commonServices.map((svc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                whileHover={{ y: -3 }}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-slate-50"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0">
                    {serviceIconMap[i] || svc.icon}
                  </span>
                  <span className="text-sm text-slate-600 leading-relaxed">
                    {isBn ? svc.bn : svc.en}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INCLUSIONS / EXCLUSIONS ─── */}
      <section className="relative py-20 md:py-28 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div ref={setParallaxRef(2)} className="absolute inset-0">
            <img src={pageBg.p3} alt="" className="w-full h-full object-cover opacity-[0.03]" />
          </div>
        </div>
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-bold tracking-wider uppercase mb-4 border border-green-200">
              {isBn ? "সেবার বিবরণী ও শর্তাবলি" : "Service Details & Terms"}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-primary font-hajj">
              {isBn ? "প্যাকেজে কী কী থাকছে" : "What's In The Package"}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-green-100"
            >
              <h3 className="text-base font-bold text-green-600 mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-green-600"><Check size={14} /></span>
                {isBn ? "প্যাকেজে অন্তর্ভুক্ত" : "Included"}
              </h3>
              <ul className="space-y-2">
                {(isBn ? hajj2027Data.included.bn : hajj2027Data.included.en).map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-start gap-2.5 text-sm text-slate-600"
                  >
                    <span className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5 text-green-600"><Check size={8} /></span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-red-100"
            >
              <h3 className="text-base font-bold text-red-600 mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-red-600"><X size={14} /></span>
                {isBn ? "অন্তর্ভুক্ত নয়" : "Not Included"}
              </h3>
              <ul className="space-y-2">
                {(isBn ? hajj2027Data.excluded.bn : hajj2027Data.excluded.en).map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-start gap-2.5 text-sm text-slate-600"
                  >
                    <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5 text-red-500"><X size={8} /></span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 shadow-sm"
          >
            <h3 className="text-base font-bold text-amber-800 mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-amber-200 flex items-center justify-center text-amber-700"><FileText size={14} /></span>
              {isBn ? "শর্তাবলি" : "Terms & Conditions"}
            </h3>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {(isBn ? hajj2027Data.terms.bn : hajj2027Data.terms.en).map((term, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-2.5 text-sm text-amber-900 bg-white/70 rounded-xl p-3.5 border border-amber-100"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-[9px] font-bold text-amber-700 shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{term}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── PACKING LISTS ─── */}
      <section className="relative py-20 md:py-28 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div ref={setParallaxRef(3)} className="absolute inset-0">
            <img src={pageBg.p6} alt="" className="w-full h-full object-cover opacity-[0.04]" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-white to-background" />
        </div>
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wider uppercase mb-4 border border-blue-200">
              {isBn ? "যা সাথে নিতে হবে" : "What To Pack"}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-primary font-hajj">
              {isBn ? "প্রয়োজনীয় মালামালের তালিকা" : "Essential Packing List"}
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2.5 mb-5">
            {(["hajj", "umrah"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => { setPackingTab(tab); setGenderTab("men"); }}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  packingTab === tab
                    ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                    : "bg-white text-slate-500 border border-slate-200 hover:border-primary/30 hover:text-primary"
                }`}
              >
                {tab === "hajj" ? (isBn ? "হজ" : "Hajj") : isBn ? "ওমরাহ" : "Umrah"}
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-2 mb-6">
            {(["men", "women"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setGenderTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  genderTab === tab
                    ? "bg-primary-container text-white shadow-md"
                    : "bg-white text-slate-400 border border-slate-200 hover:border-primary/30"
                }`}
              >
                {tab === "men" ? (isBn ? "পুরুষ" : "Men") : isBn ? "মহিলা" : "Women"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${packingTab}-${genderTab}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
                <div className={`bg-gradient-to-r ${packingTab === "hajj" ? "from-primary to-primary-container" : "from-emerald-600 to-emerald-700"} p-5`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl text-white/80">{packingTab === "hajj" ? <Building size={24} /> : <Building2 size={24} />}</span>
                    <div>
                      <h3 className="text-white font-bold text-lg">
                        {packingTab === "hajj"
                          ? isBn ? "হজ যাত্রীদের জন্য" : "For Hajj Pilgrims"
                          : isBn ? "ওমরাহ যাত্রীদের জন্য" : "For Umrah Pilgrims"}
                        {" — "}
                        {genderTab === "men"
                          ? isBn ? "পুরুষ" : "Men"
                          : isBn ? "মহিলা" : "Women"}
                      </h3>
                      <p className="text-white/60 text-xs mt-0.5">
                        {isBn ? "প্রয়োজনীয় জিনিসপত্রের তালিকা" : "List of essential items"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {(
                      packingTab === "hajj"
                        ? genderTab === "men"
                          ? isBn ? hajj2027Data.hajjPacking.men.bn : hajj2027Data.hajjPacking.men.en
                          : isBn ? hajj2027Data.hajjPacking.women.bn : hajj2027Data.hajjPacking.women.en
                        : genderTab === "men"
                          ? isBn ? hajj2027Data.umrahPacking.men.bn : hajj2027Data.umrahPacking.men.en
                          : isBn ? hajj2027Data.umrahPacking.women.bn : hajj2027Data.umrahPacking.women.en
                    ).map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.02 }}
                        className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-xl text-sm text-slate-600"
                      >
                        <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[9px] text-primary font-bold shrink-0">
                          {i + 1}
                        </span>
                        {item}
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-100">
                    <h4 className="text-sm font-bold text-amber-700 mb-3 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600"><Star size={10} /></span>
                      {isBn ? "অন্যান্য প্রয়োজনীয় জিনিস" : "Other Essentials"}
                    </h4>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {(
                        packingTab === "hajj"
                          ? isBn ? hajj2027Data.hajjPacking.both.bn : hajj2027Data.hajjPacking.both.en
                          : isBn ? hajj2027Data.umrahPacking.both.bn : hajj2027Data.umrahPacking.both.en
                      ).map((item, i) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, scale: 0.92 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 + i * 0.02 }}
                          className="flex items-center gap-2.5 p-2.5 bg-amber-50 rounded-xl text-sm text-amber-800"
                        >
                          <span className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center text-[9px] text-amber-700 font-bold shrink-0">
                            {i + 1}
                          </span>
                          {item}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ─── CONTACT CTA ─── */}
      <section className="relative py-24 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img src={pageBg.p7} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-primary/95" />
          <div className="absolute inset-0 opacity-[0.04] islamic-pattern" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-accent-gold text-xs font-bold tracking-[0.25em] uppercase mb-5 border border-white/10">
              {isBn ? "যোগাযোগ" : "Contact"}
            </span>

            <h2 className="text-3xl md:text-5xl font-bold text-white font-hajj mb-6 drop-shadow-xl">
              {isBn ? "আজই আপনার যাত্রা শুরু করুন" : "Start Your Journey Today"}
            </h2>
            <p className="text-white/70 mb-10 max-w-lg mx-auto leading-relaxed">
              {isBn
                ? "আপনার পবিত্র হজ্জ যাত্রা শুরু করতে এখনই আমাদের সাথে যোগাযোগ করুন।"
                : "Contact us now to begin your sacred Hajj journey."}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-10">
              {(isBn ? hajj2027Data.contacts.bn : hajj2027Data.contacts.en).map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/15 transition-all"
                >
                  <p className="text-[10px] text-accent-gold/80 font-bold mb-1 tracking-wider uppercase">{c.label}</p>
                  <p className="text-sm text-white font-medium">{c.value}</p>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="https://wa.me/8801879216736"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex h-13 items-center justify-center rounded-full bg-accent-gold text-primary px-9 font-bold text-sm hover:brightness-110 transition-all shadow-2xl shadow-accent-gold/25"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="mr-2"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771z"/></svg>
              {isBn ? "WhatsApp-এ কথা বলুন" : "Chat on WhatsApp"}
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
