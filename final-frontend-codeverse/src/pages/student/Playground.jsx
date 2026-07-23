import React, { useState } from "react";
import { Play, Loader2, Sparkles } from "lucide-react";

const languages = ["JavaScript", "Python", "C++", "Java", "C"];
const starter = {
  JavaScript: 'console.log("Hello, CodeVerse!");',
  Python: 'print("Hello, CodeVerse!")',
  "C++": '#include <iostream>\nint main() {\n  std::cout << "Hello, CodeVerse!";\n}',
  Java: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, CodeVerse!");\n  }\n}',
  C: '#include <stdio.h>\nint main() {\n  printf("Hello, CodeVerse!");\n  return 0;\n}',
};

const Playground = () => {
  const [language, setLanguage] = useState("JavaScript");
  const [code, setCode] = useState(starter.JavaScript);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState("");

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(starter[lang]);
  };

  const handleRun = async () => {
    setRunning(true);
    setOutput("");
    await new Promise((r) => setTimeout(r, 600));
    setOutput("Hello, CodeVerse!\n\n> Program finished in 34ms");
    setRunning(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Coding Playground</h1>
        <p className="text-sm text-ink-400">A free-form space to experiment with code in any language.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card flex flex-col overflow-hidden lg:col-span-2">
          <div className="flex items-center justify-between border-b border-ink-100 px-4 py-2.5">
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="rounded-lg border border-ink-100 bg-white px-3 py-1.5 text-sm outline-none"
            >
              {languages.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
            <button onClick={handleRun} disabled={running} className="btn-primary">
              {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              Run
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="h-80 resize-none bg-ink-900 p-4 font-mono text-sm text-teal-100 outline-none"
          />
          <div className="h-32 overflow-y-auto border-t border-ink-100 bg-ink-50/50 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-400">Output</p>
            <pre className="whitespace-pre-wrap font-mono text-xs text-ink-600">
              {output || "Run your code to see output here."}
            </pre>
          </div>
        </div>

        <div className="card p-5">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-600" />
            <h2 className="text-base font-semibold">AI Suggestions</h2>
          </div>
          <p className="text-sm text-ink-500">
            Your code looks good! Try wrapping this logic in a function so you
            can reuse it, and consider adding a comment explaining the
            expected input format.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Playground;
