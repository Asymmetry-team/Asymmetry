import { useEffect, useRef, useState } from "react";

// Near-linear ease-out (gentle exponent). With a steeper curve the small-
// magnitude counter (the 5.0 rating) reaches its final DISPLAYED value early —
// e.g. quad settles it at ~90% of the run — while the big numbers keep rolling,
// so it looks like it finished first. A shallow 1.3 exponent keeps every
// counter visibly ticking until ~97–100% of the duration, so projects,
// subscribers and rating all land together.
const easeOut = (t) => 1 - Math.pow(1 - t, 1.3);

const formatValue = (val, decimals, separator) => {
  let s = val.toFixed(decimals);
  if (separator) {
    const [intPart, dec] = s.split(".");
    const withSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    s = dec ? `${withSep}.${dec}` : withSep;
  }
  return s;
};

const CountUp = ({
  end,
  decimals = 0,
  suffix = "",
  separator = false,
  duration = 2000,
  className,
}) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // during pre-render, leave the value at 0 so the static HTML matches the
    // client's initial render (no hydration mismatch); the real client then
    // animates normally on mount.
    if (typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap")
      return;

    let rafId;
    const run = () => {
      cancelAnimationFrame(rafId);
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / duration, 1);
        setVal(end * easeOut(p));
        if (p < 1) rafId = requestAnimationFrame(tick);
        else setVal(end);
      };
      rafId = requestAnimationFrame(tick);
    };

    // replay every time the number re-enters the viewport: scroll away and
    // back and the count-up runs again from 0.
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run();
          } else {
            cancelAnimationFrame(rafId);
            setVal(0);
          }
        }),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
    };
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {formatValue(val, decimals, separator)}
      {suffix}
    </span>
  );
};

export default CountUp;
