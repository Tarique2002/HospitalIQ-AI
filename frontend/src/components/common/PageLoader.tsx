import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export default function PageLoader() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[400px] gap-6"
      aria-label="Loading page"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="relative"
      >
        <div
          className="w-12 h-12 rounded-full border-2"
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
        <Activity size={16} style={{ color: "var(--brand-primary)" }} />
        <span className="text-sm" style={{ color: "var(--text-muted)" }}>
          Loading...
        </span>
      </motion.div>
    </div>
  );
}
