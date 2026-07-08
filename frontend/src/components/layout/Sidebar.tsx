import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  BedDouble,
  Brain,
  BarChart3,
  Settings,
  Activity,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { path: "/patients", label: "Patients", icon: Users },
  { path: "/doctors", label: "Doctors", icon: Stethoscope },
  { path: "/beds", label: "Beds", icon: BedDouble },
  { path: "/ai", label: "AI Hub", icon: Brain },
  { path: "/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/settings", label: "Settings", icon: Settings },
];
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside
      className={`fixed md:sticky top-0 bottom-0 left-0 z-40 md:z-20 flex flex-col transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
      style={{
        width: "240px",
        minHeight: "100vh",
        background: "var(--sidebar-bg)",
        borderRight: "1px solid var(--border)",
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div className="p-6 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          {/* Icon */}
          <div
            className="flex items-center justify-center rounded-xl"
            style={{
              width: 36,
              height: 36,
              background: "linear-gradient(135deg, var(--brand) 0%, var(--accent-purple) 100%)",
            }}
          >
            <Activity size={18} color="white" />
          </div>

          <div>
            <h1
              className="font-bold text-base leading-none"
              style={{ color: "var(--text-1)" }}
            >
              HospitalIQ
            </h1>
            <p
              className="text-xs mt-1"
              style={{ color: "var(--brand)", fontWeight: 600 }}
            >
              AI Platform
            </p>
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div
        className="mx-4 mb-4"
        style={{ height: 1, background: "var(--border-subtle)" }}
      />

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item, i) => {
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <NavLink
                to={item.path}
                onClick={onClose}
                className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      size={17}
                      style={{
                        color: isActive ? "var(--brand)" : "var(--text-3)",
                        flexShrink: 0,
                      }}
                    />
                    <span className="flex-1 truncate">{item.label}</span>
                    {isActive && (
                      <ChevronRight
                        size={13}
                        style={{ color: "var(--brand)", opacity: 0.8 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </motion.div>
          );
        })}
      </nav>

      {/* Bottom Status */}
      <div className="p-4 mt-auto">
        <div
          className="rounded-xl p-4"
          style={{
            background: "var(--brand-muted)",
            border: "1px solid var(--brand-border)",
          }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
              style={{ background: "var(--success)" }}
            />
            <span
              className="text-caption font-semibold"
              style={{ color: "var(--success)" }}
            >
              AI Engine Active
            </span>
          </div>
          <p
            className="text-caption"
            style={{ color: "var(--text-2)" }}
          >
            94% confidence score
          </p>
        </div>
      </div>
    </aside>
  );
}