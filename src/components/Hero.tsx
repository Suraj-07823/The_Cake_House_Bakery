"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden pt-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 md:flex-row md:gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 flex-1 py-12 text-center md:text-left"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block rounded-full bg-accent/10 px-4 py-1 text-sm font-bold tracking-wider text-accent uppercase"
          >
            Handcrafted with Heart
          </motion.span>
          <h1 className="mt-6 text-5xl font-serif font-black leading-[1.1] text-espresso md:text-7xl">
            Baked Fresh Daily, <br />
            <span className="text-accent italic">Crafted With Love.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-espresso/70 leading-relaxed mx-auto md:mx-0">
            From our oven to your doorstep. Experience the finest artisanal cakes, 
            pastries, and breads made with premium organic ingredients and a pinch of magic.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <button className="rounded-full bg-accent px-8 py-4 text-white shadow-lg transition-all hover:bg-espresso hover:shadow-xl active:scale-95">
              View Today's Menu
            </button>
            <button className="rounded-full border-2 border-espresso/20 bg-transparent px-8 py-4 text-espresso transition-all hover:border-espresso active:scale-95">
              Our Story
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="relative flex-1 py-12"
        >
          <div className="relative aspect-square w-full max-w-[500px] overflow-hidden rounded-[30%_70%_70%_30%/_30%_30%_70%_70%] bg-accent/5 premium-shadow mx-auto">
            <Image
              src="/brand/hero.png"
              alt="Artisanal Signature Cake"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Floating Accents */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -right-4 top-1/4 hidden md:block"
          >
            <div className="rounded-2xl bg-white/80 p-4 shadow-xl backdrop-blur-sm">
                <span className="block text-2xl">🍰</span>
                <span className="mt-2 block text-xs font-bold text-espresso uppercase">Signature Series</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Background Decorative Circles */}
      <div className="absolute right-[-10%] top-[-10%] -z-10 h-80 w-80 rounded-full bg-accent/10 blur-[100px]" />
      <div className="absolute left-[-5%] bottom-[10%] -z-10 h-60 w-60 rounded-full bg-accent-soft/10 blur-[80px]" />
    </section>
  );
}
