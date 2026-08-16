import { useEffect, useRef, useState } from "react";

// ease-out so the numbers rush up then settle, like studiolingo.ge
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

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
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // during react-snap pre-render, leave the value at 0 so the static HTML
    // matches the client's initial render (no hydration mismatch); the real
    // client then animates normally on mount.
    if (typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap")
      return;

    const run = () => {
      if (started.current) return;
      started.current = true;
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / duration, 1);
        setVal(end * easeOutCubic(p));
        if (p < 1) requestAnimationFrame(tick);
        else setVal(end);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {formatValue(val, decimals, separator)}
      {suffix}
    </span>
  );
};

export default CountUp;
