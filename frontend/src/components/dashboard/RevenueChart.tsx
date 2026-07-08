import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, IndianRupee } from "lucide-react";
import { useRevenue } from "../../hooks/useRevenue";

type RevenuePoint = { month: string; revenue: number };

function SkeletonChart() {
  return (
    <div
      className="card"
      style={{
        padding: "24px",
      }}
    >
      <div className="skeleton" style={{ height: "20px", width: "160px", marginBottom: "8px" }} />
      <div className="skeleton" style={{ height: "12px", width: "112px", marginBottom: "24px" }} />
      <div className="skeleton" style={{ height: "220px" }} />
    </div>
  );
}

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
        <p className="text-sm font-bold" style={{ color: "var(--brand)" }}>
          ₹ {(payload[0].value / 10_000_000).toFixed(2)} Cr
        </p>
      </div>
    );
  }
  return null;
};

export default function RevenueChart() {
  const { data, isLoading, isError } = useRevenue();

  if (isLoading) return <SkeletonChart />;

  const points = (data ?? []) as RevenuePoint[];

  if (isError || points.length === 0) {
    return (
      <div
        className="card flex items-center justify-center"
        style={{
          padding: "24px",
          minHeight: "318px",
        }}
      >
        <p className="text-body" style={{ color: "var(--text-3)" }}>No revenue data available</p>
      </div>
    );
  }

  const total = points.reduce((sum, p) => sum + p.revenue, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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
              <IndianRupee size={13} style={{ color: "var(--brand)" }} />
            </div>
            <h3 className="text-subhead" style={{ color: "var(--text-1)" }}>
              Revenue Trend
            </h3>
          </div>
          <p className="text-caption" style={{ color: "var(--text-3)" }}>
            Monthly revenue overview
          </p>
        </div>

        <div className="text-right">
          <p className="text-title" style={{ fontSize: "1.5rem" }}>
            ₹ {(total / 10_000_000).toFixed(1)} Cr
          </p>
          <div className="flex items-center gap-1 justify-end" style={{ marginTop: "4px" }}>
            <TrendingUp size={12} style={{ color: "var(--success)" }} />
            <span className="text-caption font-semibold" style={{ color: "var(--success)" }}>+12.4% YoY</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ flex: 1, minHeight: "220px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={points} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--brand)" stopOpacity={0.25} />
                <stop offset="95%" stopColor="var(--brand)" stopOpacity={0} />
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
              tickFormatter={(v) => `₹${(v / 1_000_000).toFixed(0)}M`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--border-strong)", strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--brand)"
              strokeWidth={2}
              fill="url(#revenueGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "var(--brand)", strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}