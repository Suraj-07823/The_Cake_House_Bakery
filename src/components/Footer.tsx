import Link from "next/link";
import { Instagram, Facebook, MessageCircle, Cake } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-espresso text-warm-cream py-16 px-6">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <Cake className="text-accent" size={32} />
            <h2 className="text-2xl font-serif font-black tracking-tight">The Cake House</h2>
          </Link>
          <p className="mt-6 max-w-sm text-warm-cream/60 leading-relaxed">
            Crafting memories, one bite at a time. Our bakery is dedicated to bringing 
            joy through artisanal creations made with the finest local ingredients.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-warm-cream/10 hover:bg-accent transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-warm-cream/10 hover:bg-accent transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-warm-cream/10 hover:bg-accent transition-colors">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-serif font-bold text-lg mb-6">Explore</h3>
          <ul className="space-y-4 text-warm-cream/60">
            <li><Link href="#menu" className="hover:text-accent transition-colors">Menu</Link></li>
            <li><Link href="/custom" className="hover:text-accent transition-colors">Custom Orders</Link></li>
            <li><Link href="/video-order" className="hover:text-accent transition-colors">Video Call</Link></li>
            <li><Link href="#" className="hover:text-accent transition-colors">Our Story</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif font-bold text-lg mb-6">Contact</h3>
          <ul className="space-y-4 text-warm-cream/60">
            <li>123 Bakery Lane, Sweetville</li>
            <li>hello@cakehouse.com</li>
            <li>+91 98223 16064</li>
            <li className="text-accent font-bold">Open Daily: 9am - 9pm</li>
          </ul>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl mt-16 pt-8 border-t border-warm-cream/10 text-center text-sm text-warm-cream/40">
        <p>&copy; {new Date().getFullYear()} The Cake House Bakery. All rights reserved.</p>
      </div>
    </footer>
  );
}
