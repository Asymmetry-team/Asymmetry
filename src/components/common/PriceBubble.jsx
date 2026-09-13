import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useLang } from "../../i18n";
import "./priceBubble.css";

// No backend needed: on submit we hand the pre-filled details to the global
// contact chooser (ContactChooser.jsx), where the lead picks WhatsApp or
// Messenger themselves.
const PriceBubble = () => {
  const { tr } = useLang();
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

  // other components (e.g. the price section buttons) can open this form
  useEffect(() => {
    const openForm = () => setOpen(true);
    window.addEventListener("asymmetry:open-price", openForm);
    return () => window.removeEventListener("asymmetry:open-price", openForm);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!ready) return;
    const text =
      `გამარჯობა! მინდა პროექტის ფასის გამოთვლა.\n` +
      `მიწის საკადასტრო კოდი: ${cadastral.trim()}\n` +
      `შენობის საშუალო კვადრატულობა: ${sqm.trim()} მ²`;
    window.dispatchEvent(
      new CustomEvent("asymmetry:contact", { detail: { text } })
    );
    setOpen(false);
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
        <span className="price-pill-ico">
          <Icon icon="mdi:calculator-variant-outline" />
        </span>
        <span className="price-pill-text">{tr("ფასის გამოთვლა")}</span>
      </button>

      {open && (
        <div
          className="price-card"
          role="dialog"
          aria-label="პროექტის ფასის გამოთვლა"
        >
          <button
            className="price-close"
            onClick={() => setOpen(false)}
            aria-label="დახურვა"
          >
            ×
          </button>
          <div className="price-head">
            <span className="price-head-ico">
              <Icon icon="mdi:calculator-variant-outline" />
            </span>
            <h4 className="price-title">პროექტის ფასის გამოთვლა</h4>
          </div>
          <p className="price-sub">
            შეავსეთ ველები — ფასს მოგწერთ WhatsApp-ზე / Messenger-ზე
          </p>
          <form onSubmit={submit}>
            <div className="price-field">
              <label htmlFor="pb-cad">მიწის საკადასტრო კოდი</label>
              <div className="price-input">
                <Icon icon="mdi:barcode" />
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
            </div>
            <div className="price-field">
              <label htmlFor="pb-sqm">შენობის საშუალო კვადრატულობა (მ²)</label>
              <div className="price-input">
                <Icon icon="mdi:home-outline" />
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
            </div>
            <button className="price-submit" type="submit" disabled={!ready}>
              <Icon icon="mdi:send-outline" />
              გაგზავნა
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default PriceBubble;
