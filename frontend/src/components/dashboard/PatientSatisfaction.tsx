import { motion } from "framer-motion";
import { HeartPulse, Clock, RefreshCw, Star } from "lucide-react";
import { usePatientSatisfaction } from "../../hooks/usePatientSatisfaction";

type SatisfactionData = {
  satisfaction: number;
  wait_time: number;
  average_stay: number;
  readmission_rate: number;
  rating: string;
};

function CircleProgress({ value, max = 100, color }: { value: number; max?: number; color: string }) {
  const pct = (value / max) * 100;
  const r = 42;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div className="relative w-24 h-24">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--border)" strokeWidth="6" />
        <motion.circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-subhead" style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-1)" }}>
          {value}%
        </span>
      </div>
    </div>
  );
}

export default function PatientSatisfaction() {
  const { data, isLoading, isError } = usePatientSatisfaction();

  if (isLoading) {
    return (
      <div
        className="card animate-pulse"
        style={{ padding: "24px" }}
      >
        <div className="skeleton" style={{ height: "20px", width: "160px", marginBottom: "20px" }} />
        <div className="skeleton rounded-full mx-auto" style={{ width: "96px", height: "96px", marginBottom: "20px" }} />
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="skeleton" style={{ height: "40px" }} />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div
        className="card flex items-center justify-center"
        style={{ padding: "24px", minHeight: "318px" }}
      >
        <p className="text-body" style={{ color: "var(--text-3)" }}>Data unavailable</p>
      </div>
    );
  }

  const sat = data as SatisfactionData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card card-hover h-full flex flex-col justify-between"
      style={{
        padding: "24px",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2" style={{ marginBottom: "24px" }}>
        <div
          className="icon-box icon-box-sm icon-box-round"
          style={{
            background: "var(--brand-muted)",
            border: "1px solid var(--brand-border)",
          }}
        >
          <HeartPulse size={13} style={{ color: "var(--accent-pink)" }} />
        </div>
        <h3 className="text-subhead" style={{ color: "var(--text-1)" }}>
          Patient Satisfaction
        </h3>
      </div>

      {/* Score circle */}
      <div className="flex flex-col items-center" style={{ marginBottom: "24px" }}>
        <CircleProgress value={sat.satisfaction} color="var(--accent-pink)" />
        <div style={{ marginTop: "12px" }}>
          <span className="badge badge-success">
            <Star size={10} fill="currentColor" style={{ marginRight: "2px" }} />
            {sat.rating}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-2">
        {[
          { icon: Clock, label: "Avg Wait Time", value: `${sat.wait_time} hrs`, color: "var(--accent-amber)" },
          { icon: HeartPulse, label: "Avg Stay", value: `${sat.average_stay} days`, color: "var(--accent-blue)" },
          { icon: RefreshCw, label: "Readmission Rate", value: `${sat.readmission_rate}%`, color: "var(--accent-purple)" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-lg"
            style={{
              padding: "10px 12px",
              background: "var(--bg-hover)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center gap-2">
              <item.icon size={13} style={{ color: item.color }} />
              <span className="text-caption" style={{ color: "var(--text-2)" }}>{item.label}</span>
            </div>
            <span className="text-caption font-semibold" style={{ color: "var(--text-1)" }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}