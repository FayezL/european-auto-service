"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { CAR_BRANDS, CAR_MODELS, SERVICES } from "@/config/site";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    car_brand: "",
    car_model: "",
    service: "",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const availableModels = formData.car_brand ? CAR_MODELS[formData.car_brand] || [] : [];

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "car_brand" && { car_model: "" }),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const { error } = await supabase.from("bookings").insert([
      {
        name: formData.name,
        phone: formData.phone,
        car_model: `${formData.car_brand} ${formData.car_model}`,
        service: formData.service,
        notes: formData.notes || null,
        status: "pending",
      },
    ]);

    if (error) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    } else {
      setStatus("success");
      setFormData({
        name: "",
        phone: "",
        car_brand: "",
        car_model: "",
        service: "",
        notes: "",
      });
    }
  }

  if (status === "success") {
    return (
      <div className="card text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Booking Request Sent!
        </h3>
        <p className="text-gray-600 mb-6">
          We&apos;ll contact you shortly to confirm your appointment.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn-primary"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Book an Appointment
      </h2>

      {status === "error" && (
        <div className="flex items-center gap-2 p-4 mb-6 bg-red-50 text-red-700 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="John Smith"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="input-field"
            placeholder="(555) 123-4567"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="car_brand" className="block text-sm font-medium text-gray-700 mb-1">
              Car Brand *
            </label>
            <select
              id="car_brand"
              name="car_brand"
              value={formData.car_brand}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">Select brand</option>
              {CAR_BRANDS.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="car_model" className="block text-sm font-medium text-gray-700 mb-1">
              Car Model *
            </label>
            <select
              id="car_model"
              name="car_model"
              value={formData.car_model}
              onChange={handleChange}
              required
              disabled={!formData.car_brand}
              className="input-field disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">Select model</option>
              {availableModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
            Service Needed *
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="">Select a service</option>
            {SERVICES.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="input-field"
            placeholder="Any additional details about your car or the service needed..."
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            "Submit Booking Request"
          )}
        </button>
      </div>
    </form>
  );
}
