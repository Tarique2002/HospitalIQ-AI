import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Globe,
  ChevronRight,
  Check,
  Activity,
} from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";

const settingsSections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "system", label: "System", icon: Database },
];

const ACCENT_COLORS = [
  "var(--brand)",
  "var(--accent-purple)",
  "var(--accent-cyan)",
  "var(--accent-green)",
  "var(--accent-amber)",
  "var(--accent-red)",
];

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-subtle last:border-b-0">
      <div style={{ paddingRight: "16px" }}>
        <p className="text-caption font-semibold" style={{ color: "var(--text-1)" }}>{label}</p>
        <p className="text-caption" style={{ color: "var(--text-3)", fontSize: "11px", marginTop: "2px" }}>{description}</p>
      </div>
      {children}
    </div>
  );
}

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className="relative rounded-full transition-all cursor-pointer flex-shrink-0"
      style={{
        width: 40,
        height: 22,
        background: on ? "var(--brand)" : "var(--border)",
        border: "none",
      }}
    >
      <motion.div
        className="absolute top-1/2 rounded-full"
        style={{ width: 14, height: 14, background: "#fff" }}
        animate={{ left: on ? 22 : 4, top: "50%", y: "-50%" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </button>
  );
}

export default function SettingsPage() {
  const { user } = useAuthContext();
  const [activeSection, setActiveSection] = useState("profile");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

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
            <Settings size={13} style={{ color: "var(--brand)" }} />
          </div>
          <h1 className="text-title" style={{ fontSize: "1.5rem" }}>
            Settings
          </h1>
        </div>
        <p className="text-caption" style={{ color: "var(--text-2)" }}>
          Manage your account preferences, configurations, and administrative tools
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Nav */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-3 h-fit"
        >
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl mb-1 text-xs font-semibold transition-all cursor-pointer"
              style={{
                background: activeSection === section.id ? "var(--brand-muted)" : "transparent",
                border: activeSection === section.id ? "1px solid var(--brand-border)" : "1px solid transparent",
                color: activeSection === section.id ? "var(--brand)" : "var(--text-3)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <section.icon size={14} />
                {section.label}
              </div>
              <ChevronRight
                size={12}
                style={{
                  opacity: activeSection === section.id ? 1 : 0,
                  color: "var(--brand)",
                }}
              />
            </button>
          ))}
        </motion.div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="space-y-6"
            >
              {activeSection === "profile" && (
                <>
                  {/* Account Identification Card */}
                  <div className="card p-6 flex flex-col md:flex-row items-center gap-5">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold border"
                      style={{
                        background: "var(--brand-muted)",
                        border: "1px solid var(--brand-border)",
                        color: "var(--brand)",
                      }}
                    >
                      {user?.name?.charAt(0) ?? "A"}
                    </div>
                    <div className="text-center md:text-left flex-1">
                      <p className="text-subhead" style={{ fontSize: "1.125rem", color: "var(--text-1)" }}>
                        {user?.name ?? "Admin User"}
                      </p>
                      <p className="text-caption mt-0.5" style={{ color: "var(--text-3)" }}>
                        {user?.email ?? "admin@hospitaliq.ai"}
                      </p>
                      <span className="badge badge-brand mt-2">
                        {user?.role ?? "Admin"}
                      </span>
                    </div>
                  </div>

                  {/* Personal Profile Details Card */}
                  <div className="card">
                    <div className="px-6 py-4 border-b border-subtle">
                      <h3 className="text-subhead">Personal Profile Details</h3>
                    </div>
                    <div className="p-6 space-y-1">
                      <SettingRow label="Full Name" description="Your display name across the platform">
                        <input
                          defaultValue={user?.name ?? ""}
                          className="input-premium"
                          style={{ width: 220 }}
                        />
                      </SettingRow>
                      <SettingRow label="Email Address" description="Login and notification email">
                        <input
                          defaultValue={user?.email ?? ""}
                          className="input-premium"
                          style={{ width: 220 }}
                        />
                      </SettingRow>
                      <SettingRow label="Access Clearance" description="Current system role classification">
                        <span className="badge badge-brand">
                          {user?.role ?? "Admin"}
                        </span>
                      </SettingRow>
                    </div>
                  </div>
                </>
              )}

              {activeSection === "notifications" && (
                <>
                  {/* Critical Alerts Trigger Card */}
                  <div className="card">
                    <div className="px-6 py-4 border-b border-subtle">
                      <h3 className="text-subhead">Critical Operational Triggers</h3>
                    </div>
                    <div className="p-6 space-y-1">
                      <SettingRow label="AI Diagnostic Alerts" description="Notify instantly when anomalies are observed">
                        <Toggle defaultOn />
                      </SettingRow>
                      <SettingRow label="Revenue Milestones" description="Send ping when quarterly targets are satisfied">
                        <Toggle defaultOn />
                      </SettingRow>
                      <SettingRow label="Emergency Bed Capacity" description="Alert admin roster when occupancy hits 85%">
                        <Toggle defaultOn />
                      </SettingRow>
                    </div>
                  </div>

                  {/* Period Digests Card */}
                  <div className="card">
                    <div className="px-6 py-4 border-b border-subtle">
                      <h3 className="text-subhead">Periodic Digests & Summaries</h3>
                    </div>
                    <div className="p-6 space-y-1">
                      <SettingRow label="Daily Executive Summary" description="Export automated system metrics via email">
                        <Toggle />
                      </SettingRow>
                      <SettingRow label="Weekly Analytical Digest" description="Weekly performance metrics rollup">
                        <Toggle />
                      </SettingRow>
                    </div>
                  </div>
                </>
              )}

              {activeSection === "security" && (
                <>
                  {/* Access Control Card */}
                  <div className="card">
                    <div className="px-6 py-4 border-b border-subtle">
                      <h3 className="text-subhead">Account Access Control</h3>
                    </div>
                    <div className="p-6 space-y-1">
                      <SettingRow label="Two-Factor Authentication" description="Enable 2FA security protocols for sign in">
                        <Toggle />
                      </SettingRow>
                      <SettingRow label="Auto-Timeout Interval" description="Force login after specific time of inactivity">
                        <select className="input-premium" style={{ width: 180 }}>
                          <option>30 minutes</option>
                          <option>1 hour</option>
                          <option>4 hours</option>
                          <option>Never</option>
                        </select>
                      </SettingRow>
                    </div>
                  </div>

                  {/* System Audit Card */}
                  <div className="card">
                    <div className="px-6 py-4 border-b border-subtle">
                      <h3 className="text-subhead">Compliance Roster Logging</h3>
                    </div>
                    <div className="p-6 space-y-1">
                      <SettingRow label="HIPAA Audit Logs" description="Record user read/write queries for safety audits">
                        <Toggle defaultOn />
                      </SettingRow>
                      <SettingRow label="IP Address Allowlist" description="Only allow system access from specific subnet ranges">
                        <Toggle />
                      </SettingRow>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="btn-secondary text-xs">
                      <Shield size={12} />
                      Reset Credentials
                    </button>
                  </div>
                </>
              )}

              {activeSection === "appearance" && (
                <>
                  {/* Interface Modes Card */}
                  <div className="card">
                    <div className="px-6 py-4 border-b border-subtle">
                      <h3 className="text-subhead">System Display Mode</h3>
                    </div>
                    <div className="p-6 space-y-1">
                      <SettingRow label="Dark Theme Mode" description="Disable or enable high contrast dark dashboard theme">
                        <Toggle defaultOn />
                      </SettingRow>
                      <SettingRow label="Micro-Animations" description="Render fluid layout transitions and button clicks">
                        <Toggle defaultOn />
                      </SettingRow>
                      <SettingRow label="High-Density Mode" description="Minimize cell row margins to show maximum patient volume">
                        <Toggle />
                      </SettingRow>
                    </div>
                  </div>

                  {/* Color Schemes Card */}
                  <div className="card">
                    <div className="px-6 py-4 border-b border-subtle">
                      <h3 className="text-subhead">System Accent Styling</h3>
                    </div>
                    <div className="p-6">
                      <p className="text-caption mb-3" style={{ color: "var(--text-3)" }}>
                        Pick the global primary accent color applied across graphs, metrics, and banners.
                      </p>
                      <div className="flex gap-3 flex-wrap">
                        {ACCENT_COLORS.map((color) => (
                          <motion.button
                            key={color}
                            className="w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer border border-subtle"
                            style={{ background: color }}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeSection === "system" && (
                <>
                  {/* Service Connections Card */}
                  <div className="card">
                    <div className="px-6 py-4 border-b border-subtle">
                      <h3 className="text-subhead">System Connection Status</h3>
                    </div>
                    <div className="p-6 space-y-1">
                      <SettingRow label="AI Diagnostics Engine" description="HospitalIQ predictive core runtime engine">
                        <span className="badge badge-success">Active v2.4</span>
                      </SettingRow>
                      <SettingRow label="PostgreSQL Database" description="Primary database write connection status">
                        <span className="badge badge-success">Connected</span>
                      </SettingRow>
                      <SettingRow label="Rate Threshold Limiter" description="Current API requests per minute block">
                        <span className="text-caption font-semibold" style={{ color: "var(--text-2)" }}>100 requests / minute</span>
                      </SettingRow>
                    </div>
                  </div>

                  {/* Data Protocols Card */}
                  <div className="card">
                    <div className="px-6 py-4 border-b border-subtle">
                      <h3 className="text-subhead">Data Management Protocols</h3>
                    </div>
                    <div className="p-6 space-y-1">
                      <SettingRow label="Data Retention Interval" description="Define how long historical patient records persist">
                        <select className="input-premium" style={{ width: 180 }}>
                          <option>12 months</option>
                          <option>24 months</option>
                          <option>5 years</option>
                          <option>Forever</option>
                        </select>
                      </SettingRow>
                      <SettingRow label="HIPAA Privacy Mode" description="Enforce row level privacy models">
                        <Toggle defaultOn />
                      </SettingRow>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="badge badge-success">
                      <Activity size={11} />
                      System Operational
                    </div>
                    <div className="badge badge-brand">
                      <Globe size={11} />
                      Platform v1.0.0
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Save button area */}
          {["profile", "notifications", "security", "appearance", "system"].includes(activeSection) && (
            <motion.div
              layout
              className="flex justify-end p-4 card"
              style={{ background: "var(--bg-hover)", border: "1px solid var(--border)" }}
            >
              <motion.button
                onClick={handleSave}
                className="btn-primary px-6"
                style={{ height: "38px" }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatePresence mode="wait">
                  {saved ? (
                    <motion.div
                      key="saved"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Check size={14} />
                      Saved Successfully!
                    </motion.div>
                  ) : (
                    <motion.span key="save" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      Save Changes
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
