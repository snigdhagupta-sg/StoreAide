import React, { useState } from "react";
import { reviews } from "./data/reviews";
import ReactMarkdown from "react-markdown";
function App() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const getSummary = async () => {
    setLoading(true);
    setSummary("");

    try {
      const res = await fetch("http://localhost:8000/summarize_reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviews: reviews.map((review) => review.text),
        }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setSummary(data.summary || "No summary provided.");
    } catch (err) {
      console.error(err);
      setSummary("Failed to get summary. Check backend or internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Laptop Reviews
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <p className="font-semibold">{review.user}</p>
              <p className="text-sm text-gray-700 mt-1">{review.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={getSummary}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            {loading ? "Summarizing..." : "Get Summary"}
          </button>
        </div>

        {summary && (
          <div className="mt-6 bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Summary:</h2>
            <div className="prose prose-sm text-gray-800 whitespace-pre-wrap">
              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
