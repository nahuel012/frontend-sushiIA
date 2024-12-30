import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

class SocketService {
  constructor() {
    this.socket = null;
    this.messageHandlers = new Set();
    this.typingHandlers = new Set();
    this.errorHandlers = new Set();
    this.threadCreatedHandlers = new Set();
    this.orderUpdateHandlers = new Set();

    const chatData = localStorage.getItem("chatData");
    if (chatData) {
      const parsed = JSON.parse(chatData);
      if (Date.now() - parsed.timestamp <= 30 * 30 * 1000) {
        this.threadId = parsed.threadId;
      }
    }
  }

  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL);

      if (this.threadId) {
        this.socket.emit("reconnect_chat", { threadId: this.threadId });
      }

      this.socket.on("receive_message", (message) => {
        this.messageHandlers.forEach((handler) => handler(message));
      });

      this.socket.on("bot_typing", (isTyping) => {
        this.typingHandlers.forEach((handler) => handler(isTyping));
      });

      this.socket.on("error", (error) => {
        this.errorHandlers.forEach((handler) => handler(error));
      });

      this.socket.on("thread_created", (threadId) => {
        this.threadId = threadId;
        localStorage.setItem("threadId", threadId);
        this.threadCreatedHandlers.forEach((handler) => handler(threadId));
      });

      this.socket.on("order_update", (orderUpdate) => {
        this.orderUpdateHandlers.forEach((handler) => handler(orderUpdate));
      });
    }
    return this;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  sendMessage(message, threadId = this.threadId) {
    if (this.socket) {
      // Solo enviar el mensaje una vez
      if (!threadId) {
        this.socket.emit("send_message", { message });
      } else {
        this.socket.emit("send_message", { message, threadId });
      }
    }
  }

  subscribeToOrder(orderNumber) {
    if (this.socket) {
      this.socket.emit("subscribe_to_order", `order_${orderNumber}`);
    } else {
      console.warn("Socket no inicializado al intentar suscribirse");
    }
  }

  unsubscribeFromOrder(orderNumber) {
    if (this.socket) {
      this.socket.emit("unsubscribe_from_order", orderNumber);
    }
  }

  onMessage(handler) {
    this.messageHandlers.add(handler);
    return () => this.messageHandlers.delete(handler);
  }

  onTyping(handler) {
    this.typingHandlers.add(handler);
    return () => this.typingHandlers.delete(handler);
  }

  onError(handler) {
    this.errorHandlers.add(handler);
    return () => this.errorHandlers.delete(handler);
  }

  onThreadCreated(handler) {
    this.threadCreatedHandlers.add(handler);
    return () => this.threadCreatedHandlers.delete(handler);
  }

  onOrderUpdate(handler) {
    this.orderUpdateHandlers.add(handler);
    return () => this.orderUpdateHandlers.delete(handler);
  }
}

export default new SocketService();
