"use client";

import { useState, useEffect, useRef } from "react";

interface Message {
  text: string;
  sender: "user" | "ai" | "error";
  timestamp: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      if (typeof window !== "undefined") {
        setIsDarkMode(document.documentElement.classList.contains("dark"));
      }
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    if (typeof window !== "undefined") {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    return () => observer.disconnect();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Welcome message on first open with 2-second delay
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const timer = setTimeout(() => {
        setMessages([
          {
            text: "Hello! I'm Maya, your SastoSale shopping Assistant. How can I help you today? 😊",
            sender: "ai",
            timestamp: formatTimestamp(),
          },
        ]);
      }, 1000); // 1-second delay

      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length]);

  const formatTimestamp = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    const messageText = input.trim();
    if (!messageText || isLoading) return;

    // Add user message
    const userMessage: Message = {
      text: messageText,
      sender: "user",
      timestamp: formatTimestamp(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatInput: messageText,
          sessionId: getSessionId(),
          timestamp: new Date().toISOString(),
          source: "chat-widget",
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Server error details:", errorData);
        throw new Error(errorData.details || errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();

      // Add AI response
      const aiMessage: Message = {
        text: data.response || data.output || "I received your message!",
        sender: "ai",
        timestamp: formatTimestamp(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error("Chat error:", error);

      let errorMessage = "Something went wrong. Please try again later.";

      if (error.name === "AbortError") {
        errorMessage = "Response taking too long. Please try again.";
      } else if (error.message.includes("Failed to fetch")) {
        errorMessage = "Connection failed. Please check your internet.";
      }

      const errorMsg: Message = {
        text: errorMessage,
        sender: "error",
        timestamp: formatTimestamp(),
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getSessionId = () => {
    if (typeof window === "undefined") return null;

    let sessionId = sessionStorage.getItem("chat_session_id");
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem("chat_session_id", sessionId);
    }
    return sessionId;
  };

  return (
    <>
      {/* Chat Widget Container */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Window */}
        <div
          className={`chat-window ${isOpen ? "chat-window-open" : "chat-window-closed"
            }`}
          style={{
            width: "400px",
            height: "600px",
            maxWidth: "calc(100vw - 48px)",
            maxHeight: "calc(100vh - 48px)",
          }}
        >
          {/* Header */}
          <div className="chat-header">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                <img
                  src={isDarkMode ? "/assets/icons/Dark Sastosale.png" : "/assets/icons/new sasto.png"}
                  alt="Maya AI"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-white text-lg">
                  Maya Assistant
                </h3>
                <p className="text-xs text-white/90 flex items-center gap-1.5">
                  <span className="online-indicator"></span>
                  <span className="font-medium">Online</span>
                </p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              aria-label="Close chat"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Messages Container */}
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message-wrapper ${msg.sender === "user" ? "message-user" : "message-ai"
                  }`}
              >
                <div
                  className={`message ${msg.sender === "user"
                    ? "message-bubble-user"
                    : msg.sender === "error"
                      ? "message-bubble-error"
                      : "message-bubble-ai"
                    }`}
                >
                  <p className="message-text">{msg.text}</p>
                  <span className="message-timestamp">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="message-wrapper message-ai">
                <div className="message message-bubble-ai">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="chat-input-area">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading}
              className="chat-input"
              aria-label="Chat message input"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="chat-send-button"
              aria-label="Send message"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleChat}
          className={`chat-toggle-button ${isOpen ? "hidden" : ""}`}
          aria-label="Open chat"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      {/* Styles */}
      <style jsx>{`
        /* Chat Window */
        .chat-window {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: bottom right;
        }

        :global(.dark) .chat-window {
          background: #1f2937;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
        }

        .chat-window-closed {
          opacity: 0;
          transform: scale(0.8) translateY(20px);
          pointer-events: none;
        }

        .chat-window-open {
          opacity: 1;
          transform: scale(1) translateY(0);
          pointer-events: all;
        }

        /* Header */
        .chat-header {
          background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .online-indicator {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 8px rgba(34, 197, 94, 0.8);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 8px rgba(34, 197, 94, 0.8);
          }
          50% {
            opacity: 0.7;
            box-shadow: 0 0 12px rgba(34, 197, 94, 1);
          }
        }

        /* Messages */
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          background: #f9fafb;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        :global(.dark) .chat-messages {
          background: #111827;
        }

        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }

        .chat-messages::-webkit-scrollbar-track {
          background: transparent;
        }

        .chat-messages::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }

        :global(.dark) .chat-messages::-webkit-scrollbar-thumb {
          background: #4b5563;
        }

        .chat-messages::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }

        :global(.dark) .chat-messages::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }

        .message-wrapper {
          display: flex;
          animation: messageSlideIn 0.3s ease-out;
        }

        .message-user {
          justify-content: flex-end;
        }

        .message-ai {
          justify-content: flex-start;
        }

        .message {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 12px;
          word-wrap: break-word;
        }

        .message-bubble-user {
          background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .message-bubble-ai {
          background: white;
          color: #1f2937;
          border-bottom-left-radius: 4px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        :global(.dark) .message-bubble-ai {
          background: #374151;
          color: #f3f4f6;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        .message-bubble-error {
          background: #fee2e2;
          color: #991b1b;
          border-bottom-left-radius: 4px;
          border-left: 3px solid #dc2626;
        }

        :global(.dark) .message-bubble-error {
          background: #7f1d1d;
          color: #fecaca;
          border-left: 3px solid #ef4444;
        }

        .message-text {
          margin: 0;
          font-size: 14px;
          line-height: 1.5;
        }

        .message-timestamp {
          display: block;
          font-size: 11px;
          margin-top: 4px;
          opacity: 0.7;
        }

        /* Typing Indicator */
        .typing-indicator {
          display: flex;
          gap: 4px;
          align-items: center;
          padding: 4px 0;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #14b8a6;
          animation: typingDot 1.4s infinite;
        }

        :global(.dark) .typing-indicator span {
          background: #5eead4;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        /* Input Area */
        .chat-input-area {
          padding: 16px 20px;
          background: white;
          border-top: 1px solid #e5e7eb;
          display: flex;
          gap: 8px;
        }

        :global(.dark) .chat-input-area {
          background: #1f2937;
          border-top: 1px solid #374151;
        }

        .chat-input {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 24px;
          outline: none;
          font-size: 14px;
          transition: all 0.2s;
          background: white;
          color: #1f2937;
        }

        :global(.dark) .chat-input {
          background: #111827;
          border: 1px solid #374151;
          color: #f3f4f6;
        }

        .chat-input:focus {
          border-color: #14b8a6;
          box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
        }

        :global(.dark) .chat-input:focus {
          border-color: #2dd4bf;
          box-shadow: 0 0 0 3px rgba(45, 212, 191, 0.2);
        }

        .chat-input:disabled {
          background: #f3f4f6;
          cursor: not-allowed;
        }

        :global(.dark) .chat-input:disabled {
          background: #374151;
          cursor: not-allowed;
        }

        .chat-send-button {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .chat-send-button:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(20, 184, 166, 0.4);
        }

        .chat-send-button:active:not(:disabled) {
          transform: scale(0.95);
        }

        .chat-send-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Toggle Button */
        .chat-toggle-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.3s;
          position: fixed;
          bottom: 24px;
          right: 24px;
        }

        :global(.dark) .chat-toggle-button {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        }

        .chat-toggle-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(20, 184, 166, 0.4);
        }

        :global(.dark) .chat-toggle-button:hover {
          box-shadow: 0 6px 20px rgba(20, 184, 166, 0.6);
        }

        .chat-toggle-button:active {
          transform: scale(0.95);
        }

        .chat-toggle-button.hidden {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transform: scale(0.8);
        }

        /* Animations */
        @keyframes messageSlideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes typingDot {
          0%,
          60%,
          100% {
            transform: translateY(0);
            opacity: 0.7;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .chat-window {
            width: 100vw !important;
            height: 100vh !important;
            max-width: 100vw !important;
            max-height: 100vh !important;
            bottom: 0 !important;
            right: 0 !important;
            border-radius: 0 !important;
          }

          .chat-toggle-button {
            width: 56px;
            height: 56px;
            bottom: 20px;
            right: 20px;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .chat-window,
          .message-wrapper,
          .chat-toggle-button,
          .chat-send-button {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </>
  );
}
