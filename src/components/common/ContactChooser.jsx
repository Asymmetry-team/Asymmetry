import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./contactChooser.css";

// Global "how would you like to reach us?" chooser. Any button on the site can
// open it by dispatching a `asymmetry:contact` event, optionally with a
// pre-filled message. Compact popup: Call, WhatsApp, Messenger.
const PHONE = "+995571141469";
const WHATSAPP = "995571141469";
const MESSENGER = "100092504264433";

const ContactChooser = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  // whether to offer a "call" option (only the "დაგვიკავშირდით" button asks for it)
  const [showCall, setShowCall] = useState(false);

  // any component can open the chooser (with an optional pre-filled message
  // and an optional `call` flag to include the phone-call option)
  useEffect(() => {
    const onOpen = (e) => {
      setText((e && e.detail && e.detail.text) || "");
      setShowCall(!!(e && e.detail && e.detail.call));
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
    if (channel === "call") {
      window.location.href = `tel:${PHONE}`;
      setOpen(false);
      return;
    }
    let url;
    if (channel === "whatsapp") {
      url = text
        ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`
        : `https://wa.me/${WHATSAPP}`;
    } else {
      // m.me can't carry text — copy it so the sender can paste the details
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
        <div className={"cc-options" + (showCall ? " cc-3" : "")}>
          {showCall && (
            <button
              type="button"
              className="cc-opt cc-opt--call"
              onClick={() => go("call")}
            >
              <Icon icon="mdi:phone" />
              <span>დარეკვა</span>
            </button>
          )}
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
