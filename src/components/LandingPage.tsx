"use client";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

import React, { useEffect, useMemo, useRef, useState } from "react";
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

// NOTE: Removed Diya/Chhath decorative components & usage

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

// --- Small helpers for month formatting ---
const pad2 = (n: number) => String(n).padStart(2, "0");
const ymToLabel = (ym: string) => {
  if (!/^\d{4}-\d{2}$/.test(ym)) return "";
  const [y, m] = ym.split("-").map(Number);
  return `${new Date(0, m - 1).toLocaleString("en", { month: "long" })} ${y}`;
};

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
    otherModel: "",
  });

  // month popover fallback
  const monthInputRef = useRef<HTMLInputElement | null>(null);
  const [monthPopoverOpen, setMonthPopoverOpen] = useState(false);
  const [monthYear, setMonthYear] = useState<number>(new Date().getFullYear());

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

    const vehicleModelsCombined = [
      ...form.vehicleModels,
      ...(form.otherModel.trim() ? [form.otherModel.trim()] : []),
    ];

    const payload = {
      ...form,
      vehicleModels: vehicleModelsCombined,
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
      toast.success(" Lead submitted!");
      window.fbq?.("track", "Lead", {
        content_name: "Special Test Drive",
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
      otherModel: "",
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
    <div className="min-h-screen text-white" style={{ background: TOKENS.bg }}>
      {/* HEADER (Diwali icons removed) */}
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
            <span className="sr-only">Zentroverse – Special Test Drive</span>
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

      {/* HERO (unchanged copy) */}
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
              ⭐ Special Test Drive Window • Limited Slots
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Bigger savings, smarter fleets — Book your Tata CV{" "}
              <span className="text-[#F97316]">Test Drive</span> today!
            </h1>
            <p className="max-w-xl" style={{ color: TOKENS.textDim }}>
              Intra, Ace, Yodha, LPT — personalized demo at your location.
              Priority finance & delivery support during the campaign window.
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

          {/* KPI card */}
          <div className="relative">
            <div
              className="rounded-2xl border border-white/10 p-6 md:p-8"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,.04), 0 24px 60px -20px rgba(0,0,0,.6), inset 0 0 80px rgba(255,255,255,.04)",
                background:
                  "linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.02))",
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
            Book Your Test Drive
          </h2>
          <p className="text-sm md:text-base" style={{ color: TOKENS.textDim }}>
            Experience Tata’s trusted commercial vehicles with a personalized
            demo during our special campaign window.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 grid md:grid-cols-2 gap-5"
          aria-label="Special Test Drive Lead Form"
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

          {/* EXPECTED MONTH with calendar trigger & popover fallback */}
          <div className="relative">
            <label className="flex flex-col gap-1">
              <span className="text-xs text-white/70">
                Expected Month of Purchase
              </span>
              <div className="flex items-center gap-2">
                <input
                  ref={monthInputRef}
                  name="expectedMonth"
                  type="month"
                  value={form.expectedMonth}
                  onChange={handleChange}
                  className="flex-1 p-3 rounded-lg bg-black/60 border border-white/10 text-white"
                  placeholder="YYYY-MM"
                  aria-label="Expected Month of Purchase"
                />
                <button
                  type="button"
                  onClick={() => {
                    const opened = monthInputRef.current?.showPicker?.();
                    if (opened === undefined) setMonthPopoverOpen(true); // fallback
                  }}
                  className="p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10"
                  aria-label="Open month picker"
                  title={
                    form.expectedMonth
                      ? ymToLabel(form.expectedMonth)
                      : "Select month"
                  }
                >
                  {/* calendar icon */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v3H3V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1zM3 10h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8zm4 3v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2z" />
                  </svg>
                </button>
              </div>
              <span className="text-[11px] text-white/50">
                {form.expectedMonth
                  ? ymToLabel(form.expectedMonth)
                  : "Pick month & year (optional)"}
              </span>
            </label>

            {/* Fallback month grid */}
            {monthPopoverOpen && (
              <div
                className="absolute z-50 mt-2 w-72 rounded-xl border border-white/10 bg-[#111] p-3 shadow-xl"
                onMouseLeave={() => setMonthPopoverOpen(false)}
              >
                <div className="flex items-center justify-between mb-2">
                  <button
                    type="button"
                    className="px-2 py-1 rounded border border-white/10"
                    onClick={() => setMonthYear((y) => y - 1)}
                  >
                    ‹
                  </button>
                  <div className="text-sm font-semibold">{monthYear}</div>
                  <button
                    type="button"
                    className="px-2 py-1 rounded border border-white/10"
                    onClick={() => setMonthYear((y) => y + 1)}
                  >
                    ›
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <button
                      key={m}
                      type="button"
                      className="text-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-2"
                      onClick={() => {
                        const ym = `${monthYear}-${pad2(m)}`;
                        setForm((f) => ({ ...f, expectedMonth: ym }));
                        setMonthPopoverOpen(false);
                      }}
                    >
                      {new Date(0, m - 1).toLocaleString("en", {
                        month: "short",
                      })}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

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
              I agree to be contacted and consent to my data being used to
              schedule a demo.
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
          *By submitting, you agree to be contacted regarding this special test
          drive window.
        </p>
      </section>

      <footer
        className="py-6 text-center text-white/60 border-t border-white/10"
        style={{ background: TOKENS.bg }}
      >
        Sponsored by Tata Motors CV Dealers • © {new Date().getFullYear()}{" "}
        Zentroverse Global Pvt. Ltd.
      </footer>
    </div>
  );
};

export default LandingPage;
