import { useState, useEffect } from "react";
import { ChevronDown, Home, Users, Shield, ArrowRight, Mail, Phone, Moon, Sun, Building2, Handshake } from "lucide-react";
import { toast } from "sonner";

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("tenant");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name || "Valued User",
          phone,
          interest,
          timestamp: new Date().toISOString(),
        }),
      });

      if (res.ok) {
        toast.success("You're on the list!");
        setSubmitted(true);
        setEmail("");
        setName("");
        setPhone("");
        setInterest("tenant");
        setTimeout(() => setSubmitted(false), 100000);
      } else {
        toast.error("Something went wrong. Try again.");
      }
    } catch (error) {
      toast.error("Connection error. Check your internet.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      q: "When will BomaLink launch?",
      a: "We're launching in Q3 2026! Early waitlist members get exclusive access and special perks.",
    },
    {
      q: "Is it free to use?",
      a: "Yes! BomaLink is free for tenants. Landlords get premium features with an optional subscription.",
    },
    {
      q: "What cities will BomaLink cover?",
      a: "We're starting with Nairobi with expansion planned for all major Kenyan cities.",
    },
    {
      q: "How do you keep my data safe?",
      a: "We use bank-level encryption and comply with Kenya's Data Protection Act. Your privacy is our priority.",
    },
  ];

  const textPrimaryClass = isDark ? "text-white" : "text-slate-900";
  const textSecondaryClass = isDark ? "text-slate-300" : "text-slate-600";
  const textMutedClass = isDark ? "text-slate-400" : "text-slate-500";
  const cardBgClass = isDark ? "bg-slate-800/30" : "bg-white";
  const cardBorderClass = isDark ? "border-[#FF007F]/25" : "border-[#FF007F]/20";

  return (
    <>
      {/* Fixed background image layer */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: imgLoaded ? "url('/house4.webp')" : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          // backgroundColor: isDark ? "#0A0A0A" : "#FFFFFF",
          backgroundColor: isDark ? "#0A0A0A" : "#F5F0EB",
          // backgroundColor: isDark ? "#0A0A0A" : "#F4F4F5",
          // backgroundColor: isDark ? "#0A0A0A" : "#F0F4F8",
          transition: "background-image 0.5s ease",
        }}
      />

      {/* Fixed overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundColor: isDark ? "rgba(10,10,10,0.85)" : "rgba(255,255,255,0.88)",
        }}
      />

      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute -top-20 -left-20 w-[36rem] h-[36rem] rounded-full blur-3xl"
          style={{ background: "#6E10A6", opacity: isDark ? 0.25 : 0.08 }}
        />
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: "#FF007F", transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ background: "#99CA43", transform: `translateY(${scrollY * -0.3}px)` }}
        />
      </div>

      {/* Scrollable content */}
      <div className="relative z-10 min-h-screen">
        {/* Image preloader */}
        <img src="/house4.webp" onLoad={() => setImgLoaded(true)} className="hidden" alt="" />

        {/* Navigation */}
        <nav className={`fixed top-0 w-full backdrop-blur-md border-b z-50 transition-colors duration-300 ${
          isDark ? "bg-slate-950/80 border-slate-800" : "bg-white/80 border-slate-200"
        }`}>
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold flex items-center gap-2">
              <img
                src="/bomalink-logo-png-Photoroom.png"
                alt="BomaLink logo"
                style={{ width: "40px", height: "40px", objectFit: "contain" }}
              />
              <div className="flex flex-col">
                <span style={{ color: isDark ? "#FFFFFF" : "#000000", fontSize: "20px", fontWeight: "bold", lineHeight: "1.2" }}>BomaLink</span>
              </div>
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg border transition ${
                isDark
                  ? "bg-slate-800/50 border-slate-700 hover:bg-slate-700/50"
                  : "bg-slate-100 border-slate-300 hover:bg-slate-200"
              }`}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <Sun className="w-5 h-5" style={{ color: "#99CA43" }} />
              ) : (
                <Moon className="w-5 h-5" style={{ color: "#FF007F" }} />
              )}
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative pt-28 pb-16 px-6 min-h-screen flex items-center justify-center overflow-hidden">
          <div className="relative w-full max-w-2xl">
            {/* Header */}
            <div className="text-center space-y-4 mb-12">
              <div
                className="inline-block px-4 py-2 rounded-full text-sm font-medium border"
                style={{
                  background: isDark ? "rgba(255, 0, 127, 0.2)" : "rgba(255, 0, 127, 0.1)",
                  borderColor: "#FF007F",
                  color: "#FF007F",
                }}
              >
                Smarter Housing, Stronger Cities
              </div>
              <h1 className={`text-4xl md:text-5xl font-black leading-tight ${textPrimaryClass}`}>
                Find Your Perfect Home
              </h1>
              <p className={`text-lg ${textSecondaryClass}`}>
                Get early access to BomaLink. Join 1000+ people waiting to revolutionize renting in Kenya.
              </p>
            </div>

            {/* Form Card */}
            {submitted ? (
              <div className={`${cardBgClass} border-2 ${cardBorderClass} rounded-2xl p-8 md:p-12 text-center space-y-6 backdrop-blur-sm`}>
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2"
                  style={{ background: "rgba(153, 202, 67, 0.2)", borderColor: "#99CA43" }}
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#99CA43" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h2 className={`text-3xl font-black mb-2 ${textPrimaryClass}`}>You're in! 🎉</h2>
                  <p className={textSecondaryClass}>
                    Check your email for updates. We'll notify you the moment BomaLink launches.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className={`${cardBgClass} border-2 ${cardBorderClass} rounded-2xl p-8 md:p-10 space-y-5 backdrop-blur-sm`}
              >
                {/* Email */}
                <div>
                  <label className={`block text-sm font-bold mb-3 ${textPrimaryClass}`}>Email *</label>
                  <div className="relative">
                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${isDark ? "text-slate-600" : "text-slate-400"}`} />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition focus:outline-none ${
                        isDark
                          ? "bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 focus:border-[#99CA43]"
                          : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#99CA43]"
                      }`}
                      required
                    />
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className={`block text-sm font-bold mb-3 ${textPrimaryClass}`}>Name (optional)</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border-2 transition focus:outline-none ${
                      isDark
                        ? "bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 focus:border-[#99CA43]"
                        : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#99CA43]"
                    }`}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className={`block text-sm font-bold mb-3 ${textPrimaryClass}`}>Phone (optional)</label>
                  <div className="relative">
                    <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${isDark ? "text-slate-600" : "text-slate-400"}`} />
                    <input
                      type="tel"
                      placeholder="+254 7XX XXX XXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition focus:outline-none ${
                        isDark
                          ? "bg-slate-800/50 border-slate-700 text-white placeholder-slate-500 focus:border-[#99CA43]"
                          : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#99CA43]"
                      }`}
                    />
                  </div>
                </div>

                {/* Interest */}
                <div>
                  <label className={`block text-sm font-bold mb-4 ${textPrimaryClass}`}>I'm interested in *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: "Tenant", label: "Looking to rent", icon: Home },
                      { id: "Landlord", label: "Want to rent out", icon: Building2 },
                      { id: "I'm looking for a roomate", label: "Looking for a roommate", icon: Handshake },
                    ].map((opt) => {
                      const Icon = opt.icon;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setInterest(opt.id)}
                          className={`flex sm:flex-col items-center sm:justify-center gap-3 sm:gap-2 p-4 rounded-lg border-2 transition font-bold text-sm text-left sm:text-center ${
                            interest === opt.id
                              ? isDark
                                ? "border-[#99CA43] bg-[#99CA43]/20 text-[#99CA43]"
                                : "border-[#99CA43] bg-[#99CA43]/10 text-[#4B6B1A]"
                              : isDark
                              ? "border-[#FF007F]/20 bg-slate-800/50 text-slate-400 hover:border-[#FF007F]/50"
                              : "border-[#FF007F]/15 bg-slate-50 text-slate-600 hover:border-[#FF007F]/40"
                          }`}
                        >
                          <Icon className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" />
                          <span>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-lg text-white font-bold hover:opacity-90 disabled:opacity-50 transition flex items-center justify-center gap-2 group mt-8"
                  style={{ background: "#FF007F" }}
                >
                  {loading ? "Joining..." : "Join the Waitlist"}
                  {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />}
                </button>

                <p className={`text-center text-xs ${textMutedClass}`}>
                  No spam. Unsubscribe anytime. We respect your privacy.
                </p>
              </form>
            )}

            {/* Trust badges */}
            <div className={`mt-12 grid grid-cols-3 gap-4 text-center ${isDark ? "text-slate-400" : "text-slate-600"}`}>
              <div>
                <p className="font-bold text-lg" style={{ color: "#FF007F" }}>1000+</p>
                <p className="text-sm">Waitlist members</p>
              </div>
              <div>
                <p className="font-bold text-lg" style={{ color: "#99CA43" }}>50+</p>
                <p className="text-sm">Cities covered</p>
              </div>
              <div>
                <p className="font-bold text-lg" style={{ color: "#FF007F" }}>Q3 2026</p>
                <p className="text-sm">Launch date</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={`py-20 px-6 transition-colors duration-300 ${isDark ? "bg-slate-900" : "bg-slate-50"}`}>
          <div className="max-w-6xl mx-auto">
            <h2 className={`text-4xl font-black text-center mb-16 ${textPrimaryClass}`}>Why BomaLink?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Safe & Secure",
                  desc: "Bank-level encryption. Verified profiles. Protected transactions.",
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Smart Matching",
                  desc: "AI-powered recommendations. Find your perfect fit faster.",
                },
                {
                  icon: <Home className="w-8 h-8" />,
                  title: "Real Homes",
                  desc: "Verified listings. Transparent pricing. No hidden fees.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className={`p-8 rounded-2xl border-2 transition space-y-4 ${
                    isDark
                      ? "bg-slate-800/30 border-[#FF007F]/25 hover:border-[#FF007F]/60"
                      : "bg-white border-[#FF007F]/20 hover:border-[#FF007F]/50"
                  }`}
                >
                  <div style={{ color: "#FF007F" }}>{feature.icon}</div>
                  <h3 className={`text-xl font-bold ${textPrimaryClass}`}>{feature.title}</h3>
                  <p className={textSecondaryClass}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={`py-20 px-6 transition-colors duration-300 ${isDark ? "bg-slate-950" : "bg-white"}`}>
          <div className="max-w-3xl mx-auto">
            <h2 className={`text-4xl font-black text-center mb-16 ${textPrimaryClass}`}>Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <button
                  key={i}
                  onClick={() => setActiveAccordion(activeAccordion === i ? -1 : i)}
                  className={`w-full text-left p-6 rounded-lg border-2 transition ${
                    isDark
                      ? "bg-slate-800/30 border-[#FF007F]/25 hover:border-[#FF007F]/60"
                      : "bg-white border-[#FF007F]/20 hover:border-[#FF007F]/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className={`font-bold ${textPrimaryClass}`}>{faq.q}</h3>
                    <ChevronDown
                      className="w-5 h-5 transition-transform"
                      style={{ color: "#FF007F", transform: activeAccordion === i ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </div>
                  {activeAccordion === i && (
                    <p className={`mt-4 leading-relaxed ${textSecondaryClass}`}>{faq.a}</p>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-12 px-6 text-center transition-colors duration-300 ${
          isDark ? "bg-slate-900 border-t border-slate-800 text-slate-500" : "bg-slate-50 border-t border-slate-200 text-slate-500"
        }`}>
          <p>© 2026 BomaLink. Smarter Housing, Stronger Cities.</p>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;