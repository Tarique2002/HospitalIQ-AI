import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, SendHorizonal, Sparkles, User, RefreshCw } from "lucide-react";
import { useSQLAgent } from "../../hooks/useSQLAgent";

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

const suggestedQuestions = [
  "total patients",
  "total revenue",
  "occupied beds",
  "total admissions",
  "available beds",
];

export default function AIChatWidget() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "ai",
      content: "Hello! I'm your HospitalIQ AI assistant. Ask me anything about hospital data — patients, beds, revenue, and more.",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { mutate, isPending } = useSQLAgent();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = useCallback((q?: string) => {
    const query = q ?? question;
    if (!query.trim() || isPending) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: query,
    };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");

    mutate(query, {
      onSuccess: (data) => {
        const result = data as AIResponse;
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            role: "ai",
            content: result.title,
            tableData: result,
          },
        ]);
      },
      onError: () => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            role: "ai",
            content: "Sorry, I couldn't process that query. Please try again.",
          },
        ]);
      },
    });
  }, [question, isPending, mutate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card card-hover overflow-hidden"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{
          padding: "16px 24px",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg-hover)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="icon-box icon-box-sm icon-box-round"
            style={{
              background: "var(--brand-muted)",
              border: "1px solid var(--brand-border)",
            }}
          >
            <Bot size={13} style={{ color: "var(--brand)" }} />
          </div>
          <div>
            <h3 className="text-subhead" style={{ color: "var(--text-1)" }}>
              AI Data Assistant
            </h3>
            <div className="flex items-center gap-1.5" style={{ marginTop: "2px" }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: "var(--success)" }} />
              <p className="text-caption" style={{ color: "var(--text-2)" }}>Natural Language Queries</p>
            </div>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([{
              id: 0, role: "ai",
              content: "Hello! I'm your HospitalIQ AI assistant. Ask me anything about hospital data.",
            }])
          }
          className="btn-ghost p-2 rounded-lg"
          style={{ width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <RefreshCw size={13} style={{ color: "var(--text-2)" }} />
        </button>
      </div>

      {/* Suggested questions */}
      <div
        className="flex items-center gap-2 overflow-x-auto"
        style={{
          padding: "10px 24px",
          borderBottom: "1px solid var(--border-subtle)",
          whiteSpace: "nowrap",
        }}
      >
        <Sparkles size={11} style={{ color: "var(--text-3)", flexShrink: 0 }} />
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            onClick={() => handleSend(q)}
            className="text-caption transition-all cursor-pointer"
            style={{
              padding: "4px 10px",
              background: "var(--bg-hover)",
              border: "1px solid var(--border)",
              borderRadius: "9999px",
              color: "var(--text-2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--brand-muted)";
              e.currentTarget.style.borderColor = "var(--brand-border)";
              e.currentTarget.style.color = "var(--brand)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--bg-hover)";
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-2)";
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div
        className="space-y-4 overflow-y-auto"
        style={{
          padding: "24px",
          maxHeight: "340px",
          minHeight: "200px",
        }}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: msg.role === "ai"
                    ? "var(--brand-muted)"
                    : "var(--brand)",
                  border: msg.role === "ai" ? "1px solid var(--brand-border)" : "none",
                }}
              >
                {msg.role === "ai" ? (
                  <Bot size={13} style={{ color: "var(--brand)" }} />
                ) : (
                  <User size={13} style={{ color: "#fff" }} />
                )}
              </div>

              {/* Content */}
              <div
                className="max-w-[80%] rounded-xl px-4 py-3"
                style={{
                  background: msg.role === "ai"
                    ? "var(--bg-hover)"
                    : "var(--brand-muted)",
                  border: `1px solid ${msg.role === "ai" ? "var(--border)" : "var(--brand-border)"}`,
                }}
              >
                <p className="text-body" style={{ color: "var(--text-1)" }}>
                  {msg.content}
                </p>

                {/* Table */}
                {msg.tableData && msg.tableData.rows.length > 0 && (
                  <div className="mt-3 overflow-x-auto" style={{ borderTop: "1px solid var(--border)", paddingTop: "8px" }}>
                    <table className="table-premium w-full">
                      <thead>
                        <tr>
                          {msg.tableData.columns.map((col) => (
                            <th key={col} style={{ padding: "8px 12px" }}>{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {msg.tableData.rows.map((row, i) => (
                          <tr key={i}>
                            {row.map((cell, j) => (
                              <td key={j} style={{ padding: "8px 12px" }}>{String(cell)}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Thinking indicator */}
          {isPending && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--brand-muted)", border: "1px solid var(--brand-border)" }}
              >
                <Bot size={13} style={{ color: "var(--brand)" }} />
              </div>
              <div
                className="rounded-xl px-4 py-3"
                style={{ background: "var(--bg-hover)", border: "1px solid var(--border)" }}
              >
                <div className="flex gap-1.5 items-center">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="typing-dot" />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div
        className="p-4"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex gap-3"
        >
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about patients, revenue, occupancy..."
            className="input-premium flex-1"
          />
          <motion.button
            type="submit"
            disabled={!question.trim() || isPending}
            className="btn-primary"
            style={{ width: "42px", height: "42px", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SendHorizonal size={15} />
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
