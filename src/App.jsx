import { useState } from 'react';
import './App.css';

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateAnswer() {
    setLoading(true);
    setAnswer("loading...");
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAUO3_E03XCfuRsNHSW8imRTUCvNGOMbmQ",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: question }] }],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setAnswer(data.candidates[0].content.parts[0].text);
    } catch (error) {
      setAnswer("Error generating answer. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="app-container">
      <h1 className="title">AI-Gemini Chatbot</h1>
      <textarea
        className="question-input"
        placeholder="Ask me anything..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}></textarea>
      <button className="generate-button" onClick={generateAnswer}>
        Generate Answer
      </button>
      <div className="answer-container">
        {loading ? <div className="loading-spinner"></div> : <p>{answer}</p>}
      </div>
    </div>
  );
}

export default App;
