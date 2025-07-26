import React from "react";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-green-50 border-t mt-16 text-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-green-700 mb-2">Devgon Ayurvedic</h2>
          <p className="text-sm">
            Trusted Ayurvedic care made from time-tested herbal formulas. Pure, natural, and rooted in ancient wisdom.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-green-700 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-green-600">Home</a></li>
            <li><a href="/medicines" className="hover:text-green-600">Medicines</a></li>
            <li><a href="/contact" className="hover:text-green-600">Contact Us</a></li>
            <li><a href="/about" className="hover:text-green-600">About Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-green-700 mb-3">Get in Touch</h3>
          <ul className="text-sm space-y-2">
            <li className="flex items-start">
              <MapPin className="w-4 h-4 mt-1 mr-2 text-green-600" />
              Opposite Government Memorial Science College, Resham Ghar Colony, Jammu - 180001
            </li>
            <li className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-green-600" />
              +91 94692 93786
            </li>
            <li className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-green-600" />
              devgonpharmaceuticals@gmail.com
            </li>
            <li className="text-sm mt-2">Working Hours: 10:00 AM - 6:00 PM</li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-green-100 text-sm text-center text-gray-600 py-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <span>&copy; 2025 Devgon Ayurvedic. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" aria-label="Instagram">
              <Instagram className="w-5 h-5 hover:text-green-600" />
            </a>
            <a href="#" aria-label="Facebook">
              <Facebook className="w-5 h-5 hover:text-green-600" />
            </a>
            <a href="#" aria-label="YouTube">
              <Youtube className="w-5 h-5 hover:text-green-600" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
