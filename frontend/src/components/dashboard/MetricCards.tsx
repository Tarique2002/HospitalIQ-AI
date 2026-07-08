import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Users, BedDouble, IndianRupee, UserRoundCheck,
  TrendingUp, TrendingDown,
} from "lucide-react";
import { useDashboard } from "../../hooks/useDashboard";

/* ── Animated counter ─────────────────────────── */
function AnimatedNumber({ target, prefix = "", suffix = "" }: {
  target: number; prefix?: string; suffix?: string;
}) {
  const [current, setCurrent] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const duration = 1400;
    startRef.current = null;
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const t = Math.min((ts - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCurrent(Math.floor(eased * target));
      if (t < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target]);

  return <span>{prefix}{current.toLocaleString()}{suffix}</span>;
}

/* ── Card config ──────────────────────────────── */
const CARDS = [
  {
    key: "total_patients" as const,
    label: "Total Patients",
    description: "Active records",
    icon: Users,
    color: "#6366f1",
    colorMuted: "rgba(99,102,241,0.12)",
    trend: "+4.2%",
    positive: true,
    isRevenue: false,
  },
  {
    key: "total_doctors" as const,
    label: "Medical Staff",
    description: "Registered doctors",
    icon: UserRoundCheck,
    color: "#8b5cf6",
    colorMuted: "rgba(139,92,246,0.12)",
    trend: "+1.8%",
    positive: true,
    isRevenue: false,
  },
  {
    key: "total_beds" as const,
    label: "Total Beds",
    description: "Hospital capacity",
    icon: BedDouble,
    color: "#06b6d4",
    colorMuted: "rgba(6,182,212,0.12)",
    trend: "Stable",
    positive: true,
    isRevenue: false,
  },
  {
    key: "total_revenue" as const,
    label: "Revenue",
    description: "This quarter",
    icon: IndianRupee,
    color: "#10b981",
    colorMuted: "rgba(16,185,129,0.12)",
    trend: "+12.5%",
    positive: true,
    isRevenue: true,
  },
] as const;

type DashboardData = {
  total_patients: number; total_doctors: number;
  total_beds: number; total_revenue: number;
  occupied_beds: number; current_occupancy: number; risk_level: string;
};

/* ── Skeleton ─────────────────────────────────── */
function Skeleton() {
  return (
    <div className="card" style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div className="skeleton" style={{ width: 120, height: 14 }} />
        <div className="skeleton icon-box icon-box-md icon-box-round" />
      </div>
      <div className="skeleton" style={{ width: 80, height: 32, marginBottom: 12 }} />
      <div className="skeleton" style={{ width: 100, height: 12 }} />
    </div>
  );
}

/* ── Main ─────────────────────────────────────── */
export default function MetricCards() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {[...Array(4)].map((_, i) => <Skeleton key={i} />)}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div
        className="card"
        style={{ padding: 20, color: "var(--danger)", borderColor: "rgba(239,68,68,0.3)",
          background: "var(--danger-muted)" }}
      >
        Failed to load metrics. Please check your connection.
      </div>
    );
  }

  const db = data as DashboardData;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {CARDS.map((card, i) => {
        const rawValue = db[card.key] ?? 0;
        const displayValue = card.isRevenue
          ? parseFloat((rawValue / 10_000_000).toFixed(2))
          : rawValue;

        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            whileHover={{ y: -2 }}
            className="card card-hover"
            style={{ padding: 24, cursor: "default" }}
          >
            {/* Header row */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <p className="text-subhead" style={{ marginBottom: 2 }}>{card.label}</p>
                <p className="text-caption">{card.description}</p>
              </div>

              {/* Icon — perfectly centered circle */}
              <div
                className="icon-box icon-box-md icon-box-round"
                style={{
                  background: card.colorMuted,
                  border: `1px solid ${card.color}25`,
                  flexShrink: 0,
                }}
              >
                <card.icon size={17} style={{ color: card.color, display: "block" }} />
              </div>
            </div>

            {/* Value */}
            <p
              style={{
                fontSize: "1.875rem",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "var(--text-1)",
                lineHeight: 1,
                marginBottom: 12,
              }}
            >
              {card.isRevenue ? (
                <>₹<AnimatedNumber target={Math.round(displayValue * 100)} /> <span style={{ fontSize: "1rem", fontWeight: 500 }}>Cr</span></>
              ) : (
                <AnimatedNumber target={rawValue as number} />
              )}
            </p>

            {/* Trend */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {card.trend !== "Stable" ? (
                card.positive
                  ? <TrendingUp size={12} style={{ color: "var(--success)" }} />
                  : <TrendingDown size={12} style={{ color: "var(--danger)" }} />
              ) : null}
              <span
                className="text-caption"
                style={{
                  fontWeight: 600,
                  color: card.trend === "Stable"
                    ? "var(--text-3)"
                    : card.positive ? "var(--success)" : "var(--danger)",
                }}
              >
                {card.trend}
              </span>
              {card.trend !== "Stable" && (
                <span className="text-caption">vs last month</span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
