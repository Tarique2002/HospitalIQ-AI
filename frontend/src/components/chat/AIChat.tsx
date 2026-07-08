import { useState } from "react";
import { Brain, Send } from "lucide-react";

import { useChat } from "../../hooks/useChat";

export default function AIChat() {

    const [question, setQuestion] = useState("");

    const {
        mutate,
        data,
        isPending,
    } = useChat();

    return (

        <div className="rounded-3xl bg-white p-8 shadow-sm border">

            <div className="flex items-center gap-3 mb-8">

                <Brain className="text-violet-600" />

                <h2 className="text-2xl font-bold">

                    HospitalIQ AI Assistant

                </h2>

            </div>

            <textarea
                className="w-full rounded-xl border p-4 h-32"
                placeholder="Ask anything about your hospital..."
                value={question}
                onChange={(e)=>setQuestion(e.target.value)}
            />

            <button
                onClick={()=>mutate(question)}
                className="mt-4 w-full rounded-xl bg-violet-600 text-white py-4 flex justify-center items-center gap-2"
            >

                <Send size={18}/>

                {isPending ? "Thinking..." : "Ask AI"}

            </button>

            {data && (

                <div className="mt-8 rounded-xl bg-slate-100 p-6">

                    <h3 className="font-bold mb-2">

                        AI Response

                    </h3>

                    <p>

                        {data.answer}

                    </p>

                </div>

            )}

        </div>

    );

}