import { useState, useEffect, useCallback } from "react";
import socketService from "../services/socket/socket.service";

export const useChat = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  const saveActiveOrder = useCallback((orderNumber) => {
    localStorage.setItem(
      "activeOrder",
      JSON.stringify({
        orderNumber,
        timestamp: Date.now(),
      })
    );
    socketService.subscribeToOrder(orderNumber);
  }, []);

  const [chatHistory, setChatHistory] = useState(() => {
    const saved = localStorage.getItem("chatData");
    const activeOrder = localStorage.getItem("activeOrder");

    if (saved) {
      const { messages, threadId, timestamp } = JSON.parse(saved);
      if (Date.now() - timestamp > 30 * 60 * 1000) {
        localStorage.removeItem("activeOrder");
        localStorage.removeItem("chatData");
        localStorage.removeItem("threadId");
        return { messages: [], threadId: null };
      }
      if (!activeOrder) {
        for (const message of messages) {
          if (message.role === "assistant") {
            const orderMatch = message.content.match(
              /\*\*Número de Orden\*\*:(?:\s)?#(\d+)/
            );
            if (orderMatch) {
              const orderNumber = parseInt(orderMatch[1]);
              localStorage.setItem(
                "activeOrder",
                JSON.stringify({
                  orderNumber,
                  timestamp: Date.now(),
                })
              );
              socketService.subscribeToOrder(orderNumber);
              break;
            }
          }
        }
      }

      return { messages, threadId };
    }
    return { messages: [], threadId: null };
  });
  // Efecto para guardar en localStorage
  useEffect(() => {
    if (chatHistory.messages.length > 0) {
      localStorage.setItem(
        "chatData",
        JSON.stringify({
          messages: chatHistory.messages,
          threadId: chatHistory.threadId,
          timestamp: Date.now(),
        })
      );
    } else {
      localStorage.removeItem("activeOrder");
      localStorage.removeItem("chatData");
      localStorage.removeItem("threadId");
    }
  }, [chatHistory]);

  // Conexión inicial y manejo de reconexión
  useEffect(() => {
    socketService.connect();
    const activeOrder = localStorage.getItem("activeOrder");
    if (activeOrder) {
      const { orderNumber, timestamp } = JSON.parse(activeOrder);
      if (Date.now() - timestamp <= 30 * 60 * 1000) {
        socketService.subscribeToOrder(orderNumber);
      }
    }

    if (chatHistory.threadId && chatHistory.messages.length > 0) {
      const lastMessage = chatHistory.messages[chatHistory.messages.length - 1];
      if (lastMessage.role === "user") {
        socketService.sendMessage({
          message: lastMessage.content,
          threadId: chatHistory.threadId,
        });
      }
    }

    return () => {
      socketService.disconnect();
    };
  }, []);

  useEffect(() => {
    const messageUnsubscribe = socketService.onMessage((message) => {
      const orderMatch = message.content.match(
        /\*\*Número de Orden\*\*:(?:\s)?#(\d+)/
      );

      if (orderMatch) {
        const orderNumber = parseInt(orderMatch[1]);
        saveActiveOrder(orderNumber);
      }

      if (
        orderMatch &&
        (message.content.includes("estado de tu orden") ||
          message.content.includes("encontré tu orden"))
      ) {
        const orderNumber = parseInt(orderMatch[1]);
        saveActiveOrder(orderNumber);
      }

      setChatHistory((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    });

    const typingUnsubscribe = socketService.onTyping((typing) => {
      setIsTyping(typing);
    });

    const errorUnsubscribe = socketService.onError((err) => {
      setError(err.message);
      setTimeout(() => setError(null), 5000);
    });

    const threadCreatedUnsubscribe = socketService.onThreadCreated(
      (threadId) => {
        setChatHistory((prev) => ({
          ...prev,
          threadId: threadId,
        }));
      }
    );

    const orderUpdateUnsubscribe = socketService.onOrderUpdate(
      (orderUpdate) => {
        setChatHistory((prev) => ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              role: "assistant",
              content: orderUpdate.content,
            },
          ],
        }));
      }
    );

    return () => {
      messageUnsubscribe();
      typingUnsubscribe();
      errorUnsubscribe();
      threadCreatedUnsubscribe();
      orderUpdateUnsubscribe();
    };
  }, [saveActiveOrder]);

  const sendMessage = useCallback(
    (message) => {
      const newMessage = { role: "user", content: message };

      setChatHistory((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
      }));

      socketService.sendMessage(message, chatHistory.threadId);
    },
    [chatHistory.threadId]
  );

  return {
    messages: chatHistory.messages,
    isTyping,
    error,
    sendMessage,
  };
};
