"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  return (
    <div className="bg-warm-cream min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-24 px-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-serif font-black text-espresso mb-8">Your Cart</h1>

          {cart.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-warm-cream rounded-full flex items-center justify-center text-espresso/20">
                  <ShoppingBag size={40} />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-espresso mb-4">Your cart is empty</h2>
              <p className="text-espresso/60 mb-8">Looks like you haven't added any delicious treats yet.</p>
              <Link
                href="/#menu"
                className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3 rounded-full font-bold shadow-xl hover:bg-espresso transition-all"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items List */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-4 flex gap-4 items-center shadow-sm border border-espresso/5"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-warm-cream flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-espresso truncate">{item.name}</h3>
                      <p className="text-accent font-black">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center bg-warm-cream rounded-full px-2 py-1 border border-espresso/5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-espresso/50 hover:text-accent transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-espresso">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-espresso/50 hover:text-accent transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-espresso/20 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-espresso/5 sticky top-32">
                  <h2 className="text-xl font-bold text-espresso mb-6">Order Summary</h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-espresso/60">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-espresso/60">
                      <span>Delivery</span>
                      <span className="text-green-600 font-bold">FREE</span>
                    </div>
                    <div className="pt-4 border-t border-espresso/5 flex justify-between items-end">
                      <span className="font-bold text-espresso">Total Amount</span>
                      <span className="text-2xl font-black text-accent">₹{totalPrice}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                        const message = `Hi! I'd like to place an order:\n${cart.map(item => `- ${item.name} x${item.quantity}`).join('\n')}\nTotal: ₹${totalPrice}`;
                        window.open(`https://wa.me/919822316064?text=${encodeURIComponent(message)}`, "_blank");
                    }}
                    className="w-full bg-espresso text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent transition-all shadow-lg active:scale-95"
                  >
                    Place Order via WhatsApp <ArrowRight size={18} />
                  </button>
                  <p className="text-[10px] text-center text-espresso/40 mt-4 px-4">
                    Clicking will redirect you to WhatsApp to confirm your order details.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
