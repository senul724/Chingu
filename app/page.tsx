"use client";

import {
  ArrowRight,
  Check,
  Gift,
  Heart,
  MapPin,
  Sparkle,
  Sparkles,
  Star,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const items = [
  "FRIENDSHIP",
  "친구",
  "IN EVERY SIP",
  "♥",
  "KOREAN-INSPIRED",
  "친구",
  "SMART BEVERAGE",
  "♥",
];

const heroDrinks = [
  {
    name: "Seoul Strawberry",
    desc: "Strawberry milk, fresh berries.",
    price: "LKR 650",
    tag: "berry rush",
    img: "/drink-strawberry.png",
    ring: "oklch(0.94 0.05 5)",
    tint: "from-pink-100 to-rose-50",
  },
  {
    name: "Brown Sugar Seoul",
    price: "LKR 600",
    desc: "Rich milk tea, brown sugar boba.",
    tag: "boba classic",
    img: "/drink-brown-sugar.png",
    ring: "oklch(0.94 0.04 60)",
    tint: "from-amber-100 to-orange-50",
  },
  {
    name: "Matcha Cloud Latte",
    desc: "Premium matcha, milk foam.",
    price: "LKR 650",
    tag: "zen sip",
    img: "/drink-matcha.png",
    ring: "oklch(0.94 0.05 150)",
    tint: "from-emerald-100 to-lime-50",
  },
  {
    name: "Chingu Volcano",
    desc: "Chocolate lava with boba.",
    tint: "from-amber-100 to-yellow-50",
    price: "LKR 600",
    tag: "choco lava",
    img: "/drink-chocolate.png",
    ring: "oklch(0.92 0.04 60)",
  },
];
const drinkParticles = [
  ["🍓", "✨", "🌸", "🍓"], // Strawberry
  ["🧋", "🧋", "✨", "🟤"], // Brown Sugar
  ["🍃", "☁", "✨", "🍃"], // Matcha
  ["🍫", "🌋", "✨", "🍫"], // Chocolate
];
const categories = [
  "Milk Tea",
  "Fruit Tea",
  "Coffee",
  "Matcha",
  "Wellness",
  "Seasonal",
];

const tiers = [
  {
    name: "Friend",
    range: "0 – 499 pts",
    desc: "Welcome to the CHINGU Family!",
  },
  {
    name: "Best Friend",
    range: "500 – 1,499 pts",
    desc: "Enjoy more benefits and rewards.",
  },
  {
    name: "VIP Chingu",
    range: "1,500 – 4,999 pts",
    desc: "Special perks for our VIP Friends.",
  },
  {
    name: "Super Chingu",
    range: "5,000+ pts",
    desc: "The ultimate level of friendship!",
  },
];

const stores = [
  { name: "University of Colombo", area: "Colombo 03", dist: "0.8 km" },
  { name: "Asiri Hospital", area: "Borella, Colombo 08", dist: "2.3 km" },
  { name: "One Galle Face Mall", area: "Colombo 02", dist: "3.1 km" },
  { name: "Liberty Plaza", area: "Colombo 03", dist: "1.4 km" },
];

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

function Counter({
  to,
  suffix = "",
  duration = 1600,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const { ref, visible } = useReveal<HTMLSpanElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, to, duration]);
  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [m, setM] = useState({ x: 0, y: 0 });
  const [idx, setIdx] = useState(0);
  const [active, setActive] = useState(0);
  const [mascotProgress, setMascotProgress] = useState(0);
  const mascotSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled((prev) => {
        const isScrolled = window.scrollY > 0;
        return prev !== isScrolled ? isScrolled : prev;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      setM({ x: nx, y: ny });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => (i + 1) % heroDrinks.length),
      3200,
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const section = mascotSectionRef.current;
    if (!section) return;
    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress 0 → 1 as the section scrolls from bottom-of-viewport to top-of-viewport
      const raw = 1 - rect.top / vh;
      setMascotProgress(Math.min(1, Math.max(0, raw)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const p = (depth: number) => ({
    transform: `translate3d(${m.x * depth}px, ${m.y * depth}px, 0)`,
  });
  const current = heroDrinks[idx];

  const navItems = [
    { label: "Menu", href: "#menu" },
    { label: "App", href: "#app" },
    { label: "Rewards", href: "#rewards" },
    { label: "Franchise", href: "#franchise" },
    { label: "Locations", href: "#locations" },
    { label: "About", href: "#about" },
  ];

  return typeof window !== "undefined" ? (
    <main className="bg-background text-foreground">
      {/**
      <Hero />
      <Marquee />
      <Menu />
      <AppSection />
      <Rewards />
      <Franchise />
      <Locations />
      <About />
      <Footer />
      */}
      {/** nav bar */}
      <header className="fixed top-3 md:top-5 left-1/2 -translate-x-1/2 z-50 px-3 w-full max-w-[96vw] flex justify-center pointer-events-none">
        <div
          className={`pointer-events-auto flex items-center  transition-all duration-500 ease-out overflow-hidden origin-top ${
            scrolled
              ? "gap-1 pl-5 pr-1.5 py-1.5 rounded-full text-milk bg-ink shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
              : "gap-2 px-5 py-2 rounded-b-xl bg-milk"
          }`}
        >
          <a href="#" className="flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-heart-pulse" />
            <span className="font-display font-bold tracking-tight text-sm">
              CHINGU
            </span>
            <span className="font-korean text-primary text-[10px] leading-none">
              친구
            </span>
          </a>
          <nav
            className={`hidden md:flex items-center transition-all duration-500 ease-out ${
              scrolled
                ? "gap-0.5 ml-4 opacity-100 max-w-[600px] translate-x-0"
                : "gap-0 ml-0 opacity-0 max-w-0 -translate-x-4"
            }`}
          >
            {navItems.map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="px-3 py-1 text-xs font-medium text-milk/75 hover:text-milk transition whitespace-nowrap"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#app"
            className={`shrink-0 rounded-full bg-primary text-primary-foreground font-semibold transition-all duration-500 ease-out whitespace-nowrap overflow-hidden ${
              scrolled
                ? "ml-1 px-4 py-1.5 text-xs max-w-[140px] opacity-100"
                : "px-0 py-0 text-[0px] max-w-0 opacity-0"
            }`}
          >
            Get App
          </a>
        </div>
      </header>

      {/** hero */}
      <section className="relative w-full h-[100svh] flex flex-col">
        <div className="relative bg-milk p-2 md:p-3 pt-5 md:pt-5 overflow-hidden flex-1 flex flex-col">
          {/* Full-width rounded "screen" — the milk padding around it acts as the bezel */}
          <div className="relative w-full rounded-[28px] md:rounded-[36px] overflow-hidden bg-gradient-pink text-milk shadow-[0_30px_80px_-30px_rgba(255,95,162,0.45)] flex-1 flex flex-col">
            {/* Ambient orbs */}
            <div className="absolute -top-40 -left-20 w-[520px] h-[520px] rounded-full bg-milk/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 right-1/4 w-[520px] h-[520px] rounded-full bg-ink/15 blur-3xl pointer-events-none" />

            {/* Sun disc top-left */}
            <div className="absolute -top-16 -left-16 w-64 h-64 md:w-80 md:h-80 rounded-full bg-milk/20 pointer-events-none" />

            {/* Plus decorations */}
            <div className="absolute top-1/3 left-[40%] text-milk/40 text-4xl md:text-6xl font-thin select-none animate-float-slow pointer-events-none">
              +
            </div>
            <div className="absolute bottom-[16%] left-[8%] text-milk/40 text-3xl md:text-5xl font-thin select-none animate-float pointer-events-none">
              +
            </div>

            {/* Big circle right side — tint transitions with drink */}
            <div
              className="absolute right-[-15%] top-1/2 -translate-y-1/2 w-[70%] max-w-[900px] aspect-square rounded-full shadow-[inset_0_20px_60px_rgba(0,0,0,0.08)] pointer-events-none transition-colors duration-700"
              style={{ background: current.ring }}
            />

            {/* CONTENT GRID */}
            <div className="relative z-10 grid lg:grid-cols-[1.05fr_1fr] items-center gap-6 lg:gap-4 px-6 py-6 md:px-14 md:py-8 lg:px-20 flex-1">
              {/* LEFT — copy */}
              <div className="max-w-2xl flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-milk/10 border border-milk/20 text-xs font-bold uppercase tracking-widest text-milk/95 shadow-md backdrop-blur-sm animate-rise mb-4 w-fit">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  🇰 Korean-Inspired Smart Boba
                </div>
                <h1
                  className="mt-1 font-display font-black leading-[0.85] tracking-tighter text-[clamp(3rem,7.5vw,7rem)] animate-rise drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                  style={{ animationDelay: "0.1s" }}
                >
                  Friend
                  <span className="italic font-korean font-normal">ship</span>
                  <br />
                  <span className="italic font-korean font-normal">
                    in every
                  </span>{" "}
                  sip
                  <Heart className="inline-block ml-2 w-[0.5em] h-[0.5em] text-milk fill-milk animate-heart-pulse align-baseline" />
                </h1>
                <p
                  className="mt-4 max-w-md text-milk/90 text-sm md:text-base leading-relaxed animate-rise"
                  style={{ animationDelay: "0.2s" }}
                >
                  South Asia's first Korean-inspired smart beverage ecosystem.
                  Premium drinks, playful tech, one sip of{" "}
                  <span className="font-korean text-primary font-bold">
                    친구
                  </span>{" "}
                  energy.
                </p>

                <div
                  className="mt-6 flex flex-wrap gap-3 animate-rise"
                  style={{ animationDelay: "0.3s" }}
                >
                  <a
                    href="#locations"
                    className="group inline-flex items-center gap-2 rounded-full bg-ink text-milk px-7 py-3.5 font-bold text-sm hover:scale-105 active:scale-95 hover:shadow-[0_0_25px_rgba(17,17,17,0.5)] transition-all duration-300 shadow-xl"
                  >
                    Find a CHINGU
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="#menu"
                    className="inline-flex items-center gap-2 rounded-full bg-milk text-ink px-7 py-3.5 font-bold text-sm hover:scale-105 active:scale-95 hover:shadow-[0_0_25px_rgba(255,248,245,0.45)] transition-all duration-300"
                  >
                    Explore Menu
                  </a>
                </div>

                {/* Upgraded Flavor Selector Pills */}
                <div
                  className="mt-8 hidden md:flex flex-col gap-2.5 animate-rise"
                  style={{ animationDelay: "0.45s" }}
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] text-milk/60 font-bold">
                    Select a Flavor
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {heroDrinks.map((d, i) => (
                      <button
                        key={d.name}
                        onClick={() => setIdx(i)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 border ${
                          i === idx
                            ? "bg-milk text-ink border-milk shadow-[0_4px_20px_rgba(255,255,255,0.25)] scale-105"
                            : "bg-milk/10 text-milk/80 border-milk/10 hover:bg-milk/20 hover:text-milk"
                        }`}
                      >
                        {d.name.replace(" Seoul", "")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT — product stage with cycling drinks */}
              <div className="relative w-full aspect-square max-w-[420px] lg:max-w-[500px] mx-auto lg:mx-0 lg:justify-self-end">
                {/* Stacked drinks — only current visible */}
                {heroDrinks.map((d, i) => (
                  <img
                    key={d.name}
                    src={d.img}
                    alt={d.name}
                    width={1024}
                    height={1024}
                    className={`absolute inset-0 w-full h-full object-contain drop-shadow-[0_30px_60px_rgba(17,17,17,0.35)] transition-all duration-700 ease-out ${
                      i === idx
                        ? "opacity-100 scale-100 rotate-0 animate-float z-10"
                        : "opacity-0 scale-75 -rotate-12 z-0 pointer-events-none"
                    }`}
                    style={i === idx ? p(-25) : undefined}
                  />
                ))}

                {/* Floating dynamic ingredients orbiting the drink */}
                {drinkParticles[idx].map((pText, pIdx) => {
                  const anims = [
                    "animate-float",
                    "animate-float-slow",
                    "animate-bob",
                    "animate-pulse",
                  ];
                  const positions = [
                    "top-4 left-6 text-2xl",
                    "bottom-8 left-10 text-3xl",
                    "top-12 right-8 text-xl",
                    "bottom-16 right-12 text-2xl",
                  ];
                  return (
                    <span
                      key={pIdx}
                      className={`absolute ${positions[pIdx]} ${anims[pIdx]} z-20 select-none pointer-events-none drop-shadow-lg transition-all duration-700`}
                      style={{
                        animationDelay: `${pIdx * 0.4}s`,
                        transform: `translate3d(${m.x * (15 + pIdx * 10)}px, ${m.y * (15 + pIdx * 10)}px, 0)`,
                      }}
                    >
                      {pText}
                    </span>
                  );
                })}

                {/* Drink name plate — translucent glassmorphic card */}
                <div
                  key={current.name}
                  className="absolute -top-4 left-0 md:left-4 z-20 bg-ink/90 text-milk border border-milk/15 rounded-2xl px-5 py-3 shadow-[0_20px_40px_rgba(0,0,0,0.3)] backdrop-blur-md animate-rise flex items-center gap-3"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse animate-duration-1000" />
                  <div>
                    <div className="text-[9px] uppercase tracking-[0.2em] text-primary font-black leading-none">
                      now sipping
                    </div>
                    <div className="font-display font-black text-sm mt-1 tracking-wide">
                      {current.name}
                    </div>
                  </div>
                </div>

                {/* Price badge — premium gradient sticker */}
                <div
                  className="absolute -bottom-4 -right-4 z-20 grid place-items-center w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-primary to-pink-glow text-milk shadow-[0_20px_50px_rgba(255,95,162,0.45)] border border-milk/25 rotate-[8deg] hover:rotate-0 hover:scale-115 transition-all duration-500 cursor-pointer select-none"
                  style={p(-40)}
                >
                  <div
                    key={current.price}
                    className="text-center leading-none animate-rise"
                  >
                    <div className="text-[9px] uppercase tracking-[0.25em] text-milk/75 font-black">
                      from
                    </div>
                    <div className="font-display font-black text-xl md:text-2xl mt-1">
                      {current.price}
                    </div>
                    <div className="text-[9px] uppercase tracking-[0.15em] text-milk/80 font-bold bg-ink/30 px-2 py-0.5 rounded-full mt-1.5 w-fit mx-auto">
                      {current.tag}
                    </div>
                  </div>
                </div>

                {/* Mascot stickers (hidden on desktop to avoid clutter) */}
                <img
                  src="/mascot-heart.png"
                  alt=""
                  aria-hidden
                  width={1024}
                  height={1024}
                  className="absolute top-24 -left-6 md:hidden w-16 -rotate-12 animate-bob z-20 drop-shadow-xl pointer-events-none"
                  style={p(30)}
                />
                <img
                  src="/mascot-celebrate.png"
                  alt=""
                  aria-hidden
                  width={1024}
                  height={1024}
                  className="absolute -bottom-4 -left-4 w-20 md:hidden -rotate-6 animate-float z-20 drop-shadow-xl pointer-events-none"
                  style={p(35)}
                />
              </div>
            </div>

            {/* Sparkles */}
            {[...Array(14)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-milk animate-sparkle pointer-events-none z-10"
                style={{
                  width: `${(i % 3) + 3}px`,
                  height: `${(i % 3) + 3}px`,
                  left: `${((i * 37) % 95) + 2}%`,
                  top: `${((i * 53) % 90) + 5}%`,
                  animationDelay: `${(i * 0.2) % 3}s`,
                  animationDuration: `${2 + (i % 3)}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Marqueee */}
        <div className="shrink-0 bg-ink text-milk py-4 overflow-hidden border-y border-primary/20">
          <div className="flex gap-16 animate-marquee whitespace-nowrap font-display font-bold text-3xl md:text-4xl">
            {[...items, ...items, ...items].map((it, i) => (
              <span
                key={i}
                className={it === "♥" || it === "친구" ? "text-primary" : ""}
              >
                {it}
              </span>
            ))}
          </div>
        </div>

        {/* Centered Welcome Mascot (floating above the marquee on desktop) */}
        <div
          className={`hidden md:flex left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex-col items-center group/welcome ${window.scrollY < 300 ? "fixed bottom-[10px]" : "absolute bottom-[-300px]"}`}
          style={p(35)}
        >
          <div className="relative w-80 md:w-[460px] lg:w-[580px] aspect-square transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/welcome:scale-105 group-hover/welcome:-rotate-3 cursor-pointer">
            <img
              style={{ scale: Math.max(0.7, 1 - window.scrollY / 1000) }}
              src="/mascot-welcome.png"
              alt="Welcome Mascot"
              className="w-full h-full object-contain drop-shadow-[0_25px_60px_rgba(17,17,17,0.45)] animate-float-slow"
            />
          </div>
        </div>
      </section>

      {/* ── MASCOT INTRO SECTION ─────────────────────────────────────── */}
      <section
        ref={mascotSectionRef}
        className="relative overflow-hidden bg-milk py-24 lg:py-36"
      >
        {/* Soft radial glow behind the copy */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[700px] h-[700px] rounded-full bg-gradient-to-br from-primary/10 via-pink-soft/20 to-transparent blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-20">
          {/* ── DESKTOP layout ──────────────────────────────────── */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] items-end gap-10">
            {/* LEFT mascot — celebrate — slides in from left */}
            <div
              className="flex justify-end"
              style={{
                transform: `translateX(${(1 - mascotProgress) * -140}px)`,
                opacity: mascotProgress * 2,
                transition: "transform 0.1s linear, opacity 0.1s linear",
              }}
            >
              <img
                src="/mascot-celebrate.png"
                alt="Celebrating Chingu"
                width={1024}
                height={1024}
                className="w-72 xl:w-80 drop-shadow-[0_20px_50px_rgba(255,95,162,0.25)] animate-float"
              />
            </div>

            {/* CENTRE — brand copy */}
            <div className="flex flex-col items-center text-center gap-6 max-w-sm">
              <div className="space-y-3">
                <h2 className="font-display font-black text-4xl xl:text-5xl text-ink leading-tight tracking-tight">
                  <span className="font-korean italic font-normal text-primary">
                    친구
                  </span>{" "}
                  is More
                  <br />
                  Than a Mascot
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-korean font-bold text-primary">
                    친구
                  </span>{" "}
                  means <em>friend</em> in Korean. Our playful Chingu characters
                  represent the warmth, joy, and community at the heart of every
                  cup we craft — from our smart vending machines right to your
                  hands.
                </p>
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all duration-300"
                >
                  Our Story <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* RIGHT mascot — heart — slides in from right */}
            <div
              style={{
                transform: `translateX(${(1 - mascotProgress) * 140}px)`,
                opacity: mascotProgress * 2,
                transition: "transform 0.1s linear, opacity 0.1s linear",
              }}
            >
              <img
                src="/mascot-heart.png"
                alt="Heart Chingu"
                width={1024}
                height={1024}
                className="w-72 xl:w-80 drop-shadow-[0_20px_50px_rgba(255,95,162,0.25)] animate-bob"
              />
            </div>
          </div>

          {/* ── MOBILE layout ───────────────────────────────────── */}
          <div className="flex lg:hidden flex-col items-center text-center gap-8">
            {/* Three mascots stacked with offset */}
            <div className="relative h-52 w-full flex items-end justify-center">
              <img
                src="/mascot-celebrate.png"
                alt=""
                aria-hidden
                width={1024}
                height={1024}
                className="absolute left-2 bottom-0 w-28 drop-shadow-xl animate-float -rotate-6"
              />
              <img
                src="/mascot-welcome.png"
                alt="Chingu mascot"
                width={1024}
                height={1024}
                className="relative z-10 w-36 drop-shadow-2xl animate-float-slow"
              />
              <img
                src="/mascot-heart.png"
                alt=""
                aria-hidden
                width={1024}
                height={1024}
                className="absolute right-2 bottom-0 w-28 drop-shadow-xl animate-bob rotate-6"
              />
            </div>

            <div className="space-y-4 max-w-sm">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold uppercase tracking-widest text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Meet Your Chingu
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-ink leading-tight tracking-tight">
                <span className="font-korean italic font-normal text-primary">
                  친구
                </span>{" "}
                is More Than a Mascot
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-korean font-bold text-primary">친구</span>{" "}
                means <em>friend</em> in Korean. Our playful Chingu characters
                represent the warmth, joy, and community at the heart of every
                cup — from smart vending machines right to your hands.
              </p>
              <a
                href="#about"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all duration-300"
              >
                Our Story <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Drinks Menu */}
      <section id="menu" className="pb-24 lg:pb-32 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-3">
                <span className="h-px w-8 bg-primary" /> Our Drinks
              </div>
              <h2 className="font-display font-bold text-4xl md:text-6xl leading-tight">
                Korean-inspired. <br />
                <span className="text-gradient-pink">Made with love.</span>
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              Every cup is crafted for happiness — with premium ingredients,
              playful flavors, and a little dose of 친구 energy.
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((c, i) => (
              <button
                key={c}
                onClick={() => setActive(i)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  active === i
                    ? "bg-gradient-pink text-primary-foreground shadow-pink scale-105"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Drink cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {heroDrinks.map((d, i) => (
              <article
                key={d.name}
                className="group relative rounded-3xl bg-card p-5 shadow-card hover:shadow-pink hover:-translate-y-2 transition-all duration-500"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  className={`relative aspect-square rounded-2xl bg-gradient-to-br ${d.tint} overflow-hidden mb-4`}
                >
                  <img
                    src={d.img}
                    alt={d.name}
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-contain p-2 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 grid place-items-center w-9 h-9 rounded-full bg-milk/90 backdrop-blur opacity-0 group-hover:opacity-100 transition">
                    <Heart className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <h3 className="font-display font-bold text-lg leading-tight">
                  {d.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {d.desc}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-semibold text-primary">{d.price}</span>
                  <button className="rounded-full bg-ink text-milk w-9 h-9 grid place-items-center hover:bg-primary transition">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* app section */}
      <section
        id="app"
        className="py-24 lg:py-32 bg-secondary/60 relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-primary/10 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              <span className="h-px w-8 bg-primary" /> Digital Heart
            </div>
            <h2 className="font-display font-bold text-4xl md:text-6xl leading-tight">
              The Digital Heart of{" "}
              <span className="text-gradient-pink">CHINGU</span>
              <Heart className="inline w-8 h-8 md:w-12 md:h-12 text-primary fill-primary ml-2 animate-heart-pulse" />
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-lg">
              Rewards, payments, orders and more — all in one app. Skip the
              queue, earn points every sip, unlock exclusive drops.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-3 rounded-2xl bg-ink text-milk px-5 py-3 hover:bg-ink/85 transition"
              >
                <div className="text-2xl"></div>
                <div className="text-left leading-tight">
                  <div className="text-[10px] opacity-70">Download on the</div>
                  <div className="font-semibold text-sm">App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-3 rounded-2xl bg-ink text-milk px-5 py-3 hover:bg-ink/85 transition"
              >
                <div className="text-2xl">▶</div>
                <div className="text-left leading-tight">
                  <div className="text-[10px] opacity-70">Get it on</div>
                  <div className="font-semibold text-sm">Google Play</div>
                </div>
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { icon: Gift, t: "Earn Rewards", s: "With every sip" },
                { icon: Sparkles, t: "Exclusive Offers", s: "Just for you" },
                { icon: MapPin, t: "Store Locator", s: "Find CHINGU near you" },
                { icon: Heart, t: "Birthday Treats", s: "A drink on us!" },
              ].map(({ icon: I, t, s }) => (
                <div key={t} className="flex items-start gap-3">
                  <div className="grid place-items-center w-11 h-11 rounded-2xl bg-primary/15 text-primary shrink-0">
                    <I className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t}</div>
                    <div className="text-xs text-muted-foreground">{s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Phone mockup */}
          <div className="relative flex justify-center">
            <div className="relative w-[300px] h-[600px] rounded-[3rem] bg-ink p-3 shadow-2xl animate-float-slow">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-ink rounded-b-2xl z-10" />
              <div className="w-full h-full rounded-[2.4rem] bg-gradient-to-b from-milk to-secondary p-5 overflow-hidden relative">
                <div className="flex justify-between items-center text-[10px] text-ink/60 mb-6 pt-1">
                  <span>9:41</span>
                  <span>••• 100%</span>
                </div>
                <div className="text-xs text-ink/60">Hello, Chingu!</div>
                <div className="mt-1 rounded-2xl bg-ink text-milk p-4 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] opacity-70">Points</div>
                    <div className="font-display font-bold text-3xl">2,450</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary grid place-items-center">
                    <Heart className="w-5 h-5 fill-milk text-milk" />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {["Scan & Pay", "Order Now", "Rewards", "Locate"].map((l) => (
                    <div
                      key={l}
                      className="rounded-2xl bg-primary/90 text-primary-foreground px-3 py-4 text-xs font-semibold"
                    >
                      {l}
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl bg-ink text-milk p-4">
                  <div className="text-[10px] opacity-70">Limited Drop</div>
                  <div className="font-display font-bold text-lg">
                    Strawberry Bloom
                  </div>
                  <button className="mt-2 text-xs bg-primary text-primary-foreground rounded-full px-3 py-1.5">
                    Order Now →
                  </button>
                </div>
              </div>
            </div>
            {/* Floating mascot next to phone */}
            <img
              src="/chingu-mascot.png"
              alt=""
              aria-hidden
              width={1024}
              height={1024}
              loading="lazy"
              className="absolute -right-6 bottom-0 w-40 animate-bob pointer-events-none"
            />
          </div>
        </div>
      </section>

      {/* rewards */}
      <section id="rewards" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              <span className="h-px w-8 bg-primary" /> Rewards
            </div>
            <h2 className="font-display font-bold text-4xl md:text-6xl leading-tight">
              CHINGU <span className="text-gradient-pink">Rewards</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              The more you sip, the more you earn.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((t, i) => (
              <div
                key={t.name}
                className="group rounded-3xl bg-card p-6 shadow-card hover:shadow-pink hover:-translate-y-2 transition-all duration-500 text-center relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/10 group-hover:bg-primary/20 transition" />
                <div className="relative">
                  <div className="mx-auto w-20 h-20 rounded-full bg-gradient-pink grid place-items-center mb-4 shadow-pink group-hover:scale-110 transition-transform">
                    <span className="font-display font-bold text-2xl text-primary-foreground">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl">{t.name}</h3>
                  <div className="text-xs text-primary font-semibold mt-1">
                    {t.range}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl bg-gradient-pink text-primary-foreground grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20 overflow-hidden">
            {[
              { t: "Earn Points", s: "With every purchase" },
              { t: "Level Up", s: "Unlock higher tiers" },
              { t: "Redeem Rewards", s: "Drinks, merch & more" },
              { t: "Exclusive Access", s: "Events & offers" },
            ].map((c) => (
              <div key={c.t} className="p-6 text-center">
                <Check className="w-5 h-5 mx-auto mb-2" />
                <div className="font-semibold">{c.t}</div>
                <div className="text-xs opacity-85">{c.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* franchise */}
      <section
        id="franchise"
        className="py-24 lg:py-32 bg-secondary/60 relative overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              <span className="h-px w-8 bg-primary" /> Franchise
            </div>
            <h2 className="font-display font-bold text-4xl md:text-6xl leading-tight">
              Own a <span className="text-gradient-pink">CHINGU</span>
              <Heart className="inline w-8 h-8 md:w-12 md:h-12 text-primary fill-primary ml-2" />
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md">
              Be part of South Asia's fastest-growing beverage ecosystem.
            </p>

            <div className="mt-8 rounded-3xl bg-card p-6 shadow-card">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Founding Partner Program
              </div>
              <div className="mt-1 font-display font-bold text-3xl">
                LKR 4.85 Million{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  + Taxes
                </span>
              </div>
              <ul className="mt-5 grid sm:grid-cols-2 gap-y-2 gap-x-6 text-sm">
                {[
                  "No Franchise Fee",
                  "Priority Territories",
                  "Founding Partner Status",
                  "Exclusive Benefits",
                  "Marketing & Training",
                  "Technology Support",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-pink text-primary-foreground px-6 py-3 text-sm font-semibold shadow-pink hover:scale-105 transition"
              >
                Request Franchise Pack <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="relative">
            <img
              src="/chingu-vending.jpg"
              alt="CHINGU franchise vending"
              width={1024}
              height={1024}
              loading="lazy"
              className="rounded-3xl shadow-pink w-full object-cover aspect-[4/5] animate-float-slow"
            />
            <img
              src="chingu-mascot.png"
              alt=""
              aria-hidden
              width={1024}
              height={1024}
              loading="lazy"
              className="absolute -bottom-8 -left-8 w-40 animate-bob"
            />
          </div>
        </div>

        {/* Journey steps */}
        <div className="mx-auto max-w-7xl px-6 mt-20">
          <div className="text-center mb-8">
            <div className="font-display font-bold text-2xl">
              Your Journey with CHINGU
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[
              "Apply",
              "Approve",
              "Purchase",
              "Install",
              "Training",
              "Launch",
            ].map((s, i) => (
              <div
                key={s}
                className="rounded-2xl bg-card p-5 text-center shadow-card hover:shadow-pink hover:-translate-y-1 transition-all"
              >
                <div className="mx-auto w-10 h-10 rounded-full bg-primary/15 text-primary grid place-items-center font-display font-bold mb-2">
                  {i + 1}
                </div>
                <div className="font-semibold text-sm">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* location */}
      <section id="locations" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              <span className="h-px w-8 bg-primary" /> Locations
            </div>
            <h2 className="font-display font-bold text-4xl md:text-6xl leading-tight">
              Find Your <br /> Nearest{" "}
              <span className="text-gradient-pink">CHINGU</span>
            </h2>

            <div className="mt-8 relative">
              <input
                type="text"
                placeholder="Search location"
                className="w-full rounded-full border border-border bg-card pl-5 pr-14 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button className="absolute right-1.5 top-1.5 bottom-1.5 aspect-square rounded-full bg-gradient-pink text-primary-foreground grid place-items-center">
                <MapPin className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "All",
                "University",
                "Hospital",
                "Mall",
                "Office",
                "Airport",
              ].map((c, i) => (
                <button
                  key={c}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                    i === 0
                      ? "bg-ink text-milk"
                      : "bg-secondary hover:bg-accent"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              {stores.map((s) => (
                <div
                  key={s.name}
                  className="group rounded-2xl bg-card p-4 shadow-card hover:shadow-pink transition flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/15 grid place-items-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">
                      {s.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {s.area} · Open till 11:00 PM
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-primary">
                    {s.dist}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fake map */}
          <div className="relative rounded-3xl overflow-hidden shadow-card min-h-[520px] bg-gradient-to-br from-secondary via-milk to-secondary">
            <svg
              viewBox="0 0 400 500"
              className="absolute inset-0 w-full h-full opacity-40"
            >
              <defs>
                <pattern
                  id="grid"
                  width="24"
                  height="24"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 24 0 L 0 0 0 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-primary"
                  />
                </pattern>
              </defs>
              <rect width="400" height="500" fill="url(#grid)" />
              <path
                d="M 20 400 Q 100 300 180 340 T 380 200"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                className="text-primary/40"
                strokeLinecap="round"
              />
              <path
                d="M 60 100 Q 150 180 250 140 T 380 380"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-primary/30"
                strokeLinecap="round"
              />
            </svg>

            {[
              { x: "20%", y: "35%" },
              { x: "55%", y: "25%" },
              { x: "75%", y: "55%" },
              { x: "35%", y: "70%" },
              { x: "60%", y: "80%" },
            ].map((p, i) => (
              <div key={i} className="absolute" style={{ left: p.x, top: p.y }}>
                <div className="relative -translate-x-1/2 -translate-y-full">
                  <div
                    className="w-8 h-8 rounded-full bg-gradient-pink grid place-items-center shadow-pink animate-heart-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    <MapPin className="w-4 h-4 text-primary-foreground fill-primary-foreground" />
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45 -mt-1" />
                </div>
              </div>
            ))}

            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-ink text-milk p-4 shadow-2xl">
              <div className="text-[10px] uppercase tracking-widest text-primary font-semibold">
                CHINGU GO
              </div>
              <div className="font-display font-bold text-lg mt-0.5">
                One Galle Face Mall
              </div>
              <div className="text-xs opacity-70">
                Level 2, Near Food Court · Open now
              </div>
              <button className="mt-3 inline-flex items-center gap-2 text-xs font-semibold rounded-full bg-gradient-pink text-primary-foreground px-4 py-2">
                Directions <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* about */}
      <section id="about" className="py-24 lg:py-32 bg-secondary/60">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-3">
              <span className="h-px w-8 bg-primary" /> Our Story
            </div>
            <h2 className="font-display font-bold text-4xl md:text-6xl leading-tight">
              Our <span className="text-gradient-pink">Story</span>
            </h2>
            <p className="mt-6 text-muted-foreground max-w-md">
              <span className="font-korean text-primary">"친구"</span> means{" "}
              <em>friend</em> in Korean. We created CHINGU to bring people
              together through great drinks, smart technology, and meaningful
              connections.
            </p>
            <p className="mt-3 text-muted-foreground max-w-md">
              Our mission is to create everyday moments of happiness through
              beverages.
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { n: "2026", l: "Founded" },
                { n: "50+", l: "Locations" },
                { n: "1M+", l: "Drinks Served" },
                { n: "4.8★", l: "Rating" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display font-bold text-2xl text-primary">
                    {s.n}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute w-72 h-72 rounded-full bg-gradient-pink blur-3xl opacity-40" />
            <img
              src="/chingu-mascot.png"
              alt="CHINGU mascot"
              width={1024}
              height={1024}
              loading="lazy"
              className="relative w-80 animate-bob"
            />
            {/* orbiting drinks */}
            <img
              src="/drink-strawberry.png"
              alt=""
              aria-hidden
              width={1024}
              height={1024}
              loading="lazy"
              className="absolute w-24 top-0 left-0 animate-float"
            />
            <img
              src="/drink-matcha.png"
              alt=""
              aria-hidden
              width={1024}
              height={1024}
              loading="lazy"
              className="absolute w-24 bottom-4 right-0 animate-float-slow"
            />
          </div>
        </div>
      </section>

      <footer className="bg-ink text-milk pt-20 pb-10 relative overflow-hidden">
        <div className="absolute -top-20 right-10 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="mx-auto max-w-7xl px-6 relative">
          {/* Newsletter row */}
          <div className="grid lg:grid-cols-2 gap-10 items-center pb-14 border-b border-white/10">
            <div>
              <h3 className="font-display font-bold text-3xl md:text-4xl">
                Stay Connected with <span className="text-primary">CHINGU</span>
                <Heart className="inline w-6 h-6 text-primary fill-primary ml-1" />
              </h3>
              <p className="mt-2 text-milk/70 text-sm">
                Join our friendship community!
              </p>
            </div>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 rounded-full bg-white/10 border border-white/15 px-5 py-3.5 text-sm placeholder:text-milk/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="rounded-full bg-gradient-pink text-primary-foreground px-7 py-3.5 text-sm font-semibold shadow-pink hover:scale-105 transition">
                Subscribe
              </button>
            </form>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 py-14">
            <div className="lg:col-span-2">
              <div className="font-display font-bold text-2xl">
                CH<span className="text-primary">i</span>NGU{" "}
                <span className="font-korean text-base text-primary">친구</span>
              </div>
              <p className="mt-3 text-primary font-medium text-sm">
                Friendship in Every Sip ♥
              </p>
              <p className="mt-3 text-milk/60 text-sm max-w-xs">
                South Asia's first Korean-inspired smart beverage ecosystem.
              </p>
              <div className="mt-5 flex items-center gap-2">
                {[Star, Star, Star].map((I, i) => (
                  <a
                    key={i}
                    href="#"
                    className="grid place-items-center w-10 h-10 rounded-full border border-white/15 hover:bg-primary hover:border-primary transition"
                  >
                    <I className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                t: "Explore",
                l: ["Home", "Menu", "App", "Rewards", "Locations"],
              },
              {
                t: "Company",
                l: ["About Us", "Careers", "News & Media", "Contact"],
              },
              {
                t: "Partner",
                l: ["Franchise", "Partnerships", "Corporate", "Investors"],
              },
            ].map((c) => (
              <div key={c.t}>
                <div className="font-display font-semibold text-sm mb-4">
                  {c.t}
                </div>
                <ul className="space-y-2.5 text-sm text-milk/70">
                  {c.l.map((it) => (
                    <li key={it}>
                      <a href="#" className="hover:text-primary transition">
                        {it}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-milk/50">
            <div>© 2026 CHINGU. All Rights Reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary">
                Terms & Conditions
              </a>
              <a href="#" className="hover:text-primary">
                Refund Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  ) : null;
}
