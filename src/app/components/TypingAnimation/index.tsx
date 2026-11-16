"use client";

import React, { useEffect, useState } from "react";

interface TypingAnimationProps {
  words: string[]; // typed in order; the last word stays on screen
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}

// `$ whoami → <word>` prompt. Screen readers get the full list once;
// reduced-motion visitors see the final word with no animation.
const TypingAnimation: React.FC<TypingAnimationProps> = ({
  words,
  typingSpeed = 60,
  deletingSpeed = 25,
  delayBetweenWords = 900,
}) => {
  const finalWord = words[words.length - 1];
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState(finalWord);
  const [isDeleting, setIsDeleting] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setText("");
    setAnimate(true);
  }, []);

  useEffect(() => {
    if (!animate) return;
    const word = words[wordIndex];
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (!isDeleting) {
      if (text.length < word.length) {
        timer = setTimeout(() => setText(word.slice(0, text.length + 1)), typingSpeed);
      } else if (wordIndex < words.length - 1) {
        timer = setTimeout(() => setIsDeleting(true), delayBetweenWords);
      }
    } else if (text.length > 0) {
      timer = setTimeout(() => setText(word.slice(0, text.length - 1)), deletingSpeed);
    } else {
      setIsDeleting(false);
      setWordIndex((i) => i + 1);
    }

    return () => clearTimeout(timer);
  }, [animate, text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords]);

  // WCAG 2.2.2: the loop runs longer than 5 s, so a tap or click skips to the
  // final word, and the caret stops blinking once the last word is typed.
  const done = !animate || (wordIndex === words.length - 1 && text === finalWord);
  const skip = () => {
    setAnimate(false);
    setIsDeleting(false);
    setWordIndex(words.length - 1);
    setText(finalWord);
  };

  const line = (
    <span aria-hidden="true">
      <span className="text-accent">$</span> whoami &rarr; {text}
      <span className={done ? "caret caret-done" : "caret"} />
    </span>
  );

  return (
    <p className="font-mono text-[15px] text-muted min-h-[1.6em]">
      <span className="sr-only">{words.join(", ")}</span>
      {done ? (
        line
      ) : (
        <button type="button" onClick={skip} aria-label="Skip the typing animation" className="text-left cursor-pointer">
          {line}
        </button>
      )}
    </p>
  );
};

export default TypingAnimation;
