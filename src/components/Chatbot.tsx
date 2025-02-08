"use client";

import { useState } from "react";
import { sendMessageToDialogflow } from "@/services/recServices"; // Import the service

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello! How can I assist you with your career journey?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    const newMessages = [...messages, { type: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // Get AI response from Dialogflow
    const { text } = await sendMessageToDialogflow(input);

    // Format bot response
    const botReply = text || "I'm not sure how to respond to that.";



    // Add bot response to the messages list
    setMessages((prevMessages) => [
      ...prevMessages, // Preserve all previous messages
      { type: "bot", text: botReply } // Add AI response
    ]);
    
    
    setLoading(false);
  };

  return (
    <section className="py-12 bg-base-200">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Chat with AI</h2>

        {/* Chat Interface */}
        <div className="max-w-lg mx-auto bg-base-100 p-6 shadow-lg rounded-lg">
          <div className="h-64 overflow-y-auto p-3 border border-gray-300 rounded-md bg-base-200">
            {messages.map((msg, index) => (
              <div key={index} className={`chat ${msg.type === "user" ? "chat-end" : "chat-start"}`}>
                <div className="chat-bubble">{msg.text}</div>
              </div>
            ))}
            {loading && <div className="chat chat-start"><div className="chat-bubble">Thinking...</div></div>}
          </div>

          {/* Input Field */}
          <div className="flex mt-4">
            <input
              type="text"
              placeholder="Ask me anything..."
              className="input input-bordered flex-grow"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={loading}
            />
            <button className="btn btn-primary ml-2" onClick={handleSendMessage} disabled={loading}>
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;
