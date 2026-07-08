import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useAdmissions } from "../../hooks/useAdmissions";

type AdmissionPoint = { month: string; admissions: number };

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color?: string;
    payload: unknown;
  }>;
  label?: string | number;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-xl px-4 py-3 shadow-lg"
        style={{
          background: "var(--tooltip-bg)",
          border: "1px solid var(--tooltip-border)",
        }}
      >
        <p className="text-caption" style={{ color: "var(--text-3)", marginBottom: "4px" }}>{label}</p>
        <p className="text-sm font-bold" style={{ color: "var(--accent-purple)" }}>
          {payload[0].value} admissions
        </p>
      </div>
    );
  }
  return null;
};

function Skeleton() {
  return (
    <div
      className="card"
      style={{ padding: "24px" }}
    >
      <div className="skeleton" style={{ height: "20px", width: "160px", marginBottom: "8px" }} />
      <div className="skeleton" style={{ height: "12px", width: "112px", marginBottom: "24px" }} />
      <div className="skeleton" style={{ height: "220px" }} />
    </div>
  );
}

export default function AdmissionsChart() {
  const { data, isLoading } = useAdmissions();

  if (isLoading) return <Skeleton />;

  const points = (data ?? []) as AdmissionPoint[];
  const totalAdmissions = points.reduce((s, p) => s + p.admissions, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="card card-hover h-full"
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between" style={{ marginBottom: "24px" }}>
        <div>
          <div className="flex items-center gap-2" style={{ marginBottom: "4px" }}>
            <div
              className="icon-box icon-box-sm icon-box-round"
              style={{
                background: "var(--brand-muted)",
                border: "1px solid var(--brand-border)",
              }}
            >
              <Users size={13} style={{ color: "var(--brand)" }} />
            </div>
            <h3 className="text-subhead" style={{ color: "var(--text-1)" }}>
              Admissions Trend
            </h3>
          </div>
          <p className="text-caption" style={{ color: "var(--text-3)" }}>
            Monthly admission volume
          </p>
        </div>

        <div
          className="rounded-lg px-2.5 py-1.5"
          style={{
            background: "var(--brand-muted)",
            border: "1px solid var(--brand-border)",
            textAlign: "right",
          }}
        >
          <p className="text-subhead" style={{ color: "var(--brand)" }}>
            {totalAdmissions.toLocaleString()}
          </p>
          <p className="text-caption" style={{ fontSize: "10px", color: "var(--text-2)" }}>Total</p>
        </div>
      </div>

      {/* Chart */}
      <div style={{ flex: 1, minHeight: "220px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={points} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
            <defs>
              <linearGradient id="admissionsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent-purple)" stopOpacity={0.9} />
                <stop offset="95%" stopColor="var(--brand)" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: "var(--chart-tick)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "var(--chart-tick)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--bg-hover)", opacity: 0.4 }} />
            <Bar
              dataKey="admissions"
              fill="url(#admissionsGrad)"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}