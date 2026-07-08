import { motion } from "framer-motion";
import {
  BrainCircuit,
  ShieldAlert,
  BadgeCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useInsights } from "../../hooks/useInsights";

type AIInsight = {
  summary: string;
  risk: string;
  confidence: number;
  recommendations: string[];
};

function Skeleton() {
  return (
    <div
      className="card"
      style={{
        padding: "24px",
      }}
    >
      <div className="skeleton" style={{ height: "20px", width: "128px", marginBottom: "16px" }} />
      <div className="skeleton" style={{ height: "14px", width: "100%", marginBottom: "8px" }} />
      <div className="skeleton" style={{ height: "14px", width: "75%", marginBottom: "24px" }} />
      <div className="space-y-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="skeleton" style={{ height: "40px" }} />
        ))}
      </div>
    </div>
  );
}

const riskConfig: Record<string, { color: string; bg: string; border: string }> = {
  High: { color: "var(--danger)", bg: "var(--danger-muted)", border: "rgba(239,68,68,0.2)" },
  Medium: { color: "var(--warning)", bg: "var(--warning-muted)", border: "rgba(245,158,11,0.2)" },
  Low: { color: "var(--success)", bg: "var(--success-muted)", border: "rgba(34,197,94,0.2)" },
};

export default function AIInsightsPanel() {
  const { data, isLoading, isError } = useInsights();

  if (isLoading) return <Skeleton />;

  if (isError || !data) {
    return (
      <div
        className="card flex items-center justify-center"
        style={{
          padding: "24px",
          minHeight: "318px",
        }}
      >
        <p className="text-body" style={{ color: "var(--text-3)" }}>AI insights unavailable</p>
      </div>
    );
  }

  const insight = data as AIInsight;
  const risk = riskConfig[insight.risk] ?? riskConfig.Low;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="card card-hover h-full flex flex-col"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
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
            AI Insights
          </h3>
          <div className="flex items-center gap-1" style={{ marginTop: "2px" }}>
            <Sparkles size={10} style={{ color: "var(--brand)" }} />
            <p className="text-caption" style={{ color: "var(--text-3)" }}>
              Executive Assistant
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Summary */}
        <p className="text-body" style={{ color: "var(--text-2)", lineHeight: "1.5" }}>
          {insight.summary}
        </p>

        {/* Risk & Confidence */}
        <div className="grid grid-cols-2 gap-3">
          <div
            className="rounded-xl"
            style={{ padding: "12px", background: risk.bg, border: `1px solid ${risk.border}` }}
          >
            <div className="flex items-center gap-1 mb-1">
              <ShieldAlert size={12} style={{ color: risk.color }} />
              <span className="text-caption" style={{ color: "var(--text-2)" }}>Risk Level</span>
            </div>
            <p className="text-subhead" style={{ color: risk.color }}>
              {insight.risk}
            </p>
          </div>

          <div
            className="rounded-xl"
            style={{
              padding: "12px",
              background: "var(--brand-muted)",
              border: "1px solid var(--brand-border)",
            }}
          >
            <div className="flex items-center gap-1 mb-1">
              <BadgeCheck size={12} style={{ color: "var(--brand)" }} />
              <span className="text-caption" style={{ color: "var(--text-2)" }}>Confidence</span>
            </div>
            <p className="text-subhead" style={{ color: "var(--brand)" }}>
              {insight.confidence}%
            </p>
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <p className="text-label" style={{ marginBottom: "12px" }}>
            Recommendations
          </p>
          <div className="space-y-2">
            {insight.recommendations.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 + 0.2 }}
                className="flex items-start gap-2.5 rounded-lg"
                style={{
                  padding: "10px 12px",
                  background: "var(--bg-hover)",
                  border: "1px solid var(--border)",
                }}
              >
                <CheckCircle2
                  size={13}
                  className="flex-shrink-0"
                  style={{ color: "var(--success)", marginTop: "2px" }}
                />
                <span className="text-caption" style={{ color: "var(--text-2)", lineHeight: "1.4" }}>
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="text-caption mt-auto" style={{ color: "var(--text-3)", borderTop: "1px solid var(--border)", paddingTop: "12px" }}>
          Generated by HospitalIQ AI · Just now
        </p>
      </div>
    </motion.div>
  );
}
