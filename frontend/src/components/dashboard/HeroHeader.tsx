import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Activity, Calendar, Clock } from "lucide-react";
import type { User } from "../../api/auth";

function useLiveClock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function HeroHeader({ user }: { user: User | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-80, 80], [2, -2]), { stiffness: 300, damping: 40 });
  const rotateY = useSpring(useTransform(mouseX, [-80, 80], [-2, 2]), { stiffness: 300, damping: 40 });

  const now = useLiveClock();
  const firstName = user?.name?.split(" ")[0] ?? user?.email?.split("@")[0] ?? "Admin";

  const dateStr = now.toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long",
  });
  const timeStr = now.toLocaleTimeString("en-IN", {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mouseX.set(e.clientX - r.left - r.width / 2);
    mouseY.set(e.clientY - r.top - r.height / 2);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1200 }}
    >
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          padding: "28px 32px",
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent 0%, var(--brand) 40%, var(--accent-purple) 70%, transparent 100%)",
            opacity: 0.6,
          }}
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Left: greeting */}
          <div>
            {/* Label */}
            <div className="flex items-center gap-2 mb-3">
              <div
                className="flex items-center justify-center rounded"
                style={{ width: 20, height: 20, background: "var(--brand-muted)" }}
              >
                <Activity size={11} style={{ color: "var(--brand)" }} />
              </div>
              <span className="text-label" style={{ color: "var(--brand)" }}>
                Executive Dashboard
              </span>
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
                style={{ background: "var(--success)", marginLeft: 4 }}
              />
              <span className="text-caption">Live</span>
            </div>

            {/* Heading */}
            <h1
              className="font-bold leading-tight"
              style={{ fontSize: "1.625rem", letterSpacing: "-0.025em", color: "var(--text-1)" }}
            >
              {getGreeting()},{" "}
              <span className="gradient-text">{firstName}</span>
            </h1>
            <p className="text-body mt-1">
              Here's what's happening at your hospital today.
            </p>
          </div>

          {/* Right: date + time */}
          <div
            className="flex items-center gap-4 rounded-xl px-4 py-3 flex-shrink-0"
            style={{
              background: "var(--bg-hover)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center gap-2">
              <Calendar size={13} style={{ color: "var(--text-3)" }} />
              <span className="text-caption" style={{ color: "var(--text-2)" }}>{dateStr}</span>
            </div>
            <div style={{ width: 1, height: 16, background: "var(--border)" }} />
            <div className="flex items-center gap-2">
              <Clock size={13} style={{ color: "var(--text-3)" }} />
              <span
                className="font-mono text-xs font-semibold"
                style={{ color: "var(--brand)", letterSpacing: "0.04em" }}
              >
                {timeStr}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
