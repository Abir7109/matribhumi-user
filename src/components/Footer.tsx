/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Facebook, 
  Youtube, 
  Instagram,
  Send
} from "lucide-react";
import { useTranslation } from "../lib/TranslationContext";
import Logo from "./Logo";

interface FooterProps {
  onScreenChange: (screen: string) => void;
}

export default function Footer({ onScreenChange }: FooterProps) {
  const { t, language } = useTranslation();

  const handleNavClick = (screen: string, sectionId?: string) => {
    onScreenChange(screen);
    if (sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#071520] border-t border-white/5 pt-12 mt-12 relative overflow-hidden">
      {/* Decorative Pattern Background for Footer */}
      <div className="absolute inset-0 opacity-5 pointer-events-none islamic-pattern"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-6 pb-12 max-w-7xl mx-auto relative z-10">
        <div className="col-span-1">
          <Logo className="mb-6" />
          <p className="text-white/60 text-xs md:text-sm leading-relaxed mb-8">
            {language === "bn" 
              ? "আপনার পবিত্র সফরের প্রতিটি মুহূর্তকে নিরাপদ ও স্বাচ্ছন্দ্যময় করতে আমরা অঙ্গীকারবদ্ধ। দীর্ঘ ১৪+ বছরের অভিজ্ঞতা ও বিশ্বস্ততা।" 
              : "We are committed to making every moment of your sacred journey safe and comfortable. 14+ years of experience and trust."}
          </p>
          <div className="flex gap-4">
            {[Globe, Facebook, Instagram, Youtube].map((Icon, idx) => (
              <motion.a
                key={idx}
                whileHover={{ scale: 1.1, backgroundColor: "#00526a", color: "#fff" }}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 transition-all shadow-sm"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon size={14} />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-base mb-6">{language === "bn" ? "গুরুত্বপূর্ণ লিঙ্ক" : "Quick Links"}</h4>
          <ul className="space-y-3 text-xs md:text-sm">
            {[
              { label: language === "bn" ? "হোম" : "Home", action: () => handleNavClick("home") },
              { label: language === "bn" ? "সার্ভিস" : "Services", action: () => handleNavClick("services") },
              { label: language === "bn" ? "যোগাযোগ" : "Contact", action: () => handleNavClick("contact") }
            ].map((link) => (
              <li key={link.label}>
                <button 
                  onClick={link.action}
                  className="text-white/50 hover:text-white transition-all block text-left"
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li className="pt-2">
              <button 
                onClick={() => handleNavClick("home", "packages")}
                className="text-accent-gold hover:text-white font-bold transition-all block text-left underline underline-offset-4"
              >
                {t("packages.title")}
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-base mb-6">{language === "bn" ? "যোগাযোগের ঠিকানা" : "Contact Information"}</h4>
          <ul className="space-y-4 text-white/50 text-xs md:text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="text-accent-gold shrink-0 mt-0.5" size={16} />
              <div>
                <p className="font-medium text-white/70">{language === "bn" ? "ঢাকা অফিস:" : "Dhaka Office:"}</p>
                <p>{language === "bn" ? "৫৫/বি পুরানা পল্টন, নোয়াখালী টাওয়ার, ঢাকা" : "55/B Purana Paltan, Noakhali Tower, Dhaka"}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="text-accent-gold shrink-0 mt-0.5" size={16} />
              <div>
                <p className="font-medium text-white/70">{language === "bn" ? "কুমিল্লা অফিস:" : "Cumilla Office:"}</p>
                <p>{language === "bn" ? "রানী বাজার, কুমিল্লা (পরিচালক: আব্দুল্লাহিল বাকী)" : "Rani Bazar, Cumilla (Director: Abdullahil Baki)"}</p>
                <p className="text-accent-gold">{language === "bn" ? "মোবাইল: ০১৭১১-৭৮০৯৪৮" : "Mobile: 01711-780948"}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="text-accent-gold shrink-0 mt-0.5" size={16} />
              <div>
                <p className="font-medium text-white/70">{language === "bn" ? "চান্দিনা অফিস:" : "Chandina Office:"}</p>
                <p>{language === "bn" ? "ধানসিঁড়ি, চান্দিনা, কুমিল্লা" : "Dhanshiri, Chandina, Cumilla"}</p>
                <p className="text-accent-gold">{language === "bn" ? "মোবাইল: ০১৮৭৭-৭৬১১০৫, ০১৮৭৭-৭৬১১২২" : "Mobile: 01877-761105, 01877-761122"}</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-accent-gold shrink-0" size={16} />
              <div>
                <p className="font-medium text-white/70">{language === "bn" ? "চেয়ারম্যান (সরাসরি):" : "Chairman (Direct):"}</p>
                <a href="tel:+8801879216736" className="hover:text-white transition-colors text-accent-gold">{language === "bn" ? "০১৮৭৯-২১৬৭৩৬" : "01879-216736"}</a>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-base mb-6">{language === "bn" ? "নিউজলেটার" : "Newsletter"}</h4>
          <p className="text-white/50 text-xs mb-4">{language === "bn" ? "নতুন প্যাকেজ ও হজ্জ সংক্রান্ত তথ্যের জন্য সাবস্ক্রাইব করুন।" : "Subscribe for latest packages and Hajj updates."}</p>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 focus-within:border-primary transition-all">
            <input 
              className="bg-transparent border-none text-white rounded-l-lg w-full px-3 text-xs focus:ring-0 placeholder:text-white/20" 
              placeholder={language === "bn" ? "আপনার ইমেইল..." : "Your email..."}
              type="email"
            />
            <button className="bg-primary text-white p-2.5 rounded-lg hover:bg-primary-container transition-all shadow-lg active:scale-95">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left relative z-10">
        <span className="text-white/30 text-[10px] md:text-xs">© ২০২৭ মাতৃভূমি হজ্ব ও ওমরাহ কাফেলা। {t("footer.rights")}</span>
        <div className="flex gap-6 text-white/30 text-[10px] md:text-xs font-medium">
          <a className="hover:text-white transition-colors" href="#">{language === "bn" ? "প্রাইভেসি" : "Privacy"}</a>
          <a className="hover:text-white transition-colors" href="#">{language === "bn" ? "কুকিজ" : "Cookies"}</a>
          <a className="hover:text-white transition-colors" href="#">{language === "bn" ? "সহায়তা" : "Help"}</a>
        </div>
      </div>
    </footer>
  );
}
