import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Lock,
  Mail,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useAuthContext } from "../../context/AuthContext";

export default function LoginForm() {
  const navigate = useNavigate();
  const auth = useAuth();
  const { login } = useAuthContext();

  const [email, setEmail] = useState("admin@hospitaliq.com");
  const [password, setPassword] = useState("hospitaliq2026");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const result = await auth.mutateAsync({ email, password });
      await login(result.access_token);
      navigate("/");
    } catch {
      setError("Invalid email or password. Please try again.");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4"
      style={{ background: "#09090b" }}
    >
      {/* Premium Ambient Background */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none filter blur-[120px]"
        style={{
          width: "450px",
          height: "450px",
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.05) 50%, transparent 100%)",
        }}
      />
      <div 
        className="absolute top-1/4 left-1/3 rounded-full pointer-events-none filter blur-[100px]"
        style={{
          width: "300px",
          height: "300px",
          background: "rgba(6,182,212,0.06)",
        }}
      />

      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[420px] relative z-10"
      >
        <div
          className="rounded-3xl p-8 relative overflow-hidden"
          style={{
            background: "rgba(17, 17, 23, 0.75)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
          }}
        >
          {/* Header Accent Line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), rgba(6,182,212,0.3), transparent)",
            }}
          />

          {/* Logo & Subtitle */}
          <div className="flex flex-col items-center text-center mb-8">
            <div
              className="flex items-center justify-center rounded-2xl mb-4"
              style={{
                width: "48px",
                height: "48px",
                background: "linear-gradient(135deg, var(--brand) 0%, var(--accent-purple) 100%)",
                boxShadow: "0 8px 24px rgba(99,102,241,0.25)",
              }}
            >
              <Activity size={22} color="white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white mb-1.5">
              Sign in to HospitalIQ
            </h1>
            <p className="text-sm" style={{ color: "var(--text-3)" }}>
              Enterprise Hospital Intelligence Platform
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold" style={{ color: "var(--text-2)" }}>
                Email Address
              </label>
              <div className="relative">
                <Mail 
                  size={15} 
                  className="absolute left-3.5 top-1/2 -translate-y-1/2" 
                  style={{ color: "var(--text-3)" }} 
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-premium w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm text-white"
                  style={{ 
                    background: "rgba(255, 255, 255, 0.03)", 
                    borderColor: "var(--border)",
                  }}
                  placeholder="admin@hospitaliq.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold" style={{ color: "var(--text-2)" }}>
                Password
              </label>
              <div className="relative">
                <Lock 
                  size={15} 
                  className="absolute left-3.5 top-1/2 -translate-y-1/2" 
                  style={{ color: "var(--text-3)" }} 
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-premium w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm text-white"
                  style={{ 
                    background: "rgba(255, 255, 255, 0.03)", 
                    borderColor: "var(--border)",
                  }}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-white transition-colors"
                  style={{ color: "var(--text-3)" }}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="rounded-xl px-4 py-3 text-xs border flex items-center gap-2"
                  style={{
                    background: "var(--danger-muted)",
                    borderColor: "rgba(239,68,68,0.2)",
                    color: "var(--danger)",
                  }}
                >
                  <span>⚠️</span>
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={auth.isPending}
              className="w-full btn-primary py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm mt-3"
              style={{ boxShadow: "0 4px 12px rgba(99,102,241,0.2)" }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {auth.isPending ? (
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 rounded-full border-2"
                    style={{
                      borderColor: "rgba(255,255,255,0.3)",
                      borderTopColor: "white",
                    }}
                  />
                  <span>Signing In...</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span>Sign In</span>
                  <ArrowRight size={14} />
                </div>
              )}
            </motion.button>
          </form>

          {/* Demo Credentials Info Panel */}
          <div
            className="mt-6 p-4 rounded-2xl border"
            style={{
              background: "rgba(255,255,255,0.02)",
              borderColor: "var(--border)",
            }}
          >
            <p className="text-[10px] font-bold tracking-wider uppercase mb-2" style={{ color: "var(--text-3)" }}>
              DEMO CREDENTIALS
            </p>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span style={{ color: "var(--text-3)" }}>Email:</span>
                <span className="font-medium text-white">admin@hospitaliq.com</span>
              </div>
              <div className="flex justify-between text-xs">
                <span style={{ color: "var(--text-3)" }}>Password:</span>
                <span className="font-medium text-white">hospitaliq2026</span>
              </div>
            </div>
          </div>

          {/* Legal / Compliance Info */}
          <div className="mt-6 pt-5 border-t text-center flex items-center justify-center gap-1.5" style={{ borderColor: "var(--border)", color: "var(--text-3)" }}>
            <ShieldCheck size={13} style={{ color: "var(--success)" }} />
            <span className="text-[11px]">HIPAA Compliant · SOC 2 Type II</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}