import React from "react";
import { Link } from "react-router-dom";

const products = [
  {
    name: "Sehat Plus",
    desc: "For Nutrition, Immunity, Stamina, Growth & Restores Energy.",
    img: "/assets/Sehat_Plus.jpeg",
    ingredients: ["Ashwagandha", "Shatavari", "Amla", "Safed Musli", "Kaunch Beej", "Brahmi"],
  },
  {
    name: "Mindwin",
    desc: "Maintains Focus, Supports Memory, & Improves Grasping Power.",
    img: "/assets/Mind_Win.jpg",
    ingredients: ["Shankhpushpi", "Brahmi", "Ashwagandha", "Vach", "Jyotishmati"],
  },
  {
    name: "Hepa Plus",
    desc: "A natural, herbal formula to support and maintain healthy liver function.",
    img: "/assets/Hepa_Plus.jpg",
    ingredients: ["Punarnava", "Bhringraj", "Kalmegh", "Kutki"],
  },
  {
    name: "Khansi Ja",
    desc: "Provides natural and effective relief from all kinds of cough.",
    img: "/assets/khansi-ja.png",
    ingredients: ["Mulethi", "Tulsi", "Adulsa", "Pippali"],
  },
  {
    name: "D-110 Diabetic Care",
    desc: "Helps manage blood sugar levels and supports overall health.",
    img: "/assets/d110.JPG",
    ingredients: ["Jamun", "Gudmar", "Karela", "Methi"],
  },
];

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-100 to-white py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <img src="/assets/logo.png" alt="Devgon Ayurvedic Logo" className="h-24 md:h-32" />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">Devgon Ayurvedic</h1>
            <p className="text-lg md:text-xl text-gray-700 mb-6">Ancient & Traditional Ayurvedic Formulas for Modern Wellness</p>
            <Link to="/medicines" className="bg-[#4CAF50] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-700 transition">Explore Products</Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-green-800 mb-6">About Devgon Ayurvedic</h2>
        <p className="text-gray-700 mb-3">
          Devgon Ayurvedic manufactures Ayurvedic products using Ancient & Traditional Methods. All our medicines are made from natural herbs with time-tested formulas, perfect for maintaining health.
        </p>
        <p className="text-gray-700 mb-3">
          Our range is certified, standardized, and enriched with purest herbal extracts and wisdom from the ages — rigorously tested for purity and consistency.
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">15+ Years of Experience:</span> Founded by Dr. Sunny Devgon in 2007, our clinic treats chronic diseases naturally, offering online consultations worldwide.
        </p>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">Featured Products</h2>
          <div className="flex space-x-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {products.map((product) => (
              <div key={product.name} className="flex-shrink-0 w-72 bg-gray-50 rounded-xl shadow hover:shadow-lg transition p-4">
                <div className="h-48 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className="object-contain h-full transition-transform duration-300 hover:scale-105" 
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-bold text-green-900">{product.name}</h3>
                  <p className="text-gray-700 text-sm mt-1 mb-3">{product.desc}</p>
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">Key Ingredients:</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.slice(0, 4).map((ing) => (
                      <span key={ing} className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">{ing}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">Why Choose Devgon Ayurvedic?</h2>
        <div className="flex flex-wrap justify-center gap-8 text-center">
          {[
            { icon: "🌿", label: "100% Herbal" },
            { icon: "🧪", label: "Certified Authenticity" },
            { icon: "⏳", label: "18+ Years Experience" },
            { icon: "🧑‍⚕️", label: "Expert Doctor" },
            { icon: "🌱", label: "Ancient Formulas" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center w-32">
              <span className="text-4xl">{item.icon}</span>
              <span className="font-semibold mt-2">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* About Doctor */}
      <section className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-md">
            <img src="/assets/Sunny_Devgon.png" alt="Dr. Sunny Devgon" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-green-800 mb-2">About Dr. Sunny Devgon</h2>
            <p className="text-gray-700 mb-2">
              Founder of Devgon Ayurvedic, Dr. Sunny is a Nadi Pariksha & Panchkarma specialist with a passion for authentic Ayurvedic healing. He is a proud recipient of the Rashtriya Gaurav Award.
            </p>
            <p className="text-gray-700">
              With a legacy of Ayurvedic doctors in his family, Dr. Sunny aims to heal society using traditional wisdom through expert consultations — both online and in person.
            </p>
            <div className="mt-4">
              <span className="inline-block bg-[#4CAF50] text-white px-4 py-2 rounded text-sm font-semibold mr-2">15+ Years Experience</span>
              <span className="inline-block bg-yellow-200 text-yellow-900 px-4 py-2 rounded text-sm font-semibold">Rashtriya Gaurav Awardee</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-green-50">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Ready to Start Your Wellness Journey?</h2>
          <p className="text-gray-700 mb-6">Book a consultation with Dr. Sunny Devgon or browse our premium range of Ayurvedic products today.</p>
          <Link to="/medicines" className="bg-[#4CAF50] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-700 transition">Shop Ayurvedic Products</Link>
          <Link to="/contact" className="ml-4 border border-[#4CAF50] text-[#4CAF50] px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-100 transition">Contact Us</Link>
        </div>
      </section>
    </div>
  );
}
