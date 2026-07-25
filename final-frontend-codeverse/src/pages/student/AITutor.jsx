import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Loader2, Code2, Bug, BookOpenText } from "lucide-react";
import { aiService } from "../../services/placeholderServices";

const quickPrompts = [
  { icon: Code2, label: "Explain this code" },
  { icon: Bug, label: "Debug my error" },
  { icon: BookOpenText, label: "Generate practice notes" },
];

const AITutor = () => {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! I'm your AI Tutor. Ask me to explain a concept, debug an error, or generate examples for anything you're learning.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setLoading(true);
    const { data } = await aiService.ask(text);
    setMessages((m) => [...m, { role: "ai", text: data.answer }]);
    setLoading(false);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      <div className="mb-4">
        <h1 className="flex items-center gap-2 text-xl font-bold">
          <Sparkles className="h-5 w-5 text-indigo-600" /> AI Tutor
        </h1>
        <p className="text-sm text-ink-400">Your personal AI mentor, available 24/7.</p>
      </div>

      <div className="card flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-lg rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-ink-50 text-ink-700"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-ink-50 px-4 py-3">
                <Loader2 className="h-4 w-4 animate-spin text-ink-400" />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="border-t border-ink-100 p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {quickPrompts.map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={() => send(label)}
                className="flex items-center gap-1.5 rounded-full border border-ink-100 px-3 py-1.5 text-xs font-medium text-ink-500 hover:bg-ink-50"
              >
                <Icon className="h-3.5 w-3.5" /> {label}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="input"
              placeholder="Ask anything about coding..."
            />
            <button type="submit" className="btn-primary" disabled={loading}>
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
