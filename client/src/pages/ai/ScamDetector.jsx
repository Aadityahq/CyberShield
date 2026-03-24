import { useState } from "react";
import API from "../../services/api";
import Navbar from "../../components/layout/Navbar";

export default function ScamDetector() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const analyze = async () => {
    try {
      const { data } = await API.post("/ai/predict", { text });
      setResult(data);
    } catch (error) {
      alert("AI request failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-xl mb-4">AI Scam Detector</h2>

        <textarea
          placeholder="Enter message or URL..."
          className="w-full p-3 border mb-3"
          rows="4"
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={analyze}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Analyze
        </button>

        {result && (
          <div className="mt-4 p-4 border">
            <p>
              <strong>Result:</strong> {result.label}
            </p>
            <p>
              <strong>Confidence:</strong> {result.confidence}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
