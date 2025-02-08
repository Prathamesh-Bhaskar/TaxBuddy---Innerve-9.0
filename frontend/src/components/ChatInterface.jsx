import { useState, useEffect, useRef } from "react";
import { Send, Bot, User } from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

function ChatInterface() {
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    return storedMessages
      ? JSON.parse(storedMessages)
      : [
          {
            type: "bot",
            text: "👋 Hi! I'm your TaxBuddy assistant. How can I help?",
            options: [
              "Choose ITR Form",
              "Tax Saving Options",
              "Filing Deadlines",
              "Calculate Tax",
            ],
          },
        ];
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll to the latest message whenever messages update.
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Persist messages to localStorage whenever they change.
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to chat.
    setMessages((prev) => [...prev, { type: "user", text: input }]);
    setInput("");
    setIsTyping(true);

    try {
      // Send message to API.
      const res = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) throw new Error("Failed to get response");

      const data = await res.json();

      // Add bot response to chat.
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text:
            data.response ||
            "I apologize, but I'm having trouble understanding. Could you rephrase that?",
          options: data.options || null,
        },
      ]);
    } catch (error) {
      // Handle error gracefully.
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
      console.error("Chat API Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleOptionClick = async (option) => {
    // Add user's option selection to chat.
    setMessages((prev) => [...prev, { type: "user", text: option }]);
    setIsTyping(true);

    try {
      // Send selected option to API.
      const res = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: option }),
      });

      if (!res.ok) throw new Error("Failed to get response");

      const data = await res.json();

      // Add bot response to chat.
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: data.response || "I understand. Let me help you with that.",
          options: data.options || null,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
      console.error("Chat API Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg pt-12">
      {/* Chat Messages - Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            } ${index === 0 ? "mt-6" : ""}`}
          >
            <div
              className={`flex gap-2 max-w-[80%] ${
                message.type === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === "user"
                    ? "bg-blue-600"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
              >
                {message.type === "user" ? (
                  <User size={18} className="text-white" />
                ) : (
                  <Bot size={18} className="text-blue-600 dark:text-blue-400" />
                )}
              </div>
              <div className="space-y-2">
                <div
                  className={`p-3 pb-1 rounded-xl shadow-md ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  }`}
                >
                  {/* Render markdown text with custom paragraph spacing */}
                  <ReactMarkdown
                    components={{
                      p: ({ ...props }) => <p className="mb-4" {...props} />,
                    }}
                  >
                    {message.text}
                  </ReactMarkdown>
                </div>
                {message.options && (
                  <div className="flex flex-wrap gap-2">
                    {message.options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(option)}
                        className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-1 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="text-gray-500 dark:text-gray-400 italic"
          >
            TaxBuddy is typing...
          </motion.div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Fixed Chat Input at the Bottom */}
      <div className="mt-auto flex-shrink-0 p-4 bg-white dark:bg-gray-900 border-t dark:border-gray-700 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border dark:border-gray-700 rounded-lg focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}

export default ChatInterface;
