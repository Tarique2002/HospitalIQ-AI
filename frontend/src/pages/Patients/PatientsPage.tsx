import { API_URL as API } from "../../api/config";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Search,
  Plus,
  UserCheck,
  HeartPulse,
  TrendingUp,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



type Patient = {
  id: number;
  name: string;
  age: number;
  gender: string;
  blood_group: string;
  contact: string;
  email?: string;
};

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  colorMuted,
}: {
  icon: typeof Users;
  label: string;
  value: string | number;
  color: string;
  colorMuted: string;
}) {
  return (
    <div
      className="card card-hover"
      style={{ padding: 24, cursor: "default" }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <p className="text-subhead" style={{ marginBottom: 2 }}>{label}</p>
          <p className="text-caption">Patient metrics</p>
        </div>
        <div
          className="icon-box icon-box-md icon-box-round"
          style={{
            background: colorMuted,
            border: `1px solid ${color}25`,
            flexShrink: 0,
          }}
        >
          <Icon size={17} style={{ color, display: "block" }} />
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
        {value}
      </p>
    </div>
  );
}

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState<string>("All");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API}/patients/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data as Patient[];
    },
    retry: 1,
  });

  const patients = (data ?? []) as Patient[];

  const filtered = patients.filter((p) => {
    const matchSearch =
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      String(p.id).includes(search) ||
      p.blood_group?.toLowerCase().includes(search.toLowerCase());
    const matchGender = genderFilter === "All" || p.gender === genderFilter;
    return matchSearch && matchGender;
  });

  const maleCount = patients.filter(p => p.gender === "Male").length;
  const femaleCount = patients.filter(p => p.gender === "Female").length;

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Page Header */}
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
              <Users size={13} style={{ color: "var(--brand)" }} />
            </div>
            <h1 className="text-title" style={{ fontSize: "1.5rem" }}>
              Patient Registry
            </h1>
          </div>
          <p className="text-caption" style={{ color: "var(--text-2)" }}>
            Manage and monitor all hospital patients
          </p>
        </div>

        <motion.button
          className="btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus size={15} />
          Add Patient
        </motion.button>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <StatCard
          icon={Users}
          label="Total Patients"
          value={patients.length}
          color="var(--accent-blue)"
          colorMuted="var(--brand-muted)"
        />
        <StatCard
          icon={UserCheck}
          label="Male Patients"
          value={maleCount}
          color="var(--accent-purple)"
          colorMuted="rgba(139,92,246,0.12)"
        />
        <StatCard
          icon={HeartPulse}
          label="Female Patients"
          value={femaleCount}
          color="var(--accent-pink)"
          colorMuted="rgba(236,72,153,0.12)"
        />
        <StatCard
          icon={TrendingUp}
          label="Growth (MoM)"
          value="+4.2%"
          color="var(--accent-green)"
          colorMuted="var(--success-muted)"
        />
      </motion.div>

      {/* Table Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card overflow-hidden"
      >
        {/* Table Controls */}
        <div
          className="flex flex-col sm:flex-row gap-3 p-5"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-3)" }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patients by name, ID, blood group..."
              className="input-premium pl-9"
            />
          </div>

          {/* Gender Filter */}
          <div className="flex gap-2">
            {["All", "Male", "Female"].map((g) => (
              <button
                key={g}
                onClick={() => setGenderFilter(g)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer"
                style={{
                  background: genderFilter === g ? "var(--brand-muted)" : "var(--bg-hover)",
                  border: genderFilter === g ? "1px solid var(--brand-border)" : "1px solid var(--border)",
                  color: genderFilter === g ? "var(--brand)" : "var(--text-2)",
                }}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-8">
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="skeleton h-12 rounded-xl" />
                ))}
              </div>
            </div>
          ) : isError ? (
            <div className="p-8 text-center" style={{ color: "var(--text-3)" }}>
              <Users size={40} className="mx-auto mb-3 opacity-30" />
              <p>Failed to load patients. Please ensure the backend is running.</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center" style={{ color: "var(--text-3)" }}>
              <Users size={40} className="mx-auto mb-3 opacity-30" />
              <p>No patients found matching your search.</p>
            </div>
          ) : (
            <table className="table-premium w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Patient Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Blood Group</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((patient, i) => (
                  <motion.tr
                    key={patient.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                  >
                    <td>
                      <span
                        className="text-xs font-mono px-2 py-1 rounded-lg"
                        style={{
                          background: "var(--brand-muted)",
                          border: "1px solid var(--brand-border)",
                          color: "var(--brand)",
                        }}
                      >
                        #{patient.id}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                          style={{
                            background: patient.gender === "Male"
                              ? "var(--brand-muted)"
                              : "rgba(236,72,153,0.12)",
                            color: patient.gender === "Male" ? "var(--brand)" : "var(--accent-pink)",
                            border: `1px solid ${patient.gender === "Male" ? "var(--brand-border)" : "rgba(236,72,153,0.2)"}`,
                          }}
                        >
                          {patient.name?.charAt(0)}
                        </div>
                        <span style={{ color: "var(--text-1)", fontWeight: 500 }}>{patient.name}</span>
                      </div>
                    </td>
                    <td>{patient.age} yrs</td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          background: patient.gender === "Male" ? "var(--brand-muted)" : "rgba(236,72,153,0.08)",
                          color: patient.gender === "Male" ? "var(--brand)" : "var(--accent-pink)",
                          border: `1px solid ${patient.gender === "Male" ? "var(--brand-border)" : "rgba(236,72,153,0.15)"}`,
                        }}
                      >
                        {patient.gender}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-danger">
                        {patient.blood_group}
                      </span>
                    </td>
                    <td style={{ color: "var(--text-2)" }}>{patient.contact}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        {!isLoading && !isError && (
          <div
            className="flex items-center justify-between px-5 py-3"
            style={{ borderTop: "1px solid var(--border-subtle)" }}
          >
            <p className="text-caption" style={{ color: "var(--text-3)" }}>
              Showing {filtered.length} of {patients.length} patients
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
