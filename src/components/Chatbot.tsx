"use client";
import { useState, useEffect, useRef, JSX } from "react";
import { sendMessageToDialogflow } from "@/services/recServices";
import { Recommendation } from "@/types";
import { motion } from "framer-motion";
import Spinner from "@/components/Spinner";
import { PaperAirplaneIcon, UserCircleIcon, BoltIcon } from "@heroicons/react/24/solid";
import { TypeAnimation } from "react-type-animation";

const Chatbot = ({ setRecommendations }: { setRecommendations: (recs: Recommendation[]) => void }) => {
  const [messages, setMessages] = useState<{ type: string; text: JSX.Element }[]>([
    {
      type: "bot",
      text: (
        <TypeAnimation
          sequence={[
            'Try "I need a new career" 👨‍💼', 2000,
            'Try "Recommend a career path" 📈', 2000,
            'Try "I am confused on what job to pursue" 🤔', 2000,
            'Try "Which careers are in demand?" 🔥', 2000,
          ]}
          speed={50}
          repeat={Infinity}
        />
      ),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  // ✅ Auto-scroll logic
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const needsScrolling = container.scrollHeight > container.clientHeight;
    const userIsNearBottom =
      container.scrollHeight - container.clientHeight - container.scrollTop < 50;

    if (needsScrolling && shouldAutoScroll && userIsNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  // ✅ Disable auto-scroll if user scrolls up
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const userScrolledUp = container.scrollTop < container.scrollHeight - container.clientHeight - 50;
      setShouldAutoScroll(!userScrolledUp);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: <span>{input}</span> },
    ]);

    setInput("");
    setLoading(true);

    const response = await sendMessageToDialogflow(input);
    const botReply: JSX.Element = <span>{response.text || "I'm not sure how to respond to that."}</span>;

    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "bot", text: botReply },
    ]);

    if (response.recommendations && Array.isArray(response.recommendations)) {
      setRecommendations(response.recommendations);
    }

    setLoading(false);
  };

  return (
    <section className="py-12 bg-base-200">
      <div className="container mx-auto">
        
        {/* ✅ Animated Title with Green Bolt Icon */}
        <h2 className="text-4xl font-bold text-center mb-6 text-primary relative flex items-center justify-center">
          
          <BoltIcon className="w-10 h-10 text-[#36a35e] ml-2 animate-pulse" />
          <motion.span
            initial={{ textShadow: "0px 0px 8px rgba(54, 163, 94, 0)" }}
            animate={{ textShadow: "0px 0px 12px rgba(54, 163, 94, 0.8)" }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
          >
            Start Your AI-Powered Career Journey
          </motion.span>
          <BoltIcon className="w-10 h-10 text-[#36a35e] ml-2 animate-pulse" />
        </h2>

        {/* 🔥 Chat Interface */}
        <div className="max-w-3xl mx-auto bg-base-100 p-6 shadow-xl rounded-xl border border-gray-700">
          <div
            className="h-96 overflow-y-auto p-3 border border-gray-500 rounded-lg bg-base-300 space-y-4"
            ref={messagesContainerRef}
          >
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                className={`flex items-end space-x-3 ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* ✅ Show AI or User Icon */}
                {msg.type === "bot" && <BoltIcon className="w-8 h-8 text-primary" />}
                {msg.type === "user" && <UserCircleIcon className="w-8 h-8 text-secondary" />}

                {/* ✅ Dynamically Sized Chat Bubble */}
                <motion.div
                  className={`px-4 py-2 rounded-lg text-sm shadow-md max-w-xs md:max-w-sm lg:max-w-md ${
                    msg.type === "user"
                      ? "bg-gray-500 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                  style={{
                    maxWidth: "70%",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {msg.text}
                </motion.div>
              </motion.div>
            ))}

            {/* ✅ Auto-scroll target */}
            <div ref={messagesEndRef} />

            {/* 🟠 Show Spinner When AI is Thinking */}
            {loading && (
              <motion.div className="flex justify-start">
                <motion.div
                  className="bg-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Spinner /> 
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* ✅ Input Field & Send Button */}
          <div className="flex mt-4 space-x-2">
            <input
              type="text"
              className="input input-bordered flex-grow rounded-full px-4"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={loading}
            />

            {/* ✈ Send Button */}
            <motion.button
              className="btn bg-[#36a35e] text-white p-2 rounded-full hover:bg-[#2d8f52] transition"
              onClick={handleSendMessage}
              disabled={loading}
              whileHover={{ scale: 1.05 }}
            >
              <PaperAirplaneIcon className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;
