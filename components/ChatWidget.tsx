"use client";

import { useState, useEffect, useRef } from "react";

interface Message {
  text: string;
  sender: "user" | "ai" | "error";
  timestamp: string;
  isPayment?: boolean;
  paymentUrl?: string;
  orderId?: string;
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

  // Khalti URL Pattern for detection
  const khaltiUrlPattern = /https:\/\/test-pay\.khalti\.com\/\?pidx=[a-zA-Z0-9]+|https:\/\/pay\.khalti\.com\/\?pidx=[a-zA-Z0-9]+/;

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

  // Auto-scroll to bottom
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

  // Welcome message with 1-second delay
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
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length]);

  // Listen for payment completion from success window
  useEffect(() => {
    const handlePaymentMessage = (event: MessageEvent) => {
      if (event.data.type === 'PAYMENT_SUCCESS') {
        const { orderId } = event.data.data;
        const successMsg: Message = {
          text: `✅ Payment received successfully! Order ID: ${orderId}. Your order is confirmed. Please check your email for the order confirmation and summary.`,
          sender: "ai",
          timestamp: formatTimestamp(),
        };
        setMessages((prev) => [...prev, successMsg]);
      }
    };
    window.addEventListener('message', handlePaymentMessage);
    return () => window.removeEventListener('message', handlePaymentMessage);
  }, []);

  const formatTimestamp = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
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

  const openPaymentPopup = (url: string) => {
    // Backup pidx to localStorage in case redirect strips parameters
    const pidxMatch = url.match(/pidx=([^&]+)/);
    if (pidxMatch) {
      localStorage.setItem('last_pidx', pidxMatch[1]);
      console.log('Saved pidx to backup:', pidxMatch[1]);
    }

    const width = 500;
    const height = 750;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    window.open(url, 'KhaltiPayment', `width=${width},height=${height},left=${left},top=${top}`);
  };

  const sendMessage = async () => {
    const messageText = input.trim();
    if (!messageText || isLoading) return;

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
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatInput: messageText,
          sessionId: getSessionId(),
          timestamp: new Date().toISOString(),
          source: "chat-widget",
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Fix: Check for data.response first as returned by our API route
        const aiMessage: Message = {
          text: data.response || data.output || "No response received.",
          sender: "ai",
          timestamp: formatTimestamp(),
          paymentUrl: data.payment_url,
          orderId: data.orderId,
          isPayment: !!data.payment_url
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        throw new Error(data.error || "Server error");
      }
    } catch (error: any) {
      const errorMsg: Message = {
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: "error",
        timestamp: formatTimestamp(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <div className={`chat-window ${isOpen ? "chat-window-open" : "chat-window-closed"}`}
          style={{ width: "400px", height: "600px", maxWidth: "calc(100vw - 48px)", maxHeight: "calc(100vh - 48px)" }}>

          <div className="chat-header">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border border-white/30">
                <img src={isDarkMode ? "/assets/icons/Dark Sastosale.png" : "/assets/icons/new sasto.png"} alt="Maya AI" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-lg">Maya Assistant</h3>
                <p className="text-xs text-white/90 flex items-center gap-1.5">
                  <span className="online-indicator"></span>
                  <span className="font-medium">Online</span>
                </p>
              </div>
            </div>
            <button onClick={toggleChat} className="text-white hover:bg-white/20 rounded-full p-2 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => {
              const khaltiMatch = msg.text.match(khaltiUrlPattern);
              const paymentUrl = msg.paymentUrl || (khaltiMatch ? khaltiMatch[0] : null);

              return (
                <div key={index} className={`message-wrapper ${msg.sender === "user" ? "message-user" : "message-ai"}`}>
                  <div className={`message ${msg.sender === "user" ? "message-bubble-user" : msg.sender === "error" ? "message-bubble-error" : "message-bubble-ai"}`}>
                    <p className="message-text">{paymentUrl ? msg.text.replace(khaltiUrlPattern, "").trim() || "Complete your payment:" : msg.text}</p>

                    {paymentUrl && (
                      <div className="payment-card">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <span className="text-teal-600 font-bold text-xs uppercase tracking-tight">Khalti Checkout</span>
                        </div>
                        {msg.orderId && <p className="text-[10px] opacity-70 mb-2">Order ID: {msg.orderId}</p>}
                        <button onClick={() => openPaymentPopup(paymentUrl)} className="payment-action-btn">Pay Now</button>
                      </div>
                    )}
                    <span className="message-timestamp">{msg.timestamp}</span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="message-wrapper message-ai">
                <div className="message message-bubble-ai">
                  <div className="typing-indicator"><span></span><span></span><span></span></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Type your message..." disabled={isLoading} className="chat-input" />
            <button onClick={sendMessage} disabled={isLoading || !input.trim()} className="chat-send-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
            </button>
          </div>
        </div>

        <button onClick={toggleChat} className={`chat-toggle-button ${isOpen ? "hidden" : ""}`}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        </button>
      </div>

      <style jsx>{`
        .chat-window { position: fixed; bottom: 24px; right: 24px; background: white; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.15); display: flex; flex-direction: column; overflow: hidden; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); transform-origin: bottom right; }
        :global(.dark) .chat-window { background: #1f2937; }
        .chat-window-closed { opacity: 0; transform: scale(0.8) translateY(20px); pointer-events: none; }
        .chat-window-open { opacity: 1; transform: scale(1) translateY(0); pointer-events: all; }
        .chat-header { background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .online-indicator { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 8px rgba(34, 197, 94, 0.8); animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        .chat-messages { flex: 1; overflow-y: auto; padding: 20px; background: #f9fafb; display: flex; flex-direction: column; gap: 12px; }
        :global(.dark) .chat-messages { background: #111827; }
        .message-wrapper { display: flex; animation: messageSlideIn 0.3s ease-out; }
        .message-user { justify-content: flex-end; }
        .message-ai { justify-content: flex-start; }
        .message { max-width: 80%; padding: 10px 14px; border-radius: 12px; word-wrap: break-word; }
        .message-bubble-user { background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); color: white; border-bottom-right-radius: 4px; }
        .message-bubble-ai { background: white; color: #1f2937; border-bottom-left-radius: 4px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
        :global(.dark) .message-bubble-ai { background: #374151; color: #f3f4f6; }
        .message-text { margin: 0; font-size: 14px; line-height: 1.5; }
        .message-timestamp { display: block; font-size: 9px; margin-top: 4px; opacity: 0.7; }
        .payment-card { margin-top: 8px; padding: 10px; background: #f0fdfa; border: 1px solid #5eead4; border-radius: 8px; text-align: center; }
        :global(.dark) .payment-card { background: rgba(20,184,166,0.1); }
        .payment-action-btn { width: 100%; padding: 8px; background: #14b8a6; color: white; border: none; border-radius: 6px; font-weight: 600; font-size: 12px; cursor: pointer; transition: background 0.2s; }
        .payment-action-btn:hover { background: #0d9488; }
        .typing-indicator { display: flex; gap: 4px; padding: 4px 0; }
        .typing-indicator span { width: 8px; height: 8px; border-radius: 50%; background: #14b8a6; animation: typingDot 1.4s infinite; }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
        .chat-input-area { padding: 16px 20px; background: white; border-top: 1px solid #e5e7eb; display: flex; gap: 8px; }
        :global(.dark) .chat-input-area { background: #1f2937; border-top: 1px solid #374151; }
        .chat-input { flex: 1; padding: 12px 18px; border: 1px solid #14b8a6; border-radius: 24px; outline: none; background: white; color: #1f2937; font-size: 14px; }
        :global(.dark) .chat-input { background: #111827; border: 1px solid #374151; color: #f3f4f6; }
        .chat-send-button { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; border: none; }
        .chat-toggle-button { width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); color: white; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s; position: fixed; bottom: 24px; right: 24px; border: none; }
        .chat-toggle-button:hover { transform: scale(1.1); }
        .chat-toggle-button.hidden { opacity: 0; visibility: hidden; }
        @keyframes messageSlideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes typingDot { 0%, 60%, 100% { transform: translateY(0); opacity: 0.7; } 30% { transform: translateY(-10px); opacity: 1; } }
        @media (max-width: 768px) { .chat-window { position: fixed !important; width: 100% !important; height: 100% !important; top: 0 !important; left: 0 !important; border-radius: 0 !important; } }
      `}</style>
    </>
  );
}

