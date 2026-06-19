import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import { Sparkles, Heart, Palette } from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Menu />
        
        {/* Features Section */}
        <section className="py-24 px-6 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-xl font-serif font-bold text-espresso">Fresh & Homemade</h3>
                <p className="mt-4 text-espresso/60 leading-relaxed">
                  Baked fresh daily with premium, locally sourced organic ingredients.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 bg-accent-soft/10 rounded-2xl flex items-center justify-center text-accent-soft mb-6">
                  <Heart size={32} />
                </div>
                <h3 className="text-xl font-serif font-bold text-espresso">Made with Love</h3>
                <p className="mt-4 text-espresso/60 leading-relaxed">
                  Every creation is a labor of love, prepared with meticulous care.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6">
                  <Palette size={32} />
                </div>
                <h3 className="text-xl font-serif font-bold text-espresso">Custom Designs</h3>
                <p className="mt-4 text-espresso/60 leading-relaxed">
                  Have a vision? We bring your dream cakes to life for any occasion.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-accent text-white">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-black mb-8">
              Celebrate Your Special Moments With Us
            </h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
               Whether it's a wedding, birthday, or just a Tuesday – we've got the perfect 
               treat waiting for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
               <button className="px-10 py-4 bg-espresso text-white rounded-full font-bold shadow-xl hover:bg-white hover:text-espresso transition-all">
                  Order on WhatsApp
               </button>
               <button className="px-10 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all">
                  View Gallery
               </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
