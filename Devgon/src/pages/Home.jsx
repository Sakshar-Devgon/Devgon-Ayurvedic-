  import React from "react";
  import { Link } from "react-router-dom";
  import { Plus } from "lucide-react"; // Import an icon for the button

  const products = [
    {
      name: "Sehat Plus",
      desc: "For Nutrition, Immunity, Stamina, Growth & Restores Energy.",
      img: "/assets/sehat-plus.png", // Update with your actual image path
      ingredients: ["Ashwagandha", "Shatavari", "Amla", "Safed Musli", "Kaunch Beej", "Brahmi"],
    },
    {
      name: "Mindwin",
      desc: "Maintains Focus, Supports Memory, & Improves Grasping Power.",
      img: "/assets/Mind_Win.jpg", // Update with your actual image path
      ingredients: ["Shankhpushpi", "Brahmi", "Ashwagandha", "Vach", "Jyotishmati"],
    },
    {
      name: "Hepa Plus",
      desc: "A natural, herbal formula to support and maintain healthy liver function.",
      img: "/assets/hepa-plus.png", // Update with your actual image path
      ingredients: ["Punarnava", "Bhringraj", "Kalmegh", "Kutki"],
    },
    {
      name: "Khansi Ja",
      desc: "Provides natural and effective relief from all kinds of cough.",
      img: "/assets/khansi-ja.png", // Update with your actual image path
      ingredients: ["Mulethi", "Tulsi", "Adulsa", "Pippali"],
    },
    {
      name: "D-110 Diabetic Care",
      desc: "Helps manage blood sugar levels and supports overall health.",
      img: "/assets/d-110.png", // Update with your actual image path
      ingredients: ["Jamun", "Gudmar", "Karela", "Methi"],
    },
  ];

  export default function Home() {
    return (
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-100 to-white py-12 md:py-20">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
            <img src="/assets/logo.png" alt="Devgon Ayurvedic Logo" className="h-24 md:h-32 mb-4 md:mb-0" />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold text-green-800 mb-4">Devgon Ayurvedic</h1>
              <p className="text-lg md:text-xl text-gray-700 mb-6">Ancient & Traditional Ayurvedic Formulas for Modern Wellness</p>
              <Link to="/medicines" className="inline-block bg-[#4CAF50] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-700 transition">Explore Products</Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="max-w-5xl mx-auto px-4 py-10">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">About Devgon Ayurvedic</h2>
          <p className="text-gray-700 mb-2">
            Devgon Ayurvedic manufactures its Ayurvedic products with the help of Ancient & Traditional Methods. All Devgon’s Medicine are made of natural herbs with time-tested formulas. We provide a wide range of Ayurvedic medicines, excellent for maintaining health.
          </p>
          <p className="text-gray-700 mb-2">
            Our products are certified authentic, standardized, and made with purest herbal extracts, enriched with the wisdom from ages and stringently tested for purity and consistency.
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">15 Years of Devgon Ayurvedic:</span> Founded in 2007 by Dr. Sunny Devgon, a specialist in Nadi Pariksha & Panchkarma, our clinic provides the best treatment for chronic diseases without side effects, including online consultations for national & international patients.
          </p>
        </section>

        {/* Featured Products - Horizontally Scrolling */}
        <section className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-8 text-center">Featured Products</h2>
            <div className="flex space-x-8 overflow-x-auto pb-6 -mx-4 px-4">
              {products.map((product) => (
                <div key={product.name} className="flex-shrink-0 w-72 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 group">
                  <div className="w-full h-48 bg-white rounded-t-xl flex items-center justify-center p-4">
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.target.style.display = 'none'; }} 
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-green-900 mb-2">{product.name}</h3>
                    <p className="text-gray-700 text-sm mb-4 h-14">{product.desc}</p>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Key Ingredients:</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.ingredients.slice(0, 4).map(ing => (
                          <span key={ing} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">{ing}</span>
                        ))}
                      </div>
                    </div>

                    <button className="w-full mt-5 bg-[#4CAF50] text-white py-2.5 rounded-lg font-semibold shadow hover:bg-green-700 transition flex items-center justify-center gap-2">
                      <Plus size={20} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6 text-center">Why Choose Devgon Ayurvedic?</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center">
              <span className="text-4xl">🌿</span>
              <span className="font-semibold mt-2">100% Herbal</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl">🧪</span>
              <span className="font-semibold mt-2">Certified Authenticity</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl">⏳</span>
              <span className="font-semibold mt-2">18+ Years Experience</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl">🧑‍⚕️</span>
              <span className="font-semibold mt-2">Expert Doctor</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl">🌱</span>
              <span className="font-semibold mt-2">Ancient Formulas</span>
            </div>
          </div>
        </section>

        {/* About Dr. Sunny Devgon */}
        <section className="bg-white py-10">
          <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0 w-32 h-32 rounded-full overflow-hidden shadow-lg ">
              <img 
                src="/assets/Sunny_Devgon.png" 
                alt="Dr. Sunny Devgon" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-2">About Dr. Sunny Devgon</h2>
              <p className="text-gray-700 mb-2">Dr. Sunny Devgon, founder of Devgon Ayurvedic, is a specialist in Nadi Pariksha & Panchkarma, with a passion for ancient Ayurvedic medicine. He has received the Rashtriya Gaurav Award for outstanding performance in Ayurveda.</p>
              <p className="text-gray-700 mb-2">Born in a family of Ayurvedic doctors, Dr. Sunny has dedicated his life to making society healthier with ancient and traditional medicine. He provides expert consultation for chronic diseases, both in-person and online.</p>
              <div className="mt-3">
                <span className="inline-block bg-[#4CAF50] text-white px-4 py-2 rounded font-semibold text-sm">15+ Years Experience</span>
                <span className="inline-block bg-yellow-200 text-yellow-900 px-4 py-2 rounded font-semibold text-sm ml-2">Rashtriya Gaurav Awardee</span>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-10">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">Ready to Start Your Wellness Journey?</h2>
            <p className="text-gray-700 mb-6">Consult with Dr. Sunny Devgon or explore our range of authentic Ayurvedic products for a healthier, happier life.</p>
            <Link to="/medicines" className="inline-block bg-[#4CAF50] text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-700 transition">Shop Ayurvedic Products</Link>
            <Link to="/contact" className="inline-block ml-4 bg-white border border-[#4CAF50] text-[#4CAF50] px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-50 transition">Contact Us</Link>
          </div>
        </section>
      </div>
    );
  }