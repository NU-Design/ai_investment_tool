import React, { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import MessageIcon from "@mui/icons-material/Message"; // 假设你使用MUI图标作为消息图标
import CircularProgress from "@mui/material/CircularProgress";

const ChatbotComponent = ({ triggerIconUrl, companySymbol }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 初始化问候消息
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        sender: "bot",
        text: "Hello! I am your private YMYC AI investment advisor.\n\n I only answer questions based on our credible sources and data.",
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  console.log("ssss", companySymbol);

  // 在组件状态中添加预设问题列表
  const [presetQuestions, setPresetQuestions] = useState([
    {
      key: "Risk Factors and Challenges",
      value:
        "Assess the risk factors, challenges, and competitive pressures acknowledged by the management in the earnings calls.",
    },
    {
      key: "Product Development and Innovations",
      value:
        "Highlight the product development efforts, innovations, and R&D initiatives discussed in the earnings calls.",
    },
  ]);

  // 用户点击预设问题按钮时调用的函数
  const handlePresetQuestionClick = async (value) => {
    setIsLoading(true);
    const botMessage = {
      sender: "user",
      text: value,
    };
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    const response = await fetch("http://127.0.0.1:5000/company_report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company_symbol: companySymbol,
        query: value,
      }),
    });

    const data = await response.json();

    const replyMessage = {
      sender: "bot",
      text: data.report || "Sorry, I couldn't fetch the data.",
    };
    setMessages((prevMessages) => [...prevMessages, replyMessage]);
    setIsLoading(false);
    // setIsOpen(false); // 关闭聊天窗口
  };

  const toggleChatbot = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (inputValue.trim() === "") return;
    setIsLoading(true);
    const userMessage = { sender: "user", text: inputValue };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const response = await fetch("http://127.0.0.1:5000/company_report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company_symbol: companySymbol,
        query: inputValue,
      }),
    });

    const data = await response.json();

    const botMessage = {
      sender: "bot",
      text: data.report || "Sorry, I couldn't fetch the data.",
    };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setInputValue("");
    setIsLoading(false); // Set loading to false once response is received
    setInputValue("");
  };

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      {!isOpen && (
        <button
          onClick={toggleChatbot}
          style={{
            background: `url(${triggerIconUrl}) no-repeat center/cover`,
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            outline: "none",
            backgroundColor: "white",
          }}>
          {/* Icon made transparent, showing only the background */}
          <MessageIcon
            style={{
              width: "80%",
              height: "100%",
            }}
          />
        </button>
      )}
      {isOpen && (
        <div
          style={{
            width: 600,
            height: 800,
            backgroundColor: "#3B3F48",
            padding: 20,
            borderRadius: "15px",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            outline: "none",
          }}>
          <button
            onClick={toggleChatbot}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "white", // Adjusted for visibility against the chat background
              position: "absolute",
              top: 10,
              right: 10,
            }}>
            <CloseIcon />
          </button>
          <div
            style={{
              padding: "10px",
              display: isOpen ? "flex" : "none",
              flexWrap: "wrap",
              justifyContent: "center",
              overflow: "auto",
            }}>
            {presetQuestions.map((question) => (
              <button
                key={question.key}
                onClick={() => handlePresetQuestionClick(question.value)}
                style={{
                  background: "#add8e6",
                  color: "#ffffff",
                  border: "none",
                  padding: "5px 10px",
                  margin: "5px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "0.875rem", // 小一号字体
                }}>
                {question.key}
              </button>
            ))}
          </div>
          <div
            style={{
              height: "85%",
              overflowY: "auto",
              backgroundColor: "#3B3F48",
              padding: 5,
            }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.sender === "user" ? "flex-end" : "flex-start", // Adjust alignment based on the sender
                  padding: "5px",
                  textAlign: "left",
                }}>
                <p
                  style={{
                    background: msg.sender === "user" ? "#e3a738" : "#adade8",
                    color: "#ffffff", // Ensure text is readable
                    display: "inline-block",
                    padding: "10px 15px",
                    borderRadius: "20px",
                    margin: 0,
                  }}>
                  {msg.text}
                </p>
              </div>
            ))}
            {isLoading && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "10px",
                }}>
                <CircularProgress style={{ color: "#ffffff" }} />{" "}
                {/* Adjusted color for visibility */}
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "lightblue",
              padding: "10px",
              borderRadius: "5px",
            }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message here..."
              style={{
                flexGrow: 1,
                padding: "10px",
                margin: "0 10px 0 0",
                borderRadius: "5px",
                border: "1px solid #ccc",
                backgroundColor: "#add8e6",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}>
              <SendIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotComponent;
