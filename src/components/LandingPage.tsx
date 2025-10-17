"use client";

import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import Logo from "../assets/logo_1.png";
import { Country, State, City, IState, ICity } from "country-state-city";

/** tiny diya svg (unchanged) */
const Diya = () => (
  <svg viewBox="0 0 200 140" className="w-12 h-12 md:w-14 md:h-14">
    <defs>
      <linearGradient id="flame" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFD54F" />
        <stop offset="100%" stopColor="#FF6F00" />
      </linearGradient>
      <linearGradient id="bowl" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4E342E" />
        <stop offset="100%" stopColor="#8D6E63" />
      </linearGradient>
    </defs>
    <ellipse cx="100" cy="110" rx="80" ry="18" fill="#000" opacity="0.08" />
    <path
      d="M20 90 C 50 130, 150 130, 180 90 C 160 70, 40 70, 20 90 Z"
      fill="url(#bowl)"
    />
    <circle cx="100" cy="78" r="8" fill="#FFA000" opacity="0.4" />
    <path
      d="M100 30 C 80 55, 92 72, 100 80 C 108 72, 120 55, 100 30 Z"
      fill="url(#flame)"
    >
      <animate
        attributeName="opacity"
        values="1;0.85;1"
        dur="2s"
        repeatCount="indefinite"
      />
    </path>
    <circle cx="100" cy="40" r="6" fill="#FFF176" opacity="0.7">
      <animate
        attributeName="r"
        values="5;7;5"
        dur="2.2s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

const LandingPage = () => {
  const location = useLocation();
  const [campaign, setCampaign] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setCampaign(params.get("campaign") || "");
  }, [location.search]);

  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
    state: "", // we’ll store state ISO code (e.g., "BR" for Bihar)
    city: "",
    pincode: "",
    vehicleModel: "",
    source: "",
    expectedDate: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // If state changes, also reset city
    if (name === "state") {
      setForm((f) => ({ ...f, state: value, city: "" }));
      return;
    }
    setForm({ ...form, [name]: value });
  };

  const validPhone = (v: string) => /^[6-9]\d{9}$/.test(v.trim());
  const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validPhone(form.contact)) {
      toast.error("कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें (भारत).");
      return;
    }
    if (!validEmail(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // 👉 send to your API here, full state/city text are included below
    // await axios.post("/api/leads", payload);
    toast.success("✅ Lead captured successfully!");
    setForm({
      name: "",
      contact: "",
      email: "",
      state: "",
      city: "",
      pincode: "",
      vehicleModel: "",
      source: "",
      expectedDate: "",
      message: "",
    });
  };

  // ===== INDIA data (ALL states/UTs & cities via package) =====
  const INDIA = useMemo(() => Country.getCountryByCode("IN"), []);
  const allStates: IState[] = useMemo(
    () => (INDIA ? State.getStatesOfCountry(INDIA.isoCode) : []),
    [INDIA]
  );

  const selectedState = allStates.find((s) => s.isoCode === form.state);
  const citiesOfState: ICity[] = useMemo(() => {
    if (!INDIA || !selectedState) return [];
    return City.getCitiesOfState(INDIA.isoCode, selectedState.isoCode);
  }, [INDIA, selectedState]);

  // For submission, you often want human-readable names:
  const payload = {
    ...form,
    campaign,
    stateName: selectedState?.name || "",
    cityName:
      citiesOfState.find((c) => c.name === form.city)?.name || form.city || "",
    country: INDIA?.name || "India",
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      {/* FESTIVE RIBBON */}
      <div className="w-full bg-gradient-to-r from-[#FF6A00] via-[#FFB300] to-[#FF2D55]">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          <p className="font-semibold text-sm md:text-base tracking-wide">
            🪔 Shubh Deepawali! Festive Offers Live — Limited Period
          </p>
          <a
            href="#lead-form"
            className="hidden sm:inline-flex px-3 py-1 rounded-full bg-white text-[#C21807] text-xs md:text-sm font-bold"
          >
            Enquire Now
          </a>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-black/70 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={Logo}
                alt="Zentroverse"
                className="block !h-12 md:!h-16 lg:!h-20 w-auto drop-shadow-[0_6px_18px_rgba(255,179,0,0.35)]"
              />
              <span className="absolute -right-3 -bottom-2 hidden md:block">
                <Diya />
              </span>
            </div>
          </div>
          <a
            href="#lead-form"
            className="hidden md:inline-flex rounded-xl px-4 py-2 bg-gradient-to-r from-[#D84315] to-[#F57C00] font-semibold"
          >
            Book Test Drive
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <div className="absolute -top-24 -left-16 w-[420px] h-[420px] rounded-full blur-3xl bg-[#FFB300]"></div>
          <div className="absolute top-10 right-0 w-[380px] h-[380px] rounded-full blur-3xl bg-[#FF6A00]"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-10 md:py-16 lg:py-20 grid md:grid-cols-2 items-center gap-8">
          <div className="space-y-4 md:space-y-6">
            <span className="inline-flex items-center gap-2 bg-[#FF6A00] text-white px-3 py-1 rounded-full text-xs md:text-sm font-semibold">
              🪔 Diwali Specials • Test Drive Offers
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              प्रकाश का पर्व, <span className="text-[#F59E0B]">बड़ा लाभ</span> —
              Book your Tata CV{" "}
              <span className="text-[#F97316]">Test Drive</span> today!
            </h1>
            <p className="text-white/70 max-w-xl">
              Intra, Ace, Yodha, LPT — personalized demo at your location.
              Faster finance & delivery support during the festive window.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#lead-form"
                className="inline-flex px-5 py-3 rounded-xl bg-gradient-to-r from-[#D84315] to-[#F57C00] font-semibold"
              >
                Get Call Back
              </a>
              <a
                href="#lead-form"
                className="inline-flex px-5 py-3 rounded-xl border border-white/20 font-semibold hover:bg-white/5"
              >
                See Offers
              </a>
            </div>
          </div>
          <div className="flex md:justify-end">
            <Diya />
          </div>
        </div>
      </section>

      {/* FORM */}
      <section
        id="lead-form"
        className="py-14 px-6 md:px-6 bg-gradient-to-b from-[#0b0b0f] to-[#14121a]"
      >
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Book Your Test Drive
          </h2>
          <p className="text-white/60">
            Experience Tata’s most trusted commercial vehicles with a
            personalized demo.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 grid md:grid-cols-2 gap-6"
        >
          <input type="hidden" name="campaign" value={campaign} />

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Full Name *"
            className="p-3 rounded-lg bg-black/60 border border-white/10 text-white focus:ring-2 focus:ring-[#F59E0B]"
          />
          <input
            name="contact"
            value={form.contact}
            onChange={handleChange}
            required
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Contact Number *"
            className="p-3 rounded-lg bg-black/60 border border-white/10 text-white focus:ring-2 focus:ring-[#F59E0B]"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Email *"
            className="p-3 rounded-lg bg-black/60 border border-white/10 text-white focus:ring-2 focus:ring-[#F59E0B]"
          />
          <input
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            placeholder="Pin Code *"
            className="p-3 rounded-lg bg-black/60 border border-white/10 text-white focus:ring-2 focus:ring-[#F59E0B]"
          />

          {/* STATES: all Indian states & UTs */}
          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-black/60 border border-white/10 text-white"
          >
            <option value="">Select State/UT *</option>
            {allStates
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((s) => (
                <option key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </option>
              ))}
          </select>

          {/* CITIES: all cities of selected state */}
          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            required
            disabled={!form.state}
            className="p-3 rounded-lg bg-black/60 border border-white/10 text-white disabled:opacity-40"
          >
            <option value="">
              {form.state ? "Select City *" : "Select State first"}
            </option>
            {citiesOfState
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((c) => (
                <option
                  key={`${c.name}-${c.latitude}-${c.longitude}`}
                  value={c.name}
                >
                  {c.name}
                </option>
              ))}
          </select>

          <input
            name="vehicleModel"
            value={form.vehicleModel}
            onChange={handleChange}
            placeholder="Vehicle Model *"
            className="p-3 rounded-lg bg-black/60 border border-white/10 text-white focus:ring-2 focus:ring-[#F59E0B]"
          />

          <input
            name="expectedDate"
            type="date"
            value={form.expectedDate}
            onChange={handleChange}
            className="p-3 rounded-lg bg-black/60 border border-white/10 text-white"
          />

          <select
            name="source"
            value={form.source}
            onChange={handleChange}
            className="p-3 rounded-lg bg-black/60 border border-white/10 text-white"
          >
            <option value="">Select Lead Source</option>
            <option>Facebook</option>
            <option>Instagram</option>
            <option>Google Ads</option>
            <option>On-Ground Event</option>
            <option>Referral</option>
            <option>Walk-in</option>
          </select>

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Brief Description (Optional)"
            className="p-3 rounded-lg bg-black/60 border border-white/10 text-white md:col-span-2"
          />

          <button
            type="submit"
            className="md:col-span-2 bg-gradient-to-r from-[#D84315] to-[#F57C00] hover:opacity-95 text-white py-3 rounded-lg font-semibold transition-all duration-200"
          >
            Submit Lead
          </button>
        </form>

        <p className="max-w-4xl mx-auto mt-4 text-center text-xs text-white/50">
          *By submitting, you agree to be contacted by our team during the
          festive offer period.
        </p>
      </section>

      <footer className="py-6 text-center text-white/60 border-top border-white/10">
        © {new Date().getFullYear()} Zentroverse Global Pvt. Ltd. • Festive
        Campaign • Vikramshila Automobiles
      </footer>
    </div>
  );
};

export default LandingPage;
