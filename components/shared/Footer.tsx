import Link from "next/link"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

// Server component - no "use client" directive
export default function Footer() {
  // Use direct calculation for server rendering
  const year = new Date().getFullYear()
  
  return (
    <footer className="bg-slate-900 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/grean-logo-icon.png"
                alt="GREAN WORLD Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <div>
                <div className="flex items-center">
                  <span className="text-[#3DD56D] text-lg font-bold">GREAN</span>
                  <span className="text-lg font-bold text-gray-200 ml-1">WORLD</span>
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              Leading Ethiopia's energy transition with innovative solutions.
            </p>
          </div>
          
          {/* Solutions */}
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/solutions/solar-energy" className="text-slate-400 hover:text-[#3DD56D] text-sm transition-colors">
                  Solar Energy
                </Link>
              </li>
              <li>
                <Link href="/solutions/energy-storage" className="text-slate-400 hover:text-[#3DD56D] text-sm transition-colors">
                  Energy Storage
                </Link>
              </li>
              <li>
                <Link href="/solutions/biomass" className="text-slate-400 hover:text-[#3DD56D] text-sm transition-colors">
                  Biomass
                </Link>
              </li>
              <li>
                <Link href="/solutions/training" className="text-slate-400 hover:text-[#3DD56D] text-sm transition-colors">
                  Training
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-[#3DD56D] text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-400 hover:text-[#3DD56D] text-sm transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-[#3DD56D] text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Contact</h3>
            <address className="not-italic">
              <p className="text-slate-400 text-sm mb-2">
                Addis Ababa, Ethiopia
              </p>
              <p className="text-slate-400 text-sm mb-2">
                Email: info@greanworld.com
              </p>
              <p className="text-slate-400 text-sm">
                Phone: +251 123 456 789
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400 text-sm">
          © {year} GREAN WORLD Energy Technology. All rights reserved.
        </div>
      </div>
    </footer>
  )
} 