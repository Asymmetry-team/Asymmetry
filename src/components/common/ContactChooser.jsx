import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./contactChooser.css";

// Global "where should we reach you?" chooser. Any button on the site can open
// it by dispatching a `asymmetry:contact` event, optionally with a pre-filled
// message: window.dispatchEvent(new CustomEvent("asymmetry:contact", {
//   detail: { text: "..." } })). WhatsApp is offered first, Messenger second.
const WHATSAPP = "995571141469";
const MESSENGER = "100092504264433";

const ContactChooser = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  // any component can open the chooser (with an optional pre-filled message)
  useEffect(() => {
    const onOpen = (e) => {
      setText((e && e.detail && e.detail.text) || "");
      setOpen(true);
    };
    window.addEventListener("asymmetry:contact", onOpen);
    return () => window.removeEventListener("asymmetry:contact", onOpen);
  }, []);

  // ESC closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (channel) => {
    let url;
    if (channel === "whatsapp") {
      // WhatsApp supports a pre-filled message
      url = text
        ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`
        : `https://wa.me/${WHATSAPP}`;
    } else {
      // Messenger's m.me deep link can't carry text — copy it so the sender can
      // paste the details straight into the chat
      if (text && navigator.clipboard) {
        navigator.clipboard.writeText(text).catch(() => {});
      }
      url = `https://m.me/${MESSENGER}`;
    }
    window.open(url, "_blank", "noreferrer noopener");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="cc-overlay"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="დაგვიკავშირდით"
    >
      <div className="cc-card" onClick={(e) => e.stopPropagation()}>
        <button
          className="cc-close"
          onClick={() => setOpen(false)}
          aria-label="დახურვა"
        >
          ×
        </button>
        <h4 className="cc-title">სად გამოგზავნოთ?</h4>
        <p className="cc-sub">აირჩიეთ, სად დაგვიკავშირდეთ</p>

        <div className="cc-options">
          <button
            type="button"
            className="cc-opt cc-opt--wa"
            onClick={() => go("whatsapp")}
          >
            <Icon icon="mdi:whatsapp" />
            <span>WhatsApp</span>
          </button>
          <button
            type="button"
            className="cc-opt cc-opt--ms"
            onClick={() => go("messenger")}
          >
            <Icon icon="mdi:facebook-messenger" />
            <span>Messenger</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactChooser;
