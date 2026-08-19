import React, { useState, useEffect } from "react";
import "./priceBubble.css";

// The studio's WhatsApp (same number as the chat bubble). No backend needed:
// on submit we open a WhatsApp chat with the details pre-filled, so the lead
// lands straight in the studio's inbox.
const WHATSAPP = "995571141469";

const PriceBubble = () => {
  const [open, setOpen] = useState(false);
  const [cadastral, setCadastral] = useState("");
  const [sqm, setSqm] = useState("");

  const ready = cadastral.trim() !== "" && sqm.trim() !== "";

  // ESC closes the open form
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const submit = (e) => {
    e.preventDefault();
    if (!ready) return;
    const text =
      `გამარჯობა! მინდა პროექტის ფასის გამოთვლა.\n` +
      `მიწის საკადასტრო კოდი: ${cadastral.trim()}\n` +
      `შენობის საშუალო კვადრატულობა: ${sqm.trim()} მ²`;
    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noreferrer noopener"
    );
  };

  return (
    <>
      {/* pill stays mounted (just hidden) while open, so its pop/pulse
          animation never replays when the form is closed again */}
      <button
        className={`price-pill ${open ? "price-pill--hidden" : ""}`}
        onClick={() => setOpen(true)}
        aria-label="პროექტის ფასის გამოთვლა"
        tabIndex={open ? -1 : 0}
      >
        <span className="price-mark">₾</span>
        <span className="price-pill-text">პროექტის ფასი</span>
      </button>

      {open && (
        <div className="price-card" role="dialog" aria-label="პროექტის ფასის გამოთვლა">
          <button
            className="price-close"
            onClick={() => setOpen(false)}
            aria-label="დახურვა"
          >
            ×
          </button>
          <h4 className="price-title">პროექტის ფასის გამოთვლა</h4>
          <p className="price-sub">შეავსეთ ველები — ფასს WhatsApp-ზე გამოგიგზავნით</p>
          <form onSubmit={submit}>
            <div className="price-field">
              <label htmlFor="pb-cad">მიწის საკადასტრო კოდი</label>
              <input
                id="pb-cad"
                type="text"
                inputMode="numeric"
                placeholder="მაგ. 01.10.14.005.123"
                value={cadastral}
                onChange={(e) => setCadastral(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="price-field">
              <label htmlFor="pb-sqm">შენობის საშუალო კვადრატულობა (მ²)</label>
              <input
                id="pb-sqm"
                type="text"
                inputMode="decimal"
                placeholder="მაგ. 240"
                value={sqm}
                onChange={(e) => setSqm(e.target.value)}
                autoComplete="off"
              />
            </div>
            <button className="price-submit" type="submit" disabled={!ready}>
              გაგზავნა
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default PriceBubble;
