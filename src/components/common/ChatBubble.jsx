import React from "react";
import { Icon } from "@iconify/react";
import { useLang } from "../../i18n";
import "./chatBubble.css";

// Desktop/web → Messenger compose for the FB profile 100092504264433
const MESSENGER_URL = "https://m.me/100092504264433";
// Mobile → direct phone call (+995 571 14 14 69)
const PHONE_URL = "tel:+995571141469";

const ChatBubble = () => {
  const { tr } = useLang();
  return (
    <>
      <div className="chat-bubble chat-bubble--messenger">
        <a
          className="chat-bubble-link"
          href={MESSENGER_URL}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="მოგვწერეთ Messenger-ზე"
        >
          <Icon icon="mdi:facebook-messenger" className="chat-bubble-icon" />
          <span>{tr("მოგვწერეთ")}</span>
        </a>
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
