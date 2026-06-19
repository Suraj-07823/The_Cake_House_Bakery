"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cake, Ruler, Calendar, CheckCircle, ChevronRight, ChevronLeft, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

const FLAVORS = [
  { id: "chocolate", name: "Rich Chocolate", image: "/brand/hero.png" },
  { id: "vanilla", name: "Classic Vanilla", image: "/brand/hero.png" },
  { id: "red-velvet", name: "Red Velvet", image: "/brand/hero.png" },
  { id: "strawberry", name: "Fresh Strawberry", image: "/brand/hero.png" },
];

const SIZES = [
  { id: "0.5kg", name: "0.5 kg", desc: "Perfect for 4-6 people" },
  { id: "1kg", name: "1.0 kg", desc: "Great for 8-10 people" },
  { id: "2kg", name: "2.0 kg", desc: "Large party for 15-20 people" },
  { id: "tiered", name: "Multi-Tiered", desc: "Wedding & Big Events" },
];

export default function CustomOrderPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    flavor: "",
    size: "",
    date: "",
    details: "",
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = () => {
    const message = `Hi! I want to order a custom cake:
- Flavor: ${formData.flavor}
- Size: ${formData.size}
- Date: ${formData.date}
- Notes: ${formData.details}`;
    
    window.open(`https://wa.me/919822316064?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="bg-warm-cream min-h-screen">
      <Navbar />
      <main className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-4xl text-center mb-12">
           <h1 className="text-4xl md:text-6xl font-serif font-black text-espresso mb-4">Build Your Dream Cake</h1>
           <p className="text-espresso/60">Follow our simple steps to personalize your celebration.</p>
        </div>

        {/* Step Progress Bar */}
        <div className="mx-auto max-w-2xl flex items-center justify-between mb-16 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-espresso/5 -translate-y-1/2 -z-10" />
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                step >= s ? "bg-accent text-white scale-110 shadow-lg" : "bg-white text-espresso/20"
              }`}
            >
              {step > s ? <CheckCircle size={20} /> : s}
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-3xl bg-white rounded-3xl p-8 md:p-12 premium-shadow min-h-[400px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3 text-2xl font-serif text-espresso font-bold">
                  <Cake className="text-accent" /> Choose Your Flavor
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {FLAVORS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => { setFormData({ ...formData, flavor: f.name }); nextStep(); }}
                      className={`group relative aspect-square rounded-2xl overflow-hidden border-4 transition-all ${
                        formData.flavor === f.name ? "border-accent scale-95" : "border-transparent"
                      }`}
                    >
                      <Image src={f.image} alt={f.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-2">
                        <span className="text-white font-bold text-xs md:text-sm text-center">{f.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3 text-2xl font-serif text-espresso font-bold">
                  <Ruler className="text-accent" /> Select Your Size
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SIZES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => { setFormData({ ...formData, size: s.name }); nextStep(); }}
                      className={`p-6 rounded-2xl border-2 text-left transition-all ${
                        formData.size === s.name ? "border-accent bg-accent/5 ring-4 ring-accent/10" : "border-espresso/10 hover:border-accent/40"
                      }`}
                    >
                      <h4 className="text-xl font-bold text-espresso">{s.name}</h4>
                      <p className="text-sm text-espresso/50 mt-1">{s.desc}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3 text-2xl font-serif text-espresso font-bold">
                  <Calendar className="text-accent" /> Date & Final Details
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-espresso/60 mb-2 uppercase tracking-wider">Delivery/Pick-up Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full p-4 rounded-xl border border-espresso/10 focus:ring-2 focus:ring-accent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-espresso/60 mb-2 uppercase tracking-wider">Special Requests (Theme, Name, Colors)</label>
                    <textarea
                      rows={4}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="e.g. Write 'Happy Birthday Suraj' in blue icing with clouds theme..."
                      className="w-full p-4 rounded-xl border border-espresso/10 focus:ring-2 focus:ring-accent outline-none font-sans"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-12 flex items-center justify-between border-t border-espresso/5 pt-8">
            {step > 1 ? (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 text-espresso/60 hover:text-espresso font-bold transition-all"
              >
                <ChevronLeft /> Back
              </button>
            ) : <div />}

            {step === 3 ? (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-espresso text-white px-8 py-3 rounded-full font-bold shadow-xl hover:bg-accent hover:scale-105 transition-all"
              >
                Send Order to WhatsApp <Send size={18} />
              </button>
            ) : (
                <button
                    onClick={nextStep}
                    disabled={step === 1 && !formData.flavor || step === 2 && !formData.size}
                    className="flex items-center gap-2 bg-accent text-white px-8 py-3 rounded-full font-bold shadow-xl hover:bg-espresso disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    Next Step <ChevronRight size={18} />
                </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
