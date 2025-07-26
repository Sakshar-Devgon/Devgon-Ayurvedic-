import React from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-6">Contact Us</h1>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          We'd love to hear from you! Reach out with any questions, feedback, or product inquiries.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-green-50 rounded-2xl shadow p-6 text-left break-words">
            <Mail className="text-green-600 w-6 h-6 mb-2" />
            <h2 className="text-lg font-semibold">Email</h2>
            <p className="text-gray-700 text-sm mt-1 break-words">
              devgonpharmaceuticals@gmail.com
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl shadow p-6 text-left">
            <Phone className="text-green-600 w-6 h-6 mb-2" />
            <h2 className="text-lg font-semibold">Phone</h2>
            <p className="text-gray-700 text-sm mt-1">+91 94692 93786</p>
          </div>

          <div className="bg-green-50 rounded-2xl shadow p-6 text-left">
            <MapPin className="text-green-600 w-6 h-6 mb-2" />
            <h2 className="text-lg font-semibold">Address</h2>
            <p className="text-gray-700 text-sm mt-1">
              Opposite Government Memorial Science College, <br />
              Resham Ghar Colony - 180001, Jammu, India
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl shadow p-6 text-left">
            <Clock className="text-green-600 w-6 h-6 mb-2" />
            <h2 className="text-lg font-semibold">Working Hours</h2>
            <p className="text-gray-700 text-sm mt-1">Monday - Saturday</p>
            <p className="text-gray-700 text-sm">10:00 AM – 6:00 PM</p>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-green-700 mb-6">Visit Our Clinic</h3>
          <div className="w-full h-80 rounded-xl overflow-hidden shadow-lg border border-green-200">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps?q=Opposite+Government+Memorial+Science+College,+Resham+Ghar+Colony,+Jammu,+India&output=embed"
              allowFullScreen
              loading="lazy"
              title="Devgon Ayurvedic Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
