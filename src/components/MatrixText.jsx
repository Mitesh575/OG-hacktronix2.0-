import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion } from "motion/react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function MatrixText({
  text = "HelloWorld!",
  className,
  initialDelay = 200,
  letterAnimationDuration = 500,
  letterInterval = 100,
  loop = 0,
}) {
  const [letters, setLetters] = useState(() =>
    text.split("").map((char) => ({
      char,
      isMatrix: false,
      isSpace: char === " ",
    }))
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const loopTimeoutRef = useRef(null);

  const getRandomChar = useCallback(() => (Math.random() > 0.5 ? "1" : "0"), []);

  const animateLetter = useCallback(
    (index) => {
      if (index >= text.length) return;

      requestAnimationFrame(() => {
        setLetters((prev) => {
          const next = [...prev];
          if (!next[index].isSpace) {
            next[index] = { ...next[index], char: getRandomChar(), isMatrix: true };
          }
          return next;
        });

        setTimeout(() => {
          setLetters((prev) => {
            const next = [...prev];
            next[index] = { ...next[index], char: text[index], isMatrix: false };
            return next;
          });
        }, letterAnimationDuration);
      });
    },
    [getRandomChar, text, letterAnimationDuration]
  );

  const startAnimation = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    let currentIndex = 0;

    const animate = () => {
      if (currentIndex >= text.length) {
        setIsAnimating(false);
        return;
      }
      animateLetter(currentIndex);
      currentIndex += 1;
      loopTimeoutRef.current = setTimeout(animate, letterInterval);
    };

    animate();
  }, [animateLetter, text, isAnimating, letterInterval]);

  const resetAndAnimate = useCallback(() => {
    setLetters(
      text.split("").map((char) => ({
        char,
        isMatrix: false,
        isSpace: char === " ",
      }))
    );
    setTimeout(startAnimation, 100);
  }, [text, startAnimation]);

  useEffect(() => {
    const timer = setTimeout(resetAndAnimate, initialDelay);
    return () => clearTimeout(timer);
  }, [resetAndAnimate, initialDelay]);

  useEffect(() => {
    if (loop > 0) {
      const interval = setInterval(() => {
        resetAndAnimate();
      }, loop + initialDelay + text.length * letterInterval + 1000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [loop, resetAndAnimate, initialDelay, text.length, letterInterval]);

  useEffect(() => {
    return () => {
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
    };
  }, []);

  const motionVariants = useMemo(
    () => ({
      matrix: {
        color: "#b8c4ff",
        textShadow: "0 0 10px rgba(184, 196, 255, 0.8), 0 0 20px rgba(184, 196, 255, 0.5)",
      },
      normal: {
        color: "inherit",
        textShadow: "none",
      },
    }),
    []
  );

  return (
    <span
      className={cn("inline-block", className)}
      aria-label="Matrix text animation"
      style={{ whiteSpace: "nowrap", letterSpacing: "0em", margin: 0, padding: 0 }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={`${index}-${letter.char}`}
          className="inline-block"
          initial="normal"
          animate={letter.isMatrix ? "matrix" : "normal"}
          variants={motionVariants}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          style={{ fontVariantNumeric: "tabular-nums", margin: 0, padding: 0, letterSpacing: "0em" }}
        >
          {letter.isSpace ? "\u00A0" : letter.char}
        </motion.span>
      ))}
    </span>
  );
}
