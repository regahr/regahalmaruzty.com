"use client";

import { useEffect, useState } from "react";
import { puzzles } from "./puzzle";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";

// Same puzzle for everyone on a given day.
const getPuzzleIndexForToday = () => {
  const dateString = new Date().toISOString().split("T")[0];
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash += dateString.charCodeAt(i);
  }
  return hash % puzzles.length;
};

// Puzzle sources are indented for the source file; strip the common indent for display.
const dedent = (code: string) => {
  const lines = code.split("\n");
  const indents = lines
    .slice(1)
    .filter((l) => l.trim())
    .map((l) => l.match(/^ */)![0].length);
  const cut = indents.length ? Math.min(...indents) : 0;
  return [lines[0], ...lines.slice(1).map((l) => l.slice(Math.min(cut, l.match(/^ */)![0].length)))].join("\n");
};

const fileNameFor = (code: string) => {
  const match = code.match(/function\s+(\w+)/);
  return `${match ? match[1] : "puzzle"}.js`;
};

const CodePuzzle: React.FC = () => {
  // Picked after mount: the page is prerendered at build time, so choosing by
  // date during render would differ between server HTML and the browser.
  const [puzzle, setPuzzle] = useState<(typeof puzzles)[number] | null>(null);
  const [code, setCode] = useState("");
  useEffect(() => {
    const p = puzzles[getPuzzleIndexForToday()];
    setPuzzle(p);
    setCode(dedent(p.code));
  }, []);
  const [result, setResult] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);

  const handleSubmit = () => {
    if (!puzzle) return;
    try {
      const userFunction = new Function("return " + code)();
      const output = userFunction(puzzle.testInput);
      if (output === puzzle.expectedOutput) {
        setResult("✓ correct. nice.");
        setIsCorrect(true);
      } else {
        setResult(`✗ got ${JSON.stringify(output)}, expected ${JSON.stringify(puzzle.expectedOutput)}`);
        setIsCorrect(false);
      }
    } catch {
      setResult("✗ syntax or runtime error. check your code.");
      setIsCorrect(false);
    }
  };

  const getHint = () => {
    if (!puzzle) return;
    if (hintsUsed < 3) {
      setHintsUsed(hintsUsed + 1);
      setResult(`hint: ${puzzle.hint}`);
      setIsCorrect(false);
    } else {
      setResult("no more hints today.");
    }
  };

  const btn =
    "inline-flex items-center min-h-[44px] px-[18px] rounded-lg font-mono text-sm border transition-[color,background-color,border-color,transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] cursor-pointer";

  return (
    <div className="bg-surface border border-line rounded-xl overflow-hidden max-w-[760px]">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-line font-mono text-[13px] text-muted">
        <span className="w-2.5 h-2.5 rounded-full bg-line" />
        <span className="w-2.5 h-2.5 rounded-full bg-line" />
        <span className="w-2.5 h-2.5 rounded-full bg-line" />
        <span className="ml-2">{puzzle ? fileNameFor(puzzle.code) : "loading.js"}</span>
      </div>
      <p className="px-5 pt-4 text-[15px] text-muted min-h-[2.6em]">{puzzle?.description ?? "\u00a0"}</p>
      <Editor
        value={code}
        onValueChange={setCode}
        highlight={(c) => highlight(c, languages.js, "javascript")}
        padding={20}
        textareaId="cozzle-editor"
        aria-label="Puzzle code editor"
        className="font-mono text-sm leading-[1.7] min-h-[160px]"
        style={{ fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace" }}
      />
      <div className="flex flex-wrap items-center gap-3 px-5 pb-5">
        <button type="button" onClick={handleSubmit} className={`${btn} bg-accent text-on-accent border-accent font-medium hover:brightness-110`}>
          run
        </button>
        <button type="button" onClick={getHint} className={`${btn} border-line text-fg hover:border-muted`}>
          hint {hintsUsed > 0 ? `(${hintsUsed}/3)` : ""}
        </button>
        <p role="status" className={`font-mono text-[13px] ${isCorrect ? "text-accent" : "text-muted"}`}>
          {result}
        </p>
      </div>
    </div>
  );
};

export default CodePuzzle;
