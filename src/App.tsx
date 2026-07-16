/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Services from "./components/Services";
import Booking from "./components/Booking";
import PrayerTimes from "./components/PrayerTimes";
import PackageDetails from "./components/PackageDetails";
import StepDetail from "./components/StepDetail";
import Hajj2027Page from "./components/Hajj2027Page";
import Hajj2027Popup from "./components/Hajj2027Popup";
import Dashboard from "./components/admin/Dashboard";
import { motion, AnimatePresence } from "motion/react";
import { PackageData } from "./types";
import { TranslationProvider } from "./lib/TranslationContext";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <TranslationProvider>
        <AppContent />
      </TranslationProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const [activeScreen, setActiveScreen] = useState("home");
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null);
  const [selectedStep, setSelectedStep] = useState<"advice" | "documents" | "booking" | "travel" | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showHajjPopup, setShowHajjPopup] = useState(false);

  useEffect(() => {
    // Check if we're on the admin route
    const path = window.location.pathname;
    setIsAdmin(path === '/admin' || path.startsWith('/admin/'));
    
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const popupTimer = setTimeout(() => setShowHajjPopup(true), 2000);
      return () => clearTimeout(popupTimer);
    }
  }, [isLoading]);

  const handlePackageSelect = (pkg: PackageData) => {
    setSelectedPackage(pkg);
    setActiveScreen("package-details");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStepSelect = (stepId: "advice" | "documents" | "booking" | "travel") => {
    setSelectedStep(stepId);
    setActiveScreen("step-detail");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case "home": return <Home onPackageSelect={handlePackageSelect} onStepSelect={handleStepSelect} onAlbumOpenChange={setIsAlbumOpen} onScreenChange={setActiveScreen} />;
      case "services": return <Services onScreenChange={setActiveScreen} />;
      case "hajj-2027": return <Hajj2027Page />;
      case "contact": return <Booking onBack={() => setActiveScreen("home")} />;
      case "package-details": 
        return selectedPackage ? (
          <PackageDetails 
            packageData={selectedPackage} 
            onBack={() => setActiveScreen("home")} 
          />
        ) : <Home onPackageSelect={handlePackageSelect} onStepSelect={handleStepSelect} />;
      case "step-detail":
        return selectedStep ? (
          <StepDetail 
            stepId={selectedStep} 
            onBack={() => setActiveScreen("home")} 
          />
        ) : <Home onPackageSelect={handlePackageSelect} onStepSelect={handleStepSelect} />;
      default: return <Home onPackageSelect={handlePackageSelect} onStepSelect={handleStepSelect} onAlbumOpenChange={setIsAlbumOpen} />;
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-primary text-white p-4 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 islamic-pattern scale-150 origin-center"
          style={{
            animation: 'backgroundDrift 60s linear infinite'
          }}
        />

        {/* Floating Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-24 h-24 rounded-full bg-accent-gold/5 blur-3xl"
              animate={{
                x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/20 shadow-2xl">
              <svg viewBox="0 0 24 24" className="w-12 h-12 text-accent-gold fill-current drop-shadow-lg" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-15c-3.86 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
              </svg>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold font-hajj mb-3 tracking-tight">
              মাতৃভূমি হজ্জ কাফেলা
            </h1>
            <p className="text-accent-gold/60 font-arabic text-xl mb-8 tracking-[0.2em]">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </p>
          </motion.div>

          <div className="w-48 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10 relative">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-gold/40 via-accent-gold to-accent-gold/40"
              style={{
                boxShadow: '0 0 15px rgba(255, 224, 143, 0.5)'
              }}
            />
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-6 text-[10px] uppercase tracking-[0.3em] font-black text-white/30"
          >
            Loading Spiritual Journey
          </motion.p>
        </div>

        <style>{`
          @keyframes backgroundDrift {
            from { background-position: 0 0; }
            to { background-position: 1000px 1000px; }
          }
        `}</style>
      </div>
    );
  }

  // Render admin dashboard
  if (isAdmin) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#00526a] selection:text-white">
      <div className={`transition-all duration-300 ${isAlbumOpen ? 'opacity-0 pointer-events-none -translate-y-full' : 'opacity-100 pointer-events-auto translate-y-0'}`}>
        <Navigation activeScreen={activeScreen} onScreenChange={setActiveScreen} />
      </div>
      <PrayerTimes />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onScreenChange={setActiveScreen} />

      {/* Floating Action WhatsApp Button */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-4">
        <motion.a 
          href="https://wa.me/8801879216736"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:brightness-110 shadow-[#25D366]/30 group relative"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.747-2.874-2.512-2.96-2.626-.087-.115-.708-.941-.708-1.797 0-.856.448-1.274.607-1.446.16-.171.347-.214.464-.214.117 0 .234.005.334.01.109.004.254-.042.398.304.144.346.491 1.2.534 1.288.043.087.072.188.014.304-.058.115-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.45 1.15.966 1.61.666.594 1.232.782 1.405.869.174.087.274.072.376-.043.101-.116.433-.506.549-.68.115-.173.231-.144.39-.086.158.058 1.011.477 1.184.564.173.087.289.129.332.202.043.073.043.423-.101.827z"></path></svg>
          <span className="absolute left-full ml-3 bg-white text-[#00526a] px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-primary/5">WhatsApp Chat</span>
        </motion.a>
      </div>

      {/* Hajj 2027 Popup */}
      <Hajj2027Popup
        open={showHajjPopup}
        onClose={() => setShowHajjPopup(false)}
        onGoToHajj2027={() => setActiveScreen("hajj-2027")}
      />
    </div>
  );
}

