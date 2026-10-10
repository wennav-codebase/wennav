import { useEffect, useMemo, useRef, useState } from "react";

/* Keyframes are injected with the component so it works without touching
   tailwind.config.js. Duplicate rules across instances are harmless. */
const CARET_KEYFRAMES = `
@keyframes tw-caret-blink {
  0%, 49%   { opacity: 1; }
  50%, 100% { opacity: 0; }
}
`;

export interface TypewriterProps {
  /** A single string, or a list of words to cycle through. */
  text?: string | string[];
  /** ms per typed character. */
  typingSpeed?: number;
  /** ms per deleted character. */
  deletingSpeed?: number;
  /** Pause once a word is fully typed. */
  holdDelay?: number;
  /** Pause before typing the next word. */
  restartDelay?: number;
  /** Delay before typing begins. */
  startDelay?: number;
  /** Keep cycling forever. */
  loop?: boolean;
  showCaret?: boolean;
  className?: string;
  caretClassName?: string;
  onComplete?: () => void;
  forceMotion?: boolean;
}

type Phase = "idle" | "typing" | "deleting" | "waiting" | "done";

export default function Typewriter({
  text = "",
  typingSpeed = 70,
  deletingSpeed = 40,
  holdDelay = 1600,
  restartDelay = 400,
  startDelay = 0,
  loop = false,
  showCaret = true,
  className = "",
  caretClassName = "",
  onComplete,
  forceMotion = false,
}: TypewriterProps) {
  // Normalize to an array so single strings and word lists share one code path
  const key = Array.isArray(text) ? text.join("\u0000") : String(text);
  const words = useMemo<string[]>(() => {
    const list = Array.isArray(text) ? text : [text];
    return list.length ? list : [""];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const [displayed, setDisplayed] = useState<string>("");
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [phase, setPhase] = useState<Phase>(startDelay > 0 ? "idle" : "typing");
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Keep the latest callback without restarting the animation loop
  const onCompleteRef = useRef<(() => void) | undefined>(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Respect prefers-reduced-motion
useEffect(() => {
  if (forceMotion) {
    setReducedMotion(false);
    return;
  }
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  setReducedMotion(mq.matches);
  const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}, [forceMotion]);

  // The state machine: idle -> typing -> deleting -> waiting -> typing ...
  useEffect(() => {
    if (reducedMotion || phase === "done") return;

    const word = words[wordIndex] ?? "";
    const isLastWord = wordIndex === words.length - 1;
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (phase === "idle") {
      timer = setTimeout(() => setPhase("typing"), startDelay);
    } else if (phase === "typing") {
      if (displayed.length < word.length) {
        timer = setTimeout(
          () => setDisplayed(word.slice(0, displayed.length + 1)),
          typingSpeed,
        );
      } else if (!loop && isLastWord) {
        setPhase("done");
        onCompleteRef.current?.();
      } else {
        timer = setTimeout(() => setPhase("deleting"), holdDelay);
      }
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timer = setTimeout(
          () => setDisplayed(word.slice(0, displayed.length - 1)),
          deletingSpeed,
        );
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("waiting");
      }
    } else if (phase === "waiting") {
      timer = setTimeout(() => setPhase("typing"), restartDelay);
    }

    return () => clearTimeout(timer);
  }, [
    displayed,
    phase,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    holdDelay,
    restartDelay,
    startDelay,
    loop,
    reducedMotion,
  ]);

  const staticText = words.join(" ");
  const content = reducedMotion ? staticText : displayed;

  return (
    <>
      <style>{CARET_KEYFRAMES}</style>

      <span className={className}>
        {/* Visible animated text */}
        <span aria-hidden="true">
          {content}
          {showCaret && !reducedMotion && (
            <span
              className={`ml-[0.1em] inline-block h-[1em] w-[2px] translate-y-[0.12em] bg-current ${caretClassName}`}
              style={{ animation: "tw-caret-blink 1s steps(1, end) infinite" }}
            />
          )}
        </span>

        {/* Screen readers get the finished sentence, not letter-by-letter */}
        <span className="sr-only">{staticText}</span>
      </span>
    </>
  );
}
