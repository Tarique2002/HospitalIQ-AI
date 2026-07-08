import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Users,
  IndianRupee,
  BedDouble,
  Activity,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { useRevenue } from "../../hooks/useRevenue";
import { useAdmissions } from "../../hooks/useAdmissions";
import { useDepartment } from "../../hooks/useDepartment";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number | string;
    color?: string;
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
        {payload.map((p) => (
          <p key={p.name} className="text-sm font-semibold" style={{ color: p.color }}>
            {p.name}: {typeof p.value === "number" && p.value > 100000
              ? `₹ ${(p.value / 1_000_000).toFixed(1)}M`
              : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Monthly heatmap data (simulated)
const heatmapData = [
  { day: "Mon", "Week 1": 45, "Week 2": 62, "Week 3": 38, "Week 4": 71 },
  { day: "Tue", "Week 1": 58, "Week 2": 41, "Week 3": 55, "Week 4": 48 },
  { day: "Wed", "Week 1": 72, "Week 2": 53, "Week 3": 68, "Week 4": 60 },
  { day: "Thu", "Week 1": 39, "Week 2": 75, "Week 3": 42, "Week 4": 83 },
  { day: "Fri", "Week 1": 85, "Week 2": 44, "Week 3": 79, "Week 4": 56 },
  { day: "Sat", "Week 1": 31, "Week 2": 28, "Week 3": 35, "Week 4": 29 },
  { day: "Sun", "Week 1": 22, "Week 2": 18, "Week 3": 25, "Week 4": 20 },
];

// Radar data for department performance
const radarData = [
  { subject: "Patient Load", A: 85, B: 65 },
  { subject: "Revenue", A: 78, B: 88 },
  { subject: "Efficiency", A: 72, B: 75 },
  { subject: "Satisfaction", A: 92, B: 70 },
  { subject: "Staff Util.", A: 68, B: 82 },
];

function ChartCard({
  title,
  subtitle,
  icon: Icon,
  iconColor,
  children,
}: {
  title: string;
  subtitle: string;
  icon: typeof BarChart3;
  iconColor: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="card card-hover"
      style={{
        padding: "24px",
      }}
    >
      <div className="flex items-center gap-3" style={{ marginBottom: "24px" }}>
        <div
          className="icon-box icon-box-sm icon-box-round"
          style={{
            background: "var(--brand-muted)",
            border: "1px solid var(--brand-border)",
          }}
        >
          <Icon size={13} style={{ color: iconColor }} />
        </div>
        <div>
          <h3 className="text-subhead" style={{ color: "var(--text-1)" }}>{title}</h3>
          <p className="text-caption" style={{ color: "var(--text-3)" }}>{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

export default function AnalyticsPage() {
  const { data: revenueData } = useRevenue();
  const { data: admissionsData } = useAdmissions();
  const { data: deptData } = useDepartment();

  const revenues = (revenueData ?? []) as { month: string; revenue: number }[];
  const admissions = (admissionsData ?? []) as { month: string; admissions: number }[];
  const departments = (deptData ?? []) as { department: string; patients: number; revenue: number }[];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 mb-1">
          <div
            className="icon-box icon-box-sm icon-box-round"
            style={{
              background: "var(--brand-muted)",
              border: "1px solid var(--brand-border)",
            }}
          >
            <BarChart3 size={13} style={{ color: "var(--brand)" }} />
          </div>
          <h1 className="text-title" style={{ fontSize: "1.5rem" }}>
            Advanced Analytics
          </h1>
        </div>
        <p className="text-caption" style={{ color: "var(--text-2)" }}>
          Deep operational intelligence and trend analysis
        </p>
      </motion.div>

      {/* KPI Strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: "Revenue Growth", value: "+12.4%", icon: TrendingUp, color: "var(--accent-green)", colorMuted: "var(--success-muted)" },
          { label: "Patient Volume", value: "+8.2%", icon: Users, color: "var(--accent-blue)", colorMuted: "rgba(59,130,246,0.12)" },
          { label: "Avg Revenue/Patient", value: "₹52K", icon: IndianRupee, color: "var(--accent-purple)", colorMuted: "rgba(139,92,246,0.12)" },
          { label: "Bed Utilization", value: "73%", icon: BedDouble, color: "var(--accent-amber)", colorMuted: "var(--warning-muted)" },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="card card-hover"
            style={{ padding: 24, cursor: "default" }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <p className="text-subhead" style={{ marginBottom: 2 }}>{kpi.label}</p>
                <p className="text-caption">KPI metrics</p>
              </div>
              <div
                className="icon-box icon-box-md icon-box-round"
                style={{
                  background: kpi.colorMuted,
                  border: `1px solid ${kpi.color}25`,
                  flexShrink: 0,
                }}
              >
                <kpi.icon size={17} style={{ color: kpi.color, display: "block" }} />
              </div>
            </div>
            <p
              style={{
                fontSize: "1.875rem",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "var(--text-1)",
                lineHeight: 1,
              }}
            >
              {kpi.value}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Row 1: Revenue + Admissions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 xl:grid-cols-2 gap-6"
      >
        <ChartCard
          title="Revenue Trend"
          subtitle="Monthly revenue over time"
          icon={IndianRupee}
          iconColor="var(--accent-green)"
        >
          <div style={{ minHeight: "220px" }}>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={revenues} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="rev2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-green)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="var(--accent-green)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹ ${(v/1_000_000).toFixed(0)}M`} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--border-strong)", strokeWidth: 1 }} />
                <Area type="monotone" dataKey="revenue" stroke="var(--accent-green)" strokeWidth={2} fill="url(#rev2)" dot={false} activeDot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Admissions Volume"
          subtitle="Monthly patient admissions"
          icon={Users}
          iconColor="var(--accent-blue)"
        >
          <div style={{ minHeight: "220px" }}>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={admissions} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--chart-tick)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--border-strong)", strokeWidth: 1 }} />
                <Line type="monotone" dataKey="admissions" stroke="var(--accent-blue)" strokeWidth={2.5} dot={{ fill: "var(--accent-blue)", r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </motion.div>

      {/* Row 2: Department Bars + Radar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-1 xl:grid-cols-3 gap-6"
      >
        <div className="xl:col-span-2">
          <ChartCard
            title="Department Revenue"
            subtitle="Revenue breakdown by department"
            icon={BarChart3}
            iconColor="var(--accent-purple)"
          >
            <div style={{ minHeight: "240px" }}>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={departments} layout="vertical" margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="deptGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="var(--accent-purple)" />
                      <stop offset="100%" stopColor="var(--brand)" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" horizontal={false} />
                  <XAxis type="number" tick={{ fill: "var(--chart-tick)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1_000_000).toFixed(0)}M`} />
                  <YAxis dataKey="department" type="category" tick={{ fill: "var(--chart-tick)", fontSize: 10 }} axisLine={false} tickLine={false} width={80} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--bg-hover)", opacity: 0.4 }} />
                  <Bar dataKey="revenue" fill="url(#deptGrad)" radius={[0, 4, 4, 0]} maxBarSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <ChartCard
          title="Performance Radar"
          subtitle="Multi-dimensional KPI comparison"
          icon={Activity}
          iconColor="var(--accent-cyan)"
        >
          <div style={{ minHeight: "240px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--chart-tick)", fontSize: 10 }} />
                <Radar name="This Month" dataKey="A" stroke="var(--accent-blue)" fill="var(--accent-blue)" fillOpacity={0.2} />
                <Radar name="Last Month" dataKey="B" stroke="var(--accent-purple)" fill="var(--accent-purple)" fillOpacity={0.15} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4" style={{ marginTop: "12px" }}>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--accent-blue)" }} />
                <span className="text-caption" style={{ color: "var(--text-2)" }}>This Month</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--accent-purple)" }} />
                <span className="text-caption" style={{ color: "var(--text-2)" }}>Last Month</span>
              </div>
            </div>
          </div>
        </ChartCard>
      </motion.div>

      {/* Row 3: Admission Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ChartCard
          title="Weekly Admission Heatmap"
          subtitle="Patient admission patterns by day and week"
          icon={Activity}
          iconColor="var(--accent-amber)"
        >
          <div className="overflow-x-auto">
            <div className="min-w-[500px]">
              <div className="grid grid-cols-5 gap-1 mb-2" style={{ gridTemplateColumns: "80px 1fr 1fr 1fr 1fr" }}>
                <div />
                {["Week 1", "Week 2", "Week 3", "Week 4"].map(w => (
                  <div key={w} className="text-label" style={{ textAlign: "center" }}>{w}</div>
                ))}
              </div>

              {heatmapData.map((row) => (
                <div
                  key={row.day}
                  className="grid grid-cols-5 gap-1 mb-1"
                  style={{ gridTemplateColumns: "80px 1fr 1fr 1fr 1fr" }}
                >
                  <div className="text-caption flex items-center font-medium" style={{ color: "var(--text-2)" }}>
                    {row.day}
                  </div>
                  {(["Week 1", "Week 2", "Week 3", "Week 4"] as const).map((week) => {
                    const val = row[week] as number;
                    const intensity = val / 100;
                    return (
                      <motion.div
                        key={week}
                        className="h-8 rounded-md flex items-center justify-center text-xs font-semibold cursor-default border"
                        style={{
                          background: `color-mix(in srgb, var(--brand) ${Math.round(intensity * 100)}%, transparent)`,
                          borderColor: `color-mix(in srgb, var(--brand) ${Math.round(intensity * 50)}%, transparent)`,
                          color: intensity > 0.55 ? "var(--bg-card)" : "var(--text-1)",
                        }}
                        whileHover={{ scale: 1.05 }}
                        title={`${row.day} ${week}: ${val} admissions`}
                      >
                        {val}
                      </motion.div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </motion.div>
    </div>
  );
}
