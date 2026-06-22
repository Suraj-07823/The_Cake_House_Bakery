import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import Features from "@/components/Features";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Menu />
        
        <Features />

        {/* CTA Section */}
        <section className="py-24 px-6 bg-accent text-white">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-black mb-8">
              Celebrate Your Special Moments With Us
            </h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
               Whether it&apos;s a wedding, birthday, or just a Tuesday – we&apos;ve got the perfect 
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
