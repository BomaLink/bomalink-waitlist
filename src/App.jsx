import { useState, useEffect } from "react";
import { ChevronDown, Home, Users, Shield, ArrowRight, Mail, Phone } from "lucide-react";
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

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        setTimeout(() => setSubmitted(false), 4000);
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
      a: "We're launching in Q2 2024! Early waitlist members get exclusive access and special perks.",
    },
    {
      q: "Is it free to use?",
      a: "Yes! BomaLink is free for tenants. Landlords get premium features with an optional subscription.",
    },
    {
      q: "What cities will BomaLink cover?",
      a: "We're starting with Nairobi, Mombasa, and Kisumu, with expansion planned for all major Kenyan cities.",
    },
    {
      q: "How do you keep my data safe?",
      a: "We use bank-level encryption and comply with Kenya's Data Protection Act. Your privacy is our priority.",
    },
    {
      q: "Can I use it on mobile?",
      a: "Absolutely! BomaLink is fully optimized for iOS and Android.",
    },
  ];

  return (
    <div className="overflow-hidden min-h-screen" style={{ background: "linear-gradient(135deg, #6E10A6 0%, #1C1C2E 50%, #0A0A0A 100%)" }}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20" 
          style={{ background: "#FF007F", transform: `translateY(${scrollY * 0.5}px)` }} 
        />
        <div 
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-20" 
          style={{ background: "#99CA43", transform: `translateY(${scrollY * -0.3}px)` }} 
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 w-full backdrop-blur-md border-b z-50" style={{ background: "rgba(26, 26, 46, 0.8)", borderColor: "#FF007F" }}>
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold flex items-center gap-2">
              <div className="text-3xl font-black" style={{ color: "#FF007F" }}>B</div>
              <div className="flex flex-col">
                <span style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: "bold", lineHeight: "1.2" }}>BOMA</span>
                <span style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: "bold", lineHeight: "1.2" }}>LINK</span>
              </div>
              <div className="h-6 w-1 ml-2" style={{ background: "#99CA43" }} />
            </div>
            <div className="text-sm text-gray-300">Coming Soon</div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 rounded-full text-sm font-medium border" 
                  style={{ background: "rgba(255, 0, 127, 0.2)", borderColor: "#FF007F", color: "#FF007F" }}>
                  ✨ Smarter Housing, Stronger Cities
                </div>
                <h1 className="text-5xl lg:text-6xl font-black leading-tight" style={{ color: "#FFFFFF" }}>
                  Find Your Perfect Home,{" "}
                  <span style={{ color: "#FF007F" }}>
                    Stress-Free
                  </span>
                </h1>
              </div>

              <p className="text-lg leading-relaxed" style={{ color: "#D0D0D0" }}>
                BomaLink connects tenants and landlords across Kenya with smart matching, secure payments, and transparent communication. No middlemen. No hassle.
              </p>

              <div className="flex gap-4 pt-4">
                <div className="flex items-center gap-3" style={{ color: "#99CA43" }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: "#99CA43" }} />
                  <span>Transparent pricing</span>
                </div>
                <div className="flex items-center gap-3" style={{ color: "#99CA43" }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: "#99CA43" }} />
                  <span>Verified profiles</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8" style={{ borderTop: "1px solid rgba(255, 0, 127, 0.2)" }}>
                <div>
                  <p className="text-2xl font-black" style={{ color: "#FF007F" }}>1000+</p>
                  <p className="text-sm" style={{ color: "#999" }}>Waitlist members</p>
                </div>
                <div>
                  <p className="text-2xl font-black" style={{ color: "#99CA43" }}>50+</p>
                  <p className="text-sm" style={{ color: "#999" }}>Cities covered</p>
                </div>
                <div>
                  <p className="text-2xl font-black" style={{ color: "#FF007F" }}>Q2 2024</p>
                  <p className="text-sm" style={{ color: "#999" }}>Launch date</p>
                </div>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative h-96 lg:h-full">
              <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(255, 0, 127, 0.2), rgba(153, 202, 67, 0.2))" }} />
              <div className="relative h-full rounded-2xl border-2 overflow-hidden flex items-center justify-center" style={{ borderColor: "#FF007F" }}>
                <div className="text-center space-y-4 p-8">
                  <Home className="w-16 h-16 mx-auto" style={{ color: "#FF007F" }} />
                  <p className="text-xl font-bold" style={{ color: "#FFFFFF" }}>Join thousands finding home</p>
                  <p style={{ color: "#999" }}>Get early access and exclusive perks</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scroll indicator */}
        <div className="flex justify-center animate-bounce">
          <ChevronDown className="w-6 h-6" style={{ color: "#FF007F" }} />
        </div>

        {/* Waitlist Section */}
        <section id="waitlist" className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            {submitted ? (
              <div className="text-center space-y-6 py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2" style={{ background: "rgba(153, 202, 67, 0.2)", borderColor: "#99CA43" }}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#99CA43" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-black" style={{ color: "#FFFFFF" }}>You're in! 🎉</h2>
                <p className="text-lg" style={{ color: "#D0D0D0" }}>
                  Check your email for updates. We'll notify you the moment BomaLink launches.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center space-y-3 mb-8">
                  <h2 className="text-3xl font-black" style={{ color: "#FFFFFF" }}>Get Early Access</h2>
                  <p style={{ color: "#999" }}>Be the first to use BomaLink. Launch perks included.</p>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold mb-3" style={{ color: "#D0D0D0" }}>Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" style={{ color: "#666" }} />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border-2 text-white placeholder-gray-500 focus:outline-none transition"
                      style={{ 
                        background: "rgba(255, 255, 255, 0.05)",
                        borderColor: "#FF007F",
                        focusBorderColor: "#99CA43"
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-bold mb-3" style={{ color: "#D0D0D0" }}>Name (optional)</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 text-white placeholder-gray-500 focus:outline-none transition"
                    style={{ 
                      background: "rgba(255, 255, 255, 0.05)",
                      borderColor: "#FF007F"
                    }}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-bold mb-3" style={{ color: "#D0D0D0" }}>Phone (optional)</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" style={{ color: "#666" }} />
                    <input
                      type="tel"
                      placeholder="+254 7XX XXX XXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border-2 text-white placeholder-gray-500 focus:outline-none transition"
                      style={{ 
                        background: "rgba(255, 255, 255, 0.05)",
                        borderColor: "#FF007F"
                      }}
                    />
                  </div>
                </div>

                {/* Interest */}
                <div>
                  <label className="block text-sm font-bold mb-4" style={{ color: "#D0D0D0" }}>I'm interested in *</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "tenant", label: "Looking to rent", icon: "🏠" },
                      { id: "landlord", label: "Want to rent out", icon: "🏢" },
                      { id: "both", label: "Both", icon: "🔄" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setInterest(opt.id)}
                        className="p-4 rounded-lg border-2 transition font-bold text-sm"
                        style={{
                          background: interest === opt.id ? "rgba(255, 0, 127, 0.2)" : "rgba(255, 255, 255, 0.05)",
                          borderColor: interest === opt.id ? "#FF007F" : "#333",
                          color: interest === opt.id ? "#FF007F" : "#999"
                        }}
                      >
                        <div className="text-2xl mb-2">{opt.icon}</div>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-lg text-white font-bold hover:opacity-90 disabled:opacity-50 transition flex items-center justify-center gap-2 group mt-8"
                  style={{ background: "linear-gradient(135deg, #FF007F, #99CA43)" }}
                >
                  {loading ? "Joining..." : "Join the Waitlist"}
                  {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />}
                </button>

                <p className="text-center text-xs" style={{ color: "#666" }}>
                  No spam. Unsubscribe anytime. We respect your privacy.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6" style={{ background: "rgba(26, 26, 46, 0.5)" }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-16" style={{ color: "#FFFFFF" }}>Why BomaLink?</h2>

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
                  className="p-8 rounded-2xl border-2 hover:border-opacity-100 transition space-y-4 group"
                  style={{ 
                    background: "rgba(255, 255, 255, 0.05)",
                    borderColor: "#FF007F",
                    borderOpacity: 0.3
                  }}
                >
                  <div style={{ color: "#FF007F" }}>{feature.icon}</div>
                  <h3 className="text-xl font-bold" style={{ color: "#FFFFFF" }}>{feature.title}</h3>
                  <p style={{ color: "#999" }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-16" style={{ color: "#FFFFFF" }}>Frequently Asked Questions</h2>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <button
                  key={i}
                  onClick={() => setActiveAccordion(activeAccordion === i ? -1 : i)}
                  className="w-full text-left p-6 rounded-lg border-2 hover:border-opacity-100 transition"
                  style={{ 
                    background: "rgba(255, 255, 255, 0.05)",
                    borderColor: "#FF007F",
                    borderOpacity: 0.3
                  }}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold" style={{ color: "#FFFFFF" }}>{faq.q}</h3>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform`}
                      style={{ color: "#FF007F", transform: activeAccordion === i ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </div>
                  {activeAccordion === i && (
                    <p className="mt-4 leading-relaxed" style={{ color: "#999" }}>{faq.a}</p>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 text-center" style={{ borderTop: "1px solid rgba(255, 0, 127, 0.2)", color: "#666" }}>
          <p>© 2024 BomaLink. Smarter Housing, Stronger Cities.</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;