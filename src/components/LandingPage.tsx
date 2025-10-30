"use client";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

import React, { useEffect, useMemo, useState, useId } from "react";
import toast from "react-hot-toast";
import { Country, State, City, IState, ICity } from "country-state-city";
import Logo from "../assets/logo_1.png";
import Script from "next/script";
const TOKENS = {
  bg: "#0a0a0e",
  bg2: "#13121a",
  textDim: "rgba(255,255,255,.68)",
  gradMain:
    "linear-gradient(90deg,#ff7a18 0%,#fca311 28%,#f97316 46%,#3b82f6 78%,#22c55e 100%)",
  ring: "#fb923c",
};

const Diya: React.FC = () => {
  const uid = useId();
  return (
    <svg viewBox="0 0 200 140" className="w-9 h-9 md:w-11 md:h-11" aria-hidden>
      <defs>
        <linearGradient id={`flame-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD54F" />
          <stop offset="100%" stopColor="#FF6F00" />
        </linearGradient>
        <linearGradient id={`bowl-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4E342E" />
          <stop offset="100%" stopColor="#8D6E63" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="110" rx="80" ry="18" fill="#000" opacity="0.08" />
      <path
        d="M20 90 C 50 130, 150 130, 180 90 C 160 70, 40 70, 20 90 Z"
        fill={`url(#bowl-${uid})`}
      />
      <circle cx="100" cy="78" r="8" fill="#FFA000" opacity="0.4" />
      <path
        d="M100 30 C 80 55, 92 72, 100 80 C 108 72, 120 55, 100 30 Z"
        fill={`url(#flame-${uid})`}
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
};

const ChhathSun: React.FC = () => {
  const uid = useId();
  return (
    <svg
      viewBox="0 0 300 160"
      className="w-14 h-14 md:w-16 md:h-16"
      aria-hidden
    >
      <defs>
        <linearGradient id={`sun-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFB300" />
          <stop offset="100%" stopColor="#FF6A00" />
        </linearGradient>
      </defs>
      <circle cx="150" cy="60" r="26" fill={`url(#sun-${uid})`}>
        <animate
          attributeName="r"
          values="26;30;26"
          dur="2.6s"
          repeatCount="indefinite"
        />
      </circle>
      {[...Array(8)].map((_, i) => (
        <line
          key={i}
          x1="150"
          y1="18"
          x2="150"
          y2="5"
          stroke="#FFB300"
          strokeWidth="2.5"
          transform={`rotate(${i * 45} 150 60)`}
          opacity="0.7"
        >
          <animate
            attributeName="strokeWidth"
            values="2.5;3.5;2.5"
            dur="2s"
            begin={`${i * 0.2}s`}
            repeatCount="indefinite"
          />
        </line>
      ))}
    </svg>
  );
};

const Fx: React.FC = () => (
  <>
    <style>{`
      .grain:before{
        content:"";
        position:fixed;inset:0;pointer-events:none;opacity:.08;
        background-image:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2"/></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.25"/></svg>');
        mix-blend-mode:soft-light;z-index:30
      }
      @media (prefers-reduced-motion: no-preference){
        .spark{position:absolute;width:6px;height:6px;border-radius:9999px;background:#fff2;filter:blur(.6px);top:-10vh}
        .spark:nth-child(1){left:8%;animation:float 16s linear infinite;}
        .spark:nth-child(2){left:22%;animation:float 18s linear infinite 1s;}
        .spark:nth-child(3){left:38%;animation:float 14s linear infinite 2s;}
        .spark:nth-child(4){left:54%;animation:float 20s linear infinite 1.4s;}
        .spark:nth-child(5){left:71%;animation:float 17s linear infinite .6s;}
        .spark:nth-child(6){left:86%;animation:float 22s linear infinite 1.2s;}
        @keyframes float{
          0%{transform:translateY(0) scale(.7);opacity:0}
          10%{opacity:.28}
          60%{opacity:.18}
          100%{transform:translateY(120vh) scale(1);opacity:0}
        }
      }
      .aurora{position:relative;overflow:hidden;background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.02));}
      .aurora:before{
        content:"";position:absolute;inset:-40%;
        background:
          radial-gradient(60% 50% at 20% 20%, rgba(251,146,60,.25), transparent 60%),
          radial-gradient(55% 45% at 80% 20%, rgba(59,130,246,.28), transparent 60%),
          radial-gradient(50% 45% at 50% 90%, rgba(34,197,94,.22), transparent 60%);
        filter: blur(30px);
        animation: drift 12s linear infinite;
      }
      @keyframes drift { 0% { transform: translate3d(0,0,0) rotate(0deg); } 50% { transform: translate3d(-6%, 2%, 0) rotate(8deg);} 100% { transform: translate3d(0,0,0) rotate(0deg);} }
    `}</style>
    <span className="spark" />
    <span className="spark" />
    <span className="spark" />
    <span className="spark" />
    <span className="spark" />
    <span className="spark" />
  </>
);

type Product = {
  id?: string | number;
  name?: string;
  title?: string;
  model?: string;
  productName?: string;
  category?: string;
};
const getProductName = (p: Product) =>
  p.title ||
  p.name ||
  p.model ||
  p.productName ||
  (p.id ? `Model #${p.id}` : "Unknown");

const LandingPage: React.FC = () => {
  const [ctaSource, setCtaSource] = useState<string>("");

  const [loadingModels, setLoadingModels] = useState<boolean>(false);
  const [modelGroups, setModelGroups] = useState<
    Record<"ICV" | "MCV" | "LCV", Array<{ id: string; label: string }>>
  >({ ICV: [], MCV: [], LCV: [] });

  const [open, setOpen] = useState<{
    ICV: boolean;
    MCV: boolean;
    LCV: boolean;
  }>({
    ICV: false,
    MCV: false,
    LCV: false,
  });

  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
    state: "",
    city: "",
    pincode: "",
    vehicleModels: [] as string[],
    source: "",
    expectedMonth: "",
    message: "",
    agree: false,
    otherModel: "", // << NEW
  });

  useEffect(() => {
    let alive = true;
    const fetchModels = async () => {
      setLoadingModels(true);
      try {
        const res = await fetch(
          "https://api.vikramshilaautomobiles.com/api/products",
          {
            headers: { "Content-Type": "application/json" },
            mode: "cors",
            cache: "no-store",
          }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const body = await res.json();
        const list: Product[] = Array.isArray(body)
          ? body
          : Array.isArray(body?.data)
          ? body.data
          : [];

        const buckets: Record<
          "ICV" | "MCV" | "LCV",
          Array<{ id: string; label: string }>
        > = {
          ICV: [],
          MCV: [],
          LCV: [],
        };
        list.forEach((p) => {
          const cat = String(p.category || "")
            .trim()
            .toUpperCase();
          if (cat === "ICV" || cat === "MCV" || cat === "LCV") {
            const label = getProductName(p);
            const id = String(p.id ?? `${cat}-${label}`);
            if (
              !buckets[cat as "ICV" | "MCV" | "LCV"].some(
                (x) => x.label === label
              )
            ) {
              buckets[cat as "ICV" | "MCV" | "LCV"].push({ id, label });
            }
          }
        });
        (Object.keys(buckets) as Array<"ICV" | "MCV" | "LCV">).forEach((k) =>
          buckets[k].sort((a, b) => a.label.localeCompare(b.label))
        );
        if (alive) setModelGroups(buckets);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        if (alive) toast.error("Could not load vehicle models.");
      } finally {
        if (alive) setLoadingModels(false);
      }
    };
    fetchModels();
    return () => {
      alive = false;
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === "checkbox" && name === "agree") {
      return setForm((f) => ({
        ...f,
        agree: (e.target as HTMLInputElement).checked,
      }));
    }
    if (name === "state")
      return setForm((f) => ({ ...f, state: value, city: "" }));
    setForm((f) => ({ ...f, [name]: value }));
  };

  const toggleModel = (label: string) => {
    setForm((f) => {
      const set = new Set(f.vehicleModels);
      set.has(label) ? set.delete(label) : set.add(label);
      return { ...f, vehicleModels: Array.from(set) };
    });
  };

  const openMonthPicker = (
    e: React.FocusEvent<HTMLInputElement> | React.MouseEvent<HTMLInputElement>
  ) => {
    (e.currentTarget as any).showPicker?.();
  };

  const validPhone = (v: string) => /^[6-9]\d{9}$/.test(v.trim());
  const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const validPincode = (v: string) => /^\d{6}$/.test(v.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agree) return toast.error("कृपया शर्तें स्वीकार करें (consent).");
    if (!validPhone(form.contact))
      return toast.error("कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें (भारत).");
    if (!validEmail(form.email))
      return toast.error("कृपया वैध ईमेल दर्ज करें.");
    if (form.pincode && !validPincode(form.pincode))
      return toast.error("कृपया 6 अंकों का पिनकोड दर्ज करें.");

    // merge selected + other (if typed)
    const vehicleModelsCombined = [
      ...form.vehicleModels,
      ...(form.otherModel.trim() ? [form.otherModel.trim()] : []),
    ];

    const payload = {
      ...form,
      vehicleModels: vehicleModelsCombined, // override with combined list
      ctaSource: ctaSource || "Direct Submit",
      submittedAt: new Date().toISOString(),
    };

    try {
      const resp = await fetch(
        "https://api.zentroverse.com/api/landing-leads",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          body: JSON.stringify(payload),
        }
      );
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      toast.success("✅ Lead submitted!");
      window.fbq?.("track", "Lead", {
        content_name: "Festive Test Drive",
        cta_source: payload.ctaSource,
      });
    } catch (err) {
      console.error("Lead submit error:", err);
      toast.error("Could not submit lead right now.");
    }

    setForm({
      name: "",
      contact: "",
      email: "",
      state: "",
      city: "",
      pincode: "",
      vehicleModels: [],
      source: "",
      expectedMonth: "",
      message: "",
      agree: false,
      otherModel: "", // reset
    });
    setCtaSource("");
  };

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

  const markCTA =
    (label: string) =>
    (_e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) =>
      setCtaSource(label);

  const Bucket: React.FC<{ title: "ICV" | "MCV" | "LCV" }> = ({ title }) => {
    const items = modelGroups[title];
    const selectedCount = form.vehicleModels.filter((v) =>
      items.some((i) => i.label === v)
    ).length;
    if (!items?.length) return null;

    return (
      <div className="rounded-xl border border-white/10 overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => ({ ...o, [title]: !o[title] }))}
          className="w-full flex items-center justify-between px-4 py-3 bg-white/[0.04] hover:bg-white/[0.06] transition"
        >
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold">{title}</span>
            <span className="text-xs text-white/60">
              {items.length} models · {selectedCount} selected
            </span>
          </div>
          <svg
            className={`w-5 h-5 transition-transform ${
              open[title] ? "rotate-180" : ""
            }`}
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="M7 10l5 5 5-5z" />
          </svg>
        </button>

        {open[title] && (
          <div className="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {items.map((m) => (
              <label
                key={`${title}-${m.id}`}
                className="flex items-center gap-2 text-sm bg-black/40 border border-white/10 rounded-md px-3 py-2"
              >
                <input
                  type="checkbox"
                  checked={form.vehicleModels.includes(m.label)}
                  onChange={() => toggleModel(m.label)}
                  className="accent-orange-500"
                />
                <span className="truncate">{m.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="min-h-screen text-white grain"
      style={{ background: TOKENS.bg }}
    >
      <Fx />

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-black/70 backdrop-blur-lg border-b border-white/10">
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '2622116344790469');
      fbq('track', 'PageView');
    `}
          </Script>

          {/* NoScript fallback */}
          <noscript
            dangerouslySetInnerHTML={{
              __html:
                '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=2622116344790469&ev=PageView&noscript=1" />',
            }}
          />
        </>

        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <div className="relative flex items-center gap-3">
            <img
              src={Logo}
              alt="Zentroverse"
              className="h-16 md:h-20 w-auto select-none"
            />
            <span className="absolute -right-5 -bottom-2 hidden md:block">
              <Diya />
            </span>
            <span className="absolute -left-7 -bottom-2 hidden lg:block">
              <ChhathSun />
            </span>
            <span className="sr-only">Zentroverse – Festive Campaign</span>
          </div>

          <a
            href="#lead-form"
            onClick={markCTA("Book Test Drive")}
            className="hidden md:inline-flex rounded-xl px-5 py-2.5 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              background: TOKENS.gradMain,
              boxShadow: "0 8px 24px rgba(249,115,22,.25)",
            }}
          >
            Book Test Drive
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-16 w-[440px] h-[440px] rounded-full blur-3xl bg-[#FFB300] opacity-20" />
          <div className="absolute top-10 right-0 w-[380px] h-[380px] rounded-full blur-3xl bg-[#3B82F6] opacity-25" />
          <div className="absolute bottom-0 left-1/3 w-[260px] h-[260px] rounded-full blur-3xl bg-[#22D3EE] opacity-20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-10 md:py-16 lg:py-20 grid md:grid-cols-2 items-center gap-10">
          <div className="space-y-5">
            <span
              className="inline-flex items-center gap-2 text-white px-3 py-1 rounded-full text-xs md:text-sm font-semibold"
              style={{ background: TOKENS.gradMain }}
            >
              🪔 Diwali & 🌅 Chhath • Special Test Drive Window
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              प्रकाश का पर्व, <span className="text-[#F59E0B]">बड़ा लाभ</span> —
              Book your Tata CV{" "}
              <span className="text-[#F97316]">Test Drive</span> today!
            </h1>
            <p className="max-w-xl" style={{ color: TOKENS.textDim }}>
              Intra, Ace, Yodha, LPT — personalized demo at your location.
              Faster finance & delivery support during{" "}
              <strong>Diwali & Chhath Puja 2025</strong>.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#lead-form"
                onClick={markCTA("Get Call Back")}
                className="inline-flex px-5 py-3 rounded-xl font-semibold transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  background: TOKENS.gradMain,
                  boxShadow: "0 10px 26px rgba(59,130,246,.25)",
                }}
              >
                Get Call Back
              </a>
              <a
                href="#lead-form"
                onClick={markCTA("See Offers")}
                className="inline-flex px-5 py-3 rounded-xl border border-white/20 font-semibold hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,.06)" }}
              >
                See Offers
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 opacity-90">
              {["Fast Finance", "On-site Demo", "TATA Reliability"].map((t) => (
                <div
                  key={t}
                  className="text-center text-xs md:text-sm bg-white/5 border border-white/10 rounded-lg py-2"
                >
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Aurora card */}
          <div className="relative">
            <div
              className="aurora rounded-2xl border border-white/10 p-6 md:p-8"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,.04), 0 24px 60px -20px rgba(0,0,0,.6), inset 0 0 80px rgba(255,255,255,.04)",
              }}
            >
              <div className="grid grid-cols-3 gap-4">
                {[
                  { k: "Cities Served", v: "120+" },
                  { k: "Avg. Callback", v: "< 24h" },
                  { k: "Vehicles Demo'd", v: "2k+" },
                ].map((m) => (
                  <div
                    key={m.k}
                    className="rounded-xl bg-white/[0.04] border border-white/10 px-4 py-5 text-center"
                  >
                    <div className="text-xl md:text-2xl font-extrabold">
                      {m.v}
                    </div>
                    <div className="text-[11px] md:text-xs text-white/70 mt-1">
                      {m.k}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-center">
                <a
                  href="#lead-form"
                  onClick={markCTA("Reserve a Demo Slot")}
                  className="inline-flex px-5 py-3 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ background: TOKENS.gradMain }}
                >
                  Reserve a Demo Slot
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section
        id="lead-form"
        className="py-16 px-6"
        style={{
          background: `linear-gradient(180deg,${TOKENS.bg} 0%,${TOKENS.bg2} 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Book Your Festive Test Drive
          </h2>
          <p className="text-sm md:text-base" style={{ color: TOKENS.textDim }}>
            Experience Tata’s trusted commercial vehicles with a personalized
            demo during the Diwali & Chhath 2025 window.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 grid md:grid-cols-2 gap-5"
          aria-label="Festive Test Drive Lead Form"
        >
          <input
            type="hidden"
            name="ctaSource"
            value={ctaSource || "Direct Submit"}
          />

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Full Name *"
            className="p-3 rounded-lg bg-black/60 border border-white/10 text-white outline-none focus:ring-2"
            style={{ outlineColor: TOKENS.ring }}
          />
          <input
            name="contact"
            value={form.contact}
            onChange={handleChange}
            required
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Contact Number *"
            className="p-3 rounded-lg bg-black/60 border border-white/10 text-white outline-none focus:ring-2"
            style={{ outlineColor: TOKENS.ring }}
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Email *"
            className="p-3 rounded-lg bg-black/60 border border-white/10 text-white outline-none focus:ring-2"
            style={{ outlineColor: TOKENS.ring }}
          />
          <input
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            placeholder="Pin Code *"
            className="p-3 rounded-lg bg-black/60 border border-white/10 text-white outline-none focus:ring-2"
            style={{ outlineColor: TOKENS.ring }}
          />

          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-black/60 border border-white/10 text-white"
          >
            <option value="">Select State/UT *</option>
            {useMemo(() => {
              const INDIA = Country.getCountryByCode("IN");
              return INDIA ? State.getStatesOfCountry(INDIA.isoCode) : [];
            }, [])
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((s: any) => (
                <option key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </option>
              ))}
          </select>

          <select
            name="city"
            value={form.city}
            onChange={handleChange}
            required
            disabled={!form.state}
            className="p-3 rounded-lg bg-black/60 border border-white/10 text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <option value="">
              {form.state ? "Select City *" : "Select State first"}
            </option>
            {(() => {
              const INDIA = Country.getCountryByCode("IN");
              const allStates = INDIA
                ? State.getStatesOfCountry(INDIA.isoCode)
                : [];
              const selected = allStates.find(
                (s: any) => s.isoCode === form.state
              );
              const cities =
                INDIA && selected
                  ? City.getCitiesOfState(INDIA.isoCode, selected.isoCode)
                  : [];
              return cities
                .slice()
                .sort((a: any, b: any) => a.name.localeCompare(b.name))
                .map((c: any) => (
                  <option
                    key={`${c.name}-${c.latitude}-${c.longitude}`}
                    value={c.name}
                  >
                    {c.name}
                  </option>
                ));
            })()}
          </select>

          {/* Collapsible model groups */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-medium">Vehicle Model(s)</label>
              {loadingModels ? (
                <span className="text-xs text-white/60">Loading models…</span>
              ) : (
                <span className="text-xs text-white/60">
                  {form.vehicleModels.length
                    ? `${form.vehicleModels.length} selected`
                    : "Select one or more"}
                </span>
              )}
            </div>
            <div className="grid gap-3">
              <Bucket title="ICV" />
              <Bucket title="MCV" />
              <Bucket title="LCV" />
              {!loadingModels &&
                !modelGroups.ICV.length &&
                !modelGroups.MCV.length &&
                !modelGroups.LCV.length && (
                  <div className="text-sm text-white/60">No models found.</div>
                )}
            </div>
            {/* Other model (optional) */}
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <div className="w-full px-4 py-3 bg-white/[0.04]">
                <label className="text-sm font-semibold">
                  Other model (optional)
                </label>
              </div>
              <div className="p-3">
                <input
                  name="otherModel"
                  value={form.otherModel}
                  onChange={handleChange}
                  placeholder="Type the model / variant name (e.g., Ultra T.19 LA 24ft)"
                  className="w-full p-3 rounded-lg bg-black/60 border border-white/10 text-white outline-none focus:ring-2"
                  style={{ outlineColor: TOKENS.ring }}
                />
                <p className="mt-2 text-xs text-white/60">
                  If filled, this will be submitted along with any selected
                  models.
                </p>
              </div>
            </div>
          </div>

          {/* Month picker */}
          <label className="flex flex-col gap-1">
            <span className="text-xs text-white/70">
              Expected Month of Purchase
            </span>
            <input
              name="expectedMonth"
              type="month"
              value={form.expectedMonth}
              onChange={handleChange}
              onFocus={openMonthPicker}
              onClick={openMonthPicker}
              inputMode="numeric"
              pattern="\d{4}-\d{2}"
              className="p-3 rounded-lg bg-black/60 border border-white/10 text-white"
              placeholder="YYYY-MM"
              aria-label="Expected Month of Purchase"
            />
          </label>

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
            rows={4}
            className="p-3 rounded-lg bg-black/60 border border-white/10 text-white md:col-span-2 outline-none focus:ring-2"
            style={{ outlineColor: TOKENS.ring }}
          />

          <label className="md:col-span-2 flex items-start gap-2 text-xs text-white/70">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              className="mt-1"
              aria-label="Consent"
            />
            <span>
              I agree to be contacted during the Diwali & Chhath 2025 festive
              period and consent to my data being used to schedule a demo.
            </span>
          </label>

          <button
            type="submit"
            className="md:col-span-2 text-white py-3 rounded-lg font-semibold transition-all duration-200 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ background: TOKENS.gradMain }}
          >
            Submit
          </button>
        </form>

        <p className="max-w-4xl mx-auto mt-4 text-center text-xs text-white/55">
          *By submitting, you agree to be contacted during the Diwali & Chhath
          2025 festive period.
        </p>
      </section>

      <footer
        className="py-6 text-center text-white/60 border-t border-white/10"
        style={{ background: TOKENS.bg }}
      >
        © {new Date().getFullYear()} Zentroverse Global Pvt. Ltd. • Diwali &
        Chhath Festive Campaign • Vikramshila Automobiles
      </footer>
    </div>
  );
};

export default LandingPage;
