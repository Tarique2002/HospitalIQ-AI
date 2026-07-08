import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Eye,
  EyeOff,
  ArrowRight,
  Brain,
  BarChart3,
  Shield,
  Stethoscope,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useAuthContext } from "../../context/AuthContext";

const floatingStats = [
  { icon: Brain, label: "AI Predictions", value: "94% Accuracy", color: "#4f8ef7" },
  { icon: BarChart3, label: "Revenue Forecast", value: "+12.4% Growth", color: "#7c3aed" },
  { icon: Shield, label: "Security", value: "HIPAA Compliant", color: "#10b981" },
  { icon: Stethoscope, label: "Departments", value: "12 Active", color: "#06b6d4" },
];

export default function LoginForm() {
  const navigate = useNavigate();
  const auth = useAuth();
  const { login } = useAuthContext();

  const [email, setEmail] = useState("admin@hospitaliq.ai");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Animated Background */}
      <div className="app-bg" />

      {/* Mouse-tracked glow */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(79,142,247,0.12) 0%, transparent 70%)",
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 100 }}
      />

      {/* Floating Stats Cards */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingStats.map((stat, i) => (
          <motion.div
            key={i}
            className="absolute glass-card px-4 py-3 flex items-center gap-3"
            style={{
              top: `${15 + i * 18}%`,
              right: `${i % 2 === 0 ? "6%" : "8%"}`,
              opacity: 0.6,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 3 + i * 0.7,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          >
            <stat.icon size={16} style={{ color: stat.color }} />
            <div>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
              <p className="text-xs font-semibold" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div
          className="rounded-2xl p-8 relative overflow-hidden"
          style={{
            background: "rgba(10, 15, 30, 0.9)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 24px 96px rgba(0,0,0,0.6), 0 0 80px rgba(79,142,247,0.08)",
          }}
        >
          {/* Gradient top accent */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(79,142,247,0.6), rgba(124,58,237,0.4), transparent)",
            }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center mb-8"
          >
            <div
              className="flex items-center justify-center rounded-2xl mb-4"
              style={{
                width: 56,
                height: 56,
                background: "linear-gradient(135deg, #4f8ef7, #7c3aed)",
                boxShadow: "0 8px 32px rgba(79,142,247,0.4)",
              }}
            >
              <Activity size={28} color="white" />
            </div>
            <h1
              className="text-2xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              HospitalIQ AI
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              Enterprise Hospital Intelligence Platform
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleLogin}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {/* Email */}
            <div>
              <label
                className="block text-xs font-medium mb-1.5"
                style={{ color: "var(--text-secondary)" }}
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-premium"
                placeholder="admin@hospitaliq.ai"
                required
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-xs font-medium mb-1.5"
                style={{ color: "var(--text-secondary)" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-premium pr-10"
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-muted)" }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="rounded-lg px-4 py-3 text-sm"
                  style={{
                    background: "rgba(239,68,68,0.12)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    color: "#f87171",
                  }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={auth.isPending}
              className="w-full btn-primary py-3 mt-2"
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
                  <span>Authenticating...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Sign In</span>
                  <ArrowRight size={16} />
                </div>
              )}
            </motion.button>
          </motion.form>

          {/* Demo credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-4 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p className="text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>
              DEMO CREDENTIALS
            </p>
            <div className="space-y-1">
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                <span style={{ color: "var(--text-muted)" }}>Email: </span>
                admin@hospitaliq.ai
              </p>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                <span style={{ color: "var(--text-muted)" }}>Password: </span>
                admin123
              </p>
            </div>
          </motion.div>

          {/* Footer */}
          <p className="text-center text-xs mt-6" style={{ color: "var(--text-muted)" }}>
            HIPAA Compliant · Enterprise Grade · SOC 2 Type II
          </p>
        </div>
      </motion.div>
    </div>
  );
}