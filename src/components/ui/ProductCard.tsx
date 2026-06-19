"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-2xl bg-white p-4 premium-shadow transition-all"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-warm-cream">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="mt-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-serif font-bold text-espresso">{product.name}</h3>
          <p className="mt-1 text-sm text-espresso/60 line-clamp-2">{product.description}</p>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-accent">₹{product.price}</span>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white transition-all hover:bg-espresso active:scale-95">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
