import { useEffect, useRef, useState } from "react";
import { puzzles } from "./puzzle";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";

const getPuzzleIndexForToday = () => {
  const today = new Date();
  const dateString = today.toISOString().split("T")[0]; // Get YYYY-MM-DD format
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash += dateString.charCodeAt(i);
  }
  return hash % puzzles.length; // Ensure the index is within bounds
};

const CodePuzzle: React.FC = () => {
  const currentPuzzle = useRef(puzzles[getPuzzleIndexForToday()]);
  const [code, setCode] = useState(currentPuzzle.current.code);
  const [result, setResult] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);

  useEffect(() => {
    setCode(currentPuzzle.current.code); // Reset code when the puzzle changes
  }, [currentPuzzle]);

  const handleSubmit = () => {
    try {
      const userFunction = new Function("return " + code)();

      const output = userFunction(currentPuzzle.current.testInput);

      if (output === currentPuzzle.current.expectedOutput) {
        setResult("Correct!");
        setIsCorrect(true);
      } else {
        setResult("Incorrect. Try again!");
        setIsCorrect(false);
      }
    } catch (error) {
      console.log(error);
      setResult("Error in your code. Please fix it.");
      setIsCorrect(false);
    }
  };

  const getHint = () => {
    if (hintsUsed < 3) {
      setHintsUsed(hintsUsed + 1);
      setResult(currentPuzzle.current.hint); // Use the hint from the current puzzle
    } else {
      setResult("No more hints available.");
    }
  };

  return (
    <div className="grid grid-rows">
      <div className="flex text-left text-sm font-medium">
        Co-zzle for the day!
      </div>
      <div className="flex text-left text-sm font-medium">
        {currentPuzzle.current.description}
      </div>
      <Editor
        value={code}
        onValueChange={setCode}
        highlight={(code) => highlight(code, languages.js, "javascript")}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
          border: "1px solid #ddd",
          borderRadius: "4px",
          minHeight: "200px",
        }}
      />
      <button
        onClick={handleSubmit}
        className="mt-4 p-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded shadow-md hover:from-green-300 hover:to-blue-400 transition duration-300"
      >
        Submit
      </button>
      <button
        onClick={getHint}
        className="mt-2 p-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded shadow-md hover:from-yellow-300 hover:to-orange-400 transition duration-300"
      >
        Get Hint
      </button>
      {result && (
        <div
          className={`mt-2 ${isCorrect ? "text-green-500" : "text-red-500"}`}
        >
          {result}
        </div>
      )}
    </div>
  );
};

export default CodePuzzle;
