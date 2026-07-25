import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Play, Send, Sparkles, Loader2 } from "lucide-react";

import Loader from "../../components/common/Loader";
import { problemService } from "../../services/problemService";
import { judgeService } from "../../services/judgeService";

const languages = ["JavaScript", "Python", "C++", "Java", "C"];

const LANGUAGE_CONFIG = {
  JavaScript: {
    language: "javascript",
    version: "18.15.0",
  },
  Python: {
    language: "python",
    version: "3.12.0",
  },
  Java: {
    language: "java",
    version: "15.0.2",
  },
  "C++": {
    language: "cpp",
    version: "10.2.0",
  },
  C: {
    language: "c",
    version: "10.2.0",
  },
};

const ProblemDetail = () => {
  const { slug } = useParams();

  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("JavaScript");
  const [output, setOutput] = useState(null);
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [tab, setTab] = useState("description");

  useEffect(() => {
    loadProblem();
  }, [slug]);

  const loadProblem = async () => {
    try {
      const { data } = await problemService.get(slug);
      setProblem(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load problem");
    }
  };

  if (!problem) return <Loader />;

  const handleRun = async () => {
    try {
      setRunning(true);
      setOutput(null);

      const config = LANGUAGE_CONFIG[language];

      const { data } = await judgeService.run({
        language: config.language,
        version: config.version,
        files: [
          {
            content: code,
          },
        ],
        stdin: "",
      });

      console.log(data);

      if (data.run) {
        setOutput(data.run);
      } else {
        setOutput(data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Execution failed");
    } finally {
      setRunning(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const config = LANGUAGE_CONFIG[language];

      const { data } = await problemService.submit({
        problem_id: problem.id,
        language: config.language,
        version: config.version,
        source_code: code,
      });

      toast.success(data.verdict || "Submitted Successfully");
    } catch (err) {
      console.error(err);
      toast.error("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid h-[calc(100vh-8rem)] grid-cols-1 gap-4 lg:grid-cols-2">

      {/* LEFT PANEL */}

      <div className="card flex flex-col overflow-hidden">

        <div className="flex border-b border-ink-100 px-2">

          {["description", "hints", "discussion"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-3 text-sm font-medium capitalize transition ${
                tab === t
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-ink-400 hover:text-ink-600"
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

                <h1 className="text-lg font-bold">
                  {problem.title}
                </h1>

                <span className="badge-easy">
                  {problem.difficulty}
                </span>

              </div>

              <div className="mt-2 flex flex-wrap gap-2">

                {problem.tags?.map((tag) => (
                  <span
                    key={tag.id || tag.name}
                    className="badge bg-ink-50 text-ink-600"
                  >
                    {tag.name || tag}
                  </span>
                ))}

              </div>

              <div
                className="prose mt-4 max-w-none"
                dangerouslySetInnerHTML={{
                  __html: problem.description,
                }}
              />
            </>
          )}

          {tab === "hints" && (
            <div className="flex items-start gap-3 rounded-xl bg-indigo-50 p-4 text-sm text-indigo-700">
              <Sparkles className="h-5 w-5 shrink-0" />
              <p>
                AI hints or editorial can be displayed here.
              </p>
            </div>
          )}

          {tab === "discussion" && (
            <div className="text-sm text-gray-500">
              Discussion feature coming soon.
            </div>
          )}

        </div>

      </div>

      {/* ================= RIGHT PANEL ================= */}

      <div className="card flex flex-col overflow-hidden">

        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-lg border px-3 py-2 text-sm"
          >
            {languages.map((lang) => (
              <option
                key={lang}
                value={lang}
              >
                {lang}
              </option>
            ))}
          </select>

          <div className="flex gap-2">

            <button
              onClick={handleRun}
              disabled={running}
              className="btn-secondary flex items-center gap-2"
            >
              {running ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}

              Run
            </button>

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-primary flex items-center gap-2"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}

              Submit
            </button>

          </div>

        </div>

        {/* CODE EDITOR */}

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          placeholder="// Write your solution here..."
          className="flex-1 resize-none bg-[#0d1117] p-5 font-mono text-sm text-green-300 outline-none"
        />

        {/* OUTPUT */}

        <div className="h-56 overflow-auto border-t bg-gray-50 p-4">

          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Console
          </h3>

          {!output && (
            <div className="text-sm text-gray-400">
              Click <strong>Run</strong> to execute your code.
            </div>
          )}

          {output && (
            <div className="space-y-4">

              {output.stdout && (
                <div>
                  <p className="mb-1 font-semibold text-green-600">
                    Standard Output
                  </p>

                  <pre className="whitespace-pre-wrap rounded-lg bg-green-50 p-3 text-green-700">
                    {output.stdout}
                  </pre>
                </div>
              )}

              {output.stderr && (
                <div>
                  <p className="mb-1 font-semibold text-red-600">
                    Runtime Error
                  </p>

                  <pre className="whitespace-pre-wrap rounded-lg bg-red-50 p-3 text-red-700">
                    {output.stderr}
                  </pre>
                </div>
              )}

              {output.compile?.stdout && (
                <div>
                  <p className="mb-1 font-semibold text-blue-600">
                    Compiler Output
                  </p>

                  <pre className="whitespace-pre-wrap rounded-lg bg-blue-50 p-3 text-blue-700">
                    {output.compile.stdout}
                  </pre>
                </div>
              )}

              {output.compile?.stderr && (
                <div>
                  <p className="mb-1 font-semibold text-red-600">
                    Compilation Error
                  </p>

                  <pre className="whitespace-pre-wrap rounded-lg bg-red-50 p-3 text-red-700">
                    {output.compile.stderr}
                  </pre>
                </div>
              )}

              {(output.code !== undefined ||
                output.signal ||
                output.cpuTime ||
                output.memory) && (
                <div className="rounded-lg bg-white p-3 text-xs text-gray-600 shadow-sm">

                  {output.code !== undefined && (
                    <p>
                      <strong>Exit Code:</strong> {output.code}
                    </p>
                  )}

                  {output.signal && (
                    <p>
                      <strong>Signal:</strong> {output.signal}
                    </p>
                  )}

                  {output.cpuTime && (
                    <p>
                      <strong>CPU Time:</strong> {output.cpuTime} ms
                    </p>
                  )}

                  {output.memory && (
                    <p>
                      <strong>Memory:</strong> {output.memory}
                    </p>
                  )}

                </div>
              )}

              {!output.stdout &&
                !output.stderr &&
                !output.compile?.stderr && (
                  <div className="rounded-lg bg-gray-100 p-3 text-gray-500">
                    No output received.
                  </div>
                )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default ProblemDetail;
