import React, { useState } from "react";
import { useTranslation } from "../lib/TranslationContext";

export default function Logo({ className = "" }: { className?: string }) {
  const { language } = useTranslation();
  const [imgSrc, setImgSrc] = useState("input_file_0.png");
  const [isBroken, setIsBroken] = useState(false);

  const handleImageError = () => {
    if (imgSrc === "input_file_0.png") {
      setImgSrc("/input_file_0.png");
    } else {
      setIsBroken(true);
    }
  };

  return (
    <div className={`flex items-center gap-2 md:gap-4 group cursor-pointer ${className}`}>
      {!isBroken && (
        <img 
          src={imgSrc} 
          alt="Matribhumi Hajj Kafela" 
          className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
          onError={handleImageError}
          referrerPolicy="no-referrer"
        />
      )}
      
      {/*
         Always show the text as a secondary element or primary if image fails.
         Using the specific color from their logo (#00526A).
      */}
      <div className={`flex flex-col ${!isBroken ? "border-l border-slate-200 pl-3 md:pl-4 hidden sm:flex" : ""}`}>
        <span className="text-base md:text-xl font-bold text-[#00526A] leading-tight font-hajj whitespace-nowrap">
          {language === "bn" ? "মাতৃভূমি হজ্জ কাফেলা" : "Matribhumi Hajj Kafela"}
        </span>
        <span className="text-[8px] md:text-[10px] font-medium text-slate-500 tracking-wide hidden md:block">
          {language === "bn" ? "হজ্জ লাইসেন্স নং-৩৪৭ | ওমরাহ লাইসেন্স নং-৪৬৫" : "Hajj License No-347 | Umrah License No-465"}
        </span>
        <span className="text-[7px] md:text-[9px] font-medium text-slate-400 uppercase tracking-widest hidden lg:block truncate max-w-[280px]">
          {language === "bn" ? "মুফতি মোঃ আখতার হোসাইন (প্রতিষ্ঠাতা প্রিন্সিপাল)" : "Mufti Md. Akhtar Hossain (Founder Principal)"}
        </span>
      </div>
    </div>
  );
}
