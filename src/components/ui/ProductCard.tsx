"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

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
        {/* Category Tag */}
        <div className="absolute left-3 top-3 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-espresso shadow-sm">
          {product.category}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <div>
          <h3 className="text-lg font-serif font-bold text-espresso group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-espresso/60 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-black text-accent">₹{product.price}</span>
          
          {/* Quantity Selector */}
          <div className="flex items-center bg-warm-cream rounded-full px-2 py-1 border border-espresso/5">
            <button 
              onClick={decrement}
              className="p-1 text-espresso/50 hover:text-accent transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm font-bold text-espresso">{quantity}</span>
            <button 
              onClick={increment}
              className="p-1 text-espresso/50 hover:text-accent transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-espresso py-3 text-sm font-bold text-white transition-all hover:bg-accent active:scale-95 shadow-md">
          <ShoppingCart size={18} />
          <span>Add to Cart</span>
        </button>
      </div>
    </motion.div>
  );
}
