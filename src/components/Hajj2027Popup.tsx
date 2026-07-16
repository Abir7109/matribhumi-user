import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "../lib/TranslationContext";

interface Props {
  open: boolean;
  onClose: () => void;
  onGoToHajj2027: () => void;
}

export default function Hajj2027Popup({ open, onClose, onGoToHajj2027 }: Props) {
  const { language } = useTranslation();
  const isBn = language === "bn";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        >
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* modal */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-lg w-full bg-gradient-to-br from-slate-900 via-primary to-slate-900 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10"
          >
            {/* bg image layer */}
            <div className="absolute inset-0 opacity-20">
              <img src="/hajj-assets/The-Kaaba.jpg" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/60" />
            </div>

            {/* close btn */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="relative z-[1] p-6 md:p-8 text-center">
              {/* badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, type: "spring", damping: 15 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-gold/20 border border-accent-gold/30 mb-5"
              >
                <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse-ring" />
                <span className="text-accent-gold text-xs font-bold tracking-[0.2em] uppercase">
                  {isBn ? "নতুন" : "NEW"}
                </span>
              </motion.div>

              {/* Arabic */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="font-arabic text-3xl md:text-4xl text-accent-gold/80 mb-4"
              >
                حَجّ الْإِسْلَام
              </motion.p>

              {/* title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="text-2xl md:text-3xl font-bold text-white font-hajj mb-3"
              >
                {isBn ? "হজ্জ প্যাকেজ ২০২৭" : "Hajj Package 2027"}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm mx-auto"
              >
                {isBn
                  ? "৫,৭৫,০০০ টাকা থেকে শুরু — ৪টি প্যাকেজ, সরাসরি ফ্লাইট, অভিজ্ঞ আলেমের গাইডলাইন ও ডি ক্যাটাগরি তাঁবু। এখনই রেজিস্ট্রেশন করুন!"
                  : "Starting from 5,75,000 BDT — 4 packages, direct flights, expert guidance & Category D tents. Register now!"}
              </motion.p>

              {/* cta */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="space-y-3"
              >
                <button
                  onClick={() => { onGoToHajj2027(); onClose(); }}
                  className="w-full h-13 rounded-full bg-gradient-to-r from-accent-gold to-amber-500 text-primary font-bold text-sm shadow-xl shadow-accent-gold/30 hover:brightness-110 transition-all active:scale-[0.98]"
                >
                  {isBn ? "বিস্তারিত দেখুন" : "View Details"}
                </button>
                <button
                  onClick={onClose}
                  className="text-white/40 hover:text-white/70 text-xs font-medium transition-colors"
                >
                  {isBn ? "পরে দেখব" : "Maybe later"}
                </button>
              </motion.div>

              {/* decorative divider */}
              <div className="mt-6 flex items-center justify-center gap-3">
                <span className="w-8 h-px bg-white/10" />
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold/50" />
                <span className="w-8 h-px bg-white/10" />
              </div>
              <p className="mt-3 text-[10px] text-white/20 tracking-widest uppercase">
                مَطْرِبْهُومِي حَجِّ كَافِلَة
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
