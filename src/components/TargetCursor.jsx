import { useEffect, useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import "./TargetCursor.css";

export default function TargetCursor({
  targetSelector = ".cursor-target",
  hideDefaultCursor = true,
  hoverDuration = 0.25,
  variant = "cyan",
}) {
  const cursorRef = useRef(null);
  const bladeRef = useRef(null);
  const glowRef = useRef(null);
  const hiltRef = useRef(null);
  const isActiveRef = useRef(false);
  const activeStrengthRef = useRef({ current: 0 });
  const lastMoveRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const tickerFnRef = useRef(null);

  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    const hasTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPowerDevice =
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
      (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
      window.innerWidth < 1280;
    const userAgent = navigator.userAgent || navigator.vendor || window.opera || "";
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    const isMobileUserAgent = mobileRegex.test(String(userAgent).toLowerCase());
    return (hasTouchScreen && isSmallScreen) || isMobileUserAgent || prefersReducedMotion || lowPowerDevice;
  }, []);

  const moveCursor = useCallback((x, y) => {
    if (!cursorRef.current) return;
    const prevX = gsap.getProperty(cursorRef.current, "x");
    const prevY = gsap.getProperty(cursorRef.current, "y");
    const vx = x - prevX;
    const vy = y - prevY;
    lastMoveRef.current = { x, y, vx, vy };
    gsap.to(cursorRef.current, { x, y, duration: 0.08, ease: "power3.out" });
  }, []);

  useEffect(() => {
    if (isMobile || !cursorRef.current) return undefined;
    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) document.body.style.cursor = "none";

    document.documentElement.classList.add("lightsaber-cursor-active");

    const cursor = cursorRef.current;
    let activeTarget = null;
    let currentLeaveHandler = null;

    const cleanupTarget = (target) => {
      if (currentLeaveHandler) target.removeEventListener("mouseleave", currentLeaveHandler);
      currentLeaveHandler = null;
    };

    gsap.set(cursor, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2, rotation: -35 });

    const idleFlicker = gsap.timeline({ repeat: -1, yoyo: true });
    idleFlicker.to(bladeRef.current, { scaleY: 0.97, opacity: 0.92, duration: 0.08, ease: "steps(2)" }, 0);
    idleFlicker.to(glowRef.current, { opacity: 0.7, duration: 0.12, ease: "power1.inOut" }, 0);

    const tickerFn = () => {
      if (!cursorRef.current || !hiltRef.current) return;
      const { vx, vy } = lastMoveRef.current;
      const speed = Math.sqrt(vx * vx + vy * vy);
      const tiltAmount = Math.min(speed * 0.15, 12);
      const angle = Math.atan2(vy, vx) * (180 / Math.PI) + 90;
      const baseRotation = -35;
      const dynamicRotation = speed > 5 ? baseRotation + Math.sin(angle) * tiltAmount : baseRotation;
      gsap.to(cursor, {
        rotation: dynamicRotation,
        duration: 0.15,
        ease: "power2.out",
        overwrite: "auto",
      });
      const strength = activeStrengthRef.current.current;
      if (strength > 0 && bladeRef.current) {
        gsap.to(bladeRef.current, {
          scaleY: 1 + strength * 0.35,
          opacity: 0.85 + strength * 0.15,
          duration: 0.15,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(glowRef.current, {
          opacity: 0.6 + strength * 0.4,
          scaleX: 1 + strength * 0.2,
          duration: 0.15,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };
    tickerFnRef.current = tickerFn;
    gsap.ticker.add(tickerFn);

    let moveFrame = null;
    const moveHandler = (e) => {
      if (moveFrame) return;
      moveFrame = requestAnimationFrame(() => {
        moveCursor(e.clientX, e.clientY);
        moveFrame = null;
      });
    };

    const mouseDownHandler = () => {
      gsap.to(cursor, { scale: 0.92, duration: 0.12, ease: "power2.out" });
      gsap.to(bladeRef.current, { scaleX: 1.3, scaleY: 0.85, duration: 0.1, ease: "power2.out" });
      gsap.to(glowRef.current, { opacity: 1, scaleX: 1.5, duration: 0.08, ease: "power2.out" });
    };

    const mouseUpHandler = () => {
      gsap.to(cursor, { scale: 1, duration: 0.35, ease: "elastic.out(1, 0.5)" });
      const strength = activeStrengthRef.current.current;
      gsap.to(bladeRef.current, {
        scaleX: 1,
        scaleY: 1 + strength * 0.35,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(glowRef.current, {
        opacity: 0.6 + strength * 0.4,
        scaleX: 1 + strength * 0.2,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const enterHandler = (e) => {
      const directTarget = e.target;
      const allTargets = [];
      let current = directTarget;
      while (current && current !== document.body) {
        if (current.matches && current.matches(targetSelector)) allTargets.push(current);
        current = current.parentElement;
      }

      const target = allTargets[0] || null;
      if (!target || !cursorRef.current || activeTarget === target) return;
      if (activeTarget) cleanupTarget(activeTarget);

      activeTarget = target;
      isActiveRef.current = true;
      gsap.to(activeStrengthRef.current, { current: 1, duration: hoverDuration, ease: "power2.out" });

      const leaveHandler = () => {
        isActiveRef.current = false;
        activeStrengthRef.current.current = 0;
        activeTarget = null;

        gsap.to(bladeRef.current, {
          scaleY: 1,
          opacity: 0.85,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(glowRef.current, {
          opacity: 0.6,
          scaleX: 1,
          duration: 0.3,
          ease: "power2.out",
        });

        cleanupTarget(target);
      };

      currentLeaveHandler = leaveHandler;
      target.addEventListener("mouseleave", leaveHandler);
    };

    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseover", enterHandler, { passive: true });
    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    return () => {
      gsap.ticker.remove(tickerFn);
      if (moveFrame) cancelAnimationFrame(moveFrame);
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseover", enterHandler);
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      if (activeTarget) cleanupTarget(activeTarget);
      idleFlicker.kill();
      document.body.style.cursor = originalCursor;
      document.documentElement.classList.remove("lightsaber-cursor-active");
      isActiveRef.current = false;
      activeStrengthRef.current.current = 0;
    };
  }, [targetSelector, moveCursor, hideDefaultCursor, isMobile, hoverDuration]);

  if (isMobile) return null;

  return (
    <div ref={cursorRef} className={`lightsaber-cursor ls-variant-${variant}`}>
      <div className="ls-saber-group">
        <div ref={glowRef} className="ls-blade-glow" />
        <div ref={bladeRef} className="ls-blade">
          <div className="ls-blade-core" />
        </div>
        <div ref={hiltRef} className="ls-hilt">
          <div className="ls-hilt-body">
            <div className="ls-hilt-band ls-band-1" />
            <div className="ls-hilt-band ls-band-2" />
            <div className="ls-hilt-band ls-band-3" />
          </div>
          <div className="ls-hilt-emitter">
            <div className="ls-emitter-glow" />
          </div>
          <div className="ls-hilt-pommel" />
        </div>
      </div>
    </div>
  );
}