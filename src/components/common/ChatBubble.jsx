import React from "react";
import { Icon } from "@iconify/react";
import "./chatBubble.css";

// Desktop/web → Messenger compose for the FB profile 100092504264433
const MESSENGER_URL = "https://m.me/100092504264433";
// Mobile → WhatsApp chat (+995 571 14 14 69)
const WHATSAPP_URL = "https://wa.me/995571141469";

const ChatBubble = () => {
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
          <span>მოგვწერეთ</span>
        </a>
      </div>

      <div className="chat-bubble chat-bubble--whatsapp">
        <a
          className="chat-bubble-link"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="მოგვწერეთ WhatsApp-ზე"
        >
          <Icon icon="mdi:whatsapp" className="chat-bubble-icon" />
          <span>მოგვწერეთ</span>
        </a>
      </div>
    </>
  );
};

export default ChatBubble;
