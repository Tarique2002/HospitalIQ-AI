import { API_URL as API } from "../../api/config";
import { useState } from "react";
import { motion } from "framer-motion";
import { BedDouble, Search, Grid3X3, List, Activity } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



type Bed = {
  id: number;
  ward: string;
  status: string;
  bed_number?: string;
};

const STATS_MAP = [
  { label: "Total Beds", color: "var(--accent-blue)", colorMuted: "var(--brand-muted)" },
  { label: "Occupied", color: "var(--danger)", colorMuted: "var(--danger-muted)" },
  { label: "Available", color: "var(--success)", colorMuted: "var(--success-muted)" },
  { label: "Maintenance", color: "var(--warning)", colorMuted: "var(--warning-muted)" },
] as const;

const COLORS_MAP = {
  Occupied: { bg: "var(--danger-muted)", border: "rgba(239,68,68,0.2)", color: "var(--danger)" },
  Available: { bg: "var(--success-muted)", border: "rgba(34,197,94,0.2)", color: "var(--success)" },
  Maintenance: { bg: "var(--warning-muted)", border: "rgba(245,158,11,0.2)", color: "var(--warning)" },
};

export default function BedsPage() {
  const [viewMode, setViewMode] = useState<"map" | "table">("map");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["beds"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API}/beds/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data as Bed[];
    },
    retry: 1,
  });

  const beds = (data ?? []) as Bed[];

  const occupied = beds.filter(b => b.status === "Occupied").length;
  const available = beds.filter(b => b.status === "Available").length;
  const maintenance = beds.filter(b => b.status === "Maintenance").length;
  const totalBeds = beds.length;
  const occupancyPct = totalBeds ? Math.round((occupied / totalBeds) * 100) : 0;

  const filtered = beds.filter(b => {
    const matchStatus = filterStatus === "All" || b.status === filterStatus;
    const matchSearch = !search || b.ward?.toLowerCase().includes(search.toLowerCase()) || String(b.id).includes(search);
    return matchStatus && matchSearch;
  });

  // Group by ward for map view
  const wards = [...new Set(beds.map(b => b.ward))];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div
              className="icon-box icon-box-sm icon-box-round"
              style={{
                background: "var(--brand-muted)",
                border: "1px solid var(--brand-border)",
              }}
            >
              <BedDouble size={13} style={{ color: "var(--brand)" }} />
            </div>
            <h1 className="text-title" style={{ fontSize: "1.5rem" }}>
              Hospital Bed Management
            </h1>
          </div>
          <p className="text-caption" style={{ color: "var(--text-2)" }}>
            Real-time bed occupancy and hospital digital twin
          </p>
        </div>

        <div className="flex gap-2">
          {(["map", "table"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className="p-2 rounded-xl transition-all cursor-pointer"
              style={{
                background: viewMode === mode ? "var(--brand-muted)" : "var(--bg-hover)",
                border: viewMode === mode ? "1px solid var(--brand-border)" : "1px solid var(--border)",
                color: viewMode === mode ? "var(--brand)" : "var(--text-3)",
              }}
            >
              {mode === "map" ? <Grid3X3 size={16} /> : <List size={16} />}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {STATS_MAP.map((stat) => {
          let val = totalBeds;
          if (stat.label === "Occupied") val = occupied;
          else if (stat.label === "Available") val = available;
          else if (stat.label === "Maintenance") val = maintenance;

          return (
            <div
              key={stat.label}
              className="card card-hover"
              style={{ padding: 24, cursor: "default" }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                <div>
                  <p className="text-subhead" style={{ marginBottom: 2 }}>{stat.label}</p>
                  <p className="text-caption">Capacity statistics</p>
                </div>
                <div
                  className="icon-box icon-box-md icon-box-round"
                  style={{
                    background: stat.colorMuted,
                    border: `1px solid ${stat.color}25`,
                    flexShrink: 0,
                  }}
                >
                  <BedDouble size={17} style={{ color: stat.color, display: "block" }} />
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
                {val}
              </p>
            </div>
          );
        })}
      </motion.div>

      {/* Occupancy Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="card"
        style={{ padding: "24px" }}
      >
        <div className="flex items-center justify-between" style={{ marginBottom: "12px" }}>
          <div className="flex items-center gap-2">
            <Activity size={14} style={{ color: "var(--brand)" }} />
            <span className="text-subhead" style={{ color: "var(--text-1)" }}>
              Overall Occupancy
            </span>
          </div>
          <span
            className="text-title"
            style={{ color: occupancyPct >= 85 ? "var(--danger)" : occupancyPct >= 60 ? "var(--warning)" : "var(--success)" }}
          >
            {occupancyPct}%
          </span>
        </div>
        <div
          className="h-3 rounded-full"
          style={{ background: "var(--border-subtle)" }}
        >
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${occupancyPct}%` }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            style={{
              background: occupancyPct >= 85
                ? "var(--danger)"
                : occupancyPct >= 60
                ? "var(--warning)"
                : "var(--success)",
            }}
          />
        </div>
        <div className="flex items-center gap-6" style={{ marginTop: "16px" }}>
          {[
            { label: "Occupied", color: "var(--danger)", count: occupied },
            { label: "Available", color: "var(--success)", count: available },
            { label: "Maintenance", color: "var(--warning)", count: maintenance },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
              <span className="text-caption" style={{ color: "var(--text-2)" }}>
                {item.label} ({item.count})
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Filter + Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--text-3)" }}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ward or bed ID..."
            className="input-premium pl-9"
          />
        </div>
        <div className="flex gap-2">
          {["All", "Occupied", "Available", "Maintenance"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer"
              style={{
                background: filterStatus === s ? "var(--brand-muted)" : "var(--bg-hover)",
                border: filterStatus === s ? "1px solid var(--brand-border)" : "1px solid var(--border)",
                color: filterStatus === s ? "var(--brand)" : "var(--text-2)",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      {isLoading ? (
        <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-16 lg:grid-cols-20 gap-2">
          {[...Array(40)].map((_, i) => (
            <div key={i} className="skeleton rounded-md" style={{ height: 40 }} />
          ))}
        </div>
      ) : isError ? (
        <div
          className="card text-center"
          style={{ padding: "48px" }}
        >
          <BedDouble size={48} className="mx-auto mb-4 opacity-20" style={{ color: "var(--text-3)" }} />
          <p style={{ color: "var(--text-2)" }}>Could not load bed data.</p>
        </div>
      ) : viewMode === "map" ? (
        // Hospital Digital Twin Map View
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="card"
          style={{ padding: "24px" }}
        >
          <div className="flex items-center gap-2" style={{ marginBottom: "24px" }}>
            <Grid3X3 size={14} style={{ color: "var(--brand)" }} />
            <h3 className="text-subhead" style={{ color: "var(--text-1)" }}>
              Hospital Floor Map · Digital Twin
            </h3>
          </div>

          {wards.map((ward) => {
            const wardBeds = filtered.filter(b => b.ward === ward);
            if (wardBeds.length === 0) return null;

            return (
              <div key={ward} className="mb-6">
                <h4
                  className="text-label"
                  style={{ marginBottom: "12px" }}
                >
                  {ward}
                </h4>
                <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(48px, 1fr))" }}>
                  {wardBeds.map((bed) => {
                    const styleConfig = COLORS_MAP[bed.status as keyof typeof COLORS_MAP] ?? COLORS_MAP.Available;
                    return (
                      <motion.div
                        key={bed.id}
                        className="bed-cell aspect-square flex items-center justify-center text-xs font-bold"
                        style={{
                          background: styleConfig.bg,
                          border: `1px solid ${styleConfig.border}`,
                          borderRadius: "var(--r-sm)",
                        }}
                        whileHover={{ scale: 1.1, zIndex: 10 }}
                        title={`Bed #${bed.id} · ${bed.status}`}
                      >
                        <span style={{ color: styleConfig.color, fontSize: "0.65rem" }}>
                          {bed.id}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </motion.div>
      ) : (
        // Table view
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="table-premium w-full">
              <thead>
                <tr>
                  <th>Bed ID</th>
                  <th>Ward</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((bed) => {
                  const badgeClass =
                    bed.status === "Occupied" ? "badge badge-danger" :
                    bed.status === "Available" ? "badge badge-success" :
                    "badge badge-warning";
                  return (
                    <tr key={bed.id}>
                      <td>
                        <span
                          className="text-xs font-mono px-2 py-1 rounded-lg"
                          style={{
                            background: "var(--brand-muted)",
                            border: "1px solid var(--brand-border)",
                            color: "var(--brand)",
                          }}
                        >
                          #{bed.id}
                        </span>
                      </td>
                      <td style={{ color: "var(--text-1)", fontWeight: 500 }}>{bed.ward}</td>
                      <td>
                        <span className={badgeClass}>
                          {bed.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
