import { useState } from "react";
import { Bot, SendHorizonal } from "lucide-react";
import { useSQLAgent } from "../../hooks/useSQLAgent";

type AIResponse = {
  title: string;
  columns: string[];
  rows: (string | number)[][];
};

export default function AISQLAgent() {
  const [question, setQuestion] = useState("");

  const {
    mutate,
    data,
    isPending,
    isError,
  } = useSQLAgent();

  const result = data as AIResponse | undefined;

  return (
    <div className="rounded-3xl bg-white border shadow-sm p-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="bg-indigo-100 p-4 rounded-2xl">

          <Bot
            className="text-indigo-600"
            size={30}
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold">
            AI SQL Assistant
          </h2>

          <p className="text-slate-500">
            Ask questions about your hospital
          </p>

        </div>

      </div>

      {/* Input */}

      <div className="flex gap-3 mb-8">

        <input
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          placeholder="Example: total patients"
          className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={() => mutate(question)}
          disabled={!question || isPending}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 flex items-center gap-2 transition"
        >
          <SendHorizonal size={18} />

          Ask AI
        </button>

      </div>

      {isPending && (

        <div className="text-slate-500">

          Thinking...

        </div>

      )}

      {isError && (

        <div className="text-red-500">

          Something went wrong.

        </div>

      )}

      {result && (

        <div>

          <h3 className="text-xl font-bold mb-4">

            {result.title}

          </h3>

          <div className="overflow-x-auto">

            <table className="w-full border">

              <thead>

                <tr className="bg-slate-100">

                  {result.columns.map((col) => (

                    <th
                      key={col}
                      className="p-3 text-left border"
                    >
                      {col}
                    </th>

                  ))}

                </tr>

              </thead>

              <tbody>

                {result.rows.map((row, index) => (

                  <tr
                    key={index}
                    className="hover:bg-slate-50"
                  >

                    {row.map((cell, i) => (

                      <td
                        key={i}
                        className="border p-3"
                      >
                        {cell}
                      </td>

                    ))}

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>
  );
}