import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

import { useAuthContext } from "../../context/AuthContext";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-6"
        style={{ background: "var(--bg-base)" }}
      >
        <div className="app-bg" />
        
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          <div
            className="w-14 h-14 rounded-full border-2"
            style={{
              borderColor: "rgba(79,142,247,0.2)",
              borderTopColor: "var(--brand-primary)",
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2"
        >
          <Activity size={18} style={{ color: "var(--brand-primary)" }} />
          <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            Authenticating...
          </span>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}