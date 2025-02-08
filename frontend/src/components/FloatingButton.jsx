import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatInterface from "./ChatInterface";
import PropTypes from "prop-types";
import buttonIcon from "../assets/chatBot.jpg";

const FloatingChatButton = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* When Chat Interface Panel is open, display a full-screen overlay with blur */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-40" />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="w-[1000px] h-[600px] bg-gray-900 rounded-lg shadow-xl border border-gray-700 flex flex-col overflow-hidden">
              <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageCircle size={24} />
                  <div>
                    <h2 className="font-semibold text-lg">
                      TaxBuddy Assistant
                    </h2>
                    <p className="text-sm text-blue-200">
                      Online & Ready to Help
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-200 hover:text-white transition-colors"
                  aria-label="Close Chatbot"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <ChatInterface />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Floating Button at Bottom-Right */}
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-400 hover:bg-blue-700 text-white h-36 w-36 rounded-full shadow-lg transition-all duratio-200 ease-in-out transform hover:scale-110"
          aria-label="Open Chatbot"
        >
          <img
            src={buttonIcon}
            alt="Chatbot Icon"
            className="w-full h-full object-cover rounded-full"
          />
        </button>
      </div>
    </>
  );
};

FloatingChatButton.propTypes = {
  className: PropTypes.string,
};

FloatingChatButton.defaultProps = {
  className: "",
};

export default FloatingChatButton;
