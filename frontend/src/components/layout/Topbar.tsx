import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Command, ChevronDown, LogOut, User, Sun, Moon, Menu } from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

interface TopbarProps {
  onCommandPalette?: () => void;
  onToggleSidebar: () => void;
}

export default function Topbar({ onCommandPalette, onToggleSidebar }: TopbarProps) {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const notifications = [
    { id: 1, type: "warning", title: "ICU Occupancy at 87%", time: "2m ago", read: false },
    { id: 2, type: "success", title: "Revenue target exceeded", time: "15m ago", read: false },
    { id: 3, type: "info", title: "AI Report generated", time: "1h ago", read: true },
    { id: 4, type: "danger", title: "Emergency cases increased", time: "2h ago", read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header
      className="sticky top-0 z-30 flex items-center gap-3 px-6 h-16"
      style={{
        background: "var(--topbar-bg)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Mobile Menu Toggle */}
      <button
        onClick={onToggleSidebar}
        className="p-2 -ml-2 rounded-xl block md:hidden cursor-pointer hover:bg-white/5 active:bg-white/10 transition-colors"
        style={{ color: "var(--text-2)", background: "var(--bg-hover)", border: "1px solid var(--border)" }}
      >
        <Menu size={18} />
      </button>

      {/* Search Bar */}
      <motion.button
        onClick={onCommandPalette}
        className="flex items-center gap-3 flex-1 max-w-sm rounded-xl px-4 py-2 text-left cursor-pointer"
        style={{
          background: "var(--input-bg)",
          border: "1px solid var(--border)",
        }}
        whileHover={{ borderColor: "var(--brand-border)", background: "var(--brand-muted)" }}
        transition={{ duration: 0.15 }}
      >
        <Search size={14} style={{ color: "var(--text-3)" }} />
        <span className="text-sm flex-1" style={{ color: "var(--text-3)" }}>
          Search patients, docs, analytics...
        </span>
        <div
          className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px]"
          style={{
            background: "var(--bg-hover)",
            color: "var(--text-3)",
            border: "1px solid var(--border)",
          }}
        >
          <Command size={10} />
          <span>K</span>
        </div>
      </motion.button>

      <div className="flex-1" />

      {/* Theme Toggle */}
      <motion.button
        onClick={toggleTheme}
        className="theme-toggle"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Toggle theme"
        title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === "dark" ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Sun size={15} style={{ color: "var(--warning)" }} />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Moon size={15} style={{ color: "var(--brand)" }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Notification Bell */}
      <div className="relative">
        <motion.button
          onClick={() => setShowNotifications(!showNotifications)}
          className="btn-ghost relative p-2 rounded-xl cursor-pointer"
          whileHover={{ background: "var(--bg-hover)" }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell size={17} style={{ color: "var(--text-2)" }} />
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-1 right-1 w-2 h-2 rounded-full"
              style={{ background: "var(--danger)" }}
            />
          )}
        </motion.button>

        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-80 rounded-xl overflow-hidden card"
              style={{
                boxShadow: "var(--shadow-md)",
                zIndex: 100,
              }}
            >
              <div
                className="flex items-center justify-between p-4"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <span className="text-subhead" style={{ color: "var(--text-1)" }}>
                  Notifications
                </span>
                <span className="badge badge-danger">
                  {unreadCount} new
                </span>
              </div>

              <div className="py-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors"
                    style={{ background: n.read ? "transparent" : "var(--bg-hover)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-active)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = n.read ? "transparent" : "var(--bg-hover)")}
                  >
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{
                        background:
                          n.type === "warning" ? "var(--warning)" :
                          n.type === "success" ? "var(--success)" :
                          n.type === "danger"  ? "var(--danger)"  : "var(--info)",
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-caption font-medium" style={{ color: n.read ? "var(--text-2)" : "var(--text-1)" }}>
                        {n.title}
                      </p>
                      <p className="text-caption mt-0.5" style={{ color: "var(--text-3)" }}>{n.time}</p>
                    </div>
                    {!n.read && (
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                        style={{ background: "var(--brand)" }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* User Menu */}
      <div className="relative">
        <motion.button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center gap-3 px-3 py-1.5 rounded-xl cursor-pointer"
          style={{
            background: "var(--input-bg)",
            border: "1px solid var(--border)",
          }}
          whileHover={{ borderColor: "var(--brand-border)" }}
        >
          <div
            className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold"
            style={{
              background: "var(--brand-muted)",
              border: "1px solid var(--brand-border)",
              color: "var(--brand)",
            }}
          >
            {user?.name?.charAt(0) ?? user?.email?.charAt(0) ?? "U"}
          </div>
          <span className="text-sm font-medium hidden sm:block" style={{ color: "var(--text-2)" }}>
            {user?.name ?? user?.email?.split("@")[0] ?? "User"}
          </span>
          <ChevronDown size={14} style={{ color: "var(--text-3)" }} />
        </motion.button>

        <AnimatePresence>
          {showUserMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-52 rounded-xl overflow-hidden card"
              style={{
                boxShadow: "var(--shadow-md)",
                zIndex: 100,
              }}
            >
              <div className="p-3" style={{ borderBottom: "1px solid var(--border)" }}>
                <p className="text-sm font-semibold" style={{ color: "var(--text-1)" }}>
                  {user?.name ?? "Admin User"}
                </p>
                <p className="text-caption mt-0.5" style={{ color: "var(--text-2)" }}>
                  {user?.email ?? "admin@hospitaliq.ai"}
                </p>
              </div>

              <div className="p-2">
                <button
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer border-none"
                  style={{ color: "var(--text-2)", background: "transparent" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <User size={15} />
                  Profile Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer border-none"
                  style={{ color: "var(--danger)", background: "transparent" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--danger-muted)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <LogOut size={15} />
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
