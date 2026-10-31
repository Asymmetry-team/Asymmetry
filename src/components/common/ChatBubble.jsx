import React from "react";
import { Icon } from "@iconify/react";
import { useLang } from "../../i18n";
import { useRestartPulse } from "../../useRestartPulse";
import "./chatBubble.css";

const ChatBubble = () => {
  const { tr } = useLang();
  const pulseRef = useRestartPulse();
  // same chooser as the service pages' "contact us": call, number, WhatsApp, Messenger
  const openContact = () =>
    window.dispatchEvent(new CustomEvent("asymmetry:contact", { detail: { call: true } }));
  return (
    <div className="chat-bubble" ref={pulseRef}>
      <button
        type="button"
        className="chat-bubble-link"
        onClick={openContact}
        aria-label={tr("დაგვიკავშირდით")}
      >
        <Icon icon="mdi:phone-message" className="chat-bubble-ico" />
        <span>{tr("დაგვიკავშირდით")}</span>
      </button>
    </div>
  );
};

export default ChatBubble;
