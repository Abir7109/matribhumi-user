/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { MessageCircle, Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "../lib/TranslationContext";

import Logo from "./Logo";

interface NavigationProps {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
}

export default function Navigation({ activeScreen, onScreenChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, setLanguage } = useTranslation();

  const navLinks = [
    { label: t("nav.home"), screen: "home", action: () => { onScreenChange("home"); window.scrollTo({ top: 0, behavior: "smooth" }); } },
    { label: t("nav.packages"), screen: "home", action: () => { onScreenChange("home"); setTimeout(() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" }), 100); } },
    { label: t("nav.services"), screen: "services", action: () => onScreenChange("services") },
    { label: t("nav.contact"), screen: "contact", action: () => onScreenChange("contact") },
  ];

  return (
    <>
      {/* Announcement Strip */}
      <div className="w-full relative z-[61] bg-primary shadow-inner">
        <div className="max-w-7xl mx-auto text-[11px] md:text-[12px] font-medium text-center py-1.5 px-4 text-white flex items-center justify-center gap-2">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-accent-gold"
          />
          <span className="font-hajj">
            {language === "bn" 
              ? "২০২৭ সালের হজ্জ ও ওমরাহ প্যাকেজের জন্য প্রি-রেজিস্ট্রেশন চলছে। সীমিত আসন!" 
              : "Pre-registration for 2027 Hajj & Umrah packages is open. Limited seats!"}
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-[60] bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <nav className="flex justify-between items-center px-4 md:px-6 py-2.5 max-w-7xl mx-auto">
          <div 
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => { onScreenChange("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            <Logo />
          </div>

          <div className="hidden lg:flex items-center gap-8 text-[14px] font-medium">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.action}
                className={`transition-all duration-300 relative py-1 ${
                  activeScreen === link.screen 
                  ? "text-primary font-bold" 
                  : "text-slate-600 hover:text-primary"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 lg:gap-5">
            <button 
              onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
              className="flex items-center gap-1.5 text-slate-600 font-bold text-xs hover:text-primary transition-colors bg-slate-100 px-3 py-1.5 rounded-full"
            >
              <Globe size={14} />
              <span className="hidden sm:inline">{language === "bn" ? "English" : "বাংলা"}</span>
            </button>
            
            <a
              href="https://wa.me/8801879216736"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex bg-primary text-white px-5 py-2 rounded-full font-bold text-xs items-center gap-2 hover:bg-primary-container transition-all shadow-sm active:scale-95"
            >
              <MessageCircle size={14} />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            <button 
              className="lg:hidden text-primary p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg border-b border-slate-100 shadow-xl p-5"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    link.action();
                    setIsMenuOpen(false);
                  }}
                  className={`text-left text-base py-1.5 ${activeScreen === link.screen ? "text-primary font-bold" : "text-slate-600"}`}
                >
                  {link.label}
                </button>
              ))}
              {/* Extra mobile menu footer - hidden on Android/small mobile to prevent layout issues */}
              <div className="hidden sm:flex items-center gap-3 mt-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
                  className="flex items-center gap-2 text-slate-600 font-bold text-sm hover:text-primary transition-colors"
                >
                  <Globe size={16} />
                  {language === "bn" ? "English" : "বাংলা"}
                </button>

                <a
                  href="https://wa.me/8801879216736"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-primary-container transition-all shadow-sm"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </header>
    </>
  );
}
