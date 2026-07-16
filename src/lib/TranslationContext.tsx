/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "bn" | "en";

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  bn: {
    "nav.home": "মূল পাতা",
    "nav.services": "সেবাসমূহ",
    "nav.packages": "প্যাকেজ",
    "nav.contact": "যোগাযোগ",
    "nav.hajj2027": "হজ ২০২৭",
    "services.hero_title": "আমাদের সেবাসমূহ",
    "services.hero_subtitle": "আমরা শুধুমাত্র একটি ট্রাভেল এজেন্সি নই, আমরা আপনার সফরের সার্বক্ষণিক সঙ্গী।",
    "services.support_title": "২৪/৭ অনলাইন সাপোর্ট ও গাইডেন্স",
    "services.support_desc": "আপনার সফরের যেকোনো প্রয়োজনে আমাদের সার্ভিস সেন্টার সর্বদা উন্মুক্ত। আমরা বিশ্বাস করি প্রতিটি হাজী আল্লাহর মেহমান, আর তাদের খেদমত করা আমাদের ইবাদত।",
    "hero.title": "আপনার হজ্জ ও উমরাহ যাত্রায় বিশ্বস্ত সঙ্গী",
    "hero.subtitle": "মাতৃভূমি হজ্জ কাফেলা - গত ১৪+ বছর ধরে বিশ্বস্ততার সাথে খিদমত করে যাচ্ছে।",
    "hero.cta": "প্যাকেজ দেখুন",
    "stats.experience": "অভিজ্ঞতা",
    "stats.families": "সন্তুষ্ট পরিবার",
    "stats.visa": "ভিসা নিশ্চয়তা",
    "packages.title": "ওমরাহ প্যাকেজসমূহ (পবিত্র রমজান মাসসহ প্রতি মাসে)",
    "packages.subtitle": "আপনার সামর্থ্য ও প্রয়োজন অনুযায়ী ভিআইপি থেকে ইকোনমি পর্যন্ত সেরা প্যাকেজটি বেছে নিন।",
    "packages.details": "বিস্তারিত",
    "packages.book_now": "বুকিং করুন",
    "packages.booking": "বুকিং নিশ্চিত করুন",
    "booking.title": "বুকিং করার জন্য ফর্মটি পূরণ করুন",
    "booking.label_name": "আপনার পূর্ণ নাম",
    "booking.label_age": "বয়স",
    "booking.label_phone": "ফোন নম্বর (WhatsApp)",
    "booking.submit": "এখনই বুক করুন (WhatsApp)",
    "booking.whatsapp_msg": "আসসালামু আলাইকুম, আমি মাতৃভূমি হজ্জ কাফেলা থেকে *{package}* প্যাকেজটি বুক করতে আগ্রহী।\n\n*আমার তথ্য:*\n- নাম: {name}\n- বয়স: {age}\n- ফোন: {phone}",
    "common.back": "ফিরে যান",
    "common.per_person": "প্রতি জন",
    "details.itinerary": "ভ্রমণ পরিকল্পনা",
    "details.inclusions": "প্যাকেজের অন্তর্ভুক্ত",
    "details.exclusions": "প্যাকেজের অন্তর্ভুক্ত নয়",
    "details.pricing": "পেমেন্ট ব্রেকডাউন",
    "details.total": "মোট প্যাকেজ মূল্য",
    "footer.rights": "সর্বস্বত্ব সংরক্ষিত।",
    "testimonials.title": "সম্মানিত হাজীদের মতামত",
    "testimonials.subtitle": "মাতৃভূমি হজ্জ কাফেলার সাথে পবিত্র সফর শেষে হাজীদের বাস্তব অভিজ্ঞতা।",
    "testimonials.form_title": "আপনার অভিজ্ঞতা শেয়ার করুন",
    "testimonials.label_name": "আপনার নাম",
    "testimonials.label_location": "আপনার জেলা/শহর",
    "testimonials.label_rating": "রেটিং দিন",
    "testimonials.label_feedback": "আপনার মতামত",
    "testimonials.submit": "মতামত জমা দিন",
    "testimonials.success": "ধন্যবাদ! আপনার মতামত গৃহীত হয়েছে।",
    "prayer.times": "নামাজের সময়সূচী",
    "steps.advice.title": "পরামর্শ নিন",
    "steps.advice.detail": "আমাদের অভিজ্ঞ আলেম এবং হজ্জ গাইডদের প্যানেল আপনার সামর্থ্য ও ধর্মীয় বিশেষত্বের কথা বিবেচনা করে আপনাকে সঠিক প্যাকেজটি বেছে নিতে সাহায্য করবে। আমরা ব্যক্তিগত এবং গ্রুপ কাউন্সেলিং প্রদান করে থাকি।",
    "steps.advice.feature1": "আলেম প্যানেল",
    "steps.advice.feature2": "বাজেট প্ল্যানিং",
    "steps.documents.title": "কাগজপত্র জমা",
    "steps.documents.detail": "হজ্জ বা উমরাহ যাত্রার জন্য আপনার পাসপোর্ট (অন্তত ৬ মাস মেয়াদ), ৪ কপি ছবি (সাদা ব্যাকগ্রাউন্ড) এবং প্রয়োজনীয় ভ্যাকসিনেশন সার্টিফিকেট আমাদের অফিসে জমা দিন।",
    "steps.documents.feature1": "পাসপোর্ট প্রসেসিং",
    "steps.documents.feature2": "ভিসা আবেদন",
    "steps.booking.title": "বুকিং সম্পন্ন",
    "steps.booking.detail": "প্যাকেজ পছন্দের পর নির্দিষ্ট কন্টাক্ট সাইন করে বুকিং মানি জমা দিন। আপনি ব্যাংক ট্রান্সফার, কার্ড বা রকেট/বিকাশের মাধ্যমে পেমেন্ট করতে পারেন।",
    "steps.booking.feature1": "নিরাপদ পেমেন্ট",
    "steps.booking.feature2": "ইনস্ট্যান্ট কনফার্মেশন",
    "steps.travel.title": "পবিত্র যাত্রা",
    "steps.travel.detail": "নির্ধারিত তারিখে ঢাকা এয়ারপোর্ট থেকে আপনার গ্রুপ লিডারের সাথে যাত্রা শুরু হবে। আমরা ইন-ফ্লাইট এবং গ্রাউন্ড উভয় ক্ষেত্রেই আপনাদের সর্বোচ্চ স্বাচ্ছন্দ্য নিশ্চিত করি।",
    "steps.travel.feature1": "গ্রুপ গাইড",
    "steps.travel.feature2": "বিমানবন্দর সহায়তা",
  },
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.packages": "Packages",
    "nav.contact": "Contact",
    "nav.hajj2027": "Hajj 2027",
    "services.hero_title": "Our Services",
    "services.hero_subtitle": "We are not just a travel agency; we are your constant companion on your journey.",
    "services.support_title": "24/7 Online Support & Guidance",
    "services.support_desc": "Our service center is always open for any of your travel needs. We believe every pilgrim is a guest of Allah, and serving them is our worship.",
    "hero.title": "Your Trusted Companion for Hajj & Umrah",
    "hero.subtitle": "Matribhumi Hajj Kafela - Serving with trust for over 14+ years.",
    "hero.cta": "View Packages",
    "stats.title": "Our Achievements",
    "stats.experience": "Experience",
    "stats.families": "Happy Families",
    "stats.visa": "Visa Success",
    "packages.title": "Umrah Packages (Including Holy Ramadan, Every Month)",
    "packages.subtitle": "Choose the best package from VIP to Economy according to your needs and budget.",
    "packages.details": "Details",
    "packages.book_now": "Book Now",
    "packages.booking": "Confirm Booking",
    "booking.title": "Fill the form to Book",
    "booking.label_name": "Full Name",
    "booking.label_age": "Age",
    "booking.label_phone": "Phone Number (WhatsApp)",
    "booking.submit": "Book via WhatsApp",
    "booking.whatsapp_msg": "Assalamu Alaikum, I am interested in booking the *{package}* package from Matribhumi Hajj Kafela.\n\n*My Details:*\n- Name: {name}\n- Age: {age}\n- Phone: {phone}",
    "common.back": "Go Back",
    "common.per_person": "per person",
    "details.itinerary": "Itinerary",
    "details.inclusions": "Inclusions",
    "details.exclusions": "Exclusions",
    "details.pricing": "Payment Breakdown",
    "details.total": "Total Package Price",
    "footer.rights": "All rights reserved.",
    "testimonials.title": "Pilgrim Testimonials",
    "testimonials.subtitle": "Real experiences shared by pilgrims after their sacred journey with Matribhumi Hajj Kafela.",
    "testimonials.form_title": "Share Your Experience",
    "testimonials.label_name": "Your Name",
    "testimonials.label_location": "Location (City/District)",
    "testimonials.label_rating": "Select Rating",
    "testimonials.label_feedback": "Your Feedback",
    "testimonials.submit": "Submit Testimonial",
    "testimonials.success": "Thank you! Your testimonial has been received.",
    "prayer.times": "Prayer Times",
    "steps.advice.title": "Get Advice",
    "steps.advice.detail": "Our panel of experienced scholars and Hajj guides will help you choose the right package considering your budget and religious preferences. We offer both private and group counseling.",
    "steps.advice.feature1": "Scholar Panel",
    "steps.advice.feature2": "Budget Planning",
    "steps.documents.title": "Submit Documents",
    "steps.documents.detail": "Submit your passport (at least 6 months validity), 4 copies of white-background photos, and necessary vaccination certificates to our office.",
    "steps.documents.feature1": "Passport Support",
    "steps.documents.feature2": "Visa Filing",
    "steps.booking.title": "Complete Booking",
    "steps.booking.detail": "After choosing a package, sign the contact and deposit the booking money. You can pay via bank transfer, card, or mobile banking.",
    "steps.booking.feature1": "Secure Payment",
    "steps.booking.feature2": "Instant Confirmation",
    "steps.travel.title": "Sacred Journey",
    "steps.travel.detail": "Your journey will start from Dhaka Airport with your group leader on the scheduled date. We ensure your maximum comfort both in-flight and on the ground.",
    "steps.travel.feature1": "Group Leader",
    "steps.travel.feature2": "Airport Assist",
  }
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("bn");

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations["en"]] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
