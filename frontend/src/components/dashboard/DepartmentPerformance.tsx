import { motion } from "framer-motion";
import { Building2, Users } from "lucide-react";
import { useDepartment } from "../../hooks/useDepartment";

type DeptData = {
  department: string;
  patients: number;
  revenue: number;
};

function Skeleton() {
  return (
    <div
      className="card"
      style={{ padding: "24px" }}
    >
      <div className="skeleton" style={{ height: "20px", width: "192px", marginBottom: "8px" }} />
      <div className="skeleton" style={{ height: "12px", width: "128px", marginBottom: "24px" }} />
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="skeleton" style={{ height: "48px" }} />
        ))}
      </div>
    </div>
  );
}

export default function DepartmentPerformance() {
  const { data, isLoading, isError } = useDepartment();

  if (isLoading) return <Skeleton />;
  if (isError || !data) {
    return (
      <div
        className="card flex items-center justify-center"
        style={{ padding: "24px", minHeight: "180px" }}
      >
        <p className="text-body" style={{ color: "var(--text-3)" }}>Data unavailable</p>
      </div>
    );
  }

  const departments = data as DeptData[];
  const maxRevenue = Math.max(...departments.map(d => d.revenue), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="card card-hover h-full"
      style={{
        padding: "24px",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: "24px" }}>
        <div className="flex items-center gap-2">
          <div
            className="icon-box icon-box-sm icon-box-round"
            style={{
              background: "var(--brand-muted)",
              border: "1px solid var(--brand-border)",
            }}
          >
            <Building2 size={13} style={{ color: "var(--brand)" }} />
          </div>
          <h3 className="text-subhead" style={{ color: "var(--text-1)" }}>
            Department Performance
          </h3>
        </div>
        <span className="badge badge-brand">
          {departments.length} active
        </span>
      </div>

      {/* Table Headers */}
      <div
        className="grid grid-cols-12 gap-4 px-4"
        style={{ marginBottom: "12px" }}
      >
        <span className="col-span-4 text-label">Department</span>
        <span className="col-span-2 text-label">Patients</span>
        <span className="col-span-2 text-label">Revenue</span>
        <span className="col-span-4 text-label" style={{ textAlign: "right" }}>Performance Share</span>
      </div>

      {/* Rows */}
      <div className="space-y-2">
        {departments.map((dept, i) => {
          const pct = (dept.revenue / maxRevenue) * 100;
          const colorPalette = [
            "var(--accent-blue)",
            "var(--accent-purple)",
            "var(--accent-cyan)",
            "var(--accent-green)",
            "var(--accent-amber)",
            "var(--accent-pink)",
          ];
          const color = colorPalette[i % colorPalette.length];

          return (
            <motion.div
              key={dept.department}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 + 0.1 }}
              className="grid grid-cols-12 gap-4 items-center px-4 py-3 rounded-lg border border-subtle"
              style={{
                background: "var(--bg-hover)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--bg-active)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--bg-hover)";
                e.currentTarget.style.borderColor = "var(--border-subtle)";
              }}
            >
              {/* Name */}
              <div className="col-span-4 flex items-center gap-2.5">
                <div
                  className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                >
                  <Building2 size={12} style={{ color }} />
                </div>
                <span className="text-body font-medium truncate" style={{ color: "var(--text-1)" }}>
                  {dept.department}
                </span>
              </div>

              {/* Patients */}
              <div className="col-span-2 flex items-center gap-1.5">
                <Users size={12} style={{ color: "var(--text-3)" }} />
                <span className="text-caption font-semibold" style={{ color: "var(--text-2)" }}>
                  {dept.patients.toLocaleString()}
                </span>
              </div>

              {/* Revenue */}
              <div className="col-span-2">
                <span className="text-caption font-semibold" style={{ color: "var(--text-2)" }}>
                  ₹{(dept.revenue / 1_000_000).toFixed(1)}M
                </span>
              </div>

              {/* Progress Bar */}
              <div className="col-span-4 flex items-center gap-3">
                <div className="progress-bar" style={{ flex: 1 }}>
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: i * 0.06 + 0.4, duration: 0.8, ease: "easeOut" }}
                    style={{
                      background: color,
                    }}
                  />
                </div>
                <span className="text-caption font-mono font-semibold" style={{ width: "32px", textAlign: "right", color: "var(--text-2)" }}>
                  {Math.round(pct)}%
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}