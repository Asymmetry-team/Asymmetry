import React from "react";
import { Icon } from "@iconify/react";
import { useLang } from "../../i18n";
import "./chatBubble.css";

// Direct phone call (+995 571 14 14 69)
const PHONE_URL = "tel:+995571141469";

const ChatBubble = () => {
  const { tr } = useLang();
  // "message us" opens the WhatsApp / Messenger chooser (handled globally)
  const openContact = () =>
    window.dispatchEvent(new CustomEvent("asymmetry:contact", { detail: {} }));
  return (
    <>
      <div className="chat-bubble chat-bubble--messenger">
        <button
          type="button"
          className="chat-bubble-link"
          onClick={openContact}
          aria-label="მოგვწერეთ"
        >
          <Icon icon="mdi:chat" className="chat-bubble-icon" />
          <span>{tr("მოგვწერეთ")}</span>
        </button>
      </div>

      <div className="chat-bubble chat-bubble--call">
        <a
          className="chat-bubble-link"
          href={PHONE_URL}
          aria-label="დაგვირეკეთ"
        >
          <Icon icon="mdi:phone" className="chat-bubble-icon" />
          <span>{tr("დაგვირეკეთ")}</span>
        </a>
      </div>
    </>
  );
};

export default ChatBubble;
