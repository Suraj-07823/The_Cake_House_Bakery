"use client";

import { motion, type Variants } from "framer-motion";
import { Sparkles, Heart, Palette } from "lucide-react";

const features = [
  {
    icon: <Sparkles size={32} />,
    title: "Fresh & Homemade",
    description: "Baked fresh daily with premium, locally sourced organic ingredients.",
    bgColor: "bg-accent/10",
    textColor: "text-accent",
  },
  {
    icon: <Heart size={32} />,
    title: "Made with Love",
    description: "Every creation is a labor of love, prepared with meticulous care.",
    bgColor: "bg-accent-soft/10",
    textColor: "text-accent-soft",
  },
  {
    icon: <Palette size={32} />,
    title: "Custom Designs",
    description: "Have a vision? We bring your dream cakes to life for any occasion.",
    bgColor: "bg-accent/10",
    textColor: "text-accent",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Features() {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="flex flex-col items-center text-center group"
            >
              <div className={`h-20 w-20 ${feature.bgColor} rounded-3xl flex items-center justify-center ${feature.textColor} mb-8 transition-transform duration-500 group-hover:rotate-12`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-serif font-bold text-espresso">{feature.title}</h3>
              <p className="mt-4 text-espresso/60 leading-relaxed max-w-xs">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
