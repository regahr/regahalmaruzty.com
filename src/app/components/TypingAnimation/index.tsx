import React, { useState, useEffect } from 'react';

import './styles.css'

interface TypingAnimationProps {
    words: string[];         // Array of words to be typed
    typingSpeed?: number;    // Speed of typing in ms (default: 100ms)
    deletingSpeed?: number;  // Speed of deleting characters (default: 50ms)
    delayBetweenWords?: number; // Delay before typing the next word (default: 1000ms)
  }
  
  const TypingAnimation: React.FC<TypingAnimationProps> = ({
    words,
    typingSpeed = 100,
    deletingSpeed = 50,
    delayBetweenWords = 1000
  }) => {
    const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
    const [displayedText, setDisplayedText] = useState<string>('');
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
  
    useEffect(() => {
      const currentWord = words[currentWordIndex];
      let timer: NodeJS.Timeout;
  
      if (!isDeleting) {
        if (displayedText.length < currentWord.length) {
          // Typing character by character
          timer = setTimeout(() => {
            setDisplayedText(currentWord.slice(0, displayedText.length + 1));
          }, typingSpeed);
        } else if (currentWordIndex < words.length - 1) {
          // Word is fully typed, wait before deleting
          timer = setTimeout(() => setIsDeleting(true), delayBetweenWords);
        }
      } else {
        if (displayedText.length > 0) {
          // Deleting character by character
          timer = setTimeout(() => {
            setDisplayedText(currentWord.slice(0, displayedText.length - 1));
          }, deletingSpeed);
        } else {
          // Move to the next word
          setIsDeleting(false);
          setCurrentWordIndex((prev) => prev + 1);
        }
      }
  
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [displayedText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, delayBetweenWords]);
  
    // Determine whether to show the cursor or the period
    const isLastWordTyped = currentWordIndex === words.length - 1 && displayedText === words[currentWordIndex];
  
    return (
      <div className="font-mono text-2xl">
        {displayedText}
        <span className={'animate-blink'}>
          {isLastWordTyped ? '.' : '|'}
        </span>
      </div>
    );
  };
  
  export default TypingAnimation;
