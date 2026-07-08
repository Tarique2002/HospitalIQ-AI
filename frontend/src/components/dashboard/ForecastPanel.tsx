import { motion } from "framer-motion";
import {
  BrainCircuit,
  IndianRupee,
  Users,
  BedDouble,
  TrendingUp,
  TrendingDown,
  Sparkles,
} from "lucide-react";
import { useForecast } from "../../hooks/useForecast";

type Forecast = {
  expected_revenue: number;
  expected_admissions: number;
  predicted_occupancy: number;
  confidence: number;
  trend: string;
};

function Skeleton() {
  return (
    <div
      className="card"
      style={{ padding: "24px" }}
    >
      <div className="skeleton" style={{ height: "20px", width: "160px", marginBottom: "8px" }} />
      <div className="skeleton" style={{ height: "12px", width: "112px", marginBottom: "24px" }} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton" style={{ height: "88px" }} />
        ))}
      </div>
    </div>
  );
}

function ForecastCard({
  icon: Icon,
  label,
  value,
  accent,
  accentMuted,
  accentBorder,
}: {
  icon: typeof BrainCircuit;
  label: string;
  value: string;
  accent: string;
  accentMuted: string;
  accentBorder: string;
}) {
  return (
    <div
      className="rounded-xl"
      style={{
        padding: "16px",
        background: accentMuted,
        border: `1px solid ${accentBorder}`,
      }}
    >
      <div className="flex items-center gap-2" style={{ marginBottom: "12px" }}>
        <Icon size={13} style={{ color: accent }} />
        <span className="text-caption" style={{ color: "var(--text-2)" }}>{label}</span>
      </div>
      <p className="text-subhead" style={{ fontSize: "1.125rem", color: "var(--text-1)" }}>{value}</p>
    </div>
  );
}

export default function ForecastPanel() {
  const { data, isLoading, isError } = useForecast();

  if (isLoading) return <Skeleton />;
  if (isError || !data) {
    return (
      <div
        className="card flex items-center justify-center"
        style={{
          padding: "24px",
          minHeight: "180px",
        }}
      >
        <p className="text-body" style={{ color: "var(--text-3)" }}>Forecast data unavailable</p>
      </div>
    );
  }

  const forecast = data as Forecast;
  const isIncreasing = forecast.trend === "Increasing";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="card card-hover h-full"
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: "24px" }}>
        <div className="flex items-center gap-3">
          <div
            className="icon-box icon-box-sm icon-box-round"
            style={{
              background: "var(--brand-muted)",
              border: "1px solid var(--brand-border)",
            }}
          >
            <BrainCircuit size={13} style={{ color: "var(--brand)" }} />
          </div>
          <div>
            <h3 className="text-subhead" style={{ color: "var(--text-1)" }}>
              AI Forecast
            </h3>
            <div className="flex items-center gap-1" style={{ marginTop: "2px" }}>
              <Sparkles size={10} style={{ color: "var(--brand)" }} />
              <p className="text-caption" style={{ color: "var(--text-3)" }}>
                Predictive Analytics
              </p>
            </div>
          </div>
        </div>

        {/* Confidence Badge */}
        <div
          className="rounded-lg px-2.5 py-1.5"
          style={{
            background: "var(--success-muted)",
            border: "1px solid rgba(34,197,94,0.2)",
            textAlign: "right",
          }}
        >
          <p className="text-subhead" style={{ color: "var(--success)" }}>
            {forecast.confidence}%
          </p>
          <p className="text-caption" style={{ fontSize: "10px", color: "var(--text-2)" }}>Confidence</p>
        </div>
      </div>

      {/* Forecast Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3" style={{ marginBottom: "16px" }}>
        <ForecastCard
          icon={IndianRupee}
          label="Exp. Revenue"
          value={`₹ ${(forecast.expected_revenue / 10_000_000).toFixed(2)} Cr`}
          accent="var(--accent-green)"
          accentMuted="var(--success-muted)"
          accentBorder="rgba(34,197,94,0.2)"
        />
        <ForecastCard
          icon={Users}
          label="Exp. Admissions"
          value={forecast.expected_admissions.toLocaleString()}
          accent="var(--brand)"
          accentMuted="var(--brand-muted)"
          accentBorder="var(--brand-border)"
        />
        <ForecastCard
          icon={BedDouble}
          label="Pred. Occupancy"
          value={`${forecast.predicted_occupancy}%`}
          accent="var(--warning)"
          accentMuted="var(--warning-muted)"
          accentBorder="rgba(245,158,11,0.2)"
        />
        <div
          className="rounded-xl"
          style={{
            padding: "16px",
            background: isIncreasing ? "var(--success-muted)" : "var(--danger-muted)",
            border: `1px solid ${isIncreasing ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
          }}
        >
          <div className="flex items-center gap-2" style={{ marginBottom: "12px" }}>
            {isIncreasing ? (
              <TrendingUp size={13} style={{ color: "var(--success)" }} />
            ) : (
              <TrendingDown size={13} style={{ color: "var(--danger)" }} />
            )}
            <span className="text-caption" style={{ color: "var(--text-2)" }}>Trend</span>
          </div>
          <p
            className="text-subhead"
            style={{ fontSize: "1.125rem", color: isIncreasing ? "var(--success)" : "var(--danger)" }}
          >
            {forecast.trend}
          </p>
        </div>
      </div>

      {/* Bottom info */}
      <div
        className="flex items-center gap-2"
        style={{ borderTop: "1px solid var(--border)", paddingTop: "16px" }}
      >
        <div
          className="w-2 h-2 rounded-full animate-pulse-dot"
          style={{ background: "var(--success)" }}
        />
        <p className="text-caption" style={{ color: "var(--text-3)" }}>
          AI model updated · next forecast in 24h
        </p>
      </div>
    </motion.div>
  );
}