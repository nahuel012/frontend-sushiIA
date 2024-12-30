import React, { useState, useRef, useEffect } from "react";
import { Button, Card, Spinner } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { useChat } from "../../hooks/useChat";

export const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInitialTooltip, setShowInitialTooltip] = useState(true);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [lastReadMessageIndex, setLastReadMessageIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const { messages, isTyping, error, sendMessage } = useChat();

  useEffect(() => {
    if (isOpen) {
      setLastReadMessageIndex(messages.length);
      setHasUnreadMessages(false);
    } else if (messages.length > lastReadMessageIndex) {
      setHasUnreadMessages(true);
    }
  }, [messages, isOpen, lastReadMessageIndex]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasUnreadMessages(false);
    }
    setShowInitialTooltip(false);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-scroll al último mensaje
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const MessageBubble = ({ message }) => {
    const renderContent = (content) => {
      if (content.includes("{{MENU_BUTTON}}")) {
        return (
          <div className="flex flex-col gap-2">
            <p className="text-sm whitespace-pre-wrap">
              {content.replace("{{MENU_BUTTON}}", "")}
            </p>
            <Button
              className="bg-primary text-white"
              size="sm"
              onPress={() => {
                document.getElementById("menu")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              Ver Menú Completo 🍱
            </Button>
          </div>
        );
      }

      return <p className="text-sm whitespace-pre-wrap">{content}</p>;
    };

    return (
      <div
        className={`flex ${
          message.role === "user" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`max-w-[80%] p-3 rounded-2xl ${
            message.role === "user"
              ? "bg-primary text-white rounded-tr-none"
              : "bg-subtle text-content rounded-tl-none"
          }`}
        >
          {renderContent(message.content)}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {showInitialTooltip && !isOpen && (
          <motion.div
            key="initial-tooltip"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 mb-2 min-w-32"
          >
            <Card className="p-3 bg-primary text-white">
              <p className="text-sm">¡Hola! ¿Quieres hacer un pedido? 🍣</p>
            </Card>
          </motion.div>
        )}

        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 mb-2"
          >
            <Card className="p-3 bg-danger text-white">
              <p className="text-sm">{error}</p>
            </Card>
          </motion.div>
        )}

        {isOpen && (
          <motion.div
            key="chat-bubble"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="absolute bottom-20 right-0 mb-2"
          >
            <Card className="w-[350px] h-[500px] p-4 shadow-xl flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🍱</span>
                  <div>
                    <h3 className="font-semibold">Nigiri</h3>
                    <p className="text-xs text-content/70">Asistente Virtual</p>
                    <p className="text-xs text-content/70">
                      {isTyping ? (
                        <div className="flex items-center gap-2 text-content/70">
                          <span className="text-xs">
                            Nigiri está escribiendo...
                          </span>
                          <Spinner size="sm" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-content/70">
                          <span className="text-xs"> </span>
                        </div>
                      )}
                    </p>
                  </div>
                </div>
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  onPress={toggleChat}
                >
                  <X size={20} />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto mb-4 custom-scrollbar">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <MessageBubble key={index} message={message} />
                  ))}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 rounded-full bg-subtle text-content focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Escribe un mensaje..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button
                  isIconOnly
                  className="bg-primary text-white"
                  size="lg"
                  radius="full"
                  onPress={handleSendMessage}
                >
                  <Send size={20} />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          isIconOnly
          className={`w-14 h-14 shadow-lg ${
            isOpen ? "bg-secondary" : "bg-primary"
          } text-white`}
          radius="full"
          size="lg"
          onPress={toggleChat}
        >
          <MessageCircle size={24} />
        </Button>
        {hasUnreadMessages && !isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-full h-full bg-red-500 rounded-full opacity-50"
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
