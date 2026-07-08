import { API_URL as API } from "../../api/config";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Search,
  Plus,
  Star,
  Users,
  Award,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



type Doctor = {
  id: number;
  name: string;
  specialization: string;
  email?: string;
  phone?: string;
  experience?: number;
  department_id?: number;
};

const specializationColors: Record<string, string> = {
  Cardiology: "var(--accent-red)",
  Neurology: "var(--accent-purple)",
  Orthopedics: "var(--accent-cyan)",
  Pediatrics: "var(--accent-green)",
  Oncology: "var(--accent-amber)",
  Radiology: "var(--accent-blue)",
  General: "var(--text-3)",
};

const specializationMutedColors: Record<string, string> = {
  Cardiology: "var(--danger-muted)",
  Neurology: "rgba(139,92,246,0.12)",
  Orthopedics: "rgba(6,182,212,0.12)",
  Pediatrics: "var(--success-muted)",
  Oncology: "var(--warning-muted)",
  Radiology: "rgba(59,130,246,0.12)",
  General: "var(--bg-hover)",
};

function getSpecColor(spec: string) {
  for (const key of Object.keys(specializationColors)) {
    if (spec?.toLowerCase().includes(key.toLowerCase())) {
      return {
        color: specializationColors[key],
        muted: specializationMutedColors[key],
      };
    }
  }
  return { color: "var(--text-3)", muted: "var(--bg-hover)" };
}

export default function DoctorsPage() {
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["doctors-list"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API}/patients/doctors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data as Doctor[];
    },
    retry: 1,
  });

  const doctors = (data ?? []) as Doctor[];
  const filtered = doctors.filter(
    (d) =>
      d.name?.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization?.toLowerCase().includes(search.toLowerCase())
  );

  // Group by specialization
  const specs = [...new Set(doctors.map(d => d.specialization))];

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
              <Stethoscope size={13} style={{ color: "var(--brand)" }} />
            </div>
            <h1 className="text-title" style={{ fontSize: "1.5rem" }}>
              Medical Staff
            </h1>
          </div>
          <p className="text-caption" style={{ color: "var(--text-2)" }}>
            Manage doctors and specialist roster
          </p>
        </div>

        <motion.button
          className="btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus size={15} />
          Add Doctor
        </motion.button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: "Total Doctors", value: doctors.length, color: "var(--brand)", colorMuted: "var(--brand-muted)", icon: Stethoscope },
          { label: "Specializations", value: specs.length, color: "var(--accent-blue)", colorMuted: "rgba(59,130,246,0.12)", icon: Award },
          { label: "Active Staff", value: doctors.length, color: "var(--success)", colorMuted: "var(--success-muted)", icon: Users },
          { label: "Avg Experience", value: "8 yrs", color: "var(--accent-amber)", colorMuted: "var(--warning-muted)", icon: Star },
        ].map((stat) => (
          <div
            key={stat.label}
            className="card card-hover"
            style={{ padding: 24, cursor: "default" }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <p className="text-subhead" style={{ marginBottom: 2 }}>{stat.label}</p>
                <p className="text-caption">Roster metrics</p>
              </div>
              <div
                className="icon-box icon-box-md icon-box-round"
                style={{
                  background: stat.colorMuted,
                  border: `1px solid ${stat.color}25`,
                  flexShrink: 0,
                }}
              >
                <stat.icon size={17} style={{ color: stat.color, display: "block" }} />
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
              {stat.value}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex gap-3"
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
            placeholder="Search doctors by name or specialization..."
            className="input-premium pl-9"
          />
        </div>
      </motion.div>

      {/* Doctors Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="skeleton rounded-2xl"
              style={{ height: 180 }}
            />
          ))}
        </div>
      ) : isError ? (
        <div
          className="card text-center"
          style={{ padding: "48px" }}
        >
          <Stethoscope size={48} className="mx-auto mb-4 opacity-20" style={{ color: "var(--text-3)" }} />
          <p style={{ color: "var(--text-2)" }}>
            Could not load doctors. Ensure the backend is running.
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filtered.map((doctor, i) => {
            const specConfig = getSpecColor(doctor.specialization);
            const initials = doctor.name
              ?.split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("");

            return (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="card card-hover cursor-pointer"
                style={{
                  padding: "20px",
                  border: `1px solid var(--border)`,
                }}
              >
                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold mb-4"
                  style={{
                    background: specConfig.muted,
                    border: `1px solid ${specConfig.color}25`,
                    color: specConfig.color,
                  }}
                >
                  {initials}
                </div>

                {/* Name */}
                <h3
                  className="font-semibold text-base mb-1 truncate"
                  style={{ color: "var(--text-1)" }}
                >
                  Dr. {doctor.name}
                </h3>

                {/* Specialization */}
                <span
                  className="badge"
                  style={{
                    background: specConfig.muted,
                    color: specConfig.color,
                    border: `1px solid ${specConfig.color}25`,
                  }}
                >
                  {doctor.specialization}
                </span>

                {/* Stats */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div
                    className="rounded-lg p-2 text-center border border-subtle"
                    style={{ background: "var(--bg-hover)" }}
                  >
                    <p className="text-caption" style={{ color: "var(--text-3)" }}>ID</p>
                    <p className="text-caption font-semibold" style={{ color: "var(--text-2)" }}>
                      #{doctor.id}
                    </p>
                  </div>
                  <div
                    className="rounded-lg p-2 text-center border border-subtle"
                    style={{ background: "var(--bg-hover)" }}
                  >
                    <p className="text-caption" style={{ color: "var(--text-3)" }}>Rating</p>
                    <div className="flex items-center justify-center gap-1">
                      <Star size={10} fill="#fbbf24" style={{ color: "#fbbf24" }} />
                      <p className="text-caption font-semibold" style={{ color: "#fbbf24" }}>4.8</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
