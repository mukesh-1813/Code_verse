import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Play, Send, Sparkles, Loader2 } from "lucide-react";
import Loader from "../../components/common/Loader";
import { problemService } from "../../services/placeholderServices";

const languages = ["JavaScript", "Python", "C++", "Java", "C"];

const ProblemDetail = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [output, setOutput] = useState(null);
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [tab, setTab] = useState("description");

  useEffect(() => {
    problemService.get(id).then((res) => {
      setProblem(res.data);
      setCode(res.data.starterCode);
    });
  }, [id]);

  if (!problem) return <Loader />;

  const handleRun = async () => {
    setRunning(true);
    setOutput(null);
    await new Promise((r) => setTimeout(r, 700));
    setOutput({ status: "success", stdout: "[0, 1]", time: "42ms", memory: "18MB" });
    setRunning(false);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const { data } = await problemService.submit(id, { code, language });
      toast.success(`Verdict: ${data.verdict}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid h-[calc(100vh-8rem)] grid-cols-1 gap-4 lg:grid-cols-2">
      {/* Left panel */}
      <div className="card flex flex-col overflow-hidden">
        <div className="flex border-b border-ink-100 px-2">
          {["description", "hints", "discussion"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-3 text-sm font-medium capitalize transition ${
                tab === t ? "border-b-2 border-indigo-600 text-indigo-600" : "text-ink-400 hover:text-ink-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {tab === "description" && (
            <>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold">{problem.title}</h1>
                <span className="badge-easy">{problem.difficulty}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {problem.tags.map((t) => (
                  <span key={t} className="badge bg-ink-50 text-ink-500">{t}</span>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-600">{problem.statement}</p>

              <h3 className="mt-6 text-sm font-semibold text-ink-800">Examples</h3>
              {problem.examples.map((ex, i) => (
                <div key={i} className="mt-2 rounded-xl bg-ink-50 p-3 font-mono text-xs text-ink-600">
                  <p><span className="text-ink-400">Input:</span> {ex.input}</p>
                  <p><span className="text-ink-400">Output:</span> {ex.output}</p>
                </div>
              ))}

              <h3 className="mt-6 text-sm font-semibold text-ink-800">Constraints</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-ink-500">
                {problem.constraints.map((c, i) => (
                  <li key={i} className="font-mono text-xs">{c}</li>
                ))}
              </ul>
            </>
          )}
          {tab === "hints" && (
            <div className="flex items-start gap-3 rounded-xl bg-indigo-50 p-4 text-sm text-indigo-700">
              <Sparkles className="h-5 w-5 shrink-0" />
              <p>Try using a hash map to store visited values and their indices for O(n) lookup time.</p>
            </div>
          )}
          {tab === "discussion" && (
            <p className="text-sm text-ink-400">Discussion threads will appear here once available.</p>
          )}
        </div>
      </div>

      {/* Right panel */}
      <div className="card flex flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-ink-100 px-4 py-2.5">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-lg border border-ink-100 bg-white px-3 py-1.5 text-sm outline-none"
          >
            {languages.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <button onClick={handleRun} disabled={running} className="btn-secondary">
              {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              Run
            </button>
            <button onClick={handleSubmit} disabled={submitting} className="btn-primary">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Submit
            </button>
          </div>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="flex-1 resize-none bg-ink-900 p-4 font-mono text-sm text-teal-100 outline-none"
        />

        <div className="h-40 overflow-y-auto border-t border-ink-100 bg-ink-50/50 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-400">Console</p>
          {output ? (
            <div className="space-y-1 font-mono text-xs">
              <p className="text-teal-600">Output: {output.stdout}</p>
              <p className="text-ink-400">Time: {output.time} • Memory: {output.memory}</p>
            </div>
          ) : (
            <p className="text-xs text-ink-300">Run your code to see output here.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
