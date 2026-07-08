import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { BedDouble } from "lucide-react";
import { useOccupancy } from "../../hooks/useOccupancy";

type OccupancyData = { name: string; value: number };

const COLORS = {
  Occupied: "var(--danger)",
  Available: "var(--success)",
  Maintenance: "var(--warning)",
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color?: string;
    payload: {
      fill?: string;
    };
  }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-xl px-4 py-3 shadow-lg"
        style={{
          background: "var(--tooltip-bg)",
          border: "1px solid var(--tooltip-border)",
        }}
      >
        <p className="text-caption" style={{ color: "var(--text-3)", marginBottom: "4px" }}>{payload[0].name}</p>
        <p className="text-sm font-bold" style={{ color: payload[0].payload.fill }}>
          {payload[0].value} beds
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
      <div className="skeleton" style={{ height: "20px", width: "144px", marginBottom: "8px" }} />
      <div className="skeleton" style={{ height: "12px", width: "96px", marginBottom: "24px" }} />
      <div className="flex justify-center">
        <div className="skeleton rounded-full" style={{ width: "160px", height: "160px" }} />
      </div>
    </div>
  );
}

export default function OccupancyChart() {
  const { data, isLoading } = useOccupancy();

  if (isLoading) return <Skeleton />;

  const rawData = (data ?? []) as OccupancyData[];
  const total = rawData.reduce((s, d) => s + d.value, 0);
  const occupied = rawData.find(d => d.name === "Occupied")?.value ?? 0;
  const occupancyPct = total ? Math.round((occupied / total) * 100) : 0;

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
              <BedDouble size={13} style={{ color: "var(--brand)" }} />
            </div>
            <h3 className="text-subhead" style={{ color: "var(--text-1)" }}>
              Bed Occupancy
            </h3>
          </div>
          <p className="text-caption" style={{ color: "var(--text-3)" }}>
            Real-time hospital capacity
          </p>
        </div>

        <div
          className="rounded-lg px-2.5 py-1.5"
          style={{
            background: occupancyPct >= 85 ? "var(--danger-muted)" : "var(--success-muted)",
            border: `1px solid ${occupancyPct >= 85 ? "rgba(239,68,68,0.2)" : "rgba(34,197,94,0.2)"}`,
            textAlign: "right",
          }}
        >
          <p
            className="text-subhead"
            style={{ color: occupancyPct >= 85 ? "var(--danger)" : "var(--success)" }}
          >
            {occupancyPct}%
          </p>
          <p className="text-caption" style={{ fontSize: "10px", color: "var(--text-2)" }}>Occupied</p>
        </div>
      </div>

      {/* Donut Chart */}
      <div style={{ flex: 1, minHeight: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={rawData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {rawData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.name as keyof typeof COLORS] ?? "var(--text-3)"}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6" style={{ marginTop: "16px" }}>
        {rawData.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: COLORS[entry.name as keyof typeof COLORS] ?? "var(--text-3)" }}
            />
            <span className="text-caption" style={{ color: "var(--text-2)" }}>
              {entry.name}
            </span>
            <span className="text-caption font-semibold" style={{ color: "var(--text-1)" }}>
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}