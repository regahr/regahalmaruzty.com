"use client";

import TypingAnimation from "./components/TypingAnimation";
import CodePuzzle from "./components/CodePuzzle";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-parkin-sans)]">
      <div className="grid grid-rows-[200px_1fr] px-5 md:px-20 flex-grow">
        <div className="flex text-left font-semibold items-center text-xl md:text-2xl">
          <TypingAnimation
            words={[
              "Food reviewer",
              "Offlaner",
              "Explorer",
              "Software engineer",
              "Rega Halma Ruzty",
            ]}
            typingSpeed={50}
            deletingSpeed={20}
            delayBetweenWords={500}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <div className="flex text-left text-base md:text-lg font-medium">
            I&apos;m a dedicated software developer with a passion for solving complex
            problems and crafting smooth, user-focused experiences. Over the
            years, I&apos;ve built skills in full-stack development, managing both
            front-end interfaces and back-end systems.
            <br />
            <br />
            I&apos;ve mainly worked with technologies like Node.js, Express.js,
            TypeScript, MongoDB, and Next.js, deploying apps using AWS services
            like ECS or EC2. I also enjoy streamlining processes with CI/CD
            pipelines to ensure reliable and efficient deployments.
            <br />
            <br />
            Working on projects in banking, expense management, and virtual cards
            has deepened my expertise in integrating third-party middlewares. I&apos;ve
            learned to handle complex API interactions, ensure secure data
            transactions, and manage seamless integrations—key skills that help
            deliver robust, scalable solutions.
          </div>

          <div>
            <CodePuzzle />
          </div>
        </div>
      </div>
      <footer className="flex justify-end items-center gap-5 p-4">
        <a
          href="https://github.com/regahr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/github-mark.png"
            alt="GitHub Logo"
            width={40}
            height={40}
          />{" "}
          {/* GitHub Logo */}
        </a>
        <a
          href="https://linkedin.com/in/regahr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/linkedin.png"
            alt="LinkedIn Logo"
            width={40}
            height={40}
          />{" "}
          {/* LinkedIn Logo */}
        </a>
      </footer>
    </div>
  );
}