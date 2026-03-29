import { SITE_CONFIG, CAR_BRANDS } from "@/config/site";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import ServiceList from "@/components/ServiceList";
import BookingForm from "@/components/BookingForm";
import { Phone, MapPin, Clock, Mail, ChevronDown, Wrench, Shield, Clock3 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="font-bold text-xl text-gray-900">
              {SITE_CONFIG.name}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <AvailabilityBadge />
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="hidden sm:flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700"
            >
              <Phone className="w-4 h-4" />
              {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/dmitry-timofeew-UU18rjWiQmo-unsplash.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-blue-200 text-sm font-medium">Professional Auto Specialists</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Expert Care for Your<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Vehicle
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Specialized maintenance and repair for German, Asian, and American cars.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
            >
              Book Appointment
            </a>
            <a
              href="tel:5551234567"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-all"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {CAR_BRANDS.map((brand) => (
              <span
                key={brand}
                className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-gray-300 hover:bg-white/10 transition-colors"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-4">
          <ChevronDown className="w-8 h-8 text-gray-400 animate-bounce" />
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Expert Technicians</h3>
              <p className="text-gray-600">Certified specialists with years of experience</p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">All work backed by our service guarantee</p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock3 className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Fast Turnaround</h3>
              <p className="text-gray-600">Get back on the road quickly without sacrificing quality</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From routine maintenance to major repairs, we handle all your car needs
            </p>
          </div>
          <ServiceList />
        </div>
      </section>

      <section className="py-16 bg-gray-50" id="booking">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Book Your Appointment
            </h2>
            <p className="text-gray-600">
              Fill out the form below and we&apos;ll contact you to confirm
            </p>
          </div>
          <BookingForm />
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <span className="font-bold text-xl">{SITE_CONFIG.name}</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Professional car repair and maintenance. 
                Trusted by car enthusiasts for quality service.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-400">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-white">{SITE_CONFIG.phone}</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-white">{SITE_CONFIG.email}</p>
                  </div>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-white">{SITE_CONFIG.address}, {SITE_CONFIG.city}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Business Hours</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-400">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hours</p>
                    <p className="text-white">{SITE_CONFIG.hours}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
