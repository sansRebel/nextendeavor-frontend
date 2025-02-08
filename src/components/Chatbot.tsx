"use client"; 
import { useState } from "react";
import { sendMessageToDialogflow } from "@/services/recServices";
import { Recommendation } from "@/types";

const Chatbot = ({ setRecommendations }: { setRecommendations: (recs: Recommendation[]) => void }) => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello! How can I assist you with your career journey?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prevMessages) => [...prevMessages, { type: "user", text: input }]);
    setInput("");
    setLoading(true);

    const response = await sendMessageToDialogflow(input);
    const botReply = response.text || "I'm not sure how to respond to that.";

    setMessages((prevMessages) => [...prevMessages, { type: "bot", text: botReply }]);

    if (response.recommendations && Array.isArray(response.recommendations)) {
      setRecommendations(response.recommendations);
    }

    setLoading(false);
  };

  return (
    <section className="py-12 bg-base-200">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Chat with AI</h2>
        <div className="max-w-lg mx-auto bg-base-100 p-6 shadow-lg rounded-lg">
          <div className="h-64 overflow-y-auto p-3 border border-gray-300 rounded-md bg-base-200">
            {messages.map((msg, index) => (
              <div key={index} className={`chat ${msg.type === "user" ? "chat-end" : "chat-start"}`}>
                <div className="chat-bubble">{msg.text}</div>
              </div>
            ))}
            {loading && <div className="chat chat-start"><div className="chat-bubble">Thinking...</div></div>}
          </div>
          <div className="flex mt-4">
            <input
              type="text"
              className="input input-bordered flex-grow"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={loading}
            />
            <button className="btn btn-primary ml-2" onClick={handleSendMessage} disabled={loading}>Send</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;
