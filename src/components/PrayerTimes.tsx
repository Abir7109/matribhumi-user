/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Clock } from "lucide-react";
import { useTranslation } from "../lib/TranslationContext";
import { useState, useEffect } from "react";

interface PrayerTimeData {
  label: string;
  time: string;
}

export default function PrayerTimes() {
  const { t, language } = useTranslation();
  const [times, setTimes] = useState<PrayerTimeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch('/api/prayer-times');
        if (response.ok) {
          const data = await response.json();
          const formattedTimes = [
            { label: language === "bn" ? "ফাজর" : "FAJR", time: data.fajr },
            { label: language === "bn" ? "সূর্যোদয়" : "SUNRISE", time: data.sunrise },
            { label: language === "bn" ? "যোহর" : "DHUHR", time: data.duhr },
            { label: language === "bn" ? "আসর" : "ASR", time: data.asr },
            { label: language === "bn" ? "আসর (হাফি)" : "ASR (HANAFI)", time: data.asrHanafi },
            { label: language === "bn" ? "মাগরিব" : "MAGHRIB", time: data.maghrib },
            { label: language === "bn" ? "এশা" : "ISHA", time: data.isha },
          ];
          setTimes(formattedTimes);
        }
      } catch (error) {
        console.error('Failed to fetch prayer times:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrayerTimes();
  }, [language]);

  return (
    <motion.aside 
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed right-3 top-1/3 z-40 hidden xl:flex flex-col gap-2 p-4 rounded-xl bg-white/95 backdrop-blur-sm shadow-xl border border-primary/5"
    >
      <div className="flex items-center gap-2 text-primary border-b border-primary/5 pb-2 mb-1">
        <Clock size={14} />
        <span className="text-[9px] uppercase tracking-widest font-black">
          {language === "bn" ? "ঢাকা টাইম" : "Dhaka Time"}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {loading ? (
          <div className="flex justify-center py-2">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : times.length === 0 ? (
          <div className="text-center py-2 text-[10px] text-slate-400">
            {language === "bn" ? "লোড হচ্ছে..." : "Loading..."}
          </div>
        ) : (
          times.map((item, idx) => (
            <div key={item.label} className={`flex justify-between items-center gap-4 group transition-all ${idx === 3 ? "text-primary font-boldScale-110" : "text-slate-400"}`}>
              <span className="text-[8px] font-black tracking-wider group-hover:text-primary transition-colors">{item.label}</span>
              <span className="font-bold text-xs tracking-tight">{item.time}</span>
            </div>
          ))
        )}
      </div>
    </motion.aside>
  );
}
