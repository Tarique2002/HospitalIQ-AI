import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Bot,
  SendHorizonal,
  Sparkles,
  User,
  RefreshCw,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  BrainCircuit,
  BarChart3,
  ChevronRight,
  Terminal,
} from "lucide-react";
import { useSQLAgent } from "../../hooks/useSQLAgent";
import { useInsights } from "../../hooks/useInsights";
import { useForecast } from "../../hooks/useForecast";

type AIResponse = {
  title: string;
  columns: string[];
  rows: (string | number)[][];
};

type Message = {
  id: number;
  role: "user" | "ai";
  content: string;
  tableData?: AIResponse;
};

type AIInsight = {
  summary: string;
  risk: string;
  confidence: number;
  recommendations: string[];
};

type Forecast = {
  expected_revenue: number;
  expected_admissions: number;
  predicted_occupancy: number;
  confidence: number;
  trend: string;
};

const tabs = [
  { id: "chat", label: "AI Copilot", icon: Bot, description: "Natural language database queries" },
  { id: "insights", label: "AI Insights", icon: BrainCircuit, description: "Anomaly and risk evaluation reports" },
  { id: "forecast", label: "Predictive Forecast", icon: BarChart3, description: "ML revenue and occupancy trends" },
  { id: "reports", label: "Executive Reports", icon: FileText, description: "Generated HIPAA-compliant summaries" },
];

const chatSuggestions = [
  { title: "Bed Capacity", desc: "Show total available and occupied beds", query: "available beds" },
  { title: "Quarterly Revenue", desc: "Retrieve total revenue for this quarter", query: "total revenue" },
  { title: "Patient Flow", desc: "Compare monthly patient admission counts", query: "total admissions" },
  { title: "Staff Roster", desc: "List all active registered doctors", query: "total doctors" },
];

function ChatTab() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "ai",
      content: "Hello! I am your HospitalIQ Copilot. I can query our SQL database, run analytics, and summarize hospital statuses in real-time. What data would you like to retrieve today?",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { mutate, isPending } = useSQLAgent();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend(q?: string) {
    const query = q ?? question;
    if (!query.trim() || isPending) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: "user", content: query },
    ]);
    setQuestion("");

    mutate(query, {
      onSuccess: (data) => {
        const result = data as AIResponse;
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, role: "ai", content: result.title, tableData: result },
        ]);
      },
      onError: () => {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, role: "ai", content: "I couldn't complete the query request. Please try rephrasing your question." },
        ]);
      },
    });
  }

  const isInitialState = messages.length === 1;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" style={{ minHeight: 620 }}>
      {/* Left panel: Info Guide */}
      <div className="lg:col-span-1 flex flex-col gap-4">
        <div className="card p-5 flex flex-col justify-between h-full" style={{ background: "var(--bg-hover)", borderColor: "var(--border)" }}>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Terminal size={14} style={{ color: "var(--brand)" }} />
              <span className="text-label" style={{ color: "var(--brand)" }}>Model Status</span>
            </div>
            <h4 className="text-subhead mb-2">HospitalIQ LLM v2</h4>
            <p className="text-caption mb-4">
              Direct secure read access to hospital relational databases. Sanitized against SQL-injection.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between py-1.5 border-b border-subtle">
                <span className="text-caption" style={{ color: "var(--text-2)" }}>Database</span>
                <span className="badge badge-success">Connected</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-subtle">
                <span className="text-caption" style={{ color: "var(--text-2)" }}>Latency</span>
                <span className="text-caption font-mono" style={{ color: "var(--text-1)" }}>120ms</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-caption" style={{ color: "var(--text-2)" }}>Compliance</span>
                <span className="badge badge-neutral">HIPAA</span>
              </div>
            </div>
          </div>

          <button
            onClick={() =>
              setMessages([{
                id: Date.now(), role: "ai",
                content: "Chat logs cleared. What database query can I assist you with?",
              }])
            }
            className="btn-secondary w-full text-xs mt-6"
          >
            <RefreshCw size={12} />
            Reset Thread
          </button>
        </div>
      </div>

      {/* Right panel: Modern chat box */}
      <div className="lg:col-span-3 card flex flex-col overflow-hidden h-[620px]">
        {/* Chat Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-subtle" style={{ background: "var(--bg-hover)" }}>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: isPending ? "var(--accent-amber)" : "var(--success)" }} />
            <span className="text-subhead">{isPending ? "Copilot is searching..." : "Copilot Ready"}</span>
          </div>
          <span className="text-caption" style={{ color: "var(--text-3)" }}>Session: {messages.length} prompts</span>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const isAi = msg.role === "ai";
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border"
                    style={{
                      background: isAi ? "var(--brand-muted)" : "var(--brand)",
                      borderColor: isAi ? "var(--brand-border)" : "transparent",
                    }}
                  >
                    {isAi ? (
                      <Bot size={14} style={{ color: "var(--brand)" }} />
                    ) : (
                      <User size={14} style={{ color: "#fff" }} />
                    )}
                  </div>

                  {/* Chat bubble */}
                  <div className="flex flex-col gap-1.5 max-w-[80%]">
                    <div
                      className="px-4 py-3 rounded-2xl"
                      style={{
                        background: isAi ? "var(--bg-hover)" : "var(--brand)",
                        border: `1px solid ${isAi ? "var(--border)" : "transparent"}`,
                        color: isAi ? "var(--text-1)" : "#fff",
                        borderRadius: isAi ? "0px 16px 16px 16px" : "16px 0px 16px 16px",
                      }}
                    >
                      <p className="text-body leading-relaxed">{msg.content}</p>

                      {/* Render Table Data if available */}
                      {msg.tableData && msg.tableData.rows.length > 0 && (
                        <div className="mt-3 overflow-x-auto border-t border-subtle" style={{ paddingTop: "12px" }}>
                          <table className="table-premium w-full text-xs">
                            <thead>
                              <tr>
                                {msg.tableData.columns.map(col => (
                                  <th key={col} style={{ padding: "6px 10px", color: isAi ? "var(--text-3)" : "rgba(255,255,255,0.7)" }}>{col}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {msg.tableData.rows.map((row, idx) => (
                                <tr key={idx}>
                                  {row.map((cell, cidx) => (
                                    <td key={cidx} style={{ padding: "8px 10px", color: isAi ? "var(--text-2)" : "#fff" }}>{String(cell)}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {isPending && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border border-brand-border" style={{ background: "var(--brand-muted)" }}>
                  <Bot size={14} style={{ color: "var(--brand)" }} />
                </div>
                <div className="px-4 py-3 rounded-2xl border" style={{ background: "var(--bg-hover)", border: "1px solid var(--border)", borderRadius: "0px 16px 16px 16px" }}>
                  <div className="flex gap-1.5 items-center py-1">
                    {[0, 1, 2].map(i => <div key={i} className="typing-dot" />)}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />

          {/* Suggestions Grid (Visible only on initial state) */}
          {isInitialState && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="mt-8 pt-8 border-t border-subtle"
            >
              <p className="text-label mb-4 flex items-center gap-1.5"><Sparkles size={11} style={{ color: "var(--brand)" }} /> Suggested Queries</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {chatSuggestions.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => handleSend(item.query)}
                    className="card p-4 text-left card-hover cursor-pointer transition-all flex justify-between items-center"
                    style={{ background: "var(--bg-hover)", borderColor: "var(--border)" }}
                  >
                    <div>
                      <p className="text-caption font-semibold" style={{ color: "var(--text-1)", marginBottom: "2px" }}>{item.title}</p>
                      <p className="text-caption" style={{ color: "var(--text-3)", fontSize: "11px" }}>{item.desc}</p>
                    </div>
                    <ChevronRight size={14} style={{ color: "var(--text-3)" }} />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-subtle" style={{ background: "var(--bg-hover)" }}>
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-3 relative">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Query patient list, bed states, revenue reports..."
              className="input-premium flex-1"
              style={{ paddingRight: "50px", height: "46px" }}
            />
            <motion.button
              type="submit"
              disabled={!question.trim() || isPending}
              className="btn-primary absolute right-1.5 top-1/2 -translate-y-1/2"
              style={{
                width: "34px",
                height: "34px",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "var(--r-sm)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <SendHorizonal size={14} />
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}

function InsightsTab() {
  const { data, isLoading, isError } = useInsights();

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {[...Array(4)].map((_, i) => <div key={i} className="skeleton h-16 rounded-xl" />)}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6 text-center" style={{ color: "var(--text-3)" }}>
        AI insights unavailable.
      </div>
    );
  }

  const insight = data as AIInsight;
  const riskConfig: Record<string, { color: string; bg: string; border: string }> = {
    High: { color: "var(--danger)", bg: "var(--danger-muted)", border: "rgba(239,68,68,0.2)" },
    Medium: { color: "var(--warning)", bg: "var(--warning-muted)", border: "rgba(245,158,11,0.2)" },
    Low: { color: "var(--success)", bg: "var(--success-muted)", border: "rgba(34,197,94,0.2)" },
  };

  const risk = riskConfig[insight.risk] ?? riskConfig.Low;

  return (
    <div className="p-6 space-y-6">
      {/* Risk Badge */}
      <div
        className="rounded-2xl"
        style={{
          padding: "20px",
          background: risk.bg,
          border: `1px solid ${risk.border}`,
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <AlertTriangle size={18} style={{ color: risk.color }} />
          <span className="text-subhead" style={{ color: "var(--text-1)" }}>
            Risk Assessment: <span style={{ color: risk.color }}>{insight.risk}</span>
          </span>
          <span className="ml-auto badge badge-brand">
            {insight.confidence}% confidence
          </span>
        </div>
        <p className="text-body" style={{ color: "var(--text-2)", lineHeight: "1.5" }}>
          {insight.summary}
        </p>
      </div>

      {/* Recommendations */}
      <div>
        <h3 className="text-subhead mb-4 flex items-center gap-2" style={{ color: "var(--text-1)" }}>
          <CheckCircle size={14} style={{ color: "var(--success)" }} />
          AI Recommendations
        </h3>
        <div className="space-y-2">
          {insight.recommendations.map((rec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 rounded-lg border border-subtle"
              style={{
                padding: "12px",
                background: "var(--bg-hover)",
              }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                style={{
                  background: "var(--brand-muted)",
                  border: "1px solid var(--brand-border)",
                  color: "var(--brand)",
                }}
              >
                {i + 1}
              </div>
              <p className="text-body" style={{ color: "var(--text-2)", flex: 1 }}>{rec}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ForecastTab() {
  const { data, isLoading, isError } = useForecast();

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {[...Array(3)].map((_, i) => <div key={i} className="skeleton h-24 rounded-xl" />)}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-6 text-center" style={{ color: "var(--text-3)" }}>
        Forecast data unavailable.
      </div>
    );
  }

  const forecast = data as Forecast;
  const isIncreasing = forecast.trend === "Increasing";

  const FORECAST_MAP = [
    { label: "Expected Revenue", value: `₹ ${(forecast.expected_revenue / 10_000_000).toFixed(2)} Cr`, color: "var(--accent-green)", colorMuted: "var(--success-muted)", border: "rgba(34,197,94,0.25)", icon: TrendingUp },
    { label: "Expected Admissions", value: forecast.expected_admissions.toLocaleString(), color: "var(--brand)", colorMuted: "var(--brand-muted)", border: "var(--brand-border)", icon: User },
    { label: "Predicted Occupancy", value: `${forecast.predicted_occupancy}%`, color: "var(--accent-amber)", colorMuted: "var(--warning-muted)", border: "rgba(245,158,11,0.25)", icon: BarChart3 },
    { label: "AI Confidence", value: `${forecast.confidence}%`, color: "var(--accent-purple)", colorMuted: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.25)", icon: Brain },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {FORECAST_MAP.map((item) => (
          <div
            key={item.label}
            className="rounded-xl"
            style={{
              padding: "16px",
              background: item.colorMuted,
              border: `1px solid ${item.border}`,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <item.icon size={13} style={{ color: item.color }} />
              <span className="text-caption" style={{ color: "var(--text-2)" }}>{item.label}</span>
            </div>
            <p className="text-subhead" style={{ fontSize: "1.125rem", color: item.color }}>{item.value}</p>
          </div>
        ))}
      </div>

      <div
        className="rounded-xl"
        style={{
          padding: "16px",
          background: isIncreasing ? "var(--success-muted)" : "var(--danger-muted)",
          border: `1px solid ${isIncreasing ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
        }}
      >
        <p className="text-caption" style={{ color: "var(--text-2)", marginBottom: "4px" }}>Revenue Trend</p>
        <p className="text-title" style={{ color: isIncreasing ? "var(--success)" : "var(--danger)" }}>
          {forecast.trend}
        </p>
      </div>
    </div>
  );
}

function ReportsTab() {
  const reports = [
    { name: "Monthly Executive Summary", date: "Jul 2026", status: "Ready", color: "var(--brand)", bg: "var(--brand-muted)", border: "var(--brand-border)" },
    { name: "Patient Satisfaction Report", date: "Jun 2026", status: "Ready", color: "var(--accent-green)", bg: "var(--success-muted)", border: "rgba(34,197,94,0.2)" },
    { name: "Financial Performance Q2", date: "Jun 2026", status: "Ready", color: "var(--accent-purple)", bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.2)" },
    { name: "Department Analytics", date: "Jul 2026", status: "Generating", color: "var(--accent-amber)", bg: "var(--warning-muted)", border: "rgba(245,158,11,0.2)" },
    { name: "AI Anomaly Detection Log", date: "Jul 2026", status: "Ready", color: "var(--accent-cyan)", bg: "rgba(6,182,212,0.12)", border: "rgba(6,182,212,0.2)" },
  ];

  return (
    <div className="p-6 space-y-3">
      {reports.map((report, i) => {
        const isReady = report.status === "Ready";
        const badgeClass = isReady ? "badge badge-success" : "badge badge-warning";

        return (
          <motion.div
            key={report.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center justify-between rounded-lg border border-subtle cursor-pointer"
            style={{
              padding: "16px",
              background: "var(--bg-hover)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--bg-active)";
              e.currentTarget.style.borderColor = "var(--border-strong)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--bg-hover)";
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: report.bg, border: `1px solid ${report.border}` }}
              >
                <FileText size={14} style={{ color: report.color }} />
              </div>
              <div>
                <p className="text-body font-medium" style={{ color: "var(--text-1)" }}>{report.name}</p>
                <p className="text-caption" style={{ color: "var(--text-3)" }}>{report.date}</p>
              </div>
            </div>
            <span className={badgeClass}>
              {report.status}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function AIHubPage() {
  const [activeTab, setActiveTab] = useState("chat");

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
            <Brain size={13} style={{ color: "var(--brand)" }} />
          </div>
          <h1 className="text-title" style={{ fontSize: "1.5rem" }}>
            AI Intelligence Hub
          </h1>
        </div>
        <p className="text-caption" style={{ color: "var(--text-2)" }}>
          Natural language data queries, AI insights, forecasting, and executive reports
        </p>
      </motion.div>

      {/* Main AI Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card overflow-hidden"
      >
        {/* Tab Header */}
        <div
          className="flex flex-wrap items-center gap-1 p-4"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer"
              style={{
                background: activeTab === tab.id ? "var(--brand-muted)" : "transparent",
                border: activeTab === tab.id ? "1px solid var(--brand-border)" : "1px solid transparent",
                color: activeTab === tab.id ? "var(--brand)" : "var(--text-3)",
              }}
            >
              <tab.icon size={14} />
              <div className="text-left">
                <p className="text-xs font-semibold leading-none">{tab.label}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "chat" && <ChatTab />}
            {activeTab === "insights" && <InsightsTab />}
            {activeTab === "forecast" && <ForecastTab />}
            {activeTab === "reports" && <ReportsTab />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
